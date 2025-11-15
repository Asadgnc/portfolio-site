document.addEventListener("DOMContentLoaded", function() {

    /* -----------------------------------------------
    /* PARTİKÜL (tsParticles) AYARLARI
    /* ----------------------------------------------- */
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            // Sizin "Berrak Su Teması" CSS'iniz ile daha uyumlu partikül ayarları
            "fullScreen": {
                "enable": true,
                "zIndex": 1
            },
            "particles": {
                "number": {
                    "value": 60, // Daha az yoğun
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#007BFF" // Ana tema rengi
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.4, // Daha soluk
                    "random": true
                },
                "size": {
                    "value": 4,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#007BFF", // Ana tema rengi
                    "opacity": 0.2, // Çok daha soluk
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5, // Daha yavaş
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse" // Tıklama yerine fare ile itme
                    },
                    "onclick": {
                        "enable": false // Tıklamayı kapattık
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 80
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.error("tsParticles kütüphanesi yüklenemedi.");
    }

    /* -----------------------------------------------
    /* FADE-IN (GÖRÜNME) ANİMASYONU (DÜZELTİLDİ)
    /* ----------------------------------------------- */
    const fadeInElements = document.querySelectorAll('.fade-in-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // %10'u görününce
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // DÜZELTME: Sınıf adı 'is-visible' olarak güncellendi
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    fadeInElements.forEach(el => scrollObserver.observe(el));

    /* -----------------------------------------------
    /* TIMELINE (ZAMAN ÇİZELGESİ) "LOAD MORE" BUTONU
    /* ----------------------------------------------- */
    const loadMoreButton = document.getElementById('timeline-load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.timeline-item-hidden');
            hiddenItems.forEach(item => {
                item.classList.remove('timeline-item-hidden');
            });
            // Butonu gizle ve "Daha Az Göster" butonu (eğer varsa) göster
            loadMoreButton.style.display = 'none'; 
        });
    }

    /* NOT: Mobil menü (hamburger) ve Yukarı Çık (scroll-to-top) 
    kodları, yeni CSS dosyanızda bulunmadığı için kaldırıldı.
    */

});