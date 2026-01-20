document.addEventListener('DOMContentLoaded', function() {
  // --- VARIÁVEIS GLOBAIS ---
  const header = document.querySelector('header');
  const body = document.body;

  // --- FUNÇÕES DE UTILIDADE ---

  // 1) Calcula anos de experiência
  function calcularTempoExperiencia(anoInicial) {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoInicial;
  }

  // 2) Comportamento do header ao rolar
  function checkScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
      body.classList.remove('header-large-scroll-offset');
    } else {
      header.classList.remove('header-scrolled');
      body.classList.add('header-large-scroll-offset');
    }
  }

  // 3) Abrir/fechar modais de forma genérica
  function abrirModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = 'flex';
    body.classList.add('no-scroll');
  }

  function fecharModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = 'none';
    body.classList.remove('no-scroll');
  }

  // --- INICIALIZAÇÕES ---

  // 1. Atualiza anos de experiência
  const elementoAnos = document.getElementById("anos-experiencia");
  if (elementoAnos) {
    elementoAnos.textContent = calcularTempoExperiencia(2012);
  }

  // 2. Atualiza ano atual no rodapé
  const elementoAnoAtual = document.getElementById("current-year");
  if (elementoAnoAtual) {
    elementoAnoAtual.textContent = new Date().getFullYear();
  }

  // 3. Header shrink no scroll (somente desktop)
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', checkScroll);
    checkScroll();
  }

  // 4. Swiper dos depoimentos
  const swiper = new Swiper('.testimonial-swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 900,
    centeredSlides: true,
    autoHeight: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    }
  });

  // 5. Modal do MAPA (Seção Nossa Clínica)
  const mapModal = document.getElementById("mapModal");
  const mapClose = document.getElementById("mapClose");
  const mapTrigger = document.getElementById("mapZoomTrigger");
  const mapTriggerBtn = document.getElementById("mapZoomTriggerBtn");

  if (mapModal) {
    // Abrir ao clicar no frame ou no overlay
    [mapTrigger, mapTriggerBtn].forEach(el => {
      if (el) {
        el.addEventListener('click', () => abrirModal(mapModal));
      }
    });

    // Fechar no X
    if (mapClose) {
      mapClose.addEventListener('click', () => fecharModal(mapModal));
    }

    // Fechar clicando fora do conteúdo
    mapModal.addEventListener('click', (e) => {
      if (e.target === mapModal) {
        fecharModal(mapModal);
      }
    });
  }

  // 6. Abas da SEÇÃO TRATAMENTOS (Corporais / Faciais)
  const tabs = document.querySelectorAll('.trat-tab');
  const grids = {
    corp: document.getElementById('trat-corp'),
    face: document.getElementById('trat-face')
  };

  if (tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // remove estado ativo de todas as abas
        tabs.forEach(t => t.classList.remove('ativa'));
        tab.classList.add('ativa');

        // alterna grids
        const alvo = tab.dataset.target; // "corp" ou "face"
        Object.keys(grids).forEach(key => {
          if (grids[key]) {
            grids[key].classList.remove('ativa');
          }
        });
        if (grids[alvo]) {
          grids[alvo].classList.add('ativa');
        }
      });
    });
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav');  

  if (menuToggle && navMenu && header) {

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('mobile-active');
      header.classList.toggle('menu-open');
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('mobile-active');
        header.classList.remove('menu-open');
      }
    });
  }

  // 7. Modal de DETALHES dos TRATAMENTOS
  const tratModal = document.getElementById('tratModal');
  const tratClose = document.getElementById('tratClose');
  const tratCards = document.querySelectorAll('.trat-card[data-trat]');

  const tratamentosDetalhes = {

  manuais: {
    titulo: "Terapias Manuais",
    intro: "Tratamentos realizados por meio de técnicas manuais, escolhidas de forma personalizada conforme as necessidades e objetivos de cada pessoa.",
    indicado: "",
    comoFunciona: "Após avaliação, a profissional define a técnica ou combinação de técnicas mais adequadas para cada atendimento.",
    duracao: "Sessões com duração média de 50 a 60 minutos.",
    cuidados: "Comunicar qualquer desconforto durante a sessão e seguir as orientações profissionais.",
    imagem: "imagens/trat-massoterapia-relaxante.png",
    subtratamentos: [
      {
        nome: "Massoterapia Relaxante",
        desc: ""
      },
      {
        nome: "Massoterapia Modeladora",
        desc: ""
      },
      {
        nome: "Drenagem Linfática",
        desc: ""
      }
    ]
  },

  vacuo: {
    titulo: "Endermologia & Terapias a Vácuo",
    intro: "Tratamentos realizados com tecnologia de sucção controlada, voltados para modelagem corporal, estímulo circulatório e melhora da textura da pele.",
    indicado: "",
    comoFunciona: "A técnica utiliza ponteiras específicas com sucção a vácuo, ajustadas conforme a região e o objetivo do tratamento.",
    duracao: "Sessões com duração média de 40 a 60 minutos.",
    cuidados: "Evitar o tratamento em áreas sensíveis ou doloridas e seguir as orientações profissionais.",
    imagem: "imagens/endermologia - Pernas.png",
    subtratamentos: [
      {
        nome: "Endermologia Corporal",
        desc: ""
      },
      {
        nome: "Pump Up Glúteos",
        desc: ""
      },
      {
        nome: "Modelagem Corporal a Vácuo",
        desc: ""
      }
    ]
  },
  ultrassom: {
    titulo: "Ultrassom",
    intro: "Tratamentos realizados com tecnologia de ultrassom, voltados para gordura localizada e melhora do contorno corporal.",
    indicado: "",
    comoFunciona: "O ultrassom atua em camadas específicas do tecido, auxiliando processos metabólicos e estéticos.",
    duracao: "Sessões de 30 a 40 minutos por área, conforme avaliação profissional.",
    cuidados: "Manter boa hidratação e seguir orientações profissionais após o procedimento.",
    imagem: "imagens/lipocavitacao-abdomen.png",
    subtratamentos: [
      {
        nome: "Lipocavitação",
        desc: ""
      },
      {
        nome: "Ultrassom Corporal",
        desc: ""
      }
    ]
  },
    limpeza: {
      titulo: 'Limpeza de Pele',
      intro: 'Protocolo completo para remover impurezas, controlar oleosidade e devolver frescor e viço à pele.',
      indicado: 'Pessoas com poros obstruídos, cravos, oleosidade excessiva ou que desejam preparar a pele para outros tratamentos estéticos.',
      comoFunciona: 'Inclui etapas como higienização, esfoliação, emoliência, extrações pontuais, máscara calmante e finalização com ativos adequados ao tipo de pele.',
      duracao: 'Sessões em torno de 60 a 75 minutos, com frequência definida conforme o tipo de pele e rotina de cuidados.',
      cuidados: 'Evitar exposição solar direta nas primeiras 24 a 48 horas, usar filtro solar e seguir as orientações de produtos indicados para manutenção em casa.',
      imagem: 'imagens/trat-limpeza-pele.png',
      alt: 'Limpeza de pele profissional em clínica de estética'
    },
    usmicrofocado: {
      titulo: 'Ultrassom Microfocado',
      intro: 'Lifting não cirúrgico que estimula a produção de colágeno em profundidade, promovendo firmeza e redefinição dos contornos faciais.',
      indicado: 'Pessoas que desejam melhorar flacidez leve a moderada, especialmente em região de mandíbula, pescoço e terço inferior da face, sem recorrer à cirurgia.',
      comoFunciona: 'Ondas de ultrassom de alta intensidade são direcionadas em pontos específicos, alcançando camadas profundas da pele e estimulando o colágeno de sustentação.',
      duracao: 'A sessão pode variar entre 40 e 90 minutos, dependendo das áreas tratadas. Os resultados são progressivos, se desenvolvendo ao longo de semanas a meses.',
      cuidados: 'Seguir as orientações profissionais sobre hidratação da pele, proteção solar e eventuais cuidados específicos após o procedimento.',
      imagem: 'imagens/trat-us-microfocado.png',
      alt: 'Aplicação de ultrassom microfocado na região do rosto'
    },
    peeling: {
      titulo: 'Peeling de Diamante',
      intro: 'Esfoliação mecânica controlada que promove renovação suave da pele, uniformiza o tom e melhora o viço.',
      indicado: 'Pessoas com textura irregular, poros mais aparentes, marcas superficiais ou pele opaca, que buscam uma pele mais lisa e luminosa.',
      comoFunciona: 'Uma ponteira revestida de diamante realiza microesfoliação na superfície da pele, removendo células mortas e estimulando a renovação celular.',
      duracao: 'Sessões rápidas, em média de 30 a 40 minutos, com possibilidade de associação a outros protocolos faciais.',
      cuidados: 'Utilizar filtro solar diariamente, evitar exposição solar excessiva e seguir as orientações de produtos calmantes e hidratantes após o procedimento.',
      imagem: 'imagens/trat-peeling-diamante.png',
      alt: 'Peeling de diamante sendo realizado na pele do rosto'
    }
  };

  function abrirTratamentoModal(chave) {
    const dados = tratamentosDetalhes[chave];
    if (!dados || !tratModal) return;

    tratModal.querySelector('.trat-modal-title').textContent = dados.titulo;
    tratModal.querySelector('.trat-modal-intro').textContent = dados.intro;
    const indicadoTexto = tratModal.querySelector('.trat-modal-indicado');
    const indicadoBloco = tratModal.querySelector('.trat-modal-indicado-bloco');

    if (dados.indicado && dados.indicado.trim() !== "") {
      indicadoTexto.textContent = dados.indicado;
      indicadoBloco.style.display = '';
    } else {
      indicadoTexto.textContent = '';
      indicadoBloco.style.display = 'none';
    }
    tratModal.querySelector('.trat-modal-como-funciona').textContent = dados.comoFunciona;
    tratModal.querySelector('.trat-modal-duracao').textContent = dados.duracao;
    tratModal.querySelector('.trat-modal-cuidados').textContent = dados.cuidados;

    const imgEl = tratModal.querySelector('.trat-modal-image');
    if (imgEl) {
      if (dados.imagem) {
        imgEl.src = dados.imagem;
        imgEl.alt = dados.alt || dados.titulo;
      } else {
        imgEl.removeAttribute('src');
        imgEl.alt = '';
      }
    }

    const subBox = tratModal.querySelector('.trat-modal-subtratamentos');

    if (subBox && dados.subtratamentos) {
      subBox.innerHTML = `
        <h4>Tratamentos incluídos</h4>
        ${dados.subtratamentos.map(sub => `
          <div class="trat-sub-item">
            <strong>${sub.nome}</strong>
            <p>${sub.desc}</p>
          </div>
        `).join('')}
      `;
    } else if (subBox) {
      subBox.innerHTML = '';
    }

    abrirModal(tratModal);
  }

  if (tratCards.length > 0 && tratModal) {
    tratCards.forEach(card => {
      card.addEventListener('click', () => {
        const chave = card.dataset.trat; // massoterapia, drenagem, limpeza, etc.
        abrirTratamentoModal(chave);
      });
    });

    if (tratClose) {
      tratClose.addEventListener('click', () => fecharModal(tratModal));
    }

    tratModal.addEventListener('click', (e) => {
      if (e.target === tratModal) {
        fecharModal(tratModal);
      }
    });
  }
});
