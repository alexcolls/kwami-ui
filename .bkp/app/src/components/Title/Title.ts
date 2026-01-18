import './Title.css'

export function Title(text: string): string {
  // Split text into individual characters for the lighting effect
  const chars = text.split('').map((char, index) => {
    if (char === ' ') {
      return `<span class="kwami-title-char kwami-title-space" style="--char-index: ${index}">&nbsp;</span>`;
    }
    return `<span class="kwami-title-char" style="--char-index: ${index}">${char}</span>`;
  }).join('');

  return `
    <h3 class="kwami-title">
      <span class="kwami-title-text">${chars}</span>
      <span class="kwami-title-glow" aria-hidden="true">${text}</span>
    </h3>
  `;
}
