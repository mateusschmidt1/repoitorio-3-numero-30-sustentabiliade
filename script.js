// MENU INTERATIVO E EFEITOS
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MENU RESPONSIVO (HAMBURGUER)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 2. NAVEGAÇÃO SUAVE ENTRE SLIDES
    const navLinks = document.querySelectorAll('.nav-link');
    const slides = document.querySelectorAll('.slide');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove classe active de todos os links e slides
            navLinks.forEach(l => l.classList.remove('active'));
            slides.forEach(s => s.classList.remove('active'));
            
            // Ativa o link e slide clicados
            link.classList.add('active');
            const targetSlide = document.querySelector(link.getAttribute('href'));
            targetSlide.classList.add('active');
            
            // Fecha menu mobile
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 3. EFEITO ANIMAÇÃO AO ROLAR (SE SLIDE VISÍVEL)
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Atualiza menu ativo baseado no slide visível
                const slideId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${slideId}`);
                });
            }
        });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    // 4. EFEITO DE PROGRESSO (barra no topo)
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        // Cria barra de progresso se não existir
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = progress + '%';
    });

    // 5. EFEITO PARTICULAS NO TÍTULO (SUPER LEGAL!)
    function createParticles() {
        const titles = document.querySelectorAll('h1');
        titles.forEach(title => {
            title.addEventListener('mouseenter', function() {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const particle = document.createElement('div');
                        particle.style.cssText = `
                            position: absolute;
                            width: 6px;
                            height: 6px;
                            background: var(--amarelo);
                            border-radius: 50%;
                            pointer-events: none;
                            left: ${Math.random() * 100}%;
                            top: ${Math.random() * 100}%;
                            animation: particleFloat 1s ease-out forwards;
                            z-index: 100;
                        `;
                        this.style.position = 'relative';
                        this.appendChild(particle);
                        
                        setTimeout(() => particle.remove(), 1000);
                    }, i * 50);
                }
            });
        });
    }

    // Adiciona CSS da animação de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    createParticles();

    // 6. EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Inicia efeito de digitação no primeiro slide
    window.addEventListener('load', () => {
        const firstTitle = document.querySelector('#slide1 h1');
        setTimeout(() => {
            typeWriter(firstTitle, 'Alimentos Transgênicos');
        }, 500);
    });
});