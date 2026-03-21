'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

interface PortfolioImageUploadProps {
  initialImage?: string
  initialAlt?: string
}

export default function PortfolioImageUpload({
  initialImage,
  initialAlt,
}: PortfolioImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    initialImage ?? null
  )
  const [isDragActive, setIsDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Silakan pilih file gambar (PNG, JPG, atau WEBP)')
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      alert('Ukuran file maksimal 4MB')
      return
    }

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      alert('Format yang didukung: PNG, JPG, atau WEBP')
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setPreview(dataUrl)
    }
    reader.readAsDataURL(file)

    // Update the actual file input
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      fileInputRef.current.files = dataTransfer.files
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleClear = () => {
    setPreview(initialImage ?? null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            PREVIEW
          </label>
          <div className="flex aspect-video items-center justify-center overflow-hidden border-[3px] border-dashed border-black bg-[#f3f3f4]">
            {preview ? (
              <Image
                alt={initialAlt ?? 'Preview'}
                className="h-full w-full object-cover"
                height={360}
                src={preview}
                unoptimized={!preview?.startsWith('data:')}
                width={640}
              />
            ) : (
              <span className="text-xs font-black uppercase text-black/50">
                No Image
              </span>
            )}
          </div>
          {selectedFile && (
            <div className="text-[10px] font-bold text-green-600">
              ✓ {selectedFile.name}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em]">
            DRAG & DROP UPLOAD
          </label>

          <div
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-black bg-white'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="mb-2 text-3xl">
                {selectedFile ? '✓' : '📁'}
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.08em]">
                {selectedFile
                  ? 'File dipilih!'
                  : 'Drag & drop image di sini'}
              </p>
              <p className="mt-1 text-[10px] font-normal uppercase tracking-[0.08em] text-black/60">
                {selectedFile
                  ? `${selectedFile.name} • ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB`
                  : 'atau klik tombol di bawah'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <label className="inline-flex cursor-pointer border-[3px] border-black bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[-0.03em] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
              {selectedFile ? '✓ FILE DIPILIH' : 'PILIH FILE'}
              <input
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={handleInputChange}
                ref={fileInputRef}
                type="file"
                name="imageFile"
              />
            </label>

            {selectedFile && (
              <button
                className="inline-flex border-[3px] border-red-500 bg-red-50 px-4 py-2 text-[10px] font-black uppercase tracking-[-0.03em] text-red-600 transition-colors hover:bg-red-100"
                onClick={(e) => {
                  e.preventDefault()
                  handleClear()
                }}
                type="button"
              >
                × CLEAR
              </button>
            )}
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-black/60">
            Format: PNG, JPG, WEBP • Maksimal 4MB
          </p>
        </div>
      </div>
    </div>
  )
}

