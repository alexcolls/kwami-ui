import './Button.css'
import { ColorPicker, initColorPicker } from '../ColorPicker/ColorPicker'

export function Button(): string {
  return `
    <div class="kwami-button-wrapper">
      <!-- Live Preview Button -->
      <div class="kwami-button-preview">
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
      </div>

      <!-- Controls Panel (visible when expanded) -->
      <div class="kwami-button-controls">
        <!-- Part Selector -->
        <div class="kwami-button-parts">
          <button class="kwami-button-part-btn active" data-part="bezel" title="Bezel (outer frame)">
            <span class="part-icon">◰</span>
            <span class="part-label">Bezel</span>
          </button>
          <button class="kwami-button-part-btn" data-part="face" title="Face (button surface)">
            <span class="part-icon">▣</span>
            <span class="part-label">Face</span>
          </button>
          <button class="kwami-button-part-btn" data-part="highlight" title="Highlight (shine effect)">
            <span class="part-icon">◐</span>
            <span class="part-label">Shine</span>
          </button>
          <button class="kwami-button-part-btn" data-part="text" title="Text (label)">
            <span class="part-icon">T</span>
            <span class="part-label">Text</span>
          </button>
        </div>

        <!-- Control Panels for each part -->
        <div class="kwami-button-control-panels">
          <!-- Bezel Controls -->
          <div class="kwami-button-panel active" data-panel="bezel">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="bezel">
                ${ColorPicker({ defaultColor: '#d0d0d0' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Border Radius</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="bezel-radius" min="0" max="30" value="14" />
                <span class="control-value">14px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Padding</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="bezel-padding" min="2" max="16" value="6" />
                <span class="control-value">6px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Shadow Depth</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="bezel-shadow" min="0" max="100" value="50" />
                <span class="control-value">50%</span>
              </div>
            </div>
          </div>

          <!-- Face Controls -->
          <div class="kwami-button-panel" data-panel="face">
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
            <div class="control-row">
              <label class="control-label">3D Depth</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="face-depth" min="0" max="100" value="50" />
                <span class="control-value">50%</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Brightness</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="face-brightness" min="0" max="100" value="50" />
                <span class="control-value">50%</span>
              </div>
            </div>
          </div>

          <!-- Highlight Controls -->
          <div class="kwami-button-panel" data-panel="highlight">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="highlight">
                ${ColorPicker({ defaultColor: '#ffffff' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Intensity</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="highlight-opacity" min="0" max="100" value="40" />
                <span class="control-value">40%</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Coverage</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="highlight-height" min="20" max="80" value="50" />
                <span class="control-value">50%</span>
              </div>
            </div>
          </div>

          <!-- Text Controls -->
          <div class="kwami-button-panel" data-panel="text">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="text">
                ${ColorPicker({ defaultColor: '#555555' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Content</label>
              <input type="text" class="kwami-ctrl-input" data-prop="text-content" value="CLICK" maxlength="20" />
            </div>
            <div class="control-row">
              <label class="control-label">Font Size</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="text-size" min="8" max="18" value="12" step="1" />
                <span class="control-value">12px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Letter Spacing</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="text-spacing" min="0" max="8" value="2" step="0.5" />
                <span class="control-value">2px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Weight</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="text-weight" min="400" max="800" value="600" step="100" />
                <span class="control-value">600</span>
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

export function initButton(container: HTMLElement): void {
  const button = container.querySelector('.kwami-button');
  const bezel = container.querySelector('.kwami-button-bezel') as HTMLElement;
  const face = container.querySelector('.kwami-button-face') as HTMLElement;
  const highlight = container.querySelector('.kwami-button-highlight') as HTMLElement;
  const text = container.querySelector('.kwami-button-text') as HTMLElement;
  
  // Button click handler
  button?.addEventListener('click', () => {
    button.classList.add('pressed');
    setTimeout(() => button.classList.remove('pressed'), 150);
  });

  // Initialize ColorPickers in the controls panel
  const controlsPanel = container.querySelector('.kwami-button-controls');
  if (controlsPanel) {
    initColorPicker(controlsPanel as HTMLElement);
  }

  // Part selector tabs
  const partBtns = container.querySelectorAll('.kwami-button-part-btn');
  const panels = container.querySelectorAll('.kwami-button-panel');

  partBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const part = btn.getAttribute('data-part');
      
      // Update active states
      partBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      panels.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-panel') === part);
      });

      // Highlight the part being edited
      highlightPart(part);
    });
  });

  // Highlight effect on the button
  function highlightPart(part: string | null) {
    bezel?.classList.remove('editing');
    face?.classList.remove('editing');
    highlight?.classList.remove('editing');
    text?.classList.remove('editing');

    switch(part) {
      case 'bezel': bezel?.classList.add('editing'); break;
      case 'face': face?.classList.add('editing'); break;
      case 'highlight': highlight?.classList.add('editing'); break;
      case 'text': text?.classList.add('editing'); break;
    }
  }

  // Initialize highlight on first part
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
        case 'highlight':
          if (highlight) {
            highlight.style.background = `linear-gradient(180deg, ${color}66 0%, ${color}1a 50%, transparent 100%)`;
          }
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
        // Bezel
        case 'bezel-radius':
          if (bezel) bezel.style.borderRadius = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'bezel-padding':
          if (bezel) bezel.style.padding = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'bezel-shadow':
          if (bezel) {
            const intensity = val / 100;
            bezel.style.setProperty('--shadow-intensity', String(intensity));
          }
          if (valueSpan) valueSpan.textContent = `${val}%`;
          break;

        // Face
        case 'face-radius':
          if (face) face.style.borderRadius = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'face-depth':
          if (face) face.style.setProperty('--face-depth', String(val / 100));
          if (valueSpan) valueSpan.textContent = `${val}%`;
          break;
        case 'face-brightness':
          if (face) face.style.setProperty('--face-brightness', String(val / 100));
          if (valueSpan) valueSpan.textContent = `${val}%`;
          break;

        // Highlight
        case 'highlight-opacity':
          if (highlight) highlight.style.opacity = String(val / 100);
          if (valueSpan) valueSpan.textContent = `${val}%`;
          break;
        case 'highlight-height':
          if (highlight) highlight.style.height = `${val}%`;
          if (valueSpan) valueSpan.textContent = `${val}%`;
          break;

        // Text
        case 'text-size':
          if (text) text.style.fontSize = `${val / 16}rem`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'text-spacing':
          if (text) text.style.letterSpacing = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'text-weight':
          if (text) text.style.fontWeight = String(val);
          if (valueSpan) valueSpan.textContent = String(val);
          break;
      }
    };

    input.addEventListener('input', updateValue);
  });

  // Text content input
  const textInput = container.querySelector('.kwami-ctrl-input[data-prop="text-content"]') as HTMLInputElement;
  textInput?.addEventListener('input', () => {
    if (text) text.textContent = textInput.value || 'CLICK';
  });
}
