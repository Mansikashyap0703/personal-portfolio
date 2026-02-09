// Hide loading spinner on page load
window.addEventListener('load', () => {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = 'none';
        console.log('Page loaded, spinner hidden');
    } else {
        console.error('Loading spinner not found');
    }
});

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true
    });
    console.log('AOS initialized');
} else {
    console.error('AOS library not loaded');
}

// Particles.js for background effect
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { speed: 2 }
        }
    });
    console.log('Particles loaded');
} else {
    console.error('Particles.js library not loaded');
}

// Mouse Parallax for Hero
document.addEventListener('mousemove', (e) => {
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        parallax.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// GSAP for progress bars and counters
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".progress-bar", {
        width: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%"
        }
    });

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const current = +counter.innerText.replace('%', '');
            const increment = target / 100;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment) + '%';
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + '%';
            }
        };
        ScrollTrigger.create({
            trigger: "#about",
            start: "top 80%",
            onEnter: updateCount
        });
    });

    // Hero Image Glow Animation
    gsap.to('.hero-img', {
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = +stat.innerText.replace('+', '');
        gsap.from(stat, {
            innerText: 0,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: "#home",
                start: "top 80%"
            }
        });
    });
} else {
    console.error('GSAP library not loaded');
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        console.log('Dark mode toggled');
    });
} else {
    console.error('Theme toggle button not found');
}

/// Smooth Scrolling for Buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            console.log('Scrolled to', this.getAttribute('href'));
        } else {
            console.error('Target not found:', this.getAttribute('href'));
        }
    });
});
console.log('Smooth scrolling loaded');
