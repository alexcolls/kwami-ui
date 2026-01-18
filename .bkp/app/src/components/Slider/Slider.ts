import './Slider.css'

export function Slider(): string {
  return `
    <div class="kwami-slider-container">
      <div class="kwami-slider-bezel">
        <div class="kwami-slider-track">
          <div class="kwami-slider-fill"></div>
          <input 
            type="range" 
            class="kwami-slider" 
            min="0" 
            max="100" 
            value="50"
          />
          <div class="kwami-slider-thumb-visual"></div>
        </div>
      </div>
      <div class="kwami-slider-value-container">
        <span class="kwami-slider-value">50</span>
      </div>
      <span class="kwami-slider-label">FADER</span>
    </div>
  `;
}

export function initSlider(container: HTMLElement): void {
  const slider = container.querySelector('.kwami-slider') as HTMLInputElement;
  const valueDisplay = container.querySelector('.kwami-slider-value');
  const fill = container.querySelector('.kwami-slider-fill') as HTMLElement;
  const thumbVisual = container.querySelector('.kwami-slider-thumb-visual') as HTMLElement;
  
  const updateSlider = (value: number) => {
    const percent = value;
    if (fill) {
      fill.style.width = `${percent}%`;
    }
    if (thumbVisual) {
      thumbVisual.style.left = `${percent}%`;
    }
    if (valueDisplay) {
      valueDisplay.textContent = value.toString();
    }
  };
  
  // Initialize
  updateSlider(parseInt(slider?.value || '50'));
  
  slider?.addEventListener('input', (e) => {
    const value = parseInt((e.target as HTMLInputElement).value);
    updateSlider(value);
    console.log('Slider value:', value);
  });
}
