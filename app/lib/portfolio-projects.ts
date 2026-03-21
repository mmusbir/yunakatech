import 'server-only'

import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { unstable_noStore as noStore } from 'next/cache'

import { getSupabase } from '@/app/lib/supabase'

export interface PortfolioMetric {
  label: string
  value: string
}

export interface PortfolioProject {
  slug: string
  code: string
  title: string
  eyebrow: string
  category: string
  description: string
  longDescription: string
  image: string
  alt: string
  tags: string[]
  challenge: string
  solution: string
  outcomes: string[]
  metrics: PortfolioMetric[]
  deliverables: string[]
}

const portfolioProjectsFilePath = path.join(
  process.cwd(),
  'data',
  'portfolio-projects.json'
)
const portfolioUploadsDir = path.join(
  process.cwd(),
  'public',
  'uploads',
  'portfolio'
)

export const DEFAULT_PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'build-001',
    code: 'BUILD_001',
    title: 'AETHER CORE ENGINE',
    eyebrow: 'Distributed Settlement Infrastructure',
    category: 'Platform Engineering',
    description:
      'Distributed ledger infrastructure for high-frequency algorithmic trade settlements. Built for 99.999% uptime.',
    longDescription:
      'Aether Core Engine was designed for a capital markets team that needed trade settlement logic to run with deterministic reliability across multiple regions. The system had to process intense peak traffic, keep auditability intact, and remain debuggable under strict compliance requirements.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkEiaNuUf-EPuzrEMIk72HCOO5dbsvfYvX7qCBhFJjMnT3rW5oKI84qDp568z2wVN711RPMGHW8gtx4kl8aNFV-KHhuFY4EkbXBNWW0tucg_sTjuIQ3EYImBS2xqF0VK0zjkW6NGmbPo9Z6ko4iMYH9jQChdaB2dXBZYPkKBNsbz5XZ1go-s-iM3sy8IXGpS2e3KLAmW-ephp5dHwPB8ceGEzij395VJMtHAr9jD7IcYiUlGiS7ci_qDZpte3dQxBgczV8rAek5DM',
    alt: 'Server hardware with neon blue internal lighting',
    tags: ['RUST', 'KUBERNETES', 'GRPC'],
    challenge:
      'The client was losing confidence in an aging settlement stack that could not safely scale with intraday volume spikes and regional failover demands.',
    solution:
      'We rebuilt the core execution path in Rust, introduced gRPC-based service contracts, and shipped a Kubernetes deployment topology with safer rollback and observability baked in from day one.',
    outcomes: [
      'Safer multi-region failover without manual intervention',
      'Cleaner service boundaries for audit and compliance review',
      'Lower latency across the most critical settlement flows',
    ],
    metrics: [
      { label: 'Peak Throughput', value: '2.8M tx/hr' },
      { label: 'Availability Target', value: '99.999%' },
      { label: 'Rollback Window', value: '< 5 min' },
    ],
    deliverables: [
      'Core ledger microservices',
      'Operational dashboards',
      'Deployment and rollback pipeline',
      'Incident response playbook',
    ],
  },
  {
    slug: 'build-002',
    code: 'BUILD_002',
    title: 'VOID INFRASTRUCTURE',
    eyebrow: 'Zero-Trust Cloud Foundation',
    category: 'Infrastructure',
    description:
      'Decentralized cloud architecture focusing on extreme data privacy and zero-trust security protocols.',
    longDescription:
      'Void Infrastructure was built for a privacy-first product team that wanted a hardened cloud base without the drag of bloated enterprise tooling. They needed clean provisioning, tighter secrets handling, and infrastructure changes that could be reviewed like product code.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTnDn0TZorH7lLkud9osl5oLFsK8LjLBieXDcO_WrtiMdYJYh0c1Ro8GJ9emIxF2c4FzGBHIpbQKa6CW3G9dA9ljDT-ziOwt7i9MNoI640KBl5vU4FER1TeGGw7PCaWFbdEzc6J7yfpzCglE8jVrSedRcjIORMTn-Y2X5fRZTPp3qUeuZtGZfz8wUx4-5J3s31tPLLwiMAPqIiCWtJAf4-g3r_5O8J1OK92T7EGPMGOsJ_tCgBeVtnWErLkNxoFmfj82EOo8YlYNU',
    alt: 'Macro photo of high tech circuit board',
    tags: ['GO', 'DOCKER', 'TERRAFORM'],
    challenge:
      'The team had inconsistent environments, weak access boundaries, and no reliable way to track what changed during infrastructure rollouts.',
    solution:
      'We introduced Terraform-managed provisioning, containerized workloads, and a zero-trust baseline for internal service access, paired with reviewable pipelines and environment parity.',
    outcomes: [
      'Infrastructure changes became predictable and reviewable',
      'Security posture improved without slowing delivery',
      'Faster recovery during environment drift incidents',
    ],
    metrics: [
      { label: 'Provisioning Time', value: '15 min' },
      { label: 'Service Isolation', value: '100%' },
      { label: 'Drift Detection', value: 'Real-time' },
    ],
    deliverables: [
      'Terraform modules',
      'Hardened Docker build system',
      'Access policy templates',
      'Environment parity documentation',
    ],
  },
  {
    slug: 'build-003',
    code: 'BUILD_003',
    title: 'SYNAPSE API',
    eyebrow: 'Fintech Integration Backbone',
    category: 'Backend Systems',
    description:
      'The backbone for next-gen fintech integrations. Sub-millisecond latency for global transactions.',
    longDescription:
      'Synapse API unified multiple payment and banking workflows into a single integration layer. The platform needed to support global transaction volume, partner onboarding, and consistent contract enforcement without turning every release into a fire drill.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXuO_a9N98Eaj28fxw-aJnDbA9zkMkfV_6GAMd-HoCQNhIDjMeRDyMIbAYLxJKnTgH54sgvOf1Hh3zfhXoP0x7UyK9fSpFsfhHtnjN1ngIVMYjaik5pHF1qQSr6b-KNFDdsF9LhzHdscdx6sdS9-yUwU-xNG6BWOQiUI0AvOld7tj_cTdaFEQcLH_9YGMTT4ba17rdw-v_vRWQUWo62Vrvi2A_V1jccjUUn1vFV7HcvIC9blsODgujB917snfd_X2Qq6CuVW4M2T0',
    alt: 'Deep blue digital connection web lines',
    tags: ['NODE.JS', 'AWS', 'POSTGRES'],
    challenge:
      'Existing integrations were fragmented, hard to monitor, and slow to extend whenever a new banking partner entered the stack.',
    solution:
      'We designed a modular API gateway layer, centralized observability, and predictable data contracts that let the team add new transaction rails without rewriting their internal core.',
    outcomes: [
      'Shorter onboarding time for partner integrations',
      'Better runtime visibility for support and ops teams',
      'More stable release cycles on high-volume endpoints',
    ],
    metrics: [
      { label: 'P95 Latency', value: '0.8 ms' },
      { label: 'Daily Requests', value: '12M+' },
      { label: 'Partner Launch Time', value: '-60%' },
    ],
    deliverables: [
      'Gateway architecture',
      'Contract versioning strategy',
      'Operational alerting',
      'Partner integration guides',
    ],
  },
  {
    slug: 'build-004',
    code: 'BUILD_004',
    title: 'TITAN UI FRAMEWORK',
    eyebrow: 'Industrial Dashboard Design System',
    category: 'Frontend Platform',
    description:
      'High-performance design system component library built for rapid deployment of industrial-scale dashboards.',
    longDescription:
      'Titan UI Framework gave an enterprise product suite one shared visual language without sacrificing speed. The goal was to unify product teams around reusable primitives, stronger accessibility, and a layout system that still felt aggressive and high signal.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdLxf3L3QYzZJJC7BgWksSm4ROMGSDvdR1ZUIZCBabe6tAlUPa6ZwxwjLRLXMsRRIWR1chBh45w3JRy0hj7PXD66G_rcLmMpaKoZNyLoZyfKgpBkKuIflERtl5Nmft7PgvY8dDFEKUcToFGbZ4b02qc_iNUyNltbtbsFe1J_EOcmREO9_E1tGtyS2kK2CpLomvhJFAOhBcRwVUUqd28W4yF9E4oHTnWi401j1jKY59Jc33ME3FPFhzkMF5uTSoKZndmISwPT4jlQ4',
    alt: '3D technical blueprint layout wireframe',
    tags: ['REACT', 'TYPESCRIPT', 'TAILWIND'],
    challenge:
      'Different product squads were reinventing components, creating visual drift, and shipping dashboards that felt unrelated to one another.',
    solution:
      'We built a typed React component system, tokenized spacing and typography, and created a rollout kit for product teams to adopt the framework incrementally instead of through a risky rewrite.',
    outcomes: [
      'UI consistency across multiple internal products',
      'Faster dashboard delivery for new squads',
      'Cleaner accessibility baseline for core interactions',
    ],
    metrics: [
      { label: 'Reusable Components', value: '48' },
      { label: 'Adoption Teams', value: '7 squads' },
      { label: 'UI Delivery Speed', value: '+35%' },
    ],
    deliverables: [
      'Component library',
      'Design token layer',
      'Documentation site',
      'Migration starter kit',
    ],
  },
]

