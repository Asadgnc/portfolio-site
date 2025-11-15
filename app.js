// @ts-nocheck
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. tsParticles (Ağ Efekti) Kodu ---
    const particlesElement = document.getElementById('tsparticles');
    if (particlesElement && typeof tsParticles !== 'undefined') { 
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" },
                    resize: true,
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 },
                },
            },
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#495057" }, 
                shape: { type: "circle" },
                opacity: { value: 0.3, random: false }, 
                size: { value: 3, random: true },
                links: {
                    color: "#495057",
                    distance: 150,
                    enable: true,
                    opacity: 0.2, 
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                },
            },
            detectRetina: true,
        });
    }

    // --- 2. Timeline "Daha Fazla Göster" Butonu ---
    const loadMoreButton = document.getElementById('timeline-load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.timeline-item-hidden');
            hiddenItems.forEach(item => {
                item.classList.remove('timeline-item-hidden');
            });
            if (loadMoreButton instanceof HTMLElement) {
                loadMoreButton.style.display = 'none';
            }
        });
    }

    
    // --- 3. "Fade In On Scroll" Animasyonu ---
    const elementsToAnimate = document.querySelectorAll('.fade-in-on-scroll');
    if (elementsToAnimate.length > 0) {
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        };
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    
    // --- 4. Galeri Yıl Filtreleme Kodu ---
    const filterContainer = document.querySelector('.filter-bar');
    const galleryItems = document.querySelectorAll('.gallery-card');
    if (filterContainer && galleryItems.length > 0) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                
                const filterValue = e.target.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-year') === filterValue) {
                        item.style.display = 'block'; 
                    } else {
                        item.style.display = 'none'; 
                    }
                });
            }
        });
    }
    

    // --- 5. "AKILLI" VİDEO LIGHTBOX KODU ---
    // Bu kod, hem Instagram videolarını, hem normal videoları, hem de YouTube videolarını algılar.
    
    // Tüm tıklanabilir video kartlarını seç (farklı sınıflara sahip olsalar bile)
    const allVideoCards = document.querySelectorAll('.video-card, .instagram-story-frame');
    const lightbox = document.getElementById('video-lightbox');
    const lightboxContent = document.querySelector('#video-lightbox .video-modal-content');
    const closeButton = document.getElementById('video-modal-close');

    if (lightbox && lightboxContent && closeButton && allVideoCards.length > 0) {
        
        // Modalı kapatma fonksiyonu
        const closeModal = () => {
            lightbox.style.display = 'none';
            lightboxContent.innerHTML = ''; // Videoyu durdurmak için içeriği temizle
            // CSS stillerini sıfırla (farklı video türleri için)
            lightboxContent.style = ""; 
            lightboxContent.removeAttribute('data-aspect-ratio');
        };

        closeButton.addEventListener('click', closeModal);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeModal();
            }
        });

        // Tüm video kartlarına tıklama olayı ekle
        allVideoCards.forEach(card => {
            const videoSrc = card.getAttribute('data-video-src');
            if (!videoSrc) return;

            card.addEventListener('click', () => {
                let newContent = '';
                
                // 1. KONTROL: Bu bir YouTube linki mi?
                if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
                    
                    // Modal'ı yatay (16:9) moda ayarla
                    lightboxContent.setAttribute('data-aspect-ratio', '16:9');
                    
                    newContent = `
                        <iframe 
                            src="${videoSrc}?autoplay=1&modestbranding=1&rel=0" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen>
                        </iframe>
                    `;
                } 
                // 2. KONTROL: Bu bir Instagram çerçevesi mi? (Her zaman dikey 9:16)
                else if (card.classList.contains('instagram-story-frame')) {
                    
                    // Modal'ı dikey (9:16) moda ayarla
                    lightboxContent.setAttribute('data-aspect-ratio', '9:16');
                    
                    newContent = `
                        <video controls autoplay loop>
                            <source src="${videoSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                }
                // 3. KONTROL: Bu normal bir lokal .mp4 videosu mu?
                else if (videoSrc.endsWith('.mp4')) {
                    
                    // Modal'ı dikey (9:16) moda ayarla (Veya videonun kendi oranına)
                    // Dikey videoları kırpmamak için 9:16 iyidir.
                    lightboxContent.setAttribute('data-aspect-ratio', '9:16'); 
                    
                    newContent = `
                        <video controls autoplay loop style="object-fit: contain;">
                            <source src="${videoSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                }

                // Lightbox'ı aç ve içeriği yükle
                lightbox.style.display = 'flex';
                lightboxContent.innerHTML = newContent;
            });

            // Kartın içinde <video> etiketi varsa (Instagram ve Normal Video önizlemeleri)
            // fare üzerine gelince oynatma mantığını ekle.
            const smallVideo = card.querySelector('video');
            if (smallVideo) {
                const playButton = card.querySelector('.story-play-button');
                
                card.addEventListener('mouseenter', () => {
                    smallVideo.play();
                    if (playButton) playButton.style.opacity = '0';
                });
                
                card.addEventListener('mouseleave', () => {
                    smallVideo.pause();
                    if (playButton) playButton.style.opacity = '1';
                });
            }
        });
    }

}); // DOMContentLoaded sonu