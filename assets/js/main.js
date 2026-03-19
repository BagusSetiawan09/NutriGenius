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
    // PAGAR PENGAMAN: Jika elemen sudah dihapus dari HTML, hentikan fungsi agar tidak error!
    if (!mobileMenu || !hamburgerBtn) return; 

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
    let donutChart;

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
        
        if (donutChart) {
            donutChart.destroy();
        }
        
        donutChart = new Chart(ctx, {
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

        if (ringChart) {
            ringChart.destroy();
        }

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

    // PERBAIKAN 3: Jalankan fungsi resize Chart saat ukuran layar berubah
    window.addEventListener('resize', () => {
        if (donutChart) {
            donutChart.resize();
        }
        if (ringChart) {
            ringChart.resize();
        }
    });

});

/* -------------------------------------------------------------------------- */
/* 10. DYNAMIC DATE (MEAL PLANNER HERO)                                       */
/* -------------------------------------------------------------------------- */
/**
 * Mengambil tanggal hari ini secara real-time dari sistem user
 * dan memformatnya ke dalam bahasa Indonesia (Contoh: 11 Maret 2026).
 */
document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('current-date-hero');
    
    if (dateElement) {
        const today = new Date();
        
        // Pengaturan format: Tanggal (angka), Bulan (nama penuh), Tahun (angka)
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        
        // Konversi ke format bahasa Indonesia ('id-ID')
        const formattedDate = today.toLocaleDateString('id-ID', options);
        
        // Terapkan ke dalam HTML
        dateElement.innerText = formattedDate;
    }
});

/**
 * --------------------------------------------------------------------------
 * Modul 11: Meal Planner - Gauge Charts
 * Mengelola render grafik target gizi harian (Kalori, Protein, Vitamin).
 * --------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Konfigurasi palet warna grafik
    const colorFilled = '#f97316'; 
    const colorEmpty = '#EDE9FE'; 

    /**
     * Membangun Gauge Chart (Setengah Lingkaran) secara dinamis.
     * * @param {string} canvasId - ID elemen kanvas HTML
     * @param {number} value - Nilai persentase pencapaian (0-100)
     */
    function createGaugeChart(canvasId, value) {
        const canvas = document.getElementById(canvasId);
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Terpenuhi', 'Sisa'],
                datasets: [{
                    data: [value, 100 - value],
                    backgroundColor: [colorFilled, colorEmpty],
                    borderWidth: 0,
                    borderRadius: 20, 
                    hoverOffset: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,      
                circumference: 270,  
                rotation: 225,       
                cutout: '82%',       
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false } 
                },
                animation: {
                    animateScale: false,
                    animateRotate: true,
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Inisialisasi grafik data target harian
    createGaugeChart('chart-kalori', 82);
    createGaugeChart('chart-protein', 90);
    createGaugeChart('chart-vitamin', 45);

});