export const portfolioStats = [
  { value: '124+', label: 'SYSTEMS_DEPLOYED' },
  { value: '99.9%', label: 'UPTIME_RELIABILITY' },
  { value: '12M+', label: 'API_REQUESTS_DAY' },
  { value: '48HR', label: 'INCIDENT_RESPONSE' },
] as const

function normalizeList(values: string[] | undefined, fallback: string[]) {
  const filtered =
    values?.map((value) => value.trim()).filter(Boolean) ?? fallback
  return filtered.length > 0 ? filtered : fallback
}

function normalizeMetrics(
  values: PortfolioMetric[] | undefined,
  fallback: PortfolioMetric[]
) {
  const filtered =
    values?.filter((metric) => metric.label.trim() && metric.value.trim()) ??
    fallback
  return filtered.length > 0 ? filtered : fallback
}

function normalizeProject(input: Partial<PortfolioProject> & { slug: string }) {
  const defaults =
    DEFAULT_PORTFOLIO_PROJECTS.find((project) => project.slug === input.slug) ??
    DEFAULT_PORTFOLIO_PROJECTS[0]

  return {
    slug: input.slug,
    code: input.code?.trim() || defaults.code,
    title: input.title?.trim() || defaults.title,
    eyebrow: input.eyebrow?.trim() || defaults.eyebrow,
    category: input.category?.trim() || defaults.category,
    description: input.description?.trim() || defaults.description,
    longDescription: input.longDescription?.trim() || defaults.longDescription,
    image: input.image?.trim() || defaults.image,
    alt: input.alt?.trim() || defaults.alt,
    tags: normalizeList(input.tags, defaults.tags),
    challenge: input.challenge?.trim() || defaults.challenge,
    solution: input.solution?.trim() || defaults.solution,
    outcomes: normalizeList(input.outcomes, defaults.outcomes),
    metrics: normalizeMetrics(input.metrics, defaults.metrics),
    deliverables: normalizeList(input.deliverables, defaults.deliverables),
  } satisfies PortfolioProject
}

