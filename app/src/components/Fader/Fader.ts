import './Fader.css'

export function Fader(): string {
  return `
    <div class="kwami-fader" data-value="75" data-min="0" data-max="100">
      <div class="kwami-fader-track">
        <div class="kwami-fader-groove"></div>
        <div class="kwami-fader-fill"></div>
        <div class="kwami-fader-knob">
          <div class="kwami-fader-knob-grip"></div>
          <div class="kwami-fader-knob-grip"></div>
          <div class="kwami-fader-knob-grip"></div>
        </div>
      </div>
      <div class="kwami-fader-ticks">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
  `;
}

export function initFader(container: HTMLElement): void {
  const faders = container.querySelectorAll('.kwami-fader');
  
  faders.forEach(fader => {
    const track = fader.querySelector('.kwami-fader-track') as HTMLElement;
    const knob = fader.querySelector('.kwami-fader-knob') as HTMLElement;
    const fill = fader.querySelector('.kwami-fader-fill') as HTMLElement;
    
    if (!track || !knob || !fill) return;
    
    let isDragging = false;
    let value = parseInt(fader.getAttribute('data-value') || '50');
    const min = parseInt(fader.getAttribute('data-min') || '0');
    const max = parseInt(fader.getAttribute('data-max') || '100');
    
    const updatePosition = (newValue: number) => {
      value = Math.max(min, Math.min(max, newValue));
      const percent = ((value - min) / (max - min)) * 100;
      
      // Position from bottom (0% = bottom, 100% = top)
      knob.style.bottom = `calc(${percent}% - 20px)`;
      fill.style.height = `${percent}%`;
      
      fader.setAttribute('data-value', String(Math.round(value)));
      
      fader.dispatchEvent(new CustomEvent('faderchange', {
        detail: { value: Math.round(value) },
        bubbles: true
      }));
    };
    
    const handleMove = (clientY: number) => {
      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height - 40; // Account for knob size
      const relativeY = rect.bottom - 20 - clientY; // From bottom
      const percent = Math.max(0, Math.min(100, (relativeY / trackHeight) * 100));
      const newValue = min + (percent / 100) * (max - min);
      updatePosition(newValue);
    };
    
    // Mouse events
    knob.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      knob.classList.add('dragging');
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) handleMove(e.clientY);
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      knob.classList.remove('dragging');
    });
    
    // Touch events
    knob.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDragging = true;
      knob.classList.add('dragging');
    });
    
    document.addEventListener('touchmove', (e) => {
      if (isDragging) handleMove(e.touches[0].clientY);
    });
    
    document.addEventListener('touchend', () => {
      isDragging = false;
      knob.classList.remove('dragging');
    });
    
    // Click on track
    track.addEventListener('click', (e) => {
      if (e.target === knob || knob.contains(e.target as Node)) return;
      handleMove(e.clientY);
    });
    
    // Initialize
    updatePosition(value);
  });
}
