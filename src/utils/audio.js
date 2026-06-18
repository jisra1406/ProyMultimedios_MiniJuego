// Utilidad de audio

const sounds = {
  acierto: new Audio('audio/acierto.wav'),
  click: new Audio('audio/click.wav'),
  desbloqueoNivel: new Audio('audio/desbloqueoNivel.wav'),
  moduloccs: new Audio('audio/moduloccs.mp3'),
  modulohtml: new Audio('audio/modulohtml.wav'),
  modulojs: new Audio('audio/modulojs.mp3'),
  moduloreact: new Audio('audio/moduloreact.wav'),
  respuestaIncorrecta: new Audio('audio/respuestaIncorrecta.wav'),
  resultadoGanador: new Audio('audio/resultadoGanador.wav'),
  resultadoMalo: new Audio('audio/resultadoMalo.wav'),
  pantallaInicial: new Audio('audio/pantallaInicial.flac'),
};

const backgroundSounds = [
  'pantallaInicial', 
  'moduloccs', 
  'modulohtml', 
  'modulojs', 
  'moduloreact',
  'resultadoGanador',
  'resultadoMalo'
];

let currentBgAudio = null;

export const playSound = (type, isMuted = false) => {
  if (isMuted || !sounds[type]) {
    console.log(`[Audio] Intento de reproducir sonido no encontrado o muteado: ${type}`);
    return;
  }
  
  const isBackground = backgroundSounds.includes(type);

  if (isBackground) {
    // Si ya está sonando este mismo audio de fondo, no lo reinicies
    if (currentBgAudio === sounds[type]) {
      if (currentBgAudio.paused) {
        currentBgAudio.play().catch(e => console.log(`[Audio] Auto-play prevenido para bg ${type}:`, e));
      }
      return;
    }

    stopBackgroundAudio(); // Detener el audio de fondo actual
    
    const audio = sounds[type];
    audio.currentTime = 0;
    audio.volume = 0.5;
    // La pantalla inicial y los módulos pueden loopear
    audio.loop = type === 'pantallaInicial' || type.startsWith('modulo');
    
    currentBgAudio = audio;
    audio.play().catch(e => console.log(`[Audio] Auto-play prevenido para bg ${type}:`, e));
  } else {
    // Clonar para sonidos cortos (clic, acierto) para que se puedan solapar
    const audio = sounds[type].cloneNode();
    audio.volume = 0.5;
    audio.play().catch(e => console.log(`[Audio] Auto-play prevenido para ${type}:`, e));
  }
};

export const stopBackgroundAudio = () => {
  if (currentBgAudio) {
    currentBgAudio.pause();
    currentBgAudio.currentTime = 0;
    currentBgAudio = null;
  }
};

