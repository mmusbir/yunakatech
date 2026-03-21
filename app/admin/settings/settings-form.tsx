import Image from 'next/image'

import type { SiteSettings } from '@/app/lib/site-settings'
import type { SettingsActionState } from '@/app/admin/settings/actions'
import { saveSettingsAction } from '@/app/admin/settings/actions'

interface SettingsFormProps {
  initialSettings: SiteSettings
  flash: SettingsActionState
}

export default function SettingsForm({
  initialSettings,
  flash,
}: SettingsFormProps) {
  return (
    <form action={saveSettingsAction} encType="multipart/form-data">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <section className="border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:col-span-7">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl font-black">[B]</span>
            <h3 className="text-xl font-black uppercase tracking-[-0.05em]">
              LOGO &amp; BRANDING
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.18em]">
                LOGO TEXT
              </label>
              <input
                className="w-full border-[3px] border-black p-3 text-sm font-bold uppercase outline-none transition-colors focus:bg-[#ffd600]"
                defaultValue={initialSettings.logoText}
                name="logoText"
                type="text"
              />
              <p className="mt-2 text-[9px] font-bold uppercase opacity-70">
                Akan tampil kalau logo image belum tersedia.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em]">
                UI DENSITY
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 border-[3px] border-black bg-[#f3f3f4] p-3 text-sm font-black uppercase tracking-[-0.03em] transition-colors hover:bg-[#ffd600]">
                  <input
                    className="h-5 w-5 border-[3px] border-black accent-black"
                    defaultChecked={initialSettings.uiDensity === 'compact'}
                    name="uiDensity"
                    type="radio"
                    value="compact"
                  />
                  <span>Compact</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 border-[3px] border-black bg-[#f3f3f4] p-3 text-sm font-black uppercase tracking-[-0.03em] transition-colors hover:bg-[#ffd600]">
                  <input
                    className="h-5 w-5 border-[3px] border-black accent-black"
                    defaultChecked={initialSettings.uiDensity === 'comfortable'}
                    name="uiDensity"
                    type="radio"
                    value="comfortable"
                  />
                  <span>Comfortable</span>
                </label>
              </div>
              <p className="mt-2 text-[9px] font-bold uppercase opacity-70">
                Compact lebih rapat. Comfortable memberi ruang lebih lega.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 border-[3px] border-black bg-[#f3f3f4] p-3 text-sm font-black uppercase tracking-[-0.03em] transition-colors hover:bg-[#ffd600]">
                <input
                  className="h-5 w-5 border-[3px] border-black accent-black"
                  defaultChecked={initialSettings.logoTextItalic}
                  name="logoTextItalic"
                  type="checkbox"
                />
                <span>Italic Text</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 border-[3px] border-black bg-[#f3f3f4] p-3 text-sm font-black uppercase tracking-[-0.03em] transition-colors hover:bg-[#ffd600]">
                <input
                  className="h-5 w-5 border-[3px] border-black accent-black"
                  defaultChecked={initialSettings.hideLogoText}
                  name="hideLogoText"
                  type="checkbox"
                />
                <span>Hide Text</span>
              </label>
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em]">
                UPLOAD LOGO (PNG/JPG)
              </label>
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden border-[3px] border-dashed border-black bg-[#f3f3f4] text-3xl font-black transition-colors hover:bg-[#ffd600]">
                  {initialSettings.logoImagePath ? (
                    <Image
                      alt="Current logo preview"
                      className="h-full w-full object-contain"
                      height={128}
                      src={initialSettings.logoImagePath}
                      unoptimized
                      width={128}
                    />
                  ) : (
                    'UP'
                  )}
                </div>
                <div className="flex-1">
                  <p className="mb-3 text-xs font-medium italic leading-relaxed text-black/65">
                    Recommended size: 512x512px. Maximum file size: 2MB.
                    Transparent backgrounds preferred.
                  </p>
                  <label className="inline-flex cursor-pointer border-[3px] border-black bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[-0.03em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                    SELECT FILE
                    <input
                      accept="image/png,image/jpeg"
                      className="sr-only"
                      name="logoImage"
                      type="file"
                    />
                  </label>
                  <p className="mt-2 text-[9px] font-bold uppercase opacity-70">
                    Jika ada gambar, teks logo di situs otomatis disembunyikan.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em]">
                UPLOAD FAVICON
              </label>
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden border-[3px] border-dashed border-black bg-[#f3f3f4] text-base font-black transition-colors hover:bg-[#ffd600]">
                  {initialSettings.faviconPath ? (
                    <Image
                      alt="Current favicon preview"
                      className="h-full w-full object-contain"
                      height={64}
                      src={initialSettings.faviconPath}
                      unoptimized
                      width={64}
                    />
                  ) : (
                    'IC'
                  )}
                </div>
                <div className="flex-1">
                  <p className="mb-3 text-xs font-medium italic text-black/65">
                    Format: `.ico` or `.png` (32x32px).
                  </p>
                  <label className="inline-flex cursor-pointer border-[3px] border-black bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[0.12em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                    SELECT FILE
                    <input
                      accept="image/png,image/x-icon,image/vnd.microsoft.icon"
                      className="sr-only"
                      name="favicon"
                      type="file"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 md:col-span-5">
          <div className="border-[3px] border-black bg-[#ffd600] p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl font-black">[C]</span>
              <h3 className="text-xl font-black uppercase tracking-[-0.05em]">
                CONTACT SETTINGS
              </h3>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.18em]">
                WHATSAPP NUMBER
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-black">
                  +
                </span>
                <input
                  className="w-full border-[3px] border-black bg-white p-3 pl-9 text-base font-bold outline-none transition-colors focus:bg-[#ffe170]"
                  defaultValue={initialSettings.whatsappNumber}
                  name="whatsappNumber"
                  placeholder="1 555 000 0000"
                  type="text"
                />
              </div>
              <p className="mt-2 text-[9px] font-bold uppercase opacity-70">
                Include country code without special characters.
              </p>
            </div>
          </div>

          <div className="flex-1 border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl font-black">[I]</span>
              <h3 className="text-xl font-black uppercase tracking-[-0.05em]">
                SITE INFO
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.18em]">
                  SITE TITLE
                </label>
                <input
                  className="w-full border-[3px] border-black p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
                  defaultValue={initialSettings.siteTitle}
                  name="siteTitle"
                  type="text"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-[0.18em]">
                  SITE DESCRIPTION
                </label>
                <textarea
                  className="h-20 w-full resize-none border-[3px] border-black p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]"
                  defaultValue={initialSettings.siteDescription}
                  name="siteDescription"
                />
              </div>
            </div>
          </div>
        </section>

        {flash.message ? (
          <div
            className={`md:col-span-12 border-[3px] p-3 text-xs font-black uppercase tracking-[0.08em] ${
              flash.status === 'success'
                ? 'border-black bg-[#ffd600] text-black'
                : 'border-black bg-[#ffdad6] text-[#93000a]'
            }`}
          >
            {flash.message}
          </div>
        ) : null}

        <div className="mt-2 flex flex-col gap-3 md:col-span-12 md:flex-row md:justify-end md:gap-4">
          <button
            type="reset"
            className="border-[3px] border-black bg-white px-8 py-3 text-xs font-black uppercase tracking-[-0.03em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            DISCARD CHANGES
          </button>
          <button
            type="submit"
            className="border-[3px] border-black bg-[#ffd600] px-10 py-3 text-xs font-black uppercase tracking-[-0.03em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            SAVE ALL SETTINGS
          </button>
        </div>
      </div>
    </form>
  )
}
