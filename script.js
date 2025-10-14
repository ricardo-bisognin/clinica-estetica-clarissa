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