/**
 * --------------------------------------------------------------------------
 * Modul 12: Meal Planner - Isi Piringku
 * Menangani interaksi Drag & Drop, kalkulasi gizi real-time, 
 * serta manajemen status nampan makanan.
 * --------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Validasi ketersediaan elemen pada DOM
    const dropzones = document.querySelectorAll('.dropzone');
    const foodItems = document.querySelectorAll('.food-item');
    if (dropzones.length === 0 || foodItems.length === 0) return;

    // Inisialisasi elemen DOM untuk pembaruan statistik
    const totalCaloriesDisplay = document.getElementById('total-calories-display');
    const valKarbo = document.getElementById('val-karbo');
    const valProtein = document.getElementById('val-protein');
    const valLemak = document.getElementById('val-lemak');
    const emptyMessage = document.getElementById('empty-tray-message');
    
    // Inisialisasi elemen DOM untuk menu konteks dan modal konfirmasi
    const contextMenu = document.getElementById('custom-context-menu');
    const btnBatalMenu = document.getElementById('btn-batal-menu');
    const btnHapusMenu = document.getElementById('btn-hapus-makanan');
    const deleteModal = document.getElementById('delete-confirm-modal');
    const deleteCard = document.getElementById('delete-card');
    const btnCancelDelete = document.getElementById('btn-cancel-delete');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete');

    // Manajemen state posisi makanan di nampan
    let trayState = {
        'zone-1': null,
        'zone-2': null,
        'zone-3': null,
        'zone-4': null,
        'zone-5': null
    };

    let bentoChartInstance = null;
    let activeZoneForDelete = null; 

    /**
     * Konfigurasi dan inisialisasi Pie Chart distribusi makronutrien.
     */
    function initBentoChart() {
        const canvas = document.getElementById('bentoPieChart');
        if(!canvas) return;

        bentoChartInstance = new Chart(canvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Karbohidrat', 'Protein', 'Lemak'],
                datasets: [{
                    data: [0, 0, 0], 
                    backgroundColor: ['#f97316', '#fb923c', '#fdba74'], 
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) { return ` ${context.label}: ${context.raw}g`; }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    duration: 800,
                    easing: 'easeOutBounce'
                }
            }
        });
    }
    
    initBentoChart();

    // Listener adaptasi ukuran layar untuk instans grafik bento
    window.addEventListener('resize', () => {
        if (bentoChartInstance) bentoChartInstance.resize();
    });

    /**
     * Memperbarui seluruh statistik gizi berdasarkan state nampan saat ini.
     * Dipanggil setiap kali terjadi event penambahan atau penghapusan item.
     */
    function updateTrayStatistics() {
        let totalKalori = 0;
        let totalKarbo = 0;
        let totalProtein = 0;
        let totalLemak = 0;
        let isTrayEmpty = true;

        for (const zoneId in trayState) {
            const food = trayState[zoneId];
            if (food) {
                isTrayEmpty = false;
                totalKalori += parseFloat(food.kalori);
                totalKarbo += parseFloat(food.karbo);
                totalProtein += parseFloat(food.protein);
                totalLemak += parseFloat(food.lemak);
            }
        }

        totalCaloriesDisplay.innerHTML = `${totalKalori} <span class="text-sm text-gray-500 font-medium">Kkal</span>`;
        valKarbo.innerText = `${totalKarbo}g`;
        valProtein.innerText = `${totalProtein}g`;
        valLemak.innerText = `${totalLemak}g`;

        if (isTrayEmpty) {
            emptyMessage.classList.remove('hidden');
            if (bentoChartInstance) {
                bentoChartInstance.data.datasets[0].data = [0, 0, 0];
                bentoChartInstance.update();
            }
        } else {
            emptyMessage.classList.add('hidden');
            if (bentoChartInstance) {
                bentoChartInstance.data.datasets[0].data = [totalKarbo, totalProtein, totalLemak];
                bentoChartInstance.update();
            }
        }
    }

    /**
     * Penanganan Event Drag & Drop
     * Termasuk ekstraksi payload data makanan dan transisi visual.
     */
    foodItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            const foodData = {
                id: item.getAttribute('data-id'),
                kalori: item.getAttribute('data-kalori'),
                karbo: item.getAttribute('data-karbo'),
                protein: item.getAttribute('data-protein'),
                lemak: item.getAttribute('data-lemak'),
                imgSrcTray: item.getAttribute('data-img-tray') || item.querySelector('img').src, 
                name: item.querySelector('span').innerText
            };
            
            e.dataTransfer.setData('text/plain', JSON.stringify(foodData));
            setTimeout(() => item.classList.add('opacity-50'), 0);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('opacity-50');
        });
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            zone.classList.add('bg-orange-50', 'border-orange-300'); 
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('bg-orange-50', 'border-orange-300');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('bg-orange-50', 'border-orange-300');

            const foodDataString = e.dataTransfer.getData('text/plain');
            if (!foodDataString) return;
            
            const foodData = JSON.parse(foodDataString);
            trayState[zone.id] = foodData;

            zone.innerHTML = `
                <div class="relative w-full h-full flex items-center justify-center p-1 transform transition-transform animate-[bounce_0.5s_ease-out]">
                    <img src="${foodData.imgSrcTray}" alt="${foodData.name}" class="w-[90%] h-[90%] object-contain drop-shadow-xl pointer-events-none">
                </div>
            `;

            updateTrayStatistics();
        });
    });

    /**
     * Penanganan Menu Konteks Kustom (Smart Position - Centered to Zone)
     * Mendukung interaksi Klik Kanan (Desktop) dan Tekan Tahan (Mobile).
     */
    let pressTimer; 
    let startX = 0; 
    let startY = 0; 

    function showContextMenuCentered(zone) {
        activeZoneForDelete = zone.id;
        
        // 1. Dapatkan kordinat dan ukuran kotak nampan saat ini
        const rect = zone.getBoundingClientRect();
        
        // Tampilkan sementara (transparan) untuk membaca ukuran menunya
        contextMenu.style.visibility = 'hidden'; 
        contextMenu.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        
        const menuWidth = contextMenu.offsetWidth;
        const menuHeight = contextMenu.offsetHeight;
        
        // 2. Hitung posisi tengah persis!
        let posX = rect.left + (rect.width / 2) - (menuWidth / 2);
        let posY = rect.top + (rect.height / 2) - (menuHeight / 2);
        
        // 3. Cegah batas ujung layar kiri/kanan/atas/bawah
        posX = Math.max(10, Math.min(posX, window.innerWidth - menuWidth - 10));
        posY = Math.max(10, Math.min(posY, window.innerHeight - menuHeight - 10));

        // 4. Set kordinat
        contextMenu.style.left = `${posX}px`;
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.visibility = 'visible';
    }

    dropzones.forEach(zone => {
        // Interaksi Desktop (Klik Kanan)
        zone.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (trayState[zone.id] !== null) {
                showContextMenuCentered(zone);
            }
        });

        // Interaksi Mobile (Tekan Tahan)
        zone.addEventListener('touchstart', (e) => {
            if (trayState[zone.id] !== null) {
                const touch = e.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;

                pressTimer = window.setTimeout(() => {
                    // Panggil fungsi tengah
                    showContextMenuCentered(zone);
                }, 500);
            }
        }, { passive: true });

        zone.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });

        zone.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const moveX = Math.abs(touch.clientX - startX);
            const moveY = Math.abs(touch.clientY - startY);
            
            if (moveX > 15 || moveY > 15) {
                clearTimeout(pressTimer);
            }
        });
    });

    const closeContextMenu = () => {
        contextMenu.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
    };

    document.addEventListener('click', closeContextMenu);
    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.dropzone') && !e.target.closest('#custom-context-menu')) {
            closeContextMenu();
        }
    });
    btnBatalMenu.addEventListener('click', closeContextMenu);

    /**
     * Pengendalian Siklus Hidup Modal Konfirmasi Penghapusan.
     */
    btnHapusMenu.addEventListener('click', () => {
        deleteModal.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            deleteCard.classList.remove('scale-95', 'opacity-0');
        }, 10);
    });

    const closeDeleteModal = () => {
        deleteCard.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            deleteModal.classList.add('opacity-0', 'pointer-events-none');
            activeZoneForDelete = null; 
        }, 300);
    };

    btnCancelDelete.addEventListener('click', closeDeleteModal);
    document.getElementById('delete-backdrop').addEventListener('click', closeDeleteModal);

    btnConfirmDelete.addEventListener('click', () => {
        if (activeZoneForDelete) {
            trayState[activeZoneForDelete] = null;
            
            const zoneEl = document.getElementById(activeZoneForDelete);
            zoneEl.innerHTML = '';
            
            updateTrayStatistics();
        }
        closeDeleteModal();
    });

});

