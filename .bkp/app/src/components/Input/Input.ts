import './Input.css'
import { ColorPicker, initColorPicker } from '../ColorPicker/ColorPicker'

export function Input(): string {
  return `
    <div class="kwami-input-outer-wrapper">
      <!-- Live Preview -->
      <div class="kwami-input-preview">
        <div class="kwami-input-container">
          <div class="kwami-input-bezel">
            <div class="kwami-input-wrapper">
              <input 
                type="text" 
                class="kwami-input" 
                placeholder="Type here..."
              />
              <span class="kwami-input-highlight"></span>
            </div>
          </div>
          <span class="kwami-input-label">TEXT INPUT</span>
        </div>
      </div>

      <!-- Controls Panel -->
      <div class="kwami-input-controls">
        <div class="kwami-input-parts">
          <button class="kwami-input-part-btn active" data-part="bezel" title="Outer bezel">
            <span class="part-icon">◰</span>
            <span class="part-label">Bezel</span>
          </button>
          <button class="kwami-input-part-btn" data-part="field" title="Input field">
            <span class="part-icon">▭</span>
            <span class="part-label">Field</span>
          </button>
          <button class="kwami-input-part-btn" data-part="highlight" title="Focus highlight">
            <span class="part-icon">▬</span>
            <span class="part-label">Line</span>
          </button>
          <button class="kwami-input-part-btn" data-part="text" title="Text styling">
            <span class="part-icon">T</span>
            <span class="part-label">Text</span>
          </button>
        </div>

        <div class="kwami-input-control-panels">
          <!-- Bezel Controls -->
          <div class="kwami-input-panel active" data-panel="bezel">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="bezel">
                ${ColorPicker({ defaultColor: '#c8c8c8' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Border Radius</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="bezel-radius" min="0" max="24" value="14" />
                <span class="control-value">14px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Padding</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="bezel-padding" min="2" max="12" value="6" />
                <span class="control-value">6px</span>
              </div>
            </div>
          </div>

          <!-- Field Controls -->
          <div class="kwami-input-panel" data-panel="field">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="field">
                ${ColorPicker({ defaultColor: '#f0f0f0' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Border Radius</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="field-radius" min="0" max="20" value="10" />
                <span class="control-value">10px</span>
              </div>
            </div>
          </div>

          <!-- Highlight Controls -->
          <div class="kwami-input-panel" data-panel="highlight">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="highlight">
                ${ColorPicker({ defaultColor: '#ff9500' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Width</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="highlight-width" min="40" max="100" value="80" />
                <span class="control-value">80%</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Height</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="highlight-height" min="1" max="4" value="2" />
                <span class="control-value">2px</span>
              </div>
            </div>
          </div>

          <!-- Text Controls -->
          <div class="kwami-input-panel" data-panel="text">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="text">
                ${ColorPicker({ defaultColor: '#333333' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Font Size</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="text-size" min="12" max="20" value="14" step="1" />
                <span class="control-value">14px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Placeholder</label>
              <div class="control-color-picker" data-color-target="placeholder">
                ${ColorPicker({ defaultColor: '#999999' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Helper function to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  r = Math.min(255, Math.max(0, r + Math.round(r * percent / 100)));
  g = Math.min(255, Math.max(0, g + Math.round(g * percent / 100)));
  b = Math.min(255, Math.max(0, b + Math.round(b * percent / 100)));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function initInput(container: HTMLElement): void {
  const input = container.querySelector('.kwami-input') as HTMLInputElement;
  const wrapper = container.querySelector('.kwami-input-wrapper') as HTMLElement;
  const bezel = container.querySelector('.kwami-input-bezel') as HTMLElement;
  const highlight = container.querySelector('.kwami-input-highlight') as HTMLElement;
  
  let highlightColor = '#ff9500';
  let highlightWidth = 80;

  input?.addEventListener('focus', () => {
    wrapper?.classList.add('focused');
    if (highlight) {
      highlight.style.width = `${highlightWidth}%`;
    }
  });
  
  input?.addEventListener('blur', () => {
    wrapper?.classList.remove('focused');
    if (highlight) {
      highlight.style.width = '0';
    }
  });

  // Initialize ColorPickers
  const controlsPanel = container.querySelector('.kwami-input-controls');
  if (controlsPanel) {
    initColorPicker(controlsPanel as HTMLElement);
  }

  // Part selector tabs
  const partBtns = container.querySelectorAll('.kwami-input-part-btn');
  const panels = container.querySelectorAll('.kwami-input-panel');

  partBtns.forEach(partBtn => {
    partBtn.addEventListener('click', () => {
      const part = partBtn.getAttribute('data-part');
      
      partBtns.forEach(b => b.classList.remove('active'));
      partBtn.classList.add('active');
      
      panels.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-panel') === part);
      });

      highlightPart(part);
    });
  });

  function highlightPart(part: string | null) {
    bezel?.classList.remove('editing');
    wrapper?.classList.remove('editing');
    highlight?.classList.remove('editing');
    input?.classList.remove('editing');

    switch(part) {
      case 'bezel': bezel?.classList.add('editing'); break;
      case 'field': wrapper?.classList.add('editing'); break;
      case 'highlight': 
        highlight?.classList.add('editing');
        // Temporarily show highlight
        if (highlight) highlight.style.width = `${highlightWidth}%`;
        break;
      case 'text': input?.classList.add('editing'); break;
    }
  }

  highlightPart('bezel');

  // Color picker event handlers
  const colorPickers = container.querySelectorAll('.control-color-picker');
  colorPickers.forEach(pickerWrapper => {
    const target = pickerWrapper.getAttribute('data-color-target');
    const picker = pickerWrapper.querySelector('.kwami-colorpicker');
    
    picker?.addEventListener('colorchange', (e) => {
      const color = (e as CustomEvent).detail.color;
      
      switch(target) {
        case 'bezel':
          if (bezel) {
            const lighterColor = adjustBrightness(color, 10);
            const darkerColor = adjustBrightness(color, -15);
            bezel.style.background = `linear-gradient(145deg, ${lighterColor} 0%, ${color} 50%, ${darkerColor} 100%)`;
          }
          break;
        case 'field':
          if (wrapper) {
            const fieldLight = adjustBrightness(color, 5);
            const fieldDark = adjustBrightness(color, -5);
            wrapper.style.background = `linear-gradient(160deg, ${color} 0%, ${fieldLight} 50%, ${fieldDark} 100%)`;
          }
          break;
        case 'highlight':
          highlightColor = color;
          if (highlight) {
            highlight.style.background = `linear-gradient(90deg, ${color}, ${adjustBrightness(color, 20)})`;
          }
          break;
        case 'text':
          if (input) input.style.color = color;
          break;
        case 'placeholder':
          if (input) input.style.setProperty('--placeholder-color', color);
          break;
      }
    });
  });

  // Slider controls
  const sliders = container.querySelectorAll('.kwami-ctrl-slider');
  sliders.forEach(slider => {
    const sliderInput = slider as HTMLInputElement;
    const prop = sliderInput.getAttribute('data-prop');
    const valueSpan = sliderInput.parentElement?.querySelector('.control-value');

    const updateValue = () => {
      const val = parseFloat(sliderInput.value);
      
      switch(prop) {
        case 'bezel-radius':
          if (bezel) bezel.style.borderRadius = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'bezel-padding':
          if (bezel) bezel.style.padding = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'field-radius':
          if (wrapper) wrapper.style.borderRadius = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'highlight-width':
          highlightWidth = val;
          if (highlight && wrapper?.classList.contains('focused')) {
            highlight.style.width = `${val}%`;
          }
          if (valueSpan) valueSpan.textContent = `${val}%`;
          break;
        case 'highlight-height':
          if (highlight) highlight.style.height = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'text-size':
          if (input) input.style.fontSize = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
      }
    };

    sliderInput.addEventListener('input', updateValue);
  });
}
