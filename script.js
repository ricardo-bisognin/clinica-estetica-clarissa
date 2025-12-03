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

  // 3. Header shrink no scroll
  window.addEventListener('scroll', checkScroll);
  checkScroll();

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
      delay: 5000,
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

  // 7. Modal de DETALHES dos TRATAMENTOS
  const tratModal = document.getElementById('tratModal');
  const tratClose = document.getElementById('tratClose');
  const tratButtons = document.querySelectorAll('.trat-card-btn');

  const tratamentosDetalhes = {
    massoterapia: {
      titulo: 'Massoterapia Relaxante',
      intro: 'Um momento de pausa para o corpo e para a mente, com técnicas manuais focadas em aliviar tensões e trazer bem-estar.',
      indicado: 'Pessoas com rotina intensa, estresse elevado, dores musculares leves ou tensão acumulada em pescoço, ombros e região lombar.',
      comoFunciona: 'Por meio de manobras manuais específicas, trabalhamos músculos e tecidos moles, melhorando a circulação e liberando pontos de tensão.',
      duracao: 'Sessões de aproximadamente 50 a 60 minutos, com frequência definida de acordo com a necessidade e objetivo de cada pessoa.',
      cuidados: 'Evitar grandes refeições imediatamente antes da sessão e comunicar qualquer desconforto ou sensibilidade durante o atendimento.'
    },
    drenagem: {
      titulo: 'Drenagem Linfática',
      intro: 'Técnica manual suave que estimula o sistema linfático, ajudando na redução de inchaços e da sensação de peso nas pernas.',
      indicado: 'Pessoas com retenção de líquidos, sensação de inchaço, pernas cansadas ou em fase de pós-operatório (sempre com liberação médica).',
      comoFunciona: 'São realizados movimentos leves, rítmicos e direcionados ao longo dos trajetos linfáticos, auxiliando o organismo a eliminar o excesso de líquidos e toxinas.',
      duracao: 'Sessões em torno de 50 minutos. A frequência é ajustada conforme o objetivo: bem-estar, estética ou pós-operatório.',
      cuidados: 'Manter boa hidratação ao longo do dia, seguir orientações médicas em casos específicos e informar histórico de saúde antes do início do tratamento.'
    },
    lipocavitacao: {
      titulo: 'Lipocavitação',
      intro: 'Tecnologia que atua diretamente na gordura localizada, auxiliando na remodelação dos contornos corporais.',
      indicado: 'Pessoas com acúmulo de gordura localizada em regiões específicas, como abdômen, flancos ou coxas, que buscam melhora de contorno corporal.',
      comoFunciona: 'Utiliza ondas de ultrassom que atingem o tecido adiposo, auxiliando na quebra das células de gordura, que depois serão metabolizadas pelo organismo.',
      duracao: 'Sessões em média de 30 a 40 minutos por área, com intervalo mínimo entre as sessões conforme protocolo profissional.',
      cuidados: 'Ingerir bastante água ao longo do dia, manter alimentação equilibrada e evitar o procedimento em casos de contraindicações avaliadas em consulta.'
    },
    limpeza: {
      titulo: 'Limpeza de Pele',
      intro: 'Protocolo completo para remover impurezas, controlar oleosidade e devolver frescor e viço à pele.',
      indicado: 'Pessoas com poros obstruídos, cravos, oleosidade excessiva ou que desejam preparar a pele para outros tratamentos estéticos.',
      comoFunciona: 'Inclui etapas como higienização, esfoliação, emoliência, extrações pontuais, máscara calmante e finalização com ativos adequados ao tipo de pele.',
      duracao: 'Sessões em torno de 60 a 75 minutos, com frequência definida conforme o tipo de pele e rotina de cuidados.',
      cuidados: 'Evitar exposição solar direta nas primeiras 24 a 48 horas, usar filtro solar e seguir as orientações de produtos indicados para manutenção em casa.'
    },
    usmicrofocado: {
      titulo: 'Ultrassom Microfocado',
      intro: 'Lifting não cirúrgico que estimula a produção de colágeno em profundidade, promovendo firmeza e redefinição dos contornos faciais.',
      indicado: 'Pessoas que desejam melhorar flacidez leve a moderada, especialmente em região de mandíbula, pescoço e terço inferior da face, sem recorrer à cirurgia.',
      comoFunciona: 'Ondas de ultrassom de alta intensidade são direcionadas em pontos específicos, alcançando camadas profundas da pele e estimulando o colágeno de sustentação.',
      duracao: 'A sessão pode variar entre 40 e 90 minutos, dependendo das áreas tratadas. Os resultados são progressivos, se desenvolvendo ao longo de semanas a meses.',
      cuidados: 'Seguir as orientações profissionais sobre hidratação da pele, proteção solar e eventuais cuidados específicos após o procedimento.'
    },
    peeling: {
      titulo: 'Peeling de Diamante',
      intro: 'Esfoliação mecânica controlada que promove renovação suave da pele, uniformiza o tom e melhora o viço.',
      indicado: 'Pessoas com textura irregular, poros mais aparentes, marcas superficiais ou pele opaca, que buscam uma pele mais lisa e luminosa.',
      comoFunciona: 'Um ponteira revestida de diamante realiza microesfoliação na superfície da pele, removendo células mortas e estimulando a renovação celular.',
      duracao: 'Sessões rápidas, em média de 30 a 40 minutos, com possibilidade de associação a outros protocolos faciais.',
      cuidados: 'Utilizar filtro solar diariamente, evitar exposição solar excessiva e seguir as orientações de produtos calmantes e hidratantes após o procedimento.'
    }
  };

  function abrirTratamentoModal(chave) {
    const dados = tratamentosDetalhes[chave];
    if (!dados || !tratModal) return;

    tratModal.querySelector('.trat-modal-title').textContent = dados.titulo;
    tratModal.querySelector('.trat-modal-intro').textContent = dados.intro;
    tratModal.querySelector('.trat-modal-indicado').textContent = dados.indicado;
    tratModal.querySelector('.trat-modal-como-funciona').textContent = dados.comoFunciona;
    tratModal.querySelector('.trat-modal-duracao').textContent = dados.duracao;
    tratModal.querySelector('.trat-modal-cuidados').textContent = dados.cuidados;

    abrirModal(tratModal);
  }

  if (tratButtons.length > 0 && tratModal) {
    tratButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const chave = btn.dataset.trat; // massoterapia, drenagem, etc.
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
