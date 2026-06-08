function GameScreen({ onEnd }) {
  return (
    <div className="glass-panel animated-fade">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
        Área de Juego (En Desarrollo)
      </h2>
      <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
        Esta pantalla contendrá la visualización de preguntas y el temporizador en la siguiente fase.
      </p>
      
      <button className="btn btn-primary" onClick={onEnd} style={{ padding: '0.8rem 2rem' }}>
        Simular Finalizar Juego
      </button>
    </div>
  );
}

export default GameScreen;
