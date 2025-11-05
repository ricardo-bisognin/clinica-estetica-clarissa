document.addEventListener('DOMContentLoaded', function() {

    // --- VARIÁVEIS GLOBAIS DE ESCOPO ---
    const header = document.querySelector('header');
    const body = document.body; // <-- Definida corretamente no escopo principal

    // --- FUNÇÕES DE UTILIDADE ---

    /* Calcula o tempo de experiência */
    function calcularTempoExperiencia(anoInicial) {
        const anoAtual = new Date().getFullYear();
        return anoAtual - anoInicial;
    }

    /* Inclui o header shrink (redimensionamento do header ao rolar) */
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            body.classList.remove('header-large-scroll-offset'); // Remove o offset grande (header encolhido)
        } else {
            header.classList.remove('header-scrolled');
            body.classList.add('header-large-scroll-offset'); // Adiciona o offset grande (header no topo)
        }
    }

    // --- INICIALIZAÇÕES QUANDO O DOM ESTIVER CARREGADO ---

    /* 1. Atualiza os anos de experiência */
    const elementoAnos = document.getElementById("anos-experiencia");
    if (elementoAnos) {
        elementoAnos.textContent = calcularTempoExperiencia(2012);
    }

    /* 2. Atualiza o ano no rodapé */
    const elementoAnoAtual = document.getElementById("current-year");
    if (elementoAnoAtual) {
        elementoAnoAtual.textContent = new Date().getFullYear();
    }
    
    /* 3. Ativa o comportamento de header shrink no scroll e controla o body offset */
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Executa uma vez no carregamento

    /* 4. Inclui o Swiper para os depoimentos de clientes */
    const swiper = new Swiper('.testimonial-swiper-container', {
        /* Opções do swiper */
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 900,
        centeredSlides: true,
        autoHeight: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        /* Paginação */
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        /* Botões de navegação */
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        /* Autoplay do swiper*/
        autoplay: {
            delay: 5000, // tempo em milissegundos entre os slides (aqui: 5 segundos)
            disableOnInteraction: false, // continua passando mesmo após o usuário clicar
        }
    });

    // Removendo toda a lógica de rolagem dinâmica (como combinado)
});