# NutriGenius - Platform Edukasi Stunting & Food Journaling

![Status Banner](https://img.shields.io/badge/Status-Development-yellow?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**NutriGenius** adalah platform web interaktif yang menggabungkan **Edukasi Kesehatan** dan **Gamifikasi** untuk membantu orang tua memantau tumbuh kembang anak serta mencegah stunting sejak dini.

Dibangun menggunakan teknologi **Frontend Modern** (HTML5, Tailwind CSS v4, Vanilla JS), sistem ini menawarkan performa tinggi, visualisasi data real-time, dan pengalaman pengguna (UX) yang menyenangkan tanpa membebani server.

---

## Fitur Utama & Modul

Sistem ini mencakup berbagai modul interaktif yang saling terintegrasi:

### 1. Growth Chart Tracker (Pemantau Tumbuh)
Input data tinggi/berat badan anak dan lihat grafik pertumbuhan secara real-time.
- **Visualisasi Data:** Grafik interaktif menggunakan library `Chart.js` sesuai standar WHO.
- **Alert System:** Notifikasi otomatis warna (Hijau/Kuning/Merah) untuk status gizi anak.
- **Riwayat Pertumbuhan:** Log data perkembangan anak dari bulan ke bulan.

### 2. Meal Planner (Isi Piringku)
Fitur simulasi penyajian makanan sehat yang menyenangkan.
- **Drag-and-Drop:** Tarik ikon makanan ke piring digital secara interaktif.
- **Kalkulator Gizi:** Menghitung total Kalori, Protein, dan Karbohidrat otomatis.
- **Rekomendasi Menu:** Saran kombinasi makanan untuk mencegah stunting.

### 3. Edu-Adventure (Gamifikasi)
Modul belajar stunting yang dikemas seperti permainan level.
- **Progress Bar:** Pantau sejauh mana materi edukasi yang sudah diselesaikan.
- **Interactive Quiz:** Kuis singkat di akhir setiap materi untuk menguji pemahaman.
- **Badges System:** Penghargaan digital bagi orang tua yang rajin belajar.

### 4. Responsive & Modern UI
- **Mobile First:** Tampilan optimal di Smartphone, Tablet, maupun Desktop.
- **Tema Warna:** Palet warna pastel (Sage Green & Orange) yang ramah anak dan orang tua.

---

## Teknologi (Tech Stack)

* **Structure:** HTML5 Semantic
* **Styling:** Tailwind CSS v4 (CLI Version)
* **Logic:** Vanilla JavaScript (ES6+)
* **Data Viz:** Chart.js Library
* **Interaction:** SortableJS / Native Drag-Drop API
* **Icons:** FontAwesome & SVG Custom

---

## Persyaratan Sistem (Requirements)

Pastikan environment Anda memenuhi spesifikasi berikut untuk pengembangan:
* Node.js & NPM (Hanya untuk menjalankan Tailwind CLI)
* Web Browser Modern (Chrome, Edge, Firefox)
* Koneksi Internet (Untuk load Font & Library CDN jika diperlukan)

---

## Panduan Instalasi (Quick Start)

Salin dan jalankan perintah berikut di terminal Anda secara berurutan untuk menjalankan proyek ini:

```bash
# 1. Clone Repositori
git clone [https://github.com/UsernameKamu/NutriGenius.git](https://github.com/UsernameKamu/NutriGenius.git)
cd NutriGenius

# 2. Install Dependencies (Untuk Tailwind)
npm install

# 3. Jalankan Mode Development (PENTING!)
# Perintah ini wajib jalan agar CSS ter-update saat ngoding
npx @tailwindcss/cli -i ./assets/css/input.css -o ./assets/css/output.css --watch

# 4. Buka Aplikasi
# Buka file index.html langsung di browser Anda.