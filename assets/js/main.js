/**
 * ============================================================================
 * NUTRIGENIUS MAIN SCRIPT
 * Mengelola seluruh interaktivitas UI, state management, dan inisialisasi
 * library eksternal (Chart.js & AOS).
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/* 1. DOM ELEMENTS & STATE VARIABLES                                          */
/* -------------------------------------------------------------------------- */
const navbar = document.getElementById('navbar');
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

let isMenuOpen = false;

/* -------------------------------------------------------------------------- */
/* 2. NAVBAR SCROLL EFFECT                                                    */
/* -------------------------------------------------------------------------- */
/**
 * Memberikan efek glassmorphism pada navbar saat pengguna melakukan scroll.
 * Transisi warna dan shadow diatur via Tailwind classes.
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
        navbar.classList.remove('bg-transparent', 'shadow-md'); 
    } else {
        navbar.classList.remove('bg-bg-page/80', 'backdrop-blur-md', 'shadow-md');
        navbar.classList.add('bg-transparent');
    }
});

/* -------------------------------------------------------------------------- */
/* 3. MOBILE MENU LOGIC                                                       */
/* -------------------------------------------------------------------------- */
/**
 * Menutup menu mobile, mereset ikon hamburger, dan mengembalikan fungsi
 * scroll pada body document.
 */
const closeMobileMenu = () => {
    isMenuOpen = false;
    mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2.5');
    body.classList.remove('overflow-hidden');
    hamburgerBtn.innerHTML = '<i class="ph ph-list"></i>';
    
    if (window.scrollY > 10) {
        navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
    }
};

/**
 * Mengelola event klik pada tombol Hamburger.
 */
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2.5');
            body.classList.add('overflow-hidden');
            hamburgerBtn.innerHTML = '<i class="ph ph-x"></i>';
            
            navbar.classList.remove('backdrop-blur-md', 'bg-bg-page/80');
            navbar.classList.add('bg-transparent'); 
        } else {
            closeMobileMenu();
        }
    });
}

/**
 * Otomatis menutup mobile menu ketika salah satu tautan navigasi diklik.
 */
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

/* -------------------------------------------------------------------------- */
/* 4. ANIMATION LIBRARY INIT (AOS)                                            */
/* -------------------------------------------------------------------------- */
/**
 * Inisialisasi Animate On Scroll (AOS).
 * Note: Parameter konfigurasi bisa di-override via HTML data attributes.
 */
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

/* -------------------------------------------------------------------------- */
/* 5. STATS COUNTER ANIMATION                                                 */
/* -------------------------------------------------------------------------- */
/**
 * Menganimasikan angka statistik dari 0 menuju target (data-target attribute)
 * menggunakan Intersection Observer agar animasi hanya berjalan saat elemen
 * terlihat di viewport pengguna.
 */
const COUNTER_SPEED = 150;
const statsContainers = document.querySelectorAll('.stats-container');

if (statsContainers.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / COUNTER_SPEED;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });

                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5 
    });

    statsContainers.forEach(container => {
        counterObserver.observe(container);
    });
}

/* -------------------------------------------------------------------------- */
/* 6. FAQ 3D CAROUSEL LOGIC                                                   */
/* -------------------------------------------------------------------------- */
/**
 * Mengelola interaksi klik pada kartu FAQ. Merotasi atribut data-pos
 * yang akan di-handle transformasinya oleh Tailwind CSS.
 */
const faqCards = document.querySelectorAll('.faq-card');

