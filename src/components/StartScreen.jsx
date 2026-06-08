function StartScreen({ onStart }) {
  return (
    <div className="glass-panel animated-fade">
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #f3f4f6 30%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Trivia: Curso de Multimedios
      </h1>
      
      <p style={{ fontSize: '1rem', marginBottom: '2rem', color: 'var(--color-text-main)' }}>
        Bienvenido a la trivia interactiva de Multimedios (UCR). Evalúa tus conocimientos en HTML, CSS, JavaScript, WebComponents y React.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={onStart} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Comenzar Juego
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
