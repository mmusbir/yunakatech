'use server'

import { redirect } from 'next/navigation'

import { requireAdminUser } from '@/app/admin/lib'
import {
  deletePortfolioImageIfPresent,
  getPortfolioProjects,
  saveUploadedPortfolioImage,
  slugifyProjectTitle,
  type PortfolioMetric,
  type PortfolioProject,
  writePortfolioProjectsFile,
} from '@/app/lib/portfolio-projects'
import { uploadPortfolioImageToSupabase } from '@/app/lib/supabase-storage'
import { getSupabase } from '@/app/lib/supabase'

function isMissingPortfolioTableError(error: { code?: string; message?: string }) {
  return (
    error.code === 'PGRST205' ||
    error.message?.includes('public.portfolio_projects') === true
  )
}

function parseListField(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseTags(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean)
}

function parseMetrics(formData: FormData): PortfolioMetric[] {
  return Array.from({ length: 3 }, (_, index) => {
    const label = String(formData.get(`metric_label_${index}`) ?? '').trim()
    const value = String(formData.get(`metric_value_${index}`) ?? '').trim()

    return { label, value }
  }).filter((metric) => metric.label && metric.value)
}

function buildProjectFromFormData(
  formData: FormData,
  fallback?: PortfolioProject
): PortfolioProject {
  const title = String(formData.get('title') ?? '').trim()
  const slugInput = String(formData.get('slug') ?? '').trim()
  const slug = slugifyProjectTitle(slugInput || title || fallback?.slug || '')

  return {
    slug,
    code: String(formData.get('code') ?? '').trim() || fallback?.code || '',
    title,
    eyebrow:
      String(formData.get('eyebrow') ?? '').trim() || fallback?.eyebrow || '',
    category:
      String(formData.get('category') ?? '').trim() ||
      fallback?.category ||
      '',
    description:
      String(formData.get('description') ?? '').trim() ||
      fallback?.description ||
      '',
    longDescription:
      String(formData.get('longDescription') ?? '').trim() ||
      fallback?.longDescription ||
      '',
    image: fallback?.image || '',
    alt: String(formData.get('alt') ?? '').trim() || fallback?.alt || '',
    tags: parseTags(formData.get('tags')),
    challenge:
      String(formData.get('challenge') ?? '').trim() ||
      fallback?.challenge ||
      '',
    solution:
      String(formData.get('solution') ?? '').trim() ||
      fallback?.solution ||
      '',
    outcomes: parseListField(formData.get('outcomes')),
    metrics: parseMetrics(formData),
    deliverables: parseListField(formData.get('deliverables')),
  }
}

function validateProject(project: PortfolioProject) {
  if (!project.title) {
    return 'Judul project wajib diisi.'
  }

  if (!project.slug) {
    return 'Slug project wajib diisi.'
  }

  if (!project.code) {
    return 'Build code wajib diisi.'
  }

  if (!project.description || !project.longDescription) {
    return 'Description dan long description wajib diisi.'
  }

  if (!project.image || !project.alt) {
    return 'Image URL dan alt text wajib diisi.'
  }

  if (project.tags.length === 0) {
    return 'Minimal satu tech stack wajib diisi.'
  }

  if (project.metrics.length === 0) {
    return 'Minimal satu metric wajib diisi.'
  }

  if (project.outcomes.length === 0 || project.deliverables.length === 0) {
    return 'Outcomes dan deliverables minimal harus punya satu item.'
  }

  return null
}

async function syncPortfolioProjectsToSupabase(projects: PortfolioProject[]) {
  const supabase = getSupabase()

  const { error } = await supabase.from('portfolio_projects').upsert(
    projects.map((project) => ({
      slug: project.slug,
      code: project.code,
      title: project.title,
      eyebrow: project.eyebrow,
      category: project.category,
      description: project.description,
      long_description: project.longDescription,
      image_url: project.image,
      image_alt: project.alt,
      tags: project.tags,
      challenge: project.challenge,
      solution: project.solution,
      outcomes: project.outcomes,
      metrics: project.metrics,
      deliverables: project.deliverables,
      updated_at: new Date().toISOString(),
    })),
    {
      onConflict: 'slug',
    }
  )

  if (error) {
    return error
  }

  const slugs = projects.map((project) => project.slug)
  const { error: deleteError } = await supabase
    .from('portfolio_projects')
    .delete()
    .not('slug', 'in', `(${slugs.map((slug) => `"${slug}"`).join(',')})`)

  return deleteError ?? null
}

