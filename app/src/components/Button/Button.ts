import './Button.css'

export function Button(): string {
  return `
    <div class="kwami-button-container">
      <div class="kwami-button-bezel">
        <button class="kwami-button">
          <span class="kwami-button-face">
            <span class="kwami-button-highlight"></span>
            <span class="kwami-button-text">CLICK</span>
          </span>
        </button>
      </div>
    </div>
  `;
}

export function initButton(container: HTMLElement): void {
  const button = container.querySelector('.kwami-button');
  
  button?.addEventListener('click', () => {
    // Brief pressed animation
    button.classList.add('pressed');
    setTimeout(() => button.classList.remove('pressed'), 150);
    console.log('Button clicked!');
  });
}
