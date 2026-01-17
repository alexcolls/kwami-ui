import './Toggle.css'

export function Toggle(): string {
  return `
    <div class="kwami-toggle-container">
      <div class="kwami-toggle-bezel">
        <button class="kwami-toggle">
          <span class="kwami-toggle-face">
            <span class="kwami-toggle-highlight"></span>
            <span class="kwami-toggle-text">PUSH</span>
          </span>
          <span class="kwami-toggle-led"></span>
        </button>
      </div>
      <span class="kwami-toggle-label">MUTE</span>
    </div>
  `;
}

export function initToggle(container: HTMLElement): void {
  const toggle = container.querySelector('.kwami-toggle');
  const led = container.querySelector('.kwami-toggle-led');
  let isActive = false;

  toggle?.addEventListener('click', () => {
    isActive = !isActive;
    if (isActive) {
      led?.classList.add('active');
      toggle.classList.add('active');
    } else {
      led?.classList.remove('active');
      toggle.classList.remove('active');
    }
    console.log('Toggle clicked!', { active: isActive });
  });
}
