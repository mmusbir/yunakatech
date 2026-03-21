# Portfolio Image Upload - Supabase Storage Setup

## 📋 Fitur Yang Ditambahkan

✅ **Drag & Drop Upload** - Upload gambar dengan menyeret langsung ke area upload  
✅ **Live Preview** - Lihat preview gambar sebelum disimpan  
✅ **Supabase Storage** - Upload langsung ke cloud storage (lebih scalable)  
✅ **Validasi File** - Otomatis validasi format dan ukuran file  
✅ **Fallback Manual** - Tetap bisa input URL manual jika diperlukan  

## 🚀 Cara Setup

### 1. Buat Bucket di Supabase

Akses dashboard Supabase project Anda:

1. Buka **Storage** di sidebar
2. Klik **Create a new bucket**
3. Nama bucket: `portfolio-images`
4. Pilih **Public** (agar gambar bisa diakses publik)
5. Klik **Create bucket**

### 2. Setup CORS (jika diperlukan)

Di Supabase Storage settings untuk bucket `portfolio-images`:
- Buka **Policies** 
- Pastikan public read access sudah enabled

### 3. Konfigurasi Environment Variables

Pastikan file `.env.local` sudah memiliki:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Deploy & Test

```bash
# Install dependencies (jika ada yang baru)
npm install

# Run dev server
npm run dev

# Test upload ke admin portfolio form
```

## 📝 Penggunaan

### Di Admin Portfolio Form

1. **Drag & Drop**: Tarik gambar ke area biru
2. **Atau Klik "Pilih File"**: Browse gambar dari device
3. **Preview Otomatis**: Lihat preview di sebelah kiri
4. **Submit Form**: Gambar akan di-upload ke Supabase Storage saat form di-submit

### File Upload Support

- **Format**: PNG, JPG, WEBP
- **Max Size**: 4MB
- **Nama File**: Otomatis generated dengan timestamp

## 🔄 Migration dari Local Uploads ke Supabase

Jika sudah ada images di `/public/uploads/portfolio/`:

```bash
# Images lama masih work (fallback ke local)
# Baru upload akan langsung ke Supabase Storage
# Bisa migrasi bertahap, images lama tidak perlu diubah
```

## 📂 File Structure

```
app/
  admin/
    components/
      portfolio-image-upload.tsx    # ← Component drag-drop baru
    portfolio/
      actions.ts                     # ← Updated untuk Supabase
      project-form.tsx               # ← Updated pakai component baru
  lib/
    supabase-storage.ts              # ← ✨ NEW: Supabase utilities
```

## 🛠️ Troubleshooting

### Error: "Upload gagal"

**Cek:**
1. Bucket `portfolio-images` sudah dibuat di Supabase? ✓
2. Bucket status "Public"? ✓
3. Credentials di `.env.local` benar? ✓
4. File size < 4MB? ✓
5. Format file PNG/JPG/WEBP? ✓

### Image URL tidak muncul

1. Buka Supabase Storage > `portfolio-images`
2. Verifikasi file sudah ter-upload
3. Klik file → Copy public URL
4. Paste di browser untuk tes

### Performance/Slow Upload

- Cek ukuran file (ideal < 2MB)
- Optimize image sebelum upload
- Check internet connection

## 🎨 Styling

Component menggunakan Tailwind CSS dengan design system yang sama seperti form lainnya:
- Border style: `border-[3px] border-black`
- Hover effects: Shadow & translate
- Drag-active: Blue border & bg

## 🔐 Security Notes

Bucket diset public untuk **read access saja**. Upload hanya bisa dilakukan:
- User authenticated (Admin only)
- Via server action dengan validasi
- File size & type validation

## 💡 Fitur Tambahan (Optional Future)

- [ ] Crop/resize image sebelum upload
- [ ] Batch upload multiple images
- [ ] Image optimization/compression
- [ ] Generate multiple sizes (thumbnail, medium, large)
- [ ] CDN caching optimization
- [ ] Backup ke multiple regions
