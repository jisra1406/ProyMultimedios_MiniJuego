# REFERENCIAS (Proyecto Base)

Este documento detalla las fuentes de información, documentación oficial, tutoriales y herramientas consultadas para el aprendizaje del framework **React** y el desarrollo del proyecto.

---

## 1. Documentación Oficial y Tutoriales de Aprendizaje (Semana 12)

- **React Official Documentation**
  - **Título:** [React Documentation](https://react.dev/)
  - **Descripción:** Documentación oficial para comprender los conceptos básicos de componentes, JSX y props.
  - **Título:** [Más sobre React](https://roadmap.sh/frontend)
  - **Descripción:** material tomado del curso MULTIMEDIOS, en el que da acceso a más contendio sobre la herramienta React.
- **Vite Official Documentation**
  - **Título:** [Vite Guide](https://vite.dev/guide/)
  - **Descripción:** Guía de inicio rápido para la creación del proyecto base y estructura del scaffolding.

---

## 2. Recursos Multimedia y Licencias

- **Efectos de Sonido (Audio):**
  - **Fuente:** [Freesound.org](https://freesound.org/)
  - **Licencia:** Todos los sonidos utilizados tienen licencia Creative Commons Zero (CC0) o similar libre de derechos para uso en proyectos educativos/personales.
  - **Descripción:** Se incorporaron efectos de sonido para clics, aciertos, errores, inicio de módulos, ganar y perder, y desbloqueo de niveles.

- **Imágenes e Ilustraciones Visuales:**
  - **Fuente de Logos e Íconos:** [Flaticon](https://www.flaticon.com/)
  - **Licencia de Logos:** Licencia libre para uso personal, con atribución requerida a los respectivos autores de la plataforma Flaticon. Se utilizaron logos oficiales y recursos visuales como trofeos y medallas.
  - **Imágenes Generadas por IA:** Las imágenes de *Game Over* (por fallo en cada módulo) y los **fondos temáticos** (menú principal y módulos de HTML, CSS, JS y React) fueron generados con herramientas de Inteligencia Artificial utilizando técnicas de prompt engineering (descripción textual) para adaptarlas al contexto del proyecto.

---

## 3. Uso de Herramientas de Inteligencia Artificial (IA)

Se utilizó el asistente de IA **Antigravity** de Google DeepMind

1. **Configuración Inicial:** Al crear el proyecto, para configurar a través de la terminal y hacer uso de lo que es Vite y el framework React.
2. **Búsqueda de Efectos de Sonido:** Se utilizó la IA para buscar opciones de efectos de sonido, describiendo el audio exacto que necesitaba (ej. "sonido de desbloqueo", "sonido de ganar"), ya que no sabía cómo buscar estos audios inicialmente, y la IA sugirió la plataforma Freesound y términos de búsqueda correctos.
3. **Implementación Lógica de Audio:** La IA apoyó en crear la utilidad `audio.js` para mapear y reproducir los audios dentro del ciclo de vida de los componentes React.
4. **Generación de Imágenes de 'Game Over' y Fondos:** Se utilizó IA generativa de imágenes. Yo mismo preparé los *prompts* detallados y describí la composición exacta de la imagen, los colores y los elementos que quería que aparecieran para cada módulo (HTML, CSS, JS y React) tanto para los Game Overs como para los fondos isométricos inmersivos.
5. **Implementación de Lógica Visual:** La IA asistió en la modificación de los componentes (`ModuleDashboard.jsx` y `ResultScreen.jsx`) para cambiar los emojis por etiquetas `<img>` dinámicas basadas en los archivos aportados.
