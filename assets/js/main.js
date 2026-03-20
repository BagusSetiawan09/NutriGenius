/**
 * ============================================================================
 * NUTRIGENIUS MAIN SCRIPT (main.js)
 * Mengelola seluruh interaktivitas UI dasar, navigasi, dan inisialisasi AOS.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/* 1 & 2 & 3. DOM ELEMENTS, NAVBAR SCROLL & MOBILE MENU LOGIC                 */
/* -------------------------------------------------------------------------- */
const navbar = document.getElementById('navbar');
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

let isMenuOpen = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
        navbar.classList.remove('bg-transparent', 'shadow-md'); 
    } else {
        navbar.classList.remove('bg-bg-page/80', 'backdrop-blur-md', 'shadow-md');
        navbar.classList.add('bg-transparent');
    }
});

const closeMobileMenu = () => {
    if (!mobileMenu || !hamburgerBtn) return; 

    isMenuOpen = false;
    mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2.5');
    body.classList.remove('overflow-hidden');
    hamburgerBtn.innerHTML = '<i class="ph ph-list"></i>';
    
    if (window.scrollY > 10) {
        navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
    }
};

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

mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

/* -------------------------------------------------------------------------- */
/* 4. ANIMATION LIBRARY INIT (AOS)                                            */
/* -------------------------------------------------------------------------- */
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true, offset: 100 });
}

/* -------------------------------------------------------------------------- */
/* 6. FAQ 3D CAROUSEL LOGIC                                                   */
/* -------------------------------------------------------------------------- */
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
const genderTrigger = document.getElementById('gender-trigger');
const genderOptions = document.getElementById('gender-options');
const genderArrow = document.getElementById('gender-arrow');
const genderText = document.getElementById('gender-text');
const genderInputHidden = document.getElementById('gender-input-hidden');
const optionItems = document.querySelectorAll('.gender-option');

