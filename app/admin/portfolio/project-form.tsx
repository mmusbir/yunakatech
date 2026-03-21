import Image from 'next/image'

import type { PortfolioProject } from '@/app/lib/portfolio-projects'
import PortfolioImageUpload from '@/app/admin/components/portfolio-image-upload'

import { savePortfolioProjectAction } from '@/app/admin/portfolio/actions'

interface ProjectFormProps {
  initialProject?: PortfolioProject
}

function formatList(values: string[]) {
  return values.join('\n')
}

export default function ProjectForm({ initialProject }: ProjectFormProps) {
  const metricSlots = Array.from({ length: 3 }, (_, index) => ({
    label: initialProject?.metrics[index]?.label ?? '',
    value: initialProject?.metrics[index]?.value ?? '',
  }))

  return (
    <form
      action={savePortfolioProjectAction}
      className="space-y-6"
      encType="multipart/form-data"
    >
      <input
        type="hidden"
        name="originalSlug"
        value={initialProject?.slug ?? ''}
      />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            TITLE
          </label>
          <input
            name="title"
            defaultValue={initialProject?.title ?? ''}
            className="w-full border-[3px] border-black bg-white p-3 text-sm font-bold uppercase outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            SLUG
          </label>
          <input
            name="slug"
            defaultValue={initialProject?.slug ?? ''}
            className="w-full border-[3px] border-black bg-white p-3 text-sm font-bold lowercase outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            BUILD CODE
          </label>
          <input
            name="code"
            defaultValue={initialProject?.code ?? ''}
            className="w-full border-[3px] border-black bg-white p-3 text-sm font-bold uppercase outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            CATEGORY
          </label>
          <input
            name="category"
            defaultValue={initialProject?.category ?? ''}
            className="w-full border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
      </section>

      <section className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
          EYEBROW
        </label>
        <input
          name="eyebrow"
          defaultValue={initialProject?.eyebrow ?? ''}
          className="w-full border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            IMAGE URL (Alternatif)
          </label>
          <input
            name="image"
            defaultValue={initialProject?.image ?? ''}
            className="w-full border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-[10px] font-normal uppercase tracking-[0.08em] text-black/60">
            Opsional: jika tidak upload file baru
          </p>
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            IMAGE ALT</label>
          <input
            name="alt"
            defaultValue={initialProject?.alt ?? ''}
            className="w-full border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
      </section>

      <section>
        <PortfolioImageUpload
          initialImage={initialProject?.image}
          initialAlt={initialProject?.alt}
        />
      </section>

      <section className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
          SHORT DESCRIPTION
        </label>
        <textarea
          name="description"
          defaultValue={initialProject?.description ?? ''}
          className="h-24 w-full resize-none border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
        />
      </section>

      <section className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
          LONG DESCRIPTION
        </label>
        <textarea
          name="longDescription"
          defaultValue={initialProject?.longDescription ?? ''}
          className="h-32 w-full resize-none border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            TAGS
          </label>
          <input
            name="tags"
            defaultValue={initialProject?.tags.join(', ') ?? ''}
            className="w-full border-[3px] border-black bg-white p-3 text-sm font-bold uppercase outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            OUTCOMES
          </label>
          <textarea
            name="outcomes"
            defaultValue={formatList(initialProject?.outcomes ?? [])}
            className="h-28 w-full resize-none border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            CHALLENGE
          </label>
          <textarea
            name="challenge"
            defaultValue={initialProject?.challenge ?? ''}
            className="h-28 w-full resize-none border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            SOLUTION
          </label>
          <textarea
            name="solution"
            defaultValue={initialProject?.solution ?? ''}
            className="h-28 w-full resize-none border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
          />
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-[10px] font-black uppercase tracking-[0.18em]">
          METRICS
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {metricSlots.map((metric, index) => (
            <div key={index} className="space-y-2 border-[3px] border-black bg-white p-4">
              <input
                name={`metric_label_${index}`}
                defaultValue={metric.label}
                placeholder="Label"
                className="w-full border-[3px] border-black bg-[#f3f3f4] p-3 text-xs font-black uppercase outline-none transition-colors focus:bg-[#ffd600]"
              />
              <input
                name={`metric_value_${index}`}
                defaultValue={metric.value}
                placeholder="Value"
                className="w-full border-[3px] border-black bg-[#f3f3f4] p-3 text-sm font-black outline-none transition-colors focus:bg-[#ffd600]"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
          DELIVERABLES
        </label>
        <textarea
          name="deliverables"
          defaultValue={formatList(initialProject?.deliverables ?? [])}
          className="h-28 w-full resize-none border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
        />
      </section>

      <div className="flex flex-col gap-3 md:flex-row md:justify-end">
        <button
          type="submit"
          className="border-[3px] border-black bg-[#ffd600] px-8 py-3 text-xs font-black uppercase tracking-[-0.03em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          {initialProject ? 'Save Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}
