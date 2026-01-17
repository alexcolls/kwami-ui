import './Tooltip.css'

export function Tooltip(): string {
  return `
    <div class="kwami-tooltip-wrapper">
      <div class="kwami-tooltip-trigger-bezel">
        <button class="kwami-tooltip-trigger">
          <span class="kwami-tooltip-trigger-face">
            <span class="kwami-tooltip-trigger-highlight"></span>
            <span class="kwami-tooltip-trigger-text">HOVER</span>
          </span>
        </button>
      </div>
      <div class="kwami-tooltip hidden">
        <span class="kwami-tooltip-text">Helpful tooltip info!</span>
        <div class="kwami-tooltip-arrow"></div>
      </div>
    </div>
  `;
}

export function initTooltip(container: HTMLElement): void {
  const trigger = container.querySelector('.kwami-tooltip-trigger');
  const tooltip = container.querySelector('.kwami-tooltip');

  trigger?.addEventListener('mouseenter', () => {
    tooltip?.classList.remove('hidden');
  });

  trigger?.addEventListener('mouseleave', () => {
    tooltip?.classList.add('hidden');
  });
}
