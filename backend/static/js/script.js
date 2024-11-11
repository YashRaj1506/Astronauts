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

        window.addEventListener('wheel', (e) => {
            const currentTime = Date.now();
            const timeDiff = currentTime - lastScrollTime;
            lastScrollTime = currentTime;

            // Detect quick scroll (time interval < 200ms or deltaY large)
            if (e.deltaY > 0 && (timeDiff < 200 || e.deltaY > 50) && currentSection === 0) {
                scrollToSection(1);  // Go directly to second page if scrolling quickly from the first page
            } else if (e.deltaY > 0 && currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
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