/**
 * Modul 13: Rekomendasi Menu Harian
 * Mengelola antarmuka navigasi tab, render kalender dinamis, 
 * serta pemutar video modal pada section rekomendasi.
 */
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * 1. Navigasi Tab Kategori Makanan
     * Mengelola state aktif dan transisi visibilitas antar kartu menu.
     */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            // Mereset state visual pada seluruh elemen tombol tab
            tabBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-md');
                b.classList.add('text-orange-600', 'hover:bg-orange-200/50');
            });
            
            // Menetapkan state visual aktif pada tombol yang dipilih
            btn.classList.add('bg-primary', 'text-white', 'shadow-md');
            btn.classList.remove('text-orange-600', 'hover:bg-orange-200/50');

            // Menyembunyikan seluruh instance konten kartu menu
            menuContents.forEach(content => content.classList.add('hidden', 'opacity-0'));

            // Mengambil target ID dan merender konten menu yang relevan
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.remove('hidden');
                // Mengaplikasikan delay untuk efek transisi fade-in yang halus
                setTimeout(() => targetContent.classList.remove('opacity-0'), 50);
            }
        });
    });

    /**
     * 2. Kalender Dinamis
     * Menghasilkan grid kalender bulanan secara dinamis berdasarkan 
     * kalkulasi objek Date JavaScript.
     */
    const monthYearText = document.getElementById('calendar-month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const btnPrevMonth = document.getElementById('btn-prev-month');
    const btnNextMonth = document.getElementById('btn-next-month');

    if (monthYearText && calendarGrid) {
        let currentDate = new Date();
        const namaBulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        /**
         * Memproses perhitungan tanggal dan merender struktur HTML 
         * untuk elemen kalender pada bulan yang sedang aktif.
         */
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            // Memperbarui label bulan dan tahun pada antarmuka
            monthYearText.innerText = `${namaBulanIndo[month]} ${year}`;

            // Kalkulasi offset hari pertama dan total hari dalam bulan aktif
            const firstDayIndex = new Date(year, month, 1).getDay();
            const lastDay = new Date(year, month + 1, 0).getDate();
            
            const today = new Date();
            const isCurrentMonthAndYear = today.getMonth() === month && today.getFullYear() === year;

            let daysHTML = "";

            // Menginjeksi elemen kosong untuk penyesuaian offset kolom hari
            for (let i = 0; i < firstDayIndex; i++) {
                daysHTML += `<span></span>`;
            }

            // Melakukan iterasi untuk merender elemen node tanggal aktif
            for (let i = 1; i <= lastDay; i++) {
                if (i === today.getDate() && isCurrentMonthAndYear) {
                    // Styling spesifik untuk elemen penanda hari ini (Current Date)
                    daysHTML += `<span class="p-2 cursor-pointer bg-primary text-white font-bold rounded-xl shadow-lg shadow-orange-500/40 transform scale-105 transition-all">${i < 10 ? '0'+i : i}</span>`;
                } else {
                    // Logika validasi untuk mewarnai kolom hari Minggu (Index 0)
                    const currentDayOfWeek = new Date(year, month, i).getDay();
                    const textClass = (currentDayOfWeek === 0) ? 'text-red-400' : 'text-gray-600';
                    
                    daysHTML += `<span class="p-2 cursor-pointer hover:bg-orange-100 rounded-xl transition-colors ${textClass}">${i < 10 ? '0'+i : i}</span>`;
                }
            }

            // Menyisipkan DOM string ke dalam container kalender
            calendarGrid.innerHTML = daysHTML;
        }

        // Listener navigasi decremental (Bulan Sebelumnya)
        btnPrevMonth.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        // Listener navigasi incremental (Bulan Selanjutnya)
        btnNextMonth.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        // Pemanggilan awal untuk inisialisasi instance kalender
        renderCalendar();
    }

    /**
     * 3. Modal Video YouTube
     * Mengelola siklus hidup komponen modal dan instance pemutar iframe.
     */
    const videoModal = document.getElementById('video-modal');
    const videoCard = document.getElementById('video-card');
    const youtubeIframe = document.getElementById('youtube-iframe');
    const btnPlayVideos = document.querySelectorAll('.btn-play-video');
    const btnCloseVideo = document.getElementById('close-video-modal');
    const videoBackdrop = document.getElementById('video-backdrop');

    if (videoModal && youtubeIframe) {
        
        /**
         * Membuka modal dan merender URL video ke dalam iframe.
         * Dilengkapi regex pintar untuk auto-convert link YouTube biasa menjadi format Embed.
         * @param {string} videoUrl - Endpoint URL YouTube
         */
        function openVideoModal(videoUrl) {
            let finalUrl = videoUrl;
            
            // Regex untuk mengambil ID video dari berbagai jenis format link YouTube
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = videoUrl.match(regExp);
            
            // Jika ID video ditemukan, ubah paksa menjadi link embed resmi
            if (match && match[2].length === 11) {
                finalUrl = `https://www.youtube.com/embed/${match[2]}`;
            }

            youtubeIframe.src = `${finalUrl}?autoplay=1`; 
            videoModal.classList.remove('opacity-0', 'pointer-events-none');
            setTimeout(() => videoCard.classList.remove('scale-95', 'opacity-0'), 10);
        }

        /**
         * Menutup modal dan membersihkan instance source iframe 
         * untuk mematikan pemutaran audio di background.
         */
        function closeVideoModal() {
            videoCard.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                videoModal.classList.add('opacity-0', 'pointer-events-none');
                youtubeIframe.src = ""; 
            }, 300);
        }

        // Mengikat event listener pada seluruh trigger komponen video
        btnPlayVideos.forEach(btn => {
            btn.addEventListener('click', () => {
                const url = btn.getAttribute('data-video-url');
                if (url) openVideoModal(url);
            });
        });

        // Mengikat event penutupan modal pada tombol dismiss dan backdrop
        if (btnCloseVideo) btnCloseVideo.addEventListener('click', closeVideoModal);
        if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideoModal);
    }

    /**
     * 4. Interaksi Filter Kategori (Pills)
     * Mengelola status aktif (background orange) pada tombol filter secara dinamis 
     * berdasarkan grup kategorinya masing-masing (Usia & Kondisi).
     */
    const filterGroups = [
        document.getElementById('filter-usia'), 
        document.getElementById('filter-kondisi')
    ];

    filterGroups.forEach(group => {
        if (!group) return;
        const buttons = group.querySelectorAll('.filter-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                
                // Mereset seluruh tombol di dalam grup ini ke state default (transparan & teks abu)
                buttons.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'active');
                    b.classList.add('bg-transparent', 'text-gray-700', 'hover:bg-orange-50');
                });
                
                // Menetapkan state aktif (background orange solid & teks putih) pada tombol yang di-klik
                btn.classList.add('bg-primary', 'text-white', 'active');
                btn.classList.remove('bg-transparent', 'text-gray-700', 'hover:bg-orange-50');
                
            });
        });
    });
});

