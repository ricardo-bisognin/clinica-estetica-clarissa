document.addEventListener('DOMContentLoaded', function() {

    // --- HEADER SHRINK ---
    const header = document.querySelector('header');
    const body = document.body;

    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            body.classList.remove('header-large-scroll-offset');
        } else {
            header.classList.remove('header-scrolled');
            body.classList.add('header-large-scroll-offset');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();


    // --- ANOS DE EXPERIÊNCIA ---
    const elementoAnos = document.getElementById("anos-experiencia");
    if (elementoAnos) {
        const anoAtual = new Date().getFullYear();
        elementoAnos.textContent = anoAtual - 2012;
    }


    // --- ANO RODAPÉ ---
    const elementoAnoAtual = document.getElementById("current-year");
    if (elementoAnoAtual) {
        elementoAnoAtual.textContent = new Date().getFullYear();
    }


    // --- SWIPER DE DEPOIMENTOS ---
    try {
        const swiper = new Swiper('.testimonial-swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 900,
            centeredSlides: true,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            }
        });
    } catch (e) {
        console.warn("Falha ao iniciar o Swiper:", e);
    }

    // --- MODAL DO MAPA (scroll travado e sem abrir Google) ---
    const mapModal = document.getElementById("mapModal");
    const mapTriggerBtn = document.getElementById("mapZoomTriggerBtn");
    const mapClose = document.getElementById("mapClose");

    if (mapTriggerBtn && mapModal && mapClose) {

    function openMapModal() {
        mapModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // trava scroll do fundo
    }

    function closeMapModal() {
        mapModal.style.display = "none";
        document.body.style.overflow = ""; // libera scroll do fundo
    }

    mapTriggerBtn.addEventListener("click", openMapModal);
    mapClose.addEventListener("click", closeMapModal);

    mapModal.addEventListener("click", function(e) {
        if (e.target === mapModal) {
        closeMapModal();
        }
    });

    // fechar com ESC
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && mapModal.style.display === "flex") {
        closeMapModal();
        }
    });
    }
});
