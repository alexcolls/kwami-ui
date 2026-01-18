import './Toggle.css'
import 'iconify-icon'
import { ColorPicker, initColorPicker } from '../ColorPicker/ColorPicker'

interface ToggleState {
  icon: string;
  label: string;
}

export function Toggle(): string {
  return `
    <div class="kwami-toggle-wrapper">
      <!-- Live Preview -->
      <div class="kwami-toggle-preview">
        <div class="kwami-toggle" data-state="0">
          <button class="kwami-toggle-btn" title="Click to toggle">
            <span class="kwami-toggle-highlight"></span>
            <iconify-icon class="kwami-toggle-icon" icon="solar:sun-bold" width="20" height="20"></iconify-icon>
          </button>
          <span class="kwami-toggle-label">Light</span>
        </div>
      </div>

      <!-- Controls Panel -->
      <div class="kwami-toggle-controls">
        <div class="kwami-toggle-parts">
          <button class="kwami-toggle-part-btn active" data-part="button" title="Button background">
            <span class="part-icon">▢</span>
            <span class="part-label">Button</span>
          </button>
          <button class="kwami-toggle-part-btn" data-part="highlight" title="Highlight shine">
            <span class="part-icon">◐</span>
            <span class="part-label">Shine</span>
          </button>
          <button class="kwami-toggle-part-btn" data-part="icon" title="Icon">
            <span class="part-icon">☀</span>
            <span class="part-label">Icon</span>
          </button>
          <button class="kwami-toggle-part-btn" data-part="label" title="Label text">
            <span class="part-icon">T</span>
            <span class="part-label">Label</span>
          </button>
        </div>

        <div class="kwami-toggle-control-panels">
          <!-- Button Controls -->
          <div class="kwami-toggle-panel active" data-panel="button">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="button">
                ${ColorPicker({ defaultColor: '#e0e5ec' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Size</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="button-size" min="32" max="72" value="48" />
                <span class="control-value">48px</span>
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Border Radius</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="button-radius" min="0" max="36" value="14" />
                <span class="control-value">14px</span>
              </div>
            </div>
          </div>

          <!-- Highlight Controls -->
          <div class="kwami-toggle-panel" data-panel="highlight">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="highlight">
                ${ColorPicker({ defaultColor: '#ffffff' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Intensity</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="highlight-opacity" min="0" max="100" value="15" />
                <span class="control-value">15%</span>
              </div>
            </div>
          </div>

          <!-- Icon Controls -->
          <div class="kwami-toggle-panel" data-panel="icon">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="icon">
                ${ColorPicker({ defaultColor: '#666666' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Size</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="icon-size" min="14" max="32" value="20" />
                <span class="control-value">20px</span>
              </div>
            </div>
          </div>

          <!-- Label Controls -->
          <div class="kwami-toggle-panel" data-panel="label">
            <div class="control-row">
              <label class="control-label">Color</label>
              <div class="control-color-picker" data-color-target="label">
                ${ColorPicker({ defaultColor: '#888888' })}
              </div>
            </div>
            <div class="control-row">
              <label class="control-label">Font Size</label>
              <div class="control-slider">
                <input type="range" class="kwami-ctrl-slider" data-prop="label-size" min="8" max="16" value="11" step="1" />
                <span class="control-value">11px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initToggle(container: HTMLElement): void {
  const toggles = container.querySelectorAll('.kwami-toggle');
  
  toggles.forEach(toggle => {
    const btn = toggle.querySelector('.kwami-toggle-btn') as HTMLButtonElement;
    const icon = toggle.querySelector('.kwami-toggle-icon') as HTMLElement;
    const label = toggle.querySelector('.kwami-toggle-label') as HTMLElement;
    const highlight = toggle.querySelector('.kwami-toggle-highlight') as HTMLElement;
    
    if (!btn || !icon || !label) return;
    
    // Define states with icons and labels
    const states: ToggleState[] = [
      { icon: 'solar:sun-bold', label: 'Light' },
      { icon: 'solar:moon-bold', label: 'Dark' },
      { icon: 'solar:monitor-bold', label: 'System' }
    ];
    
    let currentState = parseInt(toggle.getAttribute('data-state') || '0');
    
    const updateState = (stateIndex: number) => {
      currentState = stateIndex % states.length;
      const state = states[currentState];
      
      // Add animation class
      icon.classList.add('switching');
      
      setTimeout(() => {
        icon.setAttribute('icon', state.icon);
        label.textContent = state.label;
        toggle.setAttribute('data-state', String(currentState));
        
        // Remove animation class
        setTimeout(() => icon.classList.remove('switching'), 150);
      }, 100);
      
      // Dispatch event
      toggle.dispatchEvent(new CustomEvent('togglechange', {
        detail: { 
          state: currentState,
          icon: state.icon,
          label: state.label
        },
        bubbles: true
      }));
    };
    
    btn.addEventListener('click', () => {
      updateState(currentState + 1);
    });
    
    // Initialize
    const state = states[currentState];
    icon.setAttribute('icon', state.icon);
    label.textContent = state.label;

    // Initialize ColorPickers
    const controlsPanel = container.querySelector('.kwami-toggle-controls');
    if (controlsPanel) {
      initColorPicker(controlsPanel as HTMLElement);
    }

    // Part selector tabs
    const partBtns = container.querySelectorAll('.kwami-toggle-part-btn');
    const panels = container.querySelectorAll('.kwami-toggle-panel');

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
      btn?.classList.remove('editing');
      highlight?.classList.remove('editing');
      icon?.classList.remove('editing');
      label?.classList.remove('editing');

      switch(part) {
        case 'button': btn?.classList.add('editing'); break;
        case 'highlight': highlight?.classList.add('editing'); break;
        case 'icon': icon?.classList.add('editing'); break;
        case 'label': label?.classList.add('editing'); break;
      }
    }

    highlightPart('button');

    // Color picker event handlers
    const colorPickers = container.querySelectorAll('.control-color-picker');
    colorPickers.forEach(pickerWrapper => {
      const target = pickerWrapper.getAttribute('data-color-target');
      const picker = pickerWrapper.querySelector('.kwami-colorpicker');
      
      picker?.addEventListener('colorchange', (e) => {
        const color = (e as CustomEvent).detail.color;
        
        switch(target) {
          case 'button':
            if (btn) btn.style.background = color;
            break;
          case 'highlight':
            if (highlight) highlight.style.background = `linear-gradient(180deg, ${color}26 0%, transparent 100%)`;
            break;
          case 'icon':
            if (icon) icon.style.color = color;
            break;
          case 'label':
            if (label) label.style.color = color;
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
          case 'button-size':
            if (btn) {
              btn.style.width = `${val}px`;
              btn.style.height = `${val}px`;
            }
            if (valueSpan) valueSpan.textContent = `${val}px`;
            break;
          case 'button-radius':
            if (btn) btn.style.borderRadius = `${val}px`;
            if (valueSpan) valueSpan.textContent = `${val}px`;
            break;
          case 'highlight-opacity':
            if (highlight) highlight.style.opacity = String(val / 100);
            if (valueSpan) valueSpan.textContent = `${val}%`;
            break;
          case 'icon-size':
            if (icon) {
              icon.setAttribute('width', String(val));
              icon.setAttribute('height', String(val));
            }
            if (valueSpan) valueSpan.textContent = `${val}px`;
            break;
          case 'label-size':
            if (label) label.style.fontSize = `${val}px`;
            if (valueSpan) valueSpan.textContent = `${val}px`;
            break;
        }
      };

      input.addEventListener('input', updateValue);
    });
  });
}
