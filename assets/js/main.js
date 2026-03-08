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

// Menutup menu mobile
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

/**
 * Intersection Observer for Number Counter Animation
 * Animates numerical values when their parent container enters the viewport.
 */

const COUNTER_SPEED = 150;

// Retrieve all stats containers from the DOM
const statsContainers = document.querySelectorAll('.stats-container');

if (statsContainers.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if the target element is visible in the viewport
            if (entry.isIntersecting) {
                
                // Scope the query to the intersecting container only
                const counters = entry.target.querySelectorAll('.counter');
                
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        
                        // Calculate the increment step
                        const inc = target / COUNTER_SPEED;

                        // Increment logic using requestAnimationFrame for smoother rendering 
                        // or setTimeout as fallback
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    // Initialize the animation loop
                    updateCount();
                });

                // Unobserve the current target to prevent re-triggering the animation
                observer.unobserve(entry.target);
            }
        });
    }, { 
        // Trigger execution when 50% of the element is visible
        threshold: 0.5 
    });

    // Attach the observer to each stats container
    statsContainers.forEach(container => {
        counterObserver.observe(container);
    });
}