document.addEventListener('DOMContentLoaded', function() {

/*Atualiza o tempo de experiência*/
function calcularTempoExperiencia (anoInicial) {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoInicial;
}

const elementoAnos = document.getElementById("anos-experiencia");
if (elementoAnos) {
    elementoAnos.textContent = calcularTempoExperiencia(2012);
}

/*Atualiza o ano no rodapé*/
document.getElementById("current-year").textContent = new Date().getFullYear();

/*Inclui o swiper para o depoimento de clientes*/
const swiper = new Swiper('.testimonial-swiper-container', {
    /*Opções do swiper*/
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,

    /*Paginação*/
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    /*Botões de navegação*/
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    /*Responsividade - break points*/
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
            centeredSlides: false,
        },

        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: false,
        },
    }
});
});