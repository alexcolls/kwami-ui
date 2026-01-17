import './style.css'
import { Button, initButton } from './components/Button/Button'
import { Toggle, initToggle } from './components/Toggle/Toggle'
import { Switch, initSwitch } from './components/Switch/Switch'
import { Input, initInput } from './components/Input/Input'
import { Selector, initSelector } from './components/Selector/Selector'
import { Slider, initSlider } from './components/Slider/Slider'
import { Knob, initKnob } from './components/Knob/Knob'
import { Popover, initPopover } from './components/Popover/Popover'
import { Tooltip, initTooltip } from './components/Tooltip/Tooltip'
import { Box } from './components/Box/Box'
import { Expandable, initExpandable } from './components/Expandable/Expandable'
import { ColorPicker, initColorPicker } from './components/ColorPicker/ColorPicker'

// Theme state
interface Theme {
  mode: 'light' | 'dark';
  colors: {
    light: string;
    dark: string;
  };
}

const defaultTheme: Theme = {
  mode: 'dark',
  colors: {
    light: '#ff9500',
    dark: '#ff9500'
  }
};

let currentTheme: Theme = loadTheme();

function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem('kwami-theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && parsed.mode && parsed.colors) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to load theme from localStorage, using default:', error);
    localStorage.removeItem('kwami-theme');
  }
  return defaultTheme;
}

function saveTheme(theme: Theme): void {
  localStorage.setItem('kwami-theme', JSON.stringify(theme));
  applyTheme(theme);
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const body = document.body;
  
  // Apply theme attribute to both root and body
  root.setAttribute('data-theme', theme.mode);
  body.setAttribute('data-theme', theme.mode);
  
  // Set accent color properties
  root.style.setProperty('--accent-light', theme.colors.light);
  root.style.setProperty('--accent-dark', theme.colors.dark);
}

function toggleTheme(): void {
  currentTheme.mode = currentTheme.mode === 'dark' ? 'light' : 'dark';
  saveTheme(currentTheme);
  updateThemeToggleIcon();
}

function updateAccentColor(colorKey: 'light' | 'dark', value: string): void {
  currentTheme.colors[colorKey] = value;
  saveTheme(currentTheme);
}

function updateThemeToggleIcon(): void {
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = currentTheme.mode === 'dark' ? '☀️' : '🌙';
  }
}

// Initialize App
function initApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  
  if (!app) {
    console.error('App element not found!');
    return;
  }
  
  app.innerHTML = `
    <header class="kwami-header">
      <h1>✨ Kwami UI</h1>
      <div class="theme-controls">
        <button id="theme-toggle" class="theme-toggle" title="Toggle theme">
          ${currentTheme.mode === 'dark' ? '☀️' : '🌙'}
        </button>
        <div class="color-palette">
          <div class="color-input-group">
            <label for="color-light">Light</label>
            <input type="color" id="color-light" value="${currentTheme.colors.light}" />
          </div>
          <div class="color-input-group">
            <label for="color-dark">Dark</label>
            <input type="color" id="color-dark" value="${currentTheme.colors.dark}" />
          </div>
        </div>
      </div>
    </header>

    <main class="components-grid">
      ${Expandable({ title: 'Button', content: Button(), id: 'button' })}
      ${Box({ title: 'Toggle', content: Toggle(), id: 'toggle' })}
      ${Box({ title: 'Switch', content: Switch(), id: 'switch' })}
      ${Box({ title: 'Input', content: Input(), id: 'input' })}
      ${Box({ title: 'Selector', content: Selector(), id: 'selector' })}
      ${Box({ title: 'Slider', content: Slider(), id: 'slider' })}
      ${Box({ title: 'Knob', content: Knob(), id: 'knob' })}
      ${Box({ title: 'Popover', content: Popover(), id: 'popover' })}
      ${Box({ title: 'Tooltip', content: Tooltip(), id: 'tooltip' })}
      ${Box({ title: 'Color Picker', content: ColorPicker(), id: 'colorpicker' })}
    </main>
  `;

  // Initialize Expandable functionality
  initExpandable(app);

  // Initialize component event listeners
  const buttonWrapper = document.querySelector('[data-component="button"]') as HTMLElement;
  const toggleWrapper = document.querySelector('[data-component="toggle"]') as HTMLElement;
  const switchWrapper = document.querySelector('[data-component="switch"]') as HTMLElement;
  const inputWrapper = document.querySelector('[data-component="input"]') as HTMLElement;
  const selectorWrapper = document.querySelector('[data-component="selector"]') as HTMLElement;
  const sliderWrapper = document.querySelector('[data-component="slider"]') as HTMLElement;
  const knobWrapper = document.querySelector('[data-component="knob"]') as HTMLElement;
  const popoverWrapper = document.querySelector('[data-component="popover"]') as HTMLElement;
  const tooltipWrapper = document.querySelector('[data-component="tooltip"]') as HTMLElement;
  const colorPickerWrapper = document.querySelector('[data-component="colorpicker"]') as HTMLElement;

  if (buttonWrapper) initButton(buttonWrapper);
  if (toggleWrapper) initToggle(toggleWrapper);
  if (switchWrapper) initSwitch(switchWrapper);
  if (inputWrapper) initInput(inputWrapper);
  if (selectorWrapper) initSelector(selectorWrapper);
  if (sliderWrapper) initSlider(sliderWrapper);
  if (knobWrapper) initKnob(knobWrapper);
  if (popoverWrapper) initPopover(popoverWrapper);
  if (tooltipWrapper) initTooltip(tooltipWrapper);
  if (colorPickerWrapper) initColorPicker(colorPickerWrapper);

  // Theme control event listeners
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', toggleTheme);

  const lightColorInput = document.getElementById('color-light') as HTMLInputElement;
  const darkColorInput = document.getElementById('color-dark') as HTMLInputElement;

  lightColorInput?.addEventListener('input', (e) => {
    updateAccentColor('light', (e.target as HTMLInputElement).value);
  });

  darkColorInput?.addEventListener('input', (e) => {
    updateAccentColor('dark', (e.target as HTMLInputElement).value);
  });

  // Apply initial theme
  applyTheme(currentTheme);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