/** 
/* 14. MOBILE BOTTOM NAVIGATION: SCROLL BEHAVIOR & AUTO-HIDE LOGIC            */
/**
 * Mengelola visibilitas Bottom Navigation pada perangkat mobile/tablet.
 * Menerapkan algoritma auto-hide saat pengguna melakukan scroll ke bawah untuk
 * memperluas area viewport (optimalisasi UX pada fitur Drag & Drop), 
 * dan menampilkannya kembali saat pengguna melakukan scroll ke atas.
 */
document.addEventListener('DOMContentLoaded', function() {
    const bottomNav = document.getElementById('bottom-nav');
    
    // Terminasi eksekusi jika elemen Bottom Navigation tidak ditemukan pada DOM
    if (!bottomNav) return; 

    let lastScrollY = window.scrollY;
    let isNavHidden = false;
    
    // Throttling flag menggunakan requestAnimationFrame untuk mencegah frame drop 
    // pada event listener yang berjalan terus-menerus (high-frequency event).
    let ticking = false; 

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScrollY = window.scrollY;

                // Kondisi 1: Scroll ke bawah melewati batas toleransi 10px 
                // dan offset absolut > 100px (Menyembunyikan komponen navigasi)
                if (currentScrollY > lastScrollY + 10 && !isNavHidden && currentScrollY > 100) {
                    bottomNav.classList.remove('translate-y-0');
                    bottomNav.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
                    isNavHidden = true;
                } 
                // Kondisi 2: Scroll ke atas melewati batas toleransi 5px 
                // (Menampilkan kembali komponen navigasi)
                else if (currentScrollY < lastScrollY - 5 && isNavHidden) {
                    bottomNav.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
                    bottomNav.classList.add('translate-y-0');
                    isNavHidden = false;
                }

                // Perbarui posisi titik scroll terakhir
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true }); // passive:true mengoptimalkan kinerja scroll pada layar sentuh
});

