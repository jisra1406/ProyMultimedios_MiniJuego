// Utilidad de audio - Esqueleto para la fase 1

/**
 * Reproduce un sonido según el tipo
 * @param {string} type - El tipo de sonido ('correct', 'incorrect', 'result')
 * @param {boolean} isMuted - Si el sonido está silenciado
 */
export const playSound = (type, isMuted = false) => {
  // En la fase inicial no se reproducen sonidos
  console.log(`[Audio] Intento de reproducir sonido: ${type} (Muted: ${isMuted})`);
};