if (genderTrigger) {
    genderTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        genderOptions.classList.toggle('opacity-0');
        genderOptions.classList.toggle('pointer-events-none');
        genderOptions.classList.toggle('-translate-y-2');
        genderArrow.classList.toggle('rotate-180');
        genderTrigger.classList.toggle('border-primary');
    });

    optionItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.querySelector('span.font-medium').innerText;
            const value = item.getAttribute('data-value');
            const iconHTML = item.querySelector('i').outerHTML;
            genderText.innerHTML = `<div class="flex items-center gap-2 text-gray-800 font-medium">${iconHTML} <span>${text}</span></div>`;
            genderInputHidden.value = value;
            genderOptions.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
            genderArrow.classList.remove('rotate-180');
            genderTrigger.classList.remove('border-primary');
        });
    });

    window.addEventListener('click', (e) => {
        if (!document.getElementById('custom-gender-select').contains(e.target)) {
            genderOptions.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
            genderArrow.classList.remove('rotate-180');
            genderTrigger.classList.remove('border-primary');
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 10. DYNAMIC DATE (MEAL PLANNER HERO)                                       */
/* -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('current-date-hero');
    if (dateElement) {
        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateElement.innerText = today.toLocaleDateString('id-ID', options);
    }
});

/* -------------------------------------------------------------------------- */
/* 13. REKOMENDASI MENU HARIAN (TAB, KALENDER, MODAL VIDEO)                   */
/* -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-md');
                b.classList.add('text-orange-600', 'hover:bg-orange-200/50');
            });
            btn.classList.add('bg-primary', 'text-white', 'shadow-md');
            btn.classList.remove('text-orange-600', 'hover:bg-orange-200/50');

            menuContents.forEach(content => content.classList.add('hidden', 'opacity-0'));

            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                setTimeout(() => targetContent.classList.remove('opacity-0'), 50);
            }
        });
    });

    const monthYearText = document.getElementById('calendar-month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const btnPrevMonth = document.getElementById('btn-prev-month');
    const btnNextMonth = document.getElementById('btn-next-month');

    if (monthYearText && calendarGrid) {
        let currentDate = new Date();
        const namaBulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            monthYearText.innerText = `${namaBulanIndo[month]} ${year}`;

            const firstDayIndex = new Date(year, month, 1).getDay();
            const lastDay = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            const isCurrentMonthAndYear = today.getMonth() === month && today.getFullYear() === year;

            let daysHTML = "";
            for (let i = 0; i < firstDayIndex; i++) daysHTML += `<span></span>`;

            for (let i = 1; i <= lastDay; i++) {
                if (i === today.getDate() && isCurrentMonthAndYear) {
                    daysHTML += `<span class="p-2 cursor-pointer bg-primary text-white font-bold rounded-xl shadow-lg shadow-orange-500/40 transform scale-105 transition-all">${i < 10 ? '0'+i : i}</span>`;
                } else {
                    const currentDayOfWeek = new Date(year, month, i).getDay();
                    const textClass = (currentDayOfWeek === 0) ? 'text-red-400' : 'text-gray-600';
                    daysHTML += `<span class="p-2 cursor-pointer hover:bg-orange-100 rounded-xl transition-colors ${textClass}">${i < 10 ? '0'+i : i}</span>`;
                }
            }
            calendarGrid.innerHTML = daysHTML;
        }

        btnPrevMonth.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
        btnNextMonth.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });
        renderCalendar();
    }

    const videoModal = document.getElementById('video-modal');
    const videoCard = document.getElementById('video-card');
    const youtubeIframe = document.getElementById('youtube-iframe');
    const btnPlayVideos = document.querySelectorAll('.btn-play-video');
    const btnCloseVideo = document.getElementById('close-video-modal');
    const videoBackdrop = document.getElementById('video-backdrop');

    if (videoModal && youtubeIframe) {
        function openVideoModal(videoUrl) {
            let finalUrl = videoUrl;
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = videoUrl.match(regExp);
            if (match && match[2].length === 11) finalUrl = `https://www.youtube.com/embed/${match[2]}`;
            
            youtubeIframe.src = `${finalUrl}?autoplay=1`; 
            videoModal.classList.remove('opacity-0', 'pointer-events-none');
            setTimeout(() => videoCard.classList.remove('scale-95', 'opacity-0'), 10);
        }

        function closeVideoModal() {
            videoCard.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                videoModal.classList.add('opacity-0', 'pointer-events-none');
                youtubeIframe.src = ""; 
            }, 300);
        }

        btnPlayVideos.forEach(btn => btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-video-url');
            if (url) openVideoModal(url);
        }));

        if (btnCloseVideo) btnCloseVideo.addEventListener('click', closeVideoModal);
        if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideoModal);
    }

    const filterGroups = [
        document.getElementById('filter-usia'), 
        document.getElementById('filter-kondisi')
    ];

    filterGroups.forEach(group => {
        if (!group) return;
        const buttons = group.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'active');
                    b.classList.add('bg-transparent', 'text-gray-700', 'hover:bg-orange-50');
                });
                btn.classList.add('bg-primary', 'text-white', 'active');
                btn.classList.remove('bg-transparent', 'text-gray-700', 'hover:bg-orange-50');
            });
        });
    });
});

/* -------------------------------------------------------------------------- */
/* 14 & 15. MOBILE BOTTOM NAVIGATION LOGIC                                    */
/* -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const bottomNav = document.getElementById('bottom-nav');
    if (!bottomNav) return; 

    let lastScrollY = window.scrollY;
    let isNavHidden = false;
    let ticking = false; 

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScrollY = window.scrollY;
                if (currentScrollY > lastScrollY + 10 && !isNavHidden && currentScrollY > 100) {
                    bottomNav.classList.remove('translate-y-0');
                    bottomNav.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
                    isNavHidden = true;
                } 
                else if (currentScrollY < lastScrollY - 5 && isNavHidden) {
                    bottomNav.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
                    bottomNav.classList.add('translate-y-0');
                    isNavHidden = false;
                }
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});

(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const navItems = document.querySelectorAll('#bottom-nav .nav-item');
        if (navItems.length === 0) return;

        let url = window.location.href;
        let currentPath = 'index';
        if (url.includes('tracker')) currentPath = 'tracker';
        else if (url.includes('meal-planner')) currentPath = 'meal-planner';
        else if (url.includes('education')) currentPath = 'education';
        else if (url.includes('about')) currentPath = 'about';

        navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetHrefRaw = link.getAttribute('href');
                let targetPath = 'index';
                if (targetHrefRaw.includes('tracker')) targetPath = 'tracker';
                else if (targetHrefRaw.includes('meal-planner')) targetPath = 'meal-planner';
                else if (targetHrefRaw.includes('education')) targetPath = 'education';
                else if (targetHrefRaw.includes('about')) targetPath = 'about';
                
                if (targetPath === currentPath) return;
                e.preventDefault(); 

                const activeItem = document.querySelector('#bottom-nav .nav-item.active');
                if (activeItem) {
                    const activeIcon = activeItem.querySelector('i');
                    const activeText = activeItem.querySelector('span');
                    activeItem.className = 'nav-item flex items-center justify-center h-12 px-3 text-gray-500 hover:text-primary transition-all duration-300 ease-out';
                    activeIcon.className = activeIcon.className.replace('ph-fill ', 'ph ').replace(' drop-shadow-sm', '').replace('transition-none', 'transition-all duration-300 ease-out') + ' text-2xl';
                    activeText.className = 'text-sm font-sans font-bold whitespace-nowrap overflow-hidden max-w-0 opacity-0 ml-0 transition-all duration-300 ease-out';
                }

                const newIcon = link.querySelector('i');
                const newText = link.querySelector('span');
                let baseIconClass = '';
                newIcon.classList.forEach(cls => { if (cls.startsWith('ph-') && cls !== 'ph-fill') baseIconClass = cls; });

                link.className = 'nav-item active flex items-center justify-center h-12 px-5 bg-gradient-to-r from-orange-100/90 to-orange-50/90 text-primary rounded-full transition-all duration-300 ease-out shadow-[0_4px_15px_-3px_rgba(249,115,22,0.15)] border border-orange-200/50';
                newIcon.className = `ph-fill ${baseIconClass} drop-shadow-sm text-xl md:text-2xl transition-all duration-300 ease-out`;
                newText.className = 'text-sm font-sans font-bold whitespace-nowrap overflow-hidden max-w-[120px] opacity-100 ml-2 transition-all duration-300 ease-out';

                setTimeout(() => window.location.href = targetHrefRaw, 300); 
            });
        });
    });
})();

/* -------------------------------------------------------------------------- */
/* 16, 17, 18, 19, 20. ARTICLE & VIDEO GALLERIES                              */
/* -------------------------------------------------------------------------- */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const filterButtons = document.querySelectorAll('.category-filter');
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => {
                        btn.classList.remove('bg-[#F06D24]', 'text-white', 'shadow-md', 'shadow-orange-500/30');
                        btn.classList.add('bg-transparent', 'text-gray-800', 'hover:bg-orange-100');
                    });
                    this.classList.remove('bg-transparent', 'text-gray-800', 'hover:bg-orange-100');
                    this.classList.add('bg-[#F06D24]', 'text-white', 'shadow-md', 'shadow-orange-500/30');
                });
            });
        }
        const searchForm = document.getElementById('search-form');
        if (searchForm) searchForm.addEventListener('submit', (e) => e.preventDefault());
    });
})();

