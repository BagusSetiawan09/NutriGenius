/**
 * Mengelola semua interaktivitas UI: Navbar, Mobile Menu, Animasi, & Carousel
 */

// 1. DOM ELEMENTS & STATE VARIABLES
// Mendeklarasikan semua elemen yang dibutuhkan di awal agar efisien (caching)
const navbar = document.getElementById('navbar');
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

// State untuk melacak status Mobile Menu
let isMenuOpen = false;


// 2. NAVBAR SCROLL EFFECT
// Memberikan efek 'glassmorphism' (blur) saat halaman di-scroll ke bawah
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
        navbar.classList.remove('bg-transparent', 'shadow-md'); 
    } else {
        navbar.classList.remove('bg-bg-page/80', 'backdrop-blur-md', 'shadow-md');
        navbar.classList.add('bg-transparent');
    }
});


// 3. MOBILE MENU LOGIC
// Menangani aksi buka/tutup menu di perangkat mobile & tablet

// Fungsi bantu untuk mereset tampilan mobile menu
const closeMobileMenu = () => {
    isMenuOpen = false;
    mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2.5');
    body.classList.remove('overflow-hidden'); // Kembalikan fungsi scroll pada halaman
    hamburgerBtn.innerHTML = '<i class="ph ph-list"></i>'; // Kembalikan ikon ke Hamburger
    
    // Kembalikan efek blur navbar jika posisi layar sedang di bawah
    if (window.scrollY > 10) {
        navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
    }
};

// Event Listener untuk Tombol Hamburger
hamburgerBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        // Buka Menu
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2.5');
        body.classList.add('overflow-hidden'); // Kunci scroll halaman belakang
        hamburgerBtn.innerHTML = '<i class="ph ph-x"></i>'; // Ubah ikon jadi silang (X)
        
        // Buat navbar transparan agar menyatu dengan overlay menu
        navbar.classList.remove('backdrop-blur-md', 'bg-bg-page/80');
        navbar.classList.add('bg-transparent'); 
    } else {
        // Tutup Menu
        closeMobileMenu();
    }
});

// Event Listener untuk setiap tautan di Mobile Menu (Tutup menu otomatis saat diklik)
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});


// 4. ANIMATION LIBRARY INIT (AOS)
// Menginisialisasi library Animate On Scroll
// PENTING: Jika AOS.init() sudah ada di index.html, kamu bisa menghapus bagian ini.
AOS.init({
    duration: 1000, // Durasi animasi 1 detik
    once: true,     // Animasi hanya berjalan 1x saat pertama kali di-scroll
    offset: 100     // Trigger animasi 100px sebelum elemen muncul di layar
});


// 5. STATS COUNTER ANIMATION
// Menggunakan Intersection Observer API untuk menjalankan animasi angka 
// (dari 0 ke target) HANYA ketika elemen tersebut terlihat di layar pengguna
const COUNTER_SPEED = 150; // Semakin kecil angka, semakin lambat animasinya
const statsContainers = document.querySelectorAll('.stats-container');

if (statsContainers.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            
            // Jika elemen terlihat di viewport (layar)
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                
                counters.forEach(counter => {
                    const updateCount = () => {
                        // Ambil angka target dari atribut HTML (data-target)
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        
                        // Kalkulasi jeda penambahan angka
                        const inc = target / COUNTER_SPEED;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20); // Loop setiap 20ms
                        } else {
                            counter.innerText = target; // Pastikan angka berhenti pas di target
                        }
                    };
                    
                    updateCount(); // Jalankan fungsi
                });

                // Hentikan observer setelah animasi selesai agar tidak memakan performa browser
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5 // Animasi dimulai saat 50% dari tinggi container terlihat
    });

    // Tempelkan observer ke setiap container statistik yang ditemukan
    statsContainers.forEach(container => {
        counterObserver.observe(container);
    });
}


// 6. FAQ 3D CAROUSEL LOGIC
// Menangani perputaran/rotasi kartu di area Question & Answer.
// Manipulasi posisi murni diserahkan ke Tailwind (melalui atribut data-pos)
const faqCards = document.querySelectorAll('.faq-card');

if (faqCards.length === 3) { // Pastikan jumlah kartu ada 3 agar tidak error
    faqCards.forEach((card) => {
        card.addEventListener('click', () => {
            const currentPos = card.getAttribute('data-pos');
            
            // Bypass: Jika yang diklik adalah kartu utama (di tengah), batalkan aksi
            if (currentPos === 'center') return; 
            
            // LOGIKA PUTARAN KE KANAN (Jika kartu KIRI diklik)
            if (currentPos === 'left') {
                faqCards.forEach(c => {
                    const pos = c.getAttribute('data-pos');
                    if (pos === 'center') c.setAttribute('data-pos', 'right');
                    else if (pos === 'right') c.setAttribute('data-pos', 'left');
                    else if (pos === 'left') c.setAttribute('data-pos', 'center');
                });
            } 
            
            // LOGIKA PUTARAN KE KIRI (Jika kartu KANAN diklik)
            else if (currentPos === 'right') {
                faqCards.forEach(c => {
                    const pos = c.getAttribute('data-pos');
                    if (pos === 'center') c.setAttribute('data-pos', 'left');
                    else if (pos === 'left') c.setAttribute('data-pos', 'right');
                    else if (pos === 'right') c.setAttribute('data-pos', 'center');
                });
            }
        });
    });
}