/**
/* 15. MOBILE BOTTOM NAVIGATION: SPA ILLUSION & DEPLOYMENT-SAFE ROUTING       */
/**
 * Mengelola state visual Bottom Navigation berdasarkan current pathname (URL).
 * Dilengkapi dengan algoritma sanitasi "Trailing Slash" dan ekstensi (.html) untuk 
 * memitigasi anomali routing pada environment Netlify/Vercel (Pretty URLs).
 * Menerapkan "Shifting UI" dengan transisi animasi sebelum proses redirect,
 * menciptakan ilusi Single Page Application (SPA) pada arsitektur multi-page.
 */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const navItems = document.querySelectorAll('#bottom-nav .nav-item');
        if (navItems.length === 0) return;

        // Identifikasi halaman aktif berdasarkan Keyword URL
        let url = window.location.href;
        let currentPath = 'index';
        if (url.includes('tracker')) currentPath = 'tracker';
        else if (url.includes('meal-planner')) currentPath = 'meal-planner';
        else if (url.includes('education')) currentPath = 'education';
        else if (url.includes('about')) currentPath = 'about';

        navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetHrefRaw = link.getAttribute('href');
                
                // Identifikasi halaman tujuan berdasarkan Keyword URL
                let targetPath = 'index';
                if (targetHrefRaw.includes('tracker')) targetPath = 'tracker';
                else if (targetHrefRaw.includes('meal-planner')) targetPath = 'meal-planner';
                else if (targetHrefRaw.includes('education')) targetPath = 'education';
                else if (targetHrefRaw.includes('about')) targetPath = 'about';
                
                // Cegah animasi jika user mengklik menu yang sudah aktif
                if (targetPath === currentPath) return;

                e.preventDefault(); 

                // 1. Matikan Kapsul Aktif Saat Ini
                const activeItem = document.querySelector('#bottom-nav .nav-item.active');
                if (activeItem) {
                    const activeIcon = activeItem.querySelector('i');
                    const activeText = activeItem.querySelector('span');
                    
                    activeItem.className = 'nav-item flex items-center justify-center h-12 px-3 text-gray-500 hover:text-primary transition-all duration-300 ease-out';
                    activeIcon.className = activeIcon.className.replace('ph-fill ', 'ph ').replace(' drop-shadow-sm', '').replace('transition-none', 'transition-all duration-300 ease-out') + ' text-2xl';
                    activeText.className = 'text-sm font-sans font-bold whitespace-nowrap overflow-hidden max-w-0 opacity-0 ml-0 transition-all duration-300 ease-out';
                }

                // 2. Mekarkan Kapsul Baru
                const newIcon = link.querySelector('i');
                const newText = link.querySelector('span');
                
                let baseIconClass = '';
                newIcon.classList.forEach(cls => {
                    if (cls.startsWith('ph-') && cls !== 'ph-fill') baseIconClass = cls;
                });

                link.className = 'nav-item active flex items-center justify-center h-12 px-5 bg-gradient-to-r from-orange-100/90 to-orange-50/90 text-primary rounded-full transition-all duration-300 ease-out shadow-[0_4px_15px_-3px_rgba(249,115,22,0.15)] border border-orange-200/50';
                newIcon.className = `ph-fill ${baseIconClass} drop-shadow-sm text-xl md:text-2xl transition-all duration-300 ease-out`;
                newText.className = 'text-sm font-sans font-bold whitespace-nowrap overflow-hidden max-w-[120px] opacity-100 ml-2 transition-all duration-300 ease-out';

                // 3. Pindah Halaman
                setTimeout(() => {
                    window.location.href = targetHrefRaw; 
                }, 300); 
            });
        });
    });
})();

