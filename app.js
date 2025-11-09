// @ts-nocheck
// YUKARIDAKİ BU SATIR, VS CODE'DAKİ HATAYI GİDERECEKTİR.

// Sayfanın tamamen yüklendiğinden emin olmak için tüm kodları bu bloğa alıyoruz.
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
                // DÜZELTME: Renk, "Su Mavisi" temada görünmesi için koyu gri yapıldı
                color: { value: "#495057" }, 
                shape: { type: "circle" },
                opacity: { value: 0.3, random: false }, 
                size: { value: 3, random: true },
                links: {
                    // DÜZELTME: Renk, "Su Mavisi" temada görünmesi için koyu gri yapıldı
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
    
    // Animasyon uygulanacak tüm elemanları seç
    const elementsToAnimate = document.querySelectorAll('.fade-in-on-scroll');

    if (elementsToAnimate.length > 0) {
        
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ekrana girdi: Görünür yap
                    entry.target.classList.add('is-visible');
                } else {
                    // Ekrana çıktı: Tekrar gizle (Kullanıcı isteği: "yukarı çıktıkça da kaybolsun")
                    entry.target.classList.remove('is-visible');
                }
            });
        };

        const observerOptions = {
            root: null, // null = viewport (tarayıcı ekranı)
            rootMargin: '0px',
            threshold: 0.1 // Elemanın %10'u göründüğünde tetiklensin
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Seçilen her elemanı izle
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

}); // DOMContentLoaded sonu