function ResultScreen({ score, onRestart }) {
  return (
    <div className="glass-panel animated-fade">
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>
        Resultados Finales
      </h2>
      <p style={{ marginBottom: '2rem', color: 'var(--color-text-main)' }}>
        Puntaje total simulado: <strong>{score}</strong>
      </p>

      <button className="btn btn-primary" onClick={onRestart} style={{ padding: '0.8rem 2rem' }}>
        Volver a Jugar
      </button>
    </div>
  );
}

export default ResultScreen;
