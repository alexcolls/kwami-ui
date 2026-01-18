import './Switch.css'
import { ColorPicker, initColorPicker } from '../ColorPicker/ColorPicker'

export function Switch(): string {
  return `
    <div class="kwami-switch-wrapper">
      <!-- Live Preview -->
      <div class="kwami-switch-preview">
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
      </div>

      <!-- Controls Panel -->
      <div class="kwami-switch-controls">
        <div class="kwami-switch-parts">
          <button class="kwami-switch-part-btn active" data-part="bezel" title="Outer bezel">
            <span class="part-icon">◰</span>
            <span class="part-label">Bezel</span>
          </button>
          <button class="kwami-switch-part-btn" data-part="track" title="Inner track">
            <span class="part-icon">▬</span>
            <span class="part-label">Track</span>
          </button>
          <button class="kwami-switch-part-btn" data-part="thumb" title="Thumb knob">
            <span class="part-icon">●</span>
            <span class="part-label">Thumb</span>
          </button>
          <button class="kwami-switch-part-btn" data-part="active" title="Active state colors">
            <span class="part-icon">⚡</span>
            <span class="part-label">Active</span>
          </button>
        </div>

        <div class="kwami-switch-control-panels">
          <!-- Bezel Controls -->
          <div class="kwami-switch-panel active" data-panel="bezel">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="bezel">
                ${ColorPicker({ defaultColor: '#c8c8c8' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Border Radius</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="bezel-radius" min="8" max="24" value="19" />
                <span class="control-value">19px</span>
              </div>
            </div>
          </div>

          <!-- Track Controls -->
          <div class="kwami-switch-panel" data-panel="track">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="track">
                ${ColorPicker({ defaultColor: '#e8e8e8' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Border Radius</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="track-radius" min="8" max="20" value="15" />
                <span class="control-value">15px</span>
              </div>
            </div>
          </div>

          <!-- Thumb Controls -->
          <div class="kwami-switch-panel" data-panel="thumb">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="thumb">
                ${ColorPicker({ defaultColor: '#e8e8e8' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Size</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="thumb-size" min="18" max="32" value="26" />
                <span class="control-value">26px</span>
              </div>
            </div>
          </div>

          <!-- Active State Controls -->
          <div class="kwami-switch-panel" data-panel="active">
            <div class="control-row">
              <label class="control-label">Track Color</label>
              <div class="control-color-picker" data-color-target="active-track">
                ${ColorPicker({ defaultColor: '#ffe8cc' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Thumb Color</label>
              <div class="control-color-picker" data-color-target="active-thumb">
                ${ColorPicker({ defaultColor: '#ff9500' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Glow</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="active-glow" min="0" max="100" value="50" />
                <span class="control-value">50%</span>
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

export function initSwitch(container: HTMLElement): void {
  const switchInput = container.querySelector('.kwami-switch-input') as HTMLInputElement;
  const bezel = container.querySelector('.kwami-switch-bezel') as HTMLElement;
  const track = container.querySelector('.kwami-switch-track') as HTMLElement;
  const thumb = container.querySelector('.kwami-switch-thumb') as HTMLElement;
  
  // Store custom colors for active state
  let activeTrackColor = '#ffe8cc';
  let activeThumbColor = '#ff9500';
  let activeGlow = 50;
  let thumbColor = '#e8e8e8';

  function updateActiveStyles() {
    if (!switchInput || !track || !thumb) return;
    
    if (switchInput.checked) {
      // Apply custom active track color
      const trackLight = adjustBrightness(activeTrackColor, 10);
      track.style.background = `linear-gradient(145deg, ${activeTrackColor} 0%, ${trackLight} 100%)`;
      
      // Apply custom active thumb color with glow
      const thumbHighlight = adjustBrightness(activeThumbColor, 30);
      const thumbMid = adjustBrightness(activeThumbColor, 10);
      const thumbDark = adjustBrightness(activeThumbColor, -15);
      const thumbShadow = adjustBrightness(activeThumbColor, -25);
      thumb.style.background = `linear-gradient(160deg, ${thumbHighlight} 0%, ${thumbMid} 20%, ${activeThumbColor} 50%, ${thumbDark} 80%, ${thumbShadow} 100%)`;
      
      const glowSize = 3 + (activeGlow / 100) * 13;
      thumb.style.boxShadow = `
        0 3px ${glowSize}px ${activeThumbColor}66,
        0 2px 6px ${activeThumbColor}4d,
        0 0 ${glowSize * 2}px ${activeThumbColor}4d,
        inset 0 2px 3px rgba(255, 255, 255, 0.4),
        inset 0 -2px 4px ${thumbShadow}4d
      `;
    }
  }
  
  switchInput?.addEventListener('change', () => {
    if (switchInput.checked) {
      updateActiveStyles();
    } else {
      // Reset to default (will use CSS styles)
      track.style.background = '';
      thumb.style.background = '';
      thumb.style.boxShadow = '';
    }
  });

  // Initialize ColorPickers
  const controlsPanel = container.querySelector('.kwami-switch-controls');
  if (controlsPanel) {
    initColorPicker(controlsPanel as HTMLElement);
  }

  // Part selector tabs
  const partBtns = container.querySelectorAll('.kwami-switch-part-btn');
  const panels = container.querySelectorAll('.kwami-switch-panel');

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
    track?.classList.remove('editing');
    thumb?.classList.remove('editing');

    switch(part) {
      case 'bezel': bezel?.classList.add('editing'); break;
      case 'track': track?.classList.add('editing'); break;
      case 'thumb': thumb?.classList.add('editing'); break;
      case 'active':
        // Flash the switch to show active state
        if (switchInput && !switchInput.checked) {
          switchInput.checked = true;
          switchInput.dispatchEvent(new Event('change'));
        }
        thumb?.classList.add('editing');
        break;
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
        case 'track':
          if (track && switchInput && !switchInput.checked) {
            const trackLight = adjustBrightness(color, 10);
            track.style.background = `linear-gradient(145deg, ${color} 0%, ${trackLight} 100%)`;
          }
          break;
        case 'thumb':
          thumbColor = color;
          if (thumb && switchInput && !switchInput.checked) {
            const highlight = adjustBrightness(color, 30);
            const midLight = adjustBrightness(color, 15);
            const midDark = adjustBrightness(color, -10);
            const shadow = adjustBrightness(color, -25);
            thumb.style.background = `linear-gradient(160deg, ${highlight} 0%, ${midLight} 20%, ${color} 50%, ${midDark} 80%, ${shadow} 100%)`;
          }
          break;
        case 'active-track':
          activeTrackColor = color;
          updateActiveStyles();
          break;
        case 'active-thumb':
          activeThumbColor = color;
          updateActiveStyles();
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
        case 'track-radius':
          if (track) track.style.borderRadius = `${val}px`;
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'thumb-size':
          if (thumb) {
            thumb.style.width = `${val}px`;
            thumb.style.height = `${val}px`;
          }
          if (valueSpan) valueSpan.textContent = `${val}px`;
          break;
        case 'active-glow':
          activeGlow = val;
          updateActiveStyles();
          if (valueSpan) valueSpan.textContent = `${val}%`;
          break;
      }
    };

    input.addEventListener('input', updateValue);
  });
}
