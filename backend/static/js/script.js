document.addEventListener('DOMContentLoaded', () => {
    let currentSection = 0;
    const sections = document.querySelectorAll('.section');
    const footer = document.getElementById('footer');
    
    function createStars(container) {
        const starCount = 200;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(star);
        }
    }

    function scrollToSection(index) {
        const section = sections[index];
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            currentSection = index;
            footer.style.display = index === sections.length - 1 ? 'block' : 'none';
        }
    }

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === ' ') {
                    element.innerHTML += ' ';
                } else {
                    element.innerHTML += `<span>${text.charAt(i)}</span>`;
                }
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize loader
    const loader = document.getElementById('loader');
    createStars(loader);
    
    // Handle page load
    setTimeout(() => {
        loader.style.display = 'none';
        document.getElementById('content').style.display = 'block';
        
        // Create stars for main content
        const starContainer = document.createElement('div');
        starContainer.classList.add('star-container');
        document.body.appendChild(starContainer);
        createStars(starContainer);
        
        // Initialize main headline
        const mainHeadline = document.getElementById('mainHeadline');
        const text = "Explore the Space and its ventures";
        mainHeadline.innerHTML = text.split('').map(char => 
            char === ' ' ? ' ' : `<span>${char}</span>`
        ).join('');

        // Enhanced hover functionality with debounce
        let hoverTimeout;
        mainHeadline.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                scrollToSection(1);
            }, 300); // 300ms delay before scrolling
        });

        mainHeadline.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
        });
    }, 2000);

    // Track scroll position with Intersection Observer
    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                currentSection = index;
                footer.style.display = index === sections.length - 1 ? 'block' : 'none';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    // Track scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        currentSection = Math.floor(scrollPosition / windowHeight);
        
        footer.style.display = currentSection === sections.length - 1 ? 'block' : 'none';
    });

    // Optional: Add scroll snap behavior
    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    }, { passive: false });
});