function isMissingPortfolioTableError(error: { code?: string; message?: string }) {
  return (
    error.code === 'PGRST205' ||
    error.message?.includes('public.portfolio_projects') === true
  )
}

function getPublicAssetPath(fileName: string) {
  return `/uploads/portfolio/${fileName}`
}

function getAbsoluteAssetPath(publicPath: string) {
  return path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''))
}

export async function deletePortfolioImageIfPresent(publicPath: string | null) {
  if (!publicPath?.startsWith('/uploads/portfolio/')) {
    return
  }

  try {
    await unlink(getAbsoluteAssetPath(publicPath))
  } catch {
    // Ignore missing files.
  }
}

export async function saveUploadedPortfolioImage(
  file: File | null,
  previousPath: string | null
) {
  if (!file || file.size === 0) {
    return previousPath
  }

  if (file.size > 4 * 1024 * 1024) {
    throw new Error('Image project maksimal 4MB.')
  }

  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    throw new Error('Image project harus berformat PNG, JPG, atau WEBP.')
  }

  const extension =
    file.type === 'image/png'
      ? 'png'
      : file.type === 'image/webp'
        ? 'webp'
        : 'jpg'

  await mkdir(portfolioUploadsDir, { recursive: true })
  await deletePortfolioImageIfPresent(previousPath)

  const fileName = `project-${Date.now()}.${extension}`
  const publicPath = getPublicAssetPath(fileName)
  const absolutePath = getAbsoluteAssetPath(publicPath)
  const buffer = Buffer.from(await file.arrayBuffer())

  await writeFile(absolutePath, buffer)

  return publicPath
}

