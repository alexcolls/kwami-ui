import './Activator.css'
import { ColorPicker, initColorPicker } from '../ColorPicker/ColorPicker'

export function Activator(): string {
  return `
    <div class="kwami-activator-wrapper">
      <!-- Live Preview -->
      <div class="kwami-activator-preview">
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
      </div>

      <!-- Controls Panel -->
      <div class="kwami-activator-controls">
        <div class="kwami-activator-parts">
          <button class="kwami-activator-part-btn active" data-part="bezel" title="Outer bezel">
            <span class="part-icon">◰</span>
            <span class="part-label">Bezel</span>
          </button>
          <button class="kwami-activator-part-btn" data-part="face" title="Button face">
            <span class="part-icon">▣</span>
            <span class="part-label">Face</span>
          </button>
          <button class="kwami-activator-part-btn" data-part="led" title="LED indicator">
            <span class="part-icon">●</span>
            <span class="part-label">LED</span>
          </button>
          <button class="kwami-activator-part-btn" data-part="text" title="Button text">
            <span class="part-icon">T</span>
            <span class="part-label">Text</span>
          </button>
        </div>

        <div class="kwami-activator-control-panels">
          <!-- Bezel Controls -->
          <div class="kwami-activator-panel active" data-panel="bezel">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="bezel">
                ${ColorPicker({ defaultColor: '#d0d0d0' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Border Radius</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="bezel-radius" min="0" max="30" value="16" />
                <span class="control-value">16px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Padding</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="bezel-padding" min="2" max="16" value="8" />
                <span class="control-value">8px</span>
              </div>
            </div>
          </div>

          <!-- Face Controls -->
          <div class="kwami-activator-panel" data-panel="face">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="face">
                ${ColorPicker({ defaultColor: '#e8e8e8' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Border Radius</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="face-radius" min="0" max="24" value="10" />
                <span class="control-value">10px</span>
              </div>
            </div>
          </div>

          <!-- LED Controls -->
          <div class="kwami-activator-panel" data-panel="led">
            <div class="control-row">
              <label class="control-label">Active Color</label>
              <div class="control-color-picker" data-color-target="led">
                ${ColorPicker({ defaultColor: '#ff9500' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Size</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="led-size" min="8" max="20" value="12" />
                <span class="control-value">12px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Glow</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="led-glow" min="0" max="100" value="50" />
                <span class="control-value">50%</span>
              </div>
            </div>
          </div>

          <!-- Text Controls -->
          <div class="kwami-activator-panel" data-panel="text">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="text">
                ${ColorPicker({ defaultColor: '#555555' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Content</label>
              <input type="text" class="kwami-ctrl-input" data-prop="text-content" value="PUSH" maxlength="10" />
            </div>
            <div class="control-row">
              <label class="control-label">Font Size</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="text-size" min="8" max="14" value="11" step="1" />
                <span class="control-value">11px</span>
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

export function initActivator(container: HTMLElement): void {
  const activator = container.querySelector('.kwami-activator') as HTMLElement;
  const bezel = container.querySelector('.kwami-activator-bezel') as HTMLElement;
  const face = container.querySelector('.kwami-activator-face') as HTMLElement;
  const led = container.querySelector('.kwami-activator-led') as HTMLElement;
  const text = container.querySelector('.kwami-activator-text') as HTMLElement;
  
  let isActive = false;
  let ledColor = '#ff9500';
  let ledGlow = 50;

  activator?.addEventListener('click', () => {
    isActive = !isActive;
    if (isActive) {
      led?.classList.add('active');
      activator.classList.add('active');
      updateLedStyle();
    } else {
      led?.classList.remove('active');
      activator.classList.remove('active');
    }
  });

  function updateLedStyle() {
    if (led && isActive) {
      const glowSize = 8 + (ledGlow / 100) * 16;
      led.style.background = `radial-gradient(circle at 30% 30%, ${adjustBrightness(ledColor, 40)}, ${ledColor})`;
      led.style.boxShadow = `
        0 0 ${glowSize}px ${ledColor}cc,
        0 0 ${glowSize * 2}px ${ledColor}80,
        0 0 ${glowSize * 3}px ${ledColor}4d
      `;
    }
  }

  // Initialize ColorPickers
  const controlsPanel = container.querySelector('.kwami-activator-controls');
  if (controlsPanel) {
    initColorPicker(controlsPanel as HTMLElement);
  }

  // Part selector tabs
  const partBtns = container.querySelectorAll('.kwami-activator-part-btn');
  const panels = container.querySelectorAll('.kwami-activator-panel');

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
    face?.classList.remove('editing');
    led?.classList.remove('editing');
    text?.classList.remove('editing');

    switch(part) {
      case 'bezel': bezel?.classList.add('editing'); break;
      case 'face': face?.classList.add('editing'); break;
      case 'led': led?.classList.add('editing'); break;
      case 'text': text?.classList.add('editing'); break;
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
            const lighterColor = adjustBrightness(color, 20);
            const darkerColor = adjustBrightness(color, -20);
            bezel.style.background = `linear-gradient(145deg, ${lighterColor} 0%, ${color} 50%, ${darkerColor} 100%)`;
          }
          break;
        case 'face':
          if (face) {
            const highlight = adjustBrightness(color, 30);
            const midLight = adjustBrightness(color, 15);
            const midDark = adjustBrightness(color, -10);
            const shadow = adjustBrightness(color, -25);
            face.style.background = `linear-gradient(160deg, ${highlight} 0%, ${midLight} 20%, ${color} 50%, ${midDark} 80%, ${shadow} 100%)`;
          }
          break;
        case 'led':
          ledColor = color;
          updateLedStyle();
          break;
        case 'text':
          if (text) {
            text.style.color = color;
            text.style.textShadow = 'none';
          }
          break;
      }
    });
  });

  // Slider controls
  const sliders = container.querySelectorAll('.kwami-ctrl-slider');
  sliders.forEach(slider => {
    const input = slider as HTMLInputElement;
    const prop = input.getAttribute('data-prop');
    const valueSpan = input.parentElement?.querySelector('.control-value');

    const updateValue = () => {
      const val = parseFloat(input.value);
      
      switch(prop) {
        case 'bezel-radius':
          if (bezel) bezel.style.borderRadius = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'bezel-padding':
          if (bezel) bezel.style.padding = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'face-radius':
          if (face) face.style.borderRadius = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'led-size':
          if (led) {
            led.style.width = `${val}px`;
            led.style.height = `${val}px`;
          }
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'led-glow':
          ledGlow = val;
          updateLedStyle();
          if (valueSpan) valueSpan.textContent = `${val}%`;
          break;
        case 'text-size':
          if (text) text.style.fontSize = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
      }
    };

    input.addEventListener('input', updateValue);
  });

  // Text content input
  const textInput = container.querySelector('.kwami-ctrl-input[data-prop="text-content"]') as HTMLInputElement;
  textInput?.addEventListener('input', () => {
    if (text) text.textContent = textInput.value || 'PUSH';
  });
}
