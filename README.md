# 🏫 Sistem Informasi Jadwal Sekolah & Monitoring Lab
> **Tugas Proyek Kelompok 1 - KIK**  
> Aplikasi web interaktif untuk pemantauan jadwal kegiatan belajar mengajar (KBM) dan status penggunaan laboratorium / ruang kelas secara horizontal dan realtime.

---

## 📌 Tentang Proyek

Website ini dirancang untuk memudahkan pihak sekolah, guru, dan siswa dalam melihat jadwal pelajaran serta memantau ketersediaan laboratorium dan ruang kelas. Data ruangan mencakup area gedung dan lantai mulai dari **Ruang 1.1.1 hingga 3.3.12** (Total 108 Ruangan).

---

## 👥 Informasi Kelompok

- **Kelompok:** 1 (KIK)
- **Mata Pelajaran / Praktikum:** Kejuruan / KIK
- **Anggota:**
  1. Rezky Aditya (Pengembang & Desain Tampilan)
  2. *(Nama Anggota Lain jika ada)*

---

## ✨ Fitur-Fitur Utama

1. **📊 Tabel Horizontal Interaktif (Sticky Header & First Column)**
   - Kolom horizontal menampilkan sesi jam pelajaran (Sesi 1 s.d. Sesi 9 + waktu istirahat).
   - Kolom nama ruangan dan baris header jam tetap terkunci (*sticky*) saat tabel digeser/scroll.

2. **🚦 Indikator 3 Status Ruangan (Color-Coded Badges)**
   - 🔴 **Ditempati**: Menampilkan Guru yang sedang mengajar, Mata Pelajaran, serta Kelas Siswa yang belajar.
   - 🟡 **Dibooking**: Ruangan direservasi untuk kegiatan khusus (Ujian UKK, Pelatihan Lomba, Ekskul).
   - 🟢 **Kosong**: Ruangan bebas/tersedia dan siap dipesan.

3. **🏢 Cakupan Ruangan 1.1.1 - 3.3.12 (108 Ruang)**
   - Format: `[Gedung].[Lantai].[Ruang]` (Gedung 1–3, Lantai 1–3, No. Ruang 1–12).
   - Meliputi berbagai jenis laboratorium: Lab RPL/Software, Lab TKJ/Jaringan, Lab Multimedia/DKV, Lab IoT, dan Ruang Teori.

4. **🔍 Filter dan Pencarian Cerdas**
   - **Tab Hari:** Navigasi cepat antara hari Senin sampai Sabtu.
   - **Filter Gedung & Lantai:** Memfilter ruang berdasarkan gedung (1-3) dan lantai (1-3).
   - **Filter Status:** Menampilkan hanya ruangan yang sedang kosong, dibooking, atau ditempati.
   - **Pencarian Cepat:** Pencarian nomor ruangan (misal `1.1.1`), nama guru, kelas murid, atau mapel.

5. **🌓 Dark Mode & Light Mode**
   - Mendukung peralihan tampilan mode terang dan mode gelap untuk kenyamanan mata.

6. **📝 Modal Detail & Simulasi Booking**
   - Klik kartu jadwal untuk membuka pop-up berisi informasi lengkap.
   - Tombol aksi untuk mem-booking ruangan kosong secara interaktif.

7. **📈 Ringkasan Statistik Realtime**
   - Widget counter yang menghitung secara dinamis total ruangan, sesi KBM aktif, sesi dibooking, dan ruang kosong.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5:** Struktur semantik halaman web.
- **CSS3:** Styling modern, CSS Variables, Flexbox, CSS Grid, responsif, dan dukungan dark mode.
- **JavaScript (Vanilla ES6+):** Logika penjadwalan dinamis, filter, pencarian, pagination, dan interaktivitas modal.

---

## 📁 Struktur File Proyek

```text
jadwal-sekolah-kelompok1-/
├── index(rezky).html     # Halaman utama aplikasi web
├── style(rezky).css      # Lembar gaya dan tema (termasuk Dark Mode)
├── script(rezky).js      # Logika data ruangan, tabel, filter, & interaksi
└── README.md             # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan Aplikasi

1. Unduh atau clone repositori ini:
   ```bash
   git clone https://github.com/<username>/jadwal-sekolah-kelompok1-.git
   ```
2. Masuk ke folder proyek:
   ```bash
   cd jadwal-sekolah-kelompok1-
   ```
3. Buka file `index(rezky).html` langsung di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox), atau gunakan ekstensi **Live Server** di VS Code.

---

## 📝 Lisensi & Catatan
Dibuat untuk keperluan tugas dan pembelajaran sekolah. Silakan digunakan dan dikembangkan lebih lanjut!

