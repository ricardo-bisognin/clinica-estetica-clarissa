document.addEventListener('DOMContentLoaded', function() {

    // --- FUNÇÕES DE UTILIDADE ---

    /* Calcula o tempo de experiência */
    function calcularTempoExperiencia(anoInicial) {
        const anoAtual = new Date().getFullYear();
        return anoAtual - anoInicial;
    }

    /* Inclui o header shrink (redimensionamento do header ao rolar) */
    const header = document.querySelector('header'); // Seleciona o header uma vez
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    // --- INICIALIZAÇÕES QUANDO O DOM ESTIVER CARREGADO ---

    /* 1. Atualiza os anos de experiência */
    const elementoAnos = document.getElementById("anos-experiencia");
    if (elementoAnos) {
        elementoAnos.textContent = calcularTempoExperiencia(2012);
    }

    /* 2. Atualiza o ano no rodapé */
    const elementoAnoAtual = document.getElementById("current-year"); // Boa prática: selecionar uma vez
    if (elementoAnoAtual) { // Verifica se o elemento existe
        elementoAnoAtual.textContent = new Date().getFullYear();
    }
    
    /* 3. Ativa o comportamento de header shrink no scroll */
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Executa uma vez no carregamento para ajustar o header se a página já estiver rolada

    /* 4. Inclui o Swiper para os depoimentos de clientes */
    const swiper = new Swiper('.testimonial-swiper-container', {
        /* Opções do swiper */
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
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
    });

    /* 5. Rolagem dinâmica suave para as âncoras */
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href'); // CORRIGIDO: getAtribute -> getAttribute
            // Verifique se é um link âncora interno (começa com # e não é apenas #)
            if (targetId.startsWith('#') && targetId.length > 1) { // CORRIGIDO: lenght -> length
                e.preventDefault(); // Impede a rolagem padrão do navegador

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Obtém a altura atual do header
                    const headerHeight = header.offsetHeight; // Usa a variável 'header' já declarada

                    // Calcula a posição de rolagem ajustada
                    // Queremos que o topo do elemento fique logo abaixo do header
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    // Adiciona um pequeno "respiro" extra se desejar, ex: + 5
                    
                    const offsetPosition = elementPosition - headerHeight;

                    // Ajusta o scroll com comportamento suave
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

}); // Fim do único document.addEventListener('DOMContentLoaded', function() {