if (faqCards.length === 3) {
    faqCards.forEach((card) => {
        card.addEventListener('click', () => {
            const currentPos = card.getAttribute('data-pos');
            
            if (currentPos === 'center') return; 
            
            if (currentPos === 'left') {
                faqCards.forEach(c => {
                    const pos = c.getAttribute('data-pos');
                    if (pos === 'center') c.setAttribute('data-pos', 'right');
                    else if (pos === 'right') c.setAttribute('data-pos', 'left');
                    else if (pos === 'left') c.setAttribute('data-pos', 'center');
                });
            } 
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

/* -------------------------------------------------------------------------- */
/* 7. CUSTOM GENDER DROPDOWN LOGIC (TRACKER)                                  */
/* -------------------------------------------------------------------------- */
/**
 * Menggantikan elemen `<select>` bawaan browser dengan custom UI dropdown
 * untuk pengalaman pengguna yang lebih premium.
 */
const genderTrigger = document.getElementById('gender-trigger');
const genderOptions = document.getElementById('gender-options');
const genderArrow = document.getElementById('gender-arrow');
const genderText = document.getElementById('gender-text');
const genderInputHidden = document.getElementById('gender-input-hidden');
const optionItems = document.querySelectorAll('.gender-option');

if (genderTrigger) {
    
    // Toggle visibilitas menu dropdown
    genderTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        genderOptions.classList.toggle('opacity-0');
        genderOptions.classList.toggle('pointer-events-none');
        genderOptions.classList.toggle('-translate-y-2');
        
        genderArrow.classList.toggle('rotate-180');
        genderTrigger.classList.toggle('border-primary');
    });

    // Menangani aksi pemilihan salah satu opsi
    optionItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.querySelector('span.font-medium').innerText;
            const value = item.getAttribute('data-value');
            const iconHTML = item.querySelector('i').outerHTML;

            // Render hasil pilihan beserta ikonnya
            genderText.innerHTML = `<div class="flex items-center gap-2 text-gray-800 font-medium">${iconHTML} <span>${text}</span></div>`;
            genderInputHidden.value = value;

            // Tutup dropdown setelah memilih
            genderOptions.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
            genderArrow.classList.remove('rotate-180');
            genderTrigger.classList.remove('border-primary');
        });
    });

    // Otomatis menutup dropdown jika pengguna mengklik area luar elemen
    window.addEventListener('click', (e) => {
        if (!document.getElementById('custom-gender-select').contains(e.target)) {
            genderOptions.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
            genderArrow.classList.remove('rotate-180');
            genderTrigger.classList.remove('border-primary');
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 8. TRACKER: OVERVIEW RESULT & CHART.JS                                     */
/* -------------------------------------------------------------------------- */
/**
 * Mengelola event form submission pada halaman Tracker, memunculkan section
 * hasil (Overview & Reminder), dan merender grafik menggunakan Chart.js.
 */
document.addEventListener('DOMContentLoaded', function() {
    
    const cekStatusBtn = document.querySelector('form button[type="button"]');
    const overviewSection = document.getElementById('overview-section');
    const reminderSection = document.getElementById('reminder-section');
    let chartRendered = false; 

    if (cekStatusBtn && overviewSection) {
        cekStatusBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Membuka section hasil analisis
            overviewSection.classList.remove('hidden');
            if(reminderSection) reminderSection.classList.remove('hidden');
            
            // Auto scroll yang halus ke area hasil
            setTimeout(() => {
                overviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            // Merender chart hanya sekali untuk mencegah duplikasi canvas
            if (!chartRendered && typeof Chart !== 'undefined') {
                renderDonutChart();
                chartRendered = true;
                animateBarCharts();
            }
        });
    }

    /**
     * Konfigurasi dan inisialisasi Chart.js (Doughnut/Gauge Chart).
     */
    function renderDonutChart() {
        const ctx = document.getElementById('kaloriDonutChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Sarapan', 'Makan Siang', 'Makan Malam', 'Camilan'],
                datasets: [{
                    data: [350, 450, 300, 150], 
                    backgroundColor: ['#FFEDD5', '#FDBA74', '#FB923C', '#f97316'],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 10 
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                circumference: 180, 
                rotation: 270,      
                cutout: '60%',      
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        backgroundColor: '#1E1B4B',
                        titleFont: { size: 13, family: "'Plus Jakarta Sans', sans-serif" },
                        bodyFont: { size: 16, weight: 'bold', family: "'Plus Jakarta Sans', sans-serif" },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) { return context.raw + ' Kkal'; }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    /**
     * Menganimasikan bar horizontal dari 0 ke ukuran yang ditentukan
     * untuk memberikan efek feedback visual yang dinamis.
     */
    function animateBarCharts() {
        const bars = [
            { id: 'bar-karbo', width: '85%' },
            { id: 'bar-protein', width: '60%' },
            { id: 'bar-lemak', width: '45%' },
            { id: 'bar-serat', width: '20%' }
        ];

        bars.forEach(bar => {
            const el = document.getElementById(bar.id);
            if(el) {
                el.style.width = '0%';
                setTimeout(() => { el.style.width = bar.width; }, 100);
            }
        });
    }

/* -------------------------------------------------------------------------- */
/* 9. TRACKER: DAILY NUTRITION CHECKLIST & RING CHART                         */
/* -------------------------------------------------------------------------- */
/**
 * Mengelola fitur checklist interaktif dan memberikan feedback realtime
 * melalui grafik cincin persentase serta memanggil alert custom.
 */
    const checkboxes = document.querySelectorAll('.nutrisi-checkbox');
    const progressText = document.getElementById('progress-text');
    const terpenuhiVal = document.getElementById('terpenuhi-val');
    const belumVal = document.getElementById('belum-val');
    const btnClear = document.getElementById('btn-clear-checklist');
    const btnCek = document.getElementById('btn-cek-checklist');

    const customAlert = document.getElementById('custom-alert');
    const alertBackdrop = document.getElementById('alert-backdrop');
    const alertCard = document.getElementById('alert-card');
    const btnCloseAlert = document.getElementById('btn-close-alert');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');
    const alertIconWrap = document.getElementById('alert-icon-wrap');
    const alertIcon = document.getElementById('alert-icon');
    
    let ringChart;

    /**
     * Inisialisasi awal untuk grafik cincin checklist gizi.
     */
    function initRingChart() {
        const ctx = document.getElementById('progressRingChart');
        if(!ctx) return;

        ringChart = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Terpenuhi', 'Belum Terpenuhi'],
                datasets: [{
                    data: [0, 100], 
                    backgroundColor: ['#f97316', '#FFEDD5'],
                    borderWidth: 0, 
                    borderRadius: 20, 
                    hoverOffset: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                circumference: 260, 
                rotation: 230,      
                cutout: '85%',      
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                animation: {
                    animateScale: false,
                    animateRotate: true,
                    duration: 800,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    /**
     * Mengkalkulasi jumlah checklist dan memutasi grafik persentase.
     */
    function updateProgress() {
        const total = checkboxes.length;
        const checkedCount = document.querySelectorAll('.nutrisi-checkbox:checked').length;
        
        let persentase = 0;
        if(total > 0) {
            persentase = Math.round((checkedCount / total) * 100);
        }

        // Mutasi teks dan nilai DOM
        progressText.innerText = persentase + '%';
        terpenuhiVal.innerText = persentase + '%';
        belumVal.innerText = (100 - persentase) + '%';

        // Trigger animasi update Chart.js
        if(ringChart) {
            ringChart.data.datasets[0].data = [persentase, 100 - persentase];
            ringChart.update();
        }
    }

    // Pasang listener pada setiap item checklist
    checkboxes.forEach(box => {
        box.addEventListener('change', updateProgress);
    });

    // Logika form reset
    if(btnClear) {
        btnClear.addEventListener('click', () => {
            checkboxes.forEach(box => box.checked = false);
            updateProgress(); 
        });
    }

    /**
     * Helper: Menampilkan Custom Alert Modal
     */
    function showCustomAlert(type, title, message) {
        alertTitle.innerText = title;
        alertMessage.innerText = message;

        if (type === 'success') {
            alertIconWrap.className = 'w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-inner bg-green-100 text-green-500';
            alertIcon.className = 'ph-fill ph-check-circle text-5xl md:text-6xl';
        } else if (type === 'warning') {
            alertIconWrap.className = 'w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-inner bg-orange-100 text-primary';
            alertIcon.className = 'ph-fill ph-warning-circle text-5xl md:text-6xl';
        } else {
            alertIconWrap.className = 'w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-inner bg-blue-100 text-blue-500';
            alertIcon.className = 'ph-fill ph-info text-5xl md:text-6xl';
        }

        customAlert.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            alertCard.classList.remove('scale-95', 'opacity-0');
            alertCard.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    /**
     * Helper: Menutup Custom Alert Modal
     */
    function closeCustomAlert() {
        alertCard.classList.remove('scale-100', 'opacity-100');
        alertCard.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            customAlert.classList.add('opacity-0', 'pointer-events-none');
        }, 300);
    }

    if (btnCloseAlert && alertBackdrop) {
        btnCloseAlert.addEventListener('click', closeCustomAlert);
        alertBackdrop.addEventListener('click', closeCustomAlert);
    }

    // Evaluasi pencapaian gizi harian saat tombol diklik
    if(btnCek) {
        btnCek.addEventListener('click', () => {
            const checkedCount = document.querySelectorAll('.nutrisi-checkbox:checked').length;
            
            if(checkedCount === checkboxes.length) {
                showCustomAlert('success', 'Luar Biasa Bunda!', '100% Kebutuhan nutrisi harian si kecil telah terpenuhi hari ini! Pertahankan kinerja hebat ini untuk cegah stunting.');
            } else if (checkedCount > 0) {
                showCustomAlert('warning', 'Kerja Bagus!', 'Sebagian nutrisi sudah terpenuhi. Yuk lengkapi sisa nutrisi si kecil hari ini agar tumbuh kembangnya maksimal!');
            } else {
                showCustomAlert('info', 'Belum Ada Data', 'Yuk Bunda, mulai centang daftar nutrisi di sebelah kiri untuk memantau asupan si kecil hari ini!');
            }
        });
    }

    // Eksekusi inisialisasi
    initRingChart();

});