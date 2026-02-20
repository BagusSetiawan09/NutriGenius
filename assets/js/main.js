const navbar = document.getElementById('navbar');
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

let isMenuOpen = false;

// Logika Scroll Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
        navbar.classList.remove('bg-transparent', 'shadow-md'); 
    } else {
        navbar.classList.remove('bg-bg-page/80', 'backdrop-blur-md', 'shadow-md');
        navbar.classList.add('bg-transparent');
    }
});

// Logika Hamburger Menu
hamburgerBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2.5');
        body.classList.add('overflow-hidden');
        hamburgerBtn.innerHTML = '<i class="ph ph-x"></i>';
        navbar.classList.remove('backdrop-blur-md', 'bg-bg-page/80');
        navbar.classList.add('bg-transparent'); 
    } else {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2.5');
        body.classList.remove('overflow-hidden');
        hamburgerBtn.innerHTML = '<i class="ph ph-list"></i>';

        if (window.scrollY > 10) {
            navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
        }
    }
});

// Menutup menu mobile saat link diklik
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2.5');
        body.classList.remove('overflow-hidden');
        hamburgerBtn.innerHTML = '<i class="ph ph-list"></i>';
        
        if (window.scrollY > 10) {
            navbar.classList.add('bg-bg-page/80', 'backdrop-blur-md');
        }
    });
});

// INISIALISASI AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ANIMASI COUNTER ANGKA
const counters = document.querySelectorAll('.counter');
const speed = 150;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

const statsContainer = document.querySelector('.stats-container');

if (statsContainer) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5
    });

    counterObserver.observe(statsContainer);
}