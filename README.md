# Trivia Interactiva: Curso de Multimedios (UCR)

Este es un minijuego educativo en formato de trivia enfocado en evaluar los contenidos teóricos y prácticos del curso **IF7102 - Multimedios** (I Ciclo 2026) de la **Universidad de Costa Rica (UCR)**.

## 🚀 Declaración del Framework Elegido (Semana 12)
Para el desarrollo de esta aplicación multimedia de aprendizaje autónomo, se ha elegido el framework:
* **React (v19+) con Vite**

*Razón de la elección:* React nos permite modularizar la interfaz a través de componentes reutilizables (como pantallas, temporizadores, y barras de progreso) y ofrece una gestión eficiente del estado para manejar la interactividad y reactividad del minijuego de manera fluida.

---

## 🛠️ Requisitos de Ejecución (Proyecto Base)

Asegúrate de tener instalado [Node.js](https://nodejs.org/).

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Ver la aplicación:**
   Abre `http://localhost:5173` en tu navegador.

---

## 📂 Estructura del Proyecto (Planificada)

* `/public/data/questions.json`: Base de datos de preguntas sobre desarrollo web, HTML, CSS, JS, Asincronía, WebComponents y React.
* `/src/components/`:
  * `StartScreen.jsx`: Pantalla inicial del juego.
  * `GameScreen.jsx`: Pantalla de preguntas y respuestas.
  * `ResultScreen.jsx`: Pantalla de puntaje final.
  * `ProgressBar.jsx`: Barra de progreso de la trivia.
* `/src/utils/audio.js`: Módulo de efectos de sonido.
* `/src/App.jsx`: Componente principal (controlador de pantallas y estado).
