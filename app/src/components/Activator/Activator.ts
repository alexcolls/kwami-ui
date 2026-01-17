import './Activator.css'

export function Activator(): string {
  return `
    <div class="kwami-activator-container">
      <div class="kwami-activator-bezel">
        <button class="kwami-activator">
          <span class="kwami-activator-face">
            <span class="kwami-activator-highlight"></span>
            <span class="kwami-activator-text">PUSH</span>
          </span>
          <span class="kwami-activator-led"></span>
        </button>
      </div>
      <span class="kwami-activator-label">MUTE</span>
    </div>
  `;
}

export function initActivator(container: HTMLElement): void {
  const activator = container.querySelector('.kwami-activator');
  const led = container.querySelector('.kwami-activator-led');
  let isActive = false;

  activator?.addEventListener('click', () => {
    isActive = !isActive;
    if (isActive) {
      led?.classList.add('active');
      activator.classList.add('active');
    } else {
      led?.classList.remove('active');
      activator.classList.remove('active');
    }
    console.log('Activator clicked!', { active: isActive });
  });
}