(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const filterButtons = document.querySelectorAll('.article-filter');
        const articleCards = document.querySelectorAll('.article-card');

        if (filterButtons.length > 0 && articleCards.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => {
                        btn.classList.remove('bg-[#F06D24]', 'text-white', 'shadow-md', 'shadow-orange-500/30', 'font-semibold');
                        btn.classList.add('bg-transparent', 'text-gray-600', 'hover:text-[#F06D24]', 'font-medium');
                    });
                    this.classList.remove('bg-transparent', 'text-gray-600', 'hover:text-[#F06D24]', 'font-medium');
                    this.classList.add('bg-[#F06D24]', 'text-white', 'shadow-md', 'shadow-orange-500/30', 'font-semibold');

                    const selectedFilter = this.getAttribute('data-filter');
                    articleCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        if (selectedFilter === 'Semua' || cardCategory === selectedFilter) {
                            card.style.display = ''; 
                            void card.offsetWidth; 
                            card.style.opacity = '1';
                        } else {
                            card.style.display = 'none'; 
                            card.style.opacity = '0';
                        }
                    });
                });
            });
        }
    });
})();

(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.getElementById('popular-carousel');
        const btnPrev = document.getElementById('btn-carousel-prev');
        const btnNext = document.getElementById('btn-carousel-next');

        if (carousel && btnPrev && btnNext) {
            btnNext.addEventListener('click', () => {
                const scrollAmount = carousel.firstElementChild.clientWidth + 24; 
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
            btnPrev.addEventListener('click', () => {
                const scrollAmount = carousel.firstElementChild.clientWidth + 24;
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
    });
})();

(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const thumbnails = document.querySelectorAll('.vid-thumb');
        const mainCover = document.getElementById('main-video-cover');
        const mainTitle = document.getElementById('main-video-title');
        const mainDesc = document.getElementById('main-video-desc');
        const coverUI = document.getElementById('video-cover-ui');
        const iframe = document.getElementById('main-video-iframe');
        const btnPlay = document.getElementById('btn-play-video');

        if (thumbnails.length > 0 && mainCover && btnPlay) {
            let currentVideoId = document.querySelector('.vid-thumb.active').getAttribute('data-youtube-id');

            btnPlay.addEventListener('click', function(e) {
                e.preventDefault();
                coverUI.classList.add('hidden');
                iframe.classList.remove('hidden');
                iframe.src = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&showinfo=0`;
            });

            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    iframe.classList.add('hidden'); 
                    iframe.src = ""; 
                    coverUI.classList.remove('hidden'); 

                    thumbnails.forEach(t => {
                        t.classList.remove('active', 'border-[#F06D24]', 'border-[3px]', 'shadow-lg', 'scale-105');
                        t.classList.add('border-transparent', 'border-2');
                    });

                    this.classList.remove('border-transparent', 'border-2');
                    this.classList.add('active', 'border-[#F06D24]', 'border-[3px]', 'shadow-lg', 'scale-105');

                    const newCoverUrl = this.getAttribute('data-cover');
                    const newTitle = this.getAttribute('data-title');
                    const newDesc = this.getAttribute('data-desc');
                    currentVideoId = this.getAttribute('data-youtube-id'); 

                    mainCover.style.opacity = '0';
                    mainTitle.style.opacity = '0';
                    mainDesc.style.opacity = '0';

                    setTimeout(() => {
                        mainCover.src = newCoverUrl;
                        mainTitle.innerText = newTitle;
                        mainDesc.innerText = newDesc;
                        mainCover.style.opacity = '1';
                        mainTitle.style.opacity = '1';
                        mainDesc.style.opacity = '1';
                    }, 250); 
                });
            });
        }
    });
})();

(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const vidScrollContainer = document.getElementById('vid-thumb-container');
        const btnVidPrev = document.getElementById('btn-vid-prev');
        const btnVidNext = document.getElementById('btn-vid-next');

        if (vidScrollContainer && btnVidPrev && btnVidNext) {
            btnVidNext.addEventListener('click', () => vidScrollContainer.scrollBy({ left: 280, behavior: 'smooth' }));
            btnVidPrev.addEventListener('click', () => vidScrollContainer.scrollBy({ left: -280, behavior: 'smooth' }));
        }
    });
})();

/* -------------------------------------------------------------------------- */
/* 21. MITOS VS FAKTA LOGIC                                                   */
/* -------------------------------------------------------------------------- */
let currentMythFactIndex = 0;

function swapMythFact() {
    // Memeriksa ketersediaan mythFactData dari file data.js
    if (typeof mythFactData === 'undefined') {
        console.error("mythFactData tidak ditemukan. Pastikan data.js sudah di-load!");
        return;
    }

    const dataLength = mythFactData.length;
    currentMythFactIndex = (currentMythFactIndex + 1) % dataLength;
    const currentData = mythFactData[currentMythFactIndex];

    const els = {
        mImg: document.getElementById('mitos-img'),
        mStmt: document.getElementById('mitos-statement'),
        mDet: document.getElementById('mitos-detail'),
        fImg: document.getElementById('fakta-img'),
        fStmt: document.getElementById('fakta-statement'),
        fDet: document.getElementById('fakta-detail')
    };

    for (let key in els) if(els[key]) els[key].style.opacity = '0';

    setTimeout(() => {
        els.mImg.src = currentData.mitosImg;
        els.mStmt.innerText = currentData.mitosStatement;
        els.mDet.innerText = currentData.mitosDetail;
        els.fImg.src = currentData.faktaImg;
        els.fStmt.innerText = currentData.faktaStatement;
        els.fDet.innerText = currentData.faktaDetail;

        for (let key in els) if(els[key]) els[key].style.opacity = '1';
    }, 300);
}

/* -------------------------------------------------------------------------- */
/* 22 & 23. STATS COUNTER (UNIVERSAL) & AI SCANNER LOGIC                      */
/* -------------------------------------------------------------------------- */

// 22. UNIVERSAL STATS COUNTER
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter, .counter-value');
    
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // Animasi 2 detik
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter); 
                    } else {
                        counter.innerText = target; 
                    }
                };
                
                updateCounter();
                
                observer.unobserve(counter); 
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// 23. AI SCANNER LOGIC
function startScanning() {
    const shutterBtn = document.getElementById('shutter-btn');
    const laser = document.getElementById('laser-beam');
    const statusText = document.getElementById('scan-status-text');
    const corners = document.querySelectorAll('.viewfinder-corner');

    if (!shutterBtn || !laser || !statusText) return;

    shutterBtn.classList.add('scale-90', 'opacity-50', 'pointer-events-none');
    laser.classList.remove('hidden');
    statusText.innerHTML = "<i class='ph-bold ph-spinner animate-spin inline-block mr-2'></i> AI Menganalisis Gizi...";
    statusText.classList.add('text-[#f97316]', 'scale-110');
    corners.forEach(corner => corner.style.borderColor = "#10B981");

    setTimeout(() => {
        laser.classList.add('hidden');
        statusText.innerHTML = "Selesai! Membuka hasil...";
        shutterBtn.classList.remove('scale-90', 'opacity-50', 'pointer-events-none');
        corners.forEach(corner => corner.style.borderColor = "#f97316");

        const resultSheet = document.getElementById('result-sheet');
        if (resultSheet) resultSheet.classList.remove('translate-y-full');
    }, 2500);
}

function closeSheet() {
    const resultSheet = document.getElementById('result-sheet');
    const statusText = document.getElementById('scan-status-text');

    if (!resultSheet || !statusText) return;

    resultSheet.classList.add('translate-y-full');
    setTimeout(() => {
        statusText.innerHTML = "Arahkan kamera ke makanan si Kecil";
        statusText.classList.remove('text-[#f97316]', 'scale-110');
    }, 500);
}