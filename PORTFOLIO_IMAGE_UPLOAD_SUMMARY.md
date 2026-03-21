# Portfolio Image Upload - Implementation Summary

## 🎯 Keseluruhan Perubahan

Fitur upload image portfolio sudah diupdate dengan:
- ✨ **Drag & drop interface** yang user-friendly
- 🖼️ **Live preview** sebelum upload
- ☁️ **Supabase Storage** untuk cloud storage yang scalable
- ⚡ **Validasi real-time** untuk format dan ukuran file
- 🔄 **Backward compatible** dengan URL manual

---

## 📝 File-File Yang Ditambah/Diubah

### 🆕 File Baru

| File | Deskripsi |
|------|-----------|
| `app/admin/components/portfolio-image-upload.tsx` | Component drag-drop client-side |
| `app/lib/supabase-storage.ts` | Utilities untuk upload ke Supabase Storage |
| `PORTFOLIO_IMAGE_UPLOAD_SETUP.md` | Dokumentasi setup lengkap |

### ✏️ File Yang Diubah

| File | Perubahan |
|------|-----------|
| `app/admin/portfolio/actions.ts` | Import & gunakan `uploadPortfolioImageToSupabase` |
| `app/admin/portfolio/project-form.tsx` | Gunakan komponen `PortfolioImageUpload` baru |

---

## 🚀 Quick Start

### Step 1: Setup Supabase Bucket

```
Supabase Dashboard → Storage → Create bucket
Nama: portfolio-images
Visibility: Public
```

### Step 2: Pastikan .env.local Lengkap

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

### Step 3: Test Upload

```bash
npm run dev
# Buka: http://localhost:3000/admin/portfolio/new
# Coba drag-drop atau klik untuk upload gambar
```

---

## 💻 Component Details

### PortfolioImageUpload

**Props:**
```typescript
interface PortfolioImageUploadProps {
  initialImage?: string    // URL gambar existing (optional)
  initialAlt?: string      // Alt text existing (optional)
}
```

**Fitur:**
- Drag & drop zone dengan visual feedback
- File picker button
- Live preview dengan thumbnail
- File size display
- Clear button untuk reset
- Automatic DataTransfer untuk form submission

**Integration:**
```tsx
// Di dalam form element
<PortfolioImageUpload
  initialImage={initialProject?.image}
  initialAlt={initialProject?.alt}
/>

// File akan auto-populated di form.imageFile
```

---

## 🔧 Supabase Storage Functions

### `uploadPortfolioImageToSupabase(file, previousPath)`

Upload file ke Supabase Storage dengan auto-delete previous image.

```typescript
const imageUrl = await uploadPortfolioImageToSupabase(
  file,           // File object dari input
  oldImageUrl     // Previous image URL (optional)
)
// Returns: Public URL dari Supabase Storage
```

### `deletePortfolioImageFromSupabase(imageUrl)`

Manual delete image dari Supabase Storage.

```typescript
await deletePortfolioImageFromSupabase(imageUrl)
```

### Validasi Built-in

✅ Format: PNG, JPG, WEBP  
✅ Size: Max 4MB  
✅ Error handling dengan pesan user-friendly  

---

## 🎨 UX/UI Features

### Drag & Drop Zone
- Visual feedback saat drag (blue border + bg)
- Icon berubah saat file dipilih (📁 → ✓)
- Label text berubah sesuai state

### Preview Area
- Aspect ratio 16:9 (same as before)
- Object-cover untuk fit gambar
- File info dibawah preview

### Buttons
- Styled consistent dengan existing form
- Clear button untuk reset selection
- Visual feedback saat hover/active

---

## 🔄 Data Flow

```
User drag/drop gambar
        ↓
handleDrop() → FileReader API
        ↓
setPreview() → DataTransfer.files
        ↓
Form submit → FormData.get('imageFile')
        ↓
uploadPortfolioImageToSupabase()
        ↓
Supabase Storage API
        ↓
Return public URL
        ↓
Save ke JSON + Supabase DB
```

---

## 🔐 Security

- ✅ Upload hanya bisa dilakukan user Admin (requireAdminUser)
- ✅ Client-side validasi format & size
- ✅ Server-side validasi di uploadPortfolioImageToSupabase
- ✅ Supabase bucket visibility: Public (read-only)
- ✅ Upload credentials: Server-side only

---

## ⚠️ Penting

### Sebelum Deploy

1. [ ] Buat bucket `portfolio-images` di Supabase
2. [ ] Set bucket visibility ke **Public**
3. [ ] Verifikasi .env.local credentials
4. [ ] Test upload di localhost dulu
5. [ ] Check Supabase Storage untuk verify file ada

### Migrasi dari Local Upload

Old images di `/public/uploads/portfolio/` **tetap berfungsi** (fallback)
- Tidak perlu migrasi, bisa bertahap
- New uploads langsung ke Supabase
- Old images bisa dihapus manual jika cleanup

### Troubleshooting

**"Error: bucket not found"**
- Pastikan bucket `portfolio-images` sudah dibuat
- Pastikan visibility setnya Public

**"Error: invalid credentials"**
- Cek .env.local SUPABASE_URL & keys
- Restart dev server

**Preview tidak muncul**
- Check browser console untuk error
- Verifikasi file valid image format

---

## 📚 Integration Points

### Form Structure (Unchanged)
```tsx
<form action={savePortfolioProjectAction} encType="multipart/form-data">
  {/* ... input fields ... */}
  
  {/* NEW: Component upload */}
  <PortfolioImageUpload
    initialImage={initialProject?.image}
    initialAlt={initialProject?.alt}
  />
  
  {/* ... other fields ... */}
</form>
```

### Server Action (Updated)
```typescript
export async function savePortfolioProjectAction(formData: FormData) {
  // ... build project ...
  
  const imageFile = formData.get('imageFile')
  project.image = await uploadPortfolioImageToSupabase(
    imageFile instanceof File ? imageFile : null,
    fallback?.image ?? null
  )
  
  // ... validate & save ...
}
```

---

## 📈 Next Steps (Optional)

- Image optimization/compression
- Batch upload
- Image cropping tool
- Multiple size generation
- CDN caching strategy
- Analytics tracking

---

## 📞 Support

Jika ada issues:
1. Cek PORTFOLIO_IMAGE_UPLOAD_SETUP.md untuk detail setup
2. Verifikasi Supabase bucket & credentials
3. Check browser console untuk error detail
4. Test dengan gambar berbeda (size & format)
