/**
 * ============================================================================
 * NUTRIGENIUS CHART LOGIC (chart-logic.js)
 * Mengelola semua inisialisasi Chart.js, grafik persentase, 
 * dan checklist nutrisi harian di halaman Tracker/Meal Planner.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/* TRACKER: OVERVIEW RESULT & CHART.JS                                     */
/* -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const cekStatusBtn = document.querySelector('form button[type="button"]');
    const overviewSection = document.getElementById('overview-section');
    const reminderSection = document.getElementById('reminder-section');
    let chartRendered = false; 
    let donutChart;

    if (cekStatusBtn && overviewSection) {
        cekStatusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            overviewSection.classList.remove('hidden');
            if(reminderSection) reminderSection.classList.remove('hidden');
            
            setTimeout(() => {
                overviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            if (!chartRendered && typeof Chart !== 'undefined') {
                renderDonutChart();
                chartRendered = true;
                animateBarCharts();
            }
        });
    }

    function renderDonutChart() {
        const ctx = document.getElementById('kaloriDonutChart').getContext('2d');
        if (donutChart) donutChart.destroy();
        
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
/* TRACKER: DAILY NUTRITION CHECKLIST & RING CHART                         */
/* -------------------------------------------------------------------------- */
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

    function initRingChart() {
        const ctx = document.getElementById('progressRingChart');
        if(!ctx) return;
        if (ringChart) ringChart.destroy();

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

    function updateProgress() {
        const total = checkboxes.length;
        const checkedCount = document.querySelectorAll('.nutrisi-checkbox:checked').length;
        
        let persentase = 0;
        if(total > 0) {
            persentase = Math.round((checkedCount / total) * 100);
        }

        progressText.innerText = persentase + '%';
        terpenuhiVal.innerText = persentase + '%';
        belumVal.innerText = (100 - persentase) + '%';

        if(ringChart) {
            ringChart.data.datasets[0].data = [persentase, 100 - persentase];
            ringChart.update();
        }
    }

    checkboxes.forEach(box => {
        box.addEventListener('change', updateProgress);
    });

    if(btnClear) {
        btnClear.addEventListener('click', () => {
            checkboxes.forEach(box => box.checked = false);
            updateProgress(); 
        });
    }

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

    initRingChart();

    window.addEventListener('resize', () => {
        if (donutChart) donutChart.resize();
        if (ringChart) ringChart.resize();
    });

});

/**
 * --------------------------------------------------------------------------
 * Meal Planner - Gauge Charts
 * --------------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', function() {
    const colorFilled = '#f97316'; 
    const colorEmpty = '#EDE9FE'; 

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

    createGaugeChart('chart-kalori', 82);
    createGaugeChart('chart-protein', 90);
    createGaugeChart('chart-vitamin', 45);
});