/**
 * 16. CATEGORY FILTER & SEARCH LOGIC: SINGLE-SELECT & SPA EXPERIENCE
 * Mengelola interaktivitas UI pada section pencarian dan filter kategori artikel.
 * Menerapkan algoritma "Single-Select" (radio button behavior) pada tag kategori
 * untuk mempertegas UX, serta melakukan intercept (e.preventDefault) pada 
 * default form submission agar tidak memicu page reload (mendukung ilusi SPA).
 */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        
        // --- A. Logika Filter Kategori (Single-Select) ---
        const filterButtons = document.querySelectorAll('.category-filter');
        
        // Proteksi eksekusi: Pastikan elemen ada di halaman saat ini
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    
                    // 1. Matikan Semua Kapsul (Reset ke styling default/inactive)
                    filterButtons.forEach(btn => {
                        btn.classList.remove('bg-[#F06D24]', 'text-white', 'shadow-md', 'shadow-orange-500/30');
                        btn.classList.add('bg-transparent', 'text-gray-800', 'hover:bg-orange-100');
                    });

                    // 2. Mekarkan Kapsul yang Diklik (Active state)
                    this.classList.remove('bg-transparent', 'text-gray-800', 'hover:bg-orange-100');
                    this.classList.add('bg-[#F06D24]', 'text-white', 'shadow-md', 'shadow-orange-500/30');
                    
                    // 3. Trigger endpoint/filter logic (Siap disambung ke Backend/API)
                    // const selectedTag = this.innerText.trim();
                    // console.log("Mencari artikel dengan kategori:", selectedTag);
                });
            });
        }

        // --- B. Logika Search Form (Prevent Reload) ---
        const searchForm = document.getElementById('search-form');
        
        // Proteksi eksekusi
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                // 1. Cegah perilaku default browser (refresh halaman)
                e.preventDefault(); 
                
                // 2. Eksekusi pencarian
                // const searchInput = searchForm.querySelector('input').value;
                // console.log("Keyword pencarian:", searchInput);
            });
        }

    });
})();

/**
 * 17. PENYARINGAN ARTIKEL SISI KLIEN (CLIENT-SIDE)
 * Mengelola manipulasi DOM untuk menyaring kartu artikel berdasarkan kategori 
 * yang dipilih. Mengimplementasikan teknik reflow DOM untuk memastikan 
 * integritas transisi CSS tetap berjalan mulus selama perubahan status tampilan.
 */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        
        const filterButtons = document.querySelectorAll('.article-filter');
        const articleCards = document.querySelectorAll('.article-card');

        // Klausa pelindung (Guard clause) untuk mencegah error jika elemen tidak ditemukan
        if (filterButtons.length > 0 && articleCards.length > 0) {
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    
                    // 1. Reset status UI untuk semua tombol filter
                    filterButtons.forEach(btn => {
                        btn.classList.remove('bg-[#F06D24]', 'text-white', 'shadow-md', 'shadow-orange-500/30', 'font-semibold');
                        btn.classList.add('bg-transparent', 'text-gray-600', 'hover:text-[#F06D24]', 'font-medium');
                    });

                    // 2. Terapkan status UI aktif pada tombol yang dipilih
                    this.classList.remove('bg-transparent', 'text-gray-600', 'hover:text-[#F06D24]', 'font-medium');
                    this.classList.add('bg-[#F06D24]', 'text-white', 'shadow-md', 'shadow-orange-500/30', 'font-semibold');

                    // 3. Eksekusi logika penyaringan kartu
                    const selectedFilter = this.getAttribute('data-filter');

                    articleCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        
                        // Kondisi: Tampilkan semua kartu ATAU cocokkan kategori secara spesifik
                        if (selectedFilter === 'Semua' || cardCategory === selectedFilter) {
                            
                            // Kembalikan elemen ke dalam aliran tata letak (layout flow)
                            card.style.display = ''; 
                            
                            // Picu reflow DOM untuk memulai ulang transisi akselerasi perangkat keras CSS
                            void card.offsetWidth; 
                            card.style.opacity = '1';
                            
                        } else {
                            // Hapus dari aliran tata letak dan sembunyikan elemen
                            card.style.display = 'none'; 
                            card.style.opacity = '0';
                        }
                    });

                });
            });
        }
    });
})();

