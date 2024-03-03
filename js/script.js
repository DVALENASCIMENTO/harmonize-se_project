document.addEventListener("DOMContentLoaded", function() {
  // Botão para expandir/recolher o sidebar
  var toggleSidebarButton = document.getElementById('toggleSidebar');
  var sidebar = document.getElementById('sidebar');

  toggleSidebarButton.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });

  var speechUtterance = null;
  var paused = false; // Variável para controlar o estado de pausa
  var audio = document.getElementById('audio');
  var playPauseButton = document.getElementById('play-button');
  var pauseButton = document.getElementById('pause-button');
  var increaseFontButton = document.getElementById('increaseFont');
  var decreaseFontButton = document.getElementById('decreaseFont');

  // Função para iniciar a leitura
  function iniciarLeitorDeVoz() {
    var elementosDeTexto = document.querySelectorAll('.main h2, .main p, .main ol, .main li');
    var texto = '';

    elementosDeTexto.forEach(function(elemento) {
      texto += elemento.innerText + ' ';
    });

    if (speechUtterance && paused) {
      // Se a leitura foi pausada, retomar a partir do ponto de pausa
      speechSynthesis.resume();
      paused = false; // Reiniciar o estado de pausa
    } else {
      if (speechUtterance) {
        // Se já houver uma leitura em andamento, pare antes de iniciar uma nova
        speechSynthesis.cancel();
      }

      speechUtterance = new SpeechSynthesisUtterance(texto);
      speechUtterance.rate = 1.0; // Definir a velocidade para 1.0
      speechSynthesis.speak(speechUtterance);
    }
  }

  // Função para pausar ou retomar a leitura
  function togglePausarLeitorDeVoz() {
    if (speechUtterance) {
      if (paused) {
        speechSynthesis.resume(); // Retomar a leitura se estiver pausada
        paused = false;
      } else {
        speechSynthesis.pause(); // Pausar a leitura se estiver em andamento
        paused = true;
      }
    }
  }

  // Função para aumentar/diminuir o tamanho da fonte
  function changeFontSize(size) {
    var currentFontSize = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
    document.body.style.fontSize = size === 'larger' ? (currentFontSize * 1.1) + 'px' : (currentFontSize / 1.1) + 'px';
  }

  // Adiciona evento de clique ao botão de play
  playPauseButton.addEventListener('click', function() {
    iniciarLeitorDeVoz();
  });

  // Adiciona evento de clique ao botão de pausa
  pauseButton.addEventListener('click', function() {
    togglePausarLeitorDeVoz();
  });

  // Adiciona evento de clique ao botão de aumentar fonte
  increaseFontButton.addEventListener('click', function() {
    changeFontSize('larger');
  });

  // Adiciona evento de clique ao botão de diminuir fonte
  decreaseFontButton.addEventListener('click', function() {
    changeFontSize('smaller');
  });

  // Parar áudio quando a página está prestes a ser descarregada
  window.addEventListener('beforeunload', function() {
    if (speechUtterance) {
      speechSynthesis.cancel(); // Cancelar a leitura
    }
  });

  // Inicia o áudio quando a página é carregada
  audio.play();

});