export async function savePortfolioProjectAction(formData: FormData): Promise<void> {
  await requireAdminUser()

  const originalSlug = String(formData.get('originalSlug') ?? '').trim()
  const currentProjects = await getPortfolioProjects()
  const fallback = originalSlug
    ? currentProjects.find((project) => project.slug === originalSlug)
    : undefined
  const project = buildProjectFromFormData(formData, fallback)
  const manualImage = String(formData.get('image') ?? '').trim()
  const imageFile = formData.get('imageFile')

  try {
    project.image =
      (await uploadPortfolioImageToSupabase(
        imageFile instanceof File ? imageFile : null,
        fallback?.image ?? null
      )) ?? ''
  } catch (uploadError) {
    const message =
      uploadError instanceof Error
        ? uploadError.message
        : 'Upload image project gagal diproses.'

    redirect(`/admin?status=error&message=${encodeURIComponent(message)}`)
  }

  if (
    !imageFile ||
    !(imageFile instanceof File) ||
    imageFile.size === 0
  ) {
    project.image = manualImage || fallback?.image || ''
  }

  const validationError = validateProject(project)

  if (validationError) {
    redirect(
      `/admin?status=error&message=${encodeURIComponent(validationError)}`
    )
  }

  const slugConflict = currentProjects.find(
    (item) => item.slug === project.slug && item.slug !== originalSlug
  )

  if (slugConflict) {
    redirect(
      '/admin?status=error&message=Slug%20project%20sudah%20dipakai.%20Gunakan%20slug%20lain.'
    )
  }

  const nextProjects = originalSlug
    ? currentProjects.map((item) =>
        item.slug === originalSlug ? project : item
      )
    : [...currentProjects, project]

  await writePortfolioProjectsFile(nextProjects)

  const syncError = await syncPortfolioProjectsToSupabase(nextProjects)

  if (syncError) {
    if (isMissingPortfolioTableError(syncError)) {
      redirect(
        '/admin?status=success&message=Project%20disimpan%20ke%20file%20lokal.%20Jalankan%20SQL%20bootstrap%20terbaru%20untuk%20sinkronisasi%20Supabase.'
      )
    }

    console.error('Supabase portfolio_projects upsert error:', syncError.message)
    redirect(
      '/admin?status=success&message=Project%20disimpan%20ke%20file%20lokal.%20Supabase%20belum%20berhasil%20sinkron.'
    )
  }

  redirect(
    '/admin?status=success&message=Project%20berhasil%20disimpan%20dan%20langsung%20dipakai%20di%20halaman%20utama%20dan%20portfolio.'
  )
}

export async function deletePortfolioProjectAction(
  formData: FormData
): Promise<void> {
  await requireAdminUser()

  const slug = String(formData.get('slug') ?? '').trim()
  const currentProjects = await getPortfolioProjects()

  if (currentProjects.length <= 1) {
    redirect(
      '/admin?status=error&message=Minimal%20harus%20ada%20satu%20project%20portfolio.'
    )
  }

  const nextProjects = currentProjects.filter((project) => project.slug !== slug)

  if (nextProjects.length === currentProjects.length) {
    redirect('/admin?status=error&message=Project%20tidak%20ditemukan.')
  }

  const removedProject = currentProjects.find((project) => project.slug === slug)

  await deletePortfolioImageIfPresent(removedProject?.image ?? null)

  await writePortfolioProjectsFile(nextProjects)

  const syncError = await syncPortfolioProjectsToSupabase(nextProjects)

  if (syncError) {
    if (isMissingPortfolioTableError(syncError)) {
      redirect(
        '/admin?status=success&message=Project%20dihapus%20dari%20file%20lokal.%20Jalankan%20SQL%20bootstrap%20terbaru%20untuk%20sinkronisasi%20Supabase.'
      )
    }

    console.error('Supabase portfolio_projects delete sync error:', syncError.message)
    redirect(
      '/admin?status=success&message=Project%20dihapus%20secara%20lokal.%20Supabase%20belum%20berhasil%20sinkron.'
    )
  }

  redirect(
    '/admin?status=success&message=Project%20berhasil%20dihapus%20dan%20perubahan%20sudah%20sinkron.'
  )
}
