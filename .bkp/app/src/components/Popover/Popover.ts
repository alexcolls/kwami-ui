import './Popover.css'

export function Popover(): string {
  return `
    <div class="kwami-popover-wrapper">
      <div class="kwami-popover-trigger-bezel">
        <button class="kwami-popover-trigger">
          <span class="kwami-popover-trigger-face">
            <span class="kwami-popover-trigger-highlight"></span>
            <span class="kwami-popover-trigger-text">INFO</span>
          </span>
        </button>
      </div>
      <div class="kwami-popover hidden">
        <div class="kwami-popover-content">
          <h4>Popover Title</h4>
          <p>This is a neumorphic popover panel with hardware-inspired styling.</p>
        </div>
        <div class="kwami-popover-arrow"></div>
      </div>
    </div>
  `;
}

export function initPopover(container: HTMLElement): void {
  const trigger = container.querySelector('.kwami-popover-trigger');
  const popover = container.querySelector('.kwami-popover');

  trigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    popover?.classList.toggle('hidden');
    trigger.classList.toggle('active');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target as Node)) {
      popover?.classList.add('hidden');
      trigger?.classList.remove('active');
    }
  });
}