/**
 * 18. POPULAR ARTICLES CAROUSEL NAVIGATION
 * Mengontrol logika penggeseran (scrolling) horizontal pada carousel artikel 
 * populer. Memanfaatkan Web API scrollBy untuk animasi yang mulus.
 */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        
        const carousel = document.getElementById('popular-carousel');
        const btnPrev = document.getElementById('btn-carousel-prev');
        const btnNext = document.getElementById('btn-carousel-next');

        // Klausa pelindung (Guard clause) memastikan elemen ada di halaman ini
        if (carousel && btnPrev && btnNext) {
            
            // Logika untuk menggeser ke KANAN (Next)
            btnNext.addEventListener('click', () => {
                // Kalkulasi lebar pergeseran: Selebar ukuran 1 kartu pertama terlihat
                const scrollAmount = carousel.firstElementChild.clientWidth + 24; // 24px adalah perkiraan gap
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Logika untuk menggeser ke KIRI (Prev)
            btnPrev.addEventListener('click', () => {
                const scrollAmount = carousel.firstElementChild.clientWidth + 24;
                carousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    });
})();

/**
 * 19. Modul Interaksi Galeri Video dan Pemutar YouTube
 *
 * Menangani event klik untuk memutar iframe YouTube secara dinamis.
 * Modul ini juga mengelola navigasi thumbnail, menyetel ulang status pemutar,
 * serta memperbarui metadata antarmuka (sampul, judul, deskripsi) dengan efek transisi.
 */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        
        const thumbnails = document.querySelectorAll('.vid-thumb');
        const mainCover = document.getElementById('main-video-cover');
        const mainTitle = document.getElementById('main-video-title');
        const mainDesc = document.getElementById('main-video-desc');
        
        // Referensi elemen pemutar YouTube
        const coverUI = document.getElementById('video-cover-ui');
        const iframe = document.getElementById('main-video-iframe');
        const btnPlay = document.getElementById('btn-play-video');

        // Memastikan elemen DOM yang dibutuhkan tersedia sebelum inisialisasi
        if (thumbnails.length > 0 && mainCover && btnPlay) {
            
            // Mengambil ID video default dari thumbnail yang memiliki status aktif
            let currentVideoId = document.querySelector('.vid-thumb.active').getAttribute('data-youtube-id');

            // Event listener untuk inisialisasi pemutaran video
            btnPlay.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Menyembunyikan antarmuka sampul utama
                coverUI.classList.add('hidden');
                
                // Menampilkan elemen iframe ke dalam viewport
                iframe.classList.remove('hidden');
                
                // Memuat URL YouTube dengan parameter autoplay dan menyembunyikan info standar
                iframe.src = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&showinfo=0`;
            });

            // Event listener untuk navigasi pergantian thumbnail
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    
                    // Menghentikan pemutaran video aktif dan memulihkan antarmuka sampul
                    iframe.classList.add('hidden'); 
                    iframe.src = ""; 
                    coverUI.classList.remove('hidden'); 

                    // Menghapus status aktif dari seluruh elemen thumbnail
                    thumbnails.forEach(t => {
                        t.classList.remove('active', 'border-[#F06D24]', 'border-[3px]', 'shadow-lg', 'scale-105');
                        t.classList.add('border-transparent', 'border-2');
                    });

                    // Menerapkan status aktif pada elemen thumbnail yang dipilih
                    this.classList.remove('border-transparent', 'border-2');
                    this.classList.add('active', 'border-[#F06D24]', 'border-[3px]', 'shadow-lg', 'scale-105');

                    // Mengekstrak metadata dari atribut kustom
                    const newCoverUrl = this.getAttribute('data-cover');
                    const newTitle = this.getAttribute('data-title');
                    const newDesc = this.getAttribute('data-desc');
                    
                    // Memperbarui referensi ID video untuk sesi pemutaran berikutnya
                    currentVideoId = this.getAttribute('data-youtube-id'); 

                    // Memulai siklus animasi fade out
                    mainCover.style.opacity = '0';
                    mainTitle.style.opacity = '0';
                    mainDesc.style.opacity = '0';

                    // Menunda pembaruan DOM agar sinkron dengan durasi transisi CSS
                    setTimeout(() => {
                        mainCover.src = newCoverUrl;
                        mainTitle.innerText = newTitle;
                        mainDesc.innerText = newDesc;
                        
                        // Memulai siklus animasi fade in
                        mainCover.style.opacity = '1';
                        mainTitle.style.opacity = '1';
                        mainDesc.style.opacity = '1';
                    }, 250); 

                });
            });
        }
    });
})();

/**
 * 20. Modul Navigasi Carousel Thumbnail Video
 *
 * Menangani event klik pada tombol panah kiri dan kanan untuk menggeser 
 * secara horizontal daftar thumbnail video edukasi.
 */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const vidScrollContainer = document.getElementById('vid-thumb-container');
        const btnVidPrev = document.getElementById('btn-vid-prev');
        const btnVidNext = document.getElementById('btn-vid-next');

        if (vidScrollContainer && btnVidPrev && btnVidNext) {
            
            // Logika geser ke kanan (Next)
            btnVidNext.addEventListener('click', () => {
                // Menggeser sejauh kurang lebih 2 thumbnail (280px)
                vidScrollContainer.scrollBy({ left: 280, behavior: 'smooth' });
            });

            // Logika geser ke kiri (Prev)
            btnVidPrev.addEventListener('click', () => {
                vidScrollContainer.scrollBy({ left: -280, behavior: 'smooth' });
            });
            
        }
    });
})();

/**
 * 21. Modul Interaksi Galeri Mitos vs Fakta
 *
 * Mengelola basis data lokal berisi 3 pasang informasi mitos dan fakta.
 * Menangani event klik untuk memperbarui antarmuka pengguna secara dinamis
 * dengan efek transisi opacity.
 */
let currentMythFactIndex = 0;

// Basis Data Lokal Mitos & Fakta (Dengan Gambar yang Valid)
const mythFactData = [
    {
        mitosImg: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600",
        mitosStatement: "Anak pendek sudah pasti karena keturunan orang tuanya.",
        mitosDetail: "Banyak orang tua pasrah jika anaknya pendek, menganggap genetik adalah takdir mutlak yang tidak bisa diubah.",
        faktaImg: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
        faktaStatement: "Genetik hanya berpengaruh kecil, nutrisi penentu utamanya!",
        faktaDetail: "Asupan gizi yang cukup dan pola asuh sehat dapat memaksimalkan potensi tinggi badan anak melebihi genetik orang tuanya."
    },
    {
        mitosImg: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600",
        mitosStatement: "Anak yang gemuk dan gempal sudah pasti sehat dan bebas stunting.",
        mitosDetail: "Banyak orang tua mengira anak gemuk pasti gizinya tercukupi dengan baik dan pertumbuhannya aman dari stunting.",
        faktaImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
        faktaStatement: "Gemuk belum tentu bergizi seimbang!",
        faktaDetail: "Stunting diukur dari kondisi 'gagal tumbuh' (kurangnya tinggi badan menurut usia), bukan sekadar dari berat badannya."
    },
    {
        mitosImg: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=600",
        mitosStatement: "Sayur dan buah saja sudah cukup untuk mencegah stunting pada anak.",
        mitosDetail: "Seringkali anak dipaksa makan sayur dalam jumlah banyak tanpa diimbangi lauk pauk yang cukup.",
        faktaImg: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=600",
        faktaStatement: "Anak di masa pertumbuhan sangat wajib mengonsumsi Protein Hewani!",
        faktaDetail: "Telur, ikan, daging, dan susu mengandung asam amino esensial yang secara spesifik memacu hormon pertumbuhan tulang."
    }
];

/**
 * Fungsi untuk memutar indeks data dan memperbarui DOM
 * Dieksekusi saat area kartu diklik (atribut onclick pada elemen HTML).
 */
function swapMythFact() {
    const dataLength = mythFactData.length;
    
    // Perbarui indeks (Looping 0 -> 1 -> 2 -> 0)
    currentMythFactIndex = (currentMythFactIndex + 1) % dataLength;
    const currentData = mythFactData[currentMythFactIndex];

    // Referensi Elemen DOM
    const els = {
        mImg: document.getElementById('mitos-img'),
        mStmt: document.getElementById('mitos-statement'),
        mDet: document.getElementById('mitos-detail'),
        fImg: document.getElementById('fakta-img'),
        fStmt: document.getElementById('fakta-statement'),
        fDet: document.getElementById('fakta-detail')
    };

    // Langkah 1: Transisi Opacity (Fade Out)
    for (let key in els) {
        if(els[key]) els[key].style.opacity = '0';
    }

    // Langkah 2: Menunggu fade out selesai (300ms dari CSS), lalu perbarui data
    setTimeout(() => {
        els.mImg.src = currentData.mitosImg;
        els.mStmt.innerText = currentData.mitosStatement;
        els.mDet.innerText = currentData.mitosDetail;
        
        els.fImg.src = currentData.faktaImg;
        els.fStmt.innerText = currentData.faktaStatement;
        els.fDet.innerText = currentData.faktaDetail;

        // Langkah 3: Transisi Opacity (Fade In)
        for (let key in els) {
            if(els[key]) els[key].style.opacity = '1';
        }
    }, 300);
}

/**
 * 22. Modul Animasi Counter / Statistik
 *
 * Mengelola animasi penghitungan angka (counter-up) secara dinamis pada halaman About.
 * Menggunakan IntersectionObserver agar animasi hanya dipicu saat elemen masuk
 * ke dalam area pandang pengguna (viewport), dan requestAnimationFrame untuk
 * pergerakan angka yang mulus (60fps).
 */
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter-value');
    const section = document.getElementById('statistic-section');

    // Jika tidak ada elemen counter di halaman ini (misal sedang di halaman lain), hentikan eksekusi
    if (!section || counters.length === 0) return;

    let animated = false; // Kunci status animasi

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Durasi animasi dalam milidetik (2 detik)
            
            // Menghitung kecepatan penambahan angka per frame (~16ms per frame untuk 60fps)
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter); // Loop animasi tingkat tinggi
                } else {
                    // Pastikan angka berhenti tepat di target akhir
                    counter.innerText = target; 
                }
            };
            
            updateCounter();
        });
    };

    // Sensor Cerdas: Pantau pergerakan scroll layar
    const observer = new IntersectionObserver((entries) => {
        // Jika section sudah masuk ke layar dan belum pernah dianimasikan
        if (entries[0].isIntersecting && !animated) {
            animateCounters();
            animated = true; // Kunci agar animasi tidak berulang saat di-scroll naik turun
            observer.unobserve(section); // Cabut sensor untuk menghemat memori browser
        }
    }, { threshold: 0.5 }); // Animasi akan tertrigger saat 50% bagian section terlihat di layar

    // Aktifkan sensor pada section statistik
    observer.observe(section);
});