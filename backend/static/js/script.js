let currentSection = 0;
const sections = document.querySelectorAll('.section');
const footer = document.getElementById('footer');
const video = document.getElementById('video');
let lastScrollTime = 0;

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

function scrollToSection(index, playVideo = true) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
    footer.style.display = index === sections.length - 1 ? 'block' : 'none';
    currentSection = index;

    if (index === 1 && playVideo) {
        video.currentTime = 0;
        video.play();
    } else {
        video.pause();
    }
}

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    currentSection = Math.floor(scrollPosition / windowHeight);
    
    // Update footer visibility
    footer.style.display = currentSection === sections.length - 1 ? 'block' : 'none';
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    createStars(loader);
    
    setTimeout(() => {
        loader.style.display = 'none';
        document.getElementById('content').style.display = 'block';
        createStars(document.body);
    }, 2000);

    // Create hover effect for main headline
    const mainHeadline = document.getElementById('mainHeadline');
    const text = "Explore the Space and its ventures";
    mainHeadline.innerHTML = text.split('').map(char => 
        char === ' ' ? ' ' : `<span>${char}</span>`
    ).join('');

    // Add hover scroll functionality to go to section 2 (the video section)
    mainHeadline.addEventListener('mouseenter', () => {
        scrollToSection(1);
    });
});