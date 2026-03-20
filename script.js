/**
 * Portfolio Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Alternar Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // Fechar menu quando um link é clicado
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // 2. Destaca o link de navegação ativo com base na posição do scroll
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Add sticky class to header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Ajusta o offset para ativar um pouco antes de chegar na seção
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Animação de Revelação ao Rolar usando Intersection Observer
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Dispara quando 15% do elemento está visível
    const animatedElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: Stop observing once the animation triggered
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Efeito de Cursor Seguidor
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        });
    }

    // 5. Lógica do Modal
    const modalOverlay = document.getElementById('details-modal');
    const modalCloseBtn = document.getElementById('close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const expandBtns = document.querySelectorAll('.btn-expand');

    if (modalOverlay && expandBtns.length > 0) {
        expandBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Find parent card
                const card = btn.closest('.project-card, .certificate-card');
                
                if (card) {
                    // Extract info
                    const img = card.querySelector('img');
                    const title = card.querySelector('h3');
                    const paragraphs = card.querySelectorAll('p');
                    
                    let descHTML = '';
                    paragraphs.forEach(p => {
                        descHTML += `<p style="margin-bottom: 0.5rem;">${p.innerHTML}</p>`;
                    });

                    // Set modal content
                    if (img) {
                        modalImage.src = img.src;
                        // Mirror object-fit from the card image so contain/cover images look correct
                        const cardImgFit = img.style.objectFit || 'cover';
                        modalImage.style.objectFit = cardImgFit;
                        modalImage.style.background = cardImgFit === 'contain' ? '#1a1a1a' : '';
                    }
                    if (title) modalTitle.innerText = title.innerText;
                    modalDesc.innerHTML = descHTML || 'Sem descrição.';

                    // Show modal
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                }
            });
        });

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

   // 6. Prevent Modal Trigger from "Ver Projeto" buttons
const projectLinks = document.querySelectorAll('.project-card .btn-outline');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        const href = link.getAttribute('href');
        if (href && href.startsWith('http')) {
            e.preventDefault();
            window.open(href, '_blank');
        }
    });
});
        });
   