export async function readPortfolioProjectsFile(): Promise<PortfolioProject[]> {
  try {
    const fileContents = await readFile(portfolioProjectsFilePath, 'utf8')
    const parsed = JSON.parse(fileContents) as Array<Partial<PortfolioProject>>

    return parsed
      .filter((project): project is Partial<PortfolioProject> & { slug: string } =>
        typeof project.slug === 'string' && project.slug.length > 0
      )
      .map((project) => normalizeProject(project))
  } catch {
    return DEFAULT_PORTFOLIO_PROJECTS
  }
}

export async function writePortfolioProjectsFile(projects: PortfolioProject[]) {
  await mkdir(path.dirname(portfolioProjectsFilePath), { recursive: true })
  await writeFile(portfolioProjectsFilePath, JSON.stringify(projects, null, 2))
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  noStore()

  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select(
        'slug, code, title, eyebrow, category, description, long_description, image_url, image_alt, tags, challenge, solution, outcomes, metrics, deliverables'
      )
      .order('code', { ascending: true })

    if (error) {
      if (!isMissingPortfolioTableError(error)) {
        console.error('Supabase getPortfolioProjects error:', error.message)
      }

      return readPortfolioProjectsFile()
    }

    const rows =
      data?.map((project) =>
        normalizeProject({
          slug: project.slug,
          code: project.code,
          title: project.title,
          eyebrow: project.eyebrow,
          category: project.category,
          description: project.description,
          longDescription: project.long_description,
          image: project.image_url,
          alt: project.image_alt,
          tags: Array.isArray(project.tags) ? project.tags : undefined,
          challenge: project.challenge,
          solution: project.solution,
          outcomes: Array.isArray(project.outcomes)
            ? project.outcomes
            : undefined,
          metrics: Array.isArray(project.metrics)
            ? (project.metrics as PortfolioMetric[])
            : undefined,
          deliverables: Array.isArray(project.deliverables)
            ? project.deliverables
            : undefined,
        })
      ) ?? []

    return rows.length > 0 ? rows : DEFAULT_PORTFOLIO_PROJECTS
  } catch {
    return readPortfolioProjectsFile()
  }
}

export async function getPortfolioProject(slug: string) {
  const projects = await getPortfolioProjects()
  return projects.find((project) => project.slug === slug)
}

export async function getPortfolioSyncStatus() {
  noStore()

  try {
    const supabase = getSupabase()
    const { error } = await supabase
      .from('portfolio_projects')
      .select('slug')
      .limit(1)

    if (error) {
      return {
        ready: false,
        reason: isMissingPortfolioTableError(error)
          ? 'missing_table'
          : 'supabase_unavailable',
      } as const
    }

    return {
      ready: true,
      reason: 'ok',
    } as const
  } catch {
    return {
      ready: false,
      reason: 'missing_env',
    } as const
  }
}

export function slugifyProjectTitle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
