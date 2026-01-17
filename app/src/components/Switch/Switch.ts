import './Switch.css'

export function Switch(): string {
  return `
    <div class="kwami-switch-container">
      <label class="kwami-switch">
        <input type="checkbox" class="kwami-switch-input">
        <span class="kwami-switch-bezel">
          <span class="kwami-switch-track">
            <span class="kwami-switch-thumb">
              <span class="kwami-switch-thumb-highlight"></span>
            </span>
          </span>
        </span>
      </label>
      <span class="kwami-switch-label">POWER</span>
    </div>
  `;
}

export function initSwitch(container: HTMLElement): void {
  const switchInput = container.querySelector('.kwami-switch-input') as HTMLInputElement;
  switchInput?.addEventListener('change', (e) => {
    console.log('Switch changed:', (e.target as HTMLInputElement).checked);
  });
}
