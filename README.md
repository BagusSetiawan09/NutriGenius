# NutriGenius - Platform Edukasi Stunting & Pemantau Gizi Anak

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active_Development-yellow?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Deployment-GitHub_Pages-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages" />
</div>

<br>

**NutriGenius** adalah platform web interaktif modern yang dirancang untuk memberdayakan orang tua dalam memantau tumbuh kembang anak, menyusun menu makanan sehat berskala gizi, serta mematahkan mitos seputar stunting melalui edukasi yang menyenangkan (Gamifikasi). 

Dibangun dengan pendekatan **Mobile-First Design** menggunakan teknologi Frontend terkini, sistem ini menawarkan performa kilat, animasi visual yang mulus, dan pengalaman pengguna (UX) tingkat premium.

---

## Fitur Utama & Modul Interaktif

Sistem ini mencakup berbagai modul canggih yang saling terintegrasi untuk memberikan pengalaman komprehensif:

### 1. Modul Edukasi Interaktif (Mitos vs Fakta)
Bukan sekadar artikel biasa! Edukasi stunting dikemas dalam antarmuka modern yang menarik.
- **Layered 3D Cards:** Kartu informasi interaktif dengan efek tumpukan kertas (offset shadow) yang responsif saat disentuh.
- **Dynamic Content Swapping:** Penggantian data Mitos dan Fakta secara *real-time* dengan efek *fade-in/out* yang sangat *smooth* tanpa perlu memuat ulang halaman.
- **Galeri Video Edukasi:** Integrasi pemutar YouTube dengan antarmuka *custom* berlapis (*thumbnail* premium dan *carousel* dinamis).

### 2. Growth Chart Tracker (Pemantau Tumbuh Kembang)
Input data tinggi/berat badan anak dan lihat grafik pertumbuhan secara *real-time*.
- **Visualisasi Data:** Grafik interaktif untuk memantau tren pertumbuhan anak dari bulan ke bulan.
- **Alert System Cerdas:** Notifikasi otomatis status gizi anak (Aman/Waspada/Bahaya) berdasarkan kurva standar.

### 3. Meal Planner (Isi Piringku)
Fitur perancang menu makanan sehat berbasis simulasi yang menyenangkan bagi para Bunda.
- **Kalkulator Gizi Otomatis:** Menghitung estimasi Kalori, Protein Hewani, dan Karbohidrat secara langsung.
- **Smart Shopping List:** Modul CTA pintar untuk menghasilkan daftar belanja bahan segar sesuai jadwal menu si Kecil.

### 4. Premium UI/UX & Animasi
- **AOS Integration:** Efek transisi elemen (*Animate On Scroll*) di setiap *section* untuk kesan *website* kelas atas.
- **Fully Responsive:** Tata letak disesuaikan dengan presisi tingkat piksel dari layar HP mungil hingga Monitor Desktop ultra-lebar.

---

## Teknologi (Tech Stack)

NutriGenius dikembangkan dengan fondasi yang ringan namun sangat bertenaga:

* **Struktur:** HTML5 Semantic 
* **Styling:** Tailwind CSS v4 (CLI Version)
* **Logika Interaksi:** Vanilla JavaScript (ES6+)
* **Animasi:** AOS (Animate On Scroll) Library & CSS Keyframes
* **Ikonografi:** Phosphor Icons & Custom SVG

---

## Live Demo

Platform ini telah di-deploy secara publik dan dapat diakses langsung tanpa perlu instalasi.

**[Kunjungi NutriGenius Live Demo Here](https://bagussetiawan09.github.io/NutriGenius)**

---

## Panduan Instalasi (Development Mode)

Bagi pengembang yang ingin berkontribusi atau memodifikasi kode secara lokal, pastikan *environment* Anda memiliki **Node.js** terinstal.

Jalankan perintah berikut di terminal Anda secara berurutan:

```bash
# 1. Clone Repositori
git clone [https://github.com/BagusSetiawan09/NutriGenius.git](https://github.com/BagusSetiawan09/NutriGenius.git)

# 2. Masuk ke Direktori Proyek
cd NutriGenius

# 3. Install Dependencies (Untuk Tailwind CSS CLI)
npm install

# 4. Jalankan Mode Development (Compiler Berjalan)
# Perintah ini akan memantau perubahan kelas Tailwind dan meng-update file CSS secara real-time
npx @tailwindcss/cli -i ./assets/css/input.css -o ./assets/css/output.css --watch