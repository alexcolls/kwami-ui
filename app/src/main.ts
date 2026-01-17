import './style.css'
import 'iconify-icon'
import { Button, initButton } from './components/Button/Button'
import { Toggle, initToggle } from './components/Toggle/Toggle'
import { Activator, initActivator } from './components/Activator/Activator'
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
import { Checkbox, initCheckbox } from './components/Checkbox/Checkbox'
import { Radio, initRadio } from './components/Radio/Radio'
import { Stepper, initStepper } from './components/Stepper/Stepper'
import { Fader, initFader } from './components/Fader/Fader'
import { Tabs, initTabs } from './components/Tabs/Tabs'
import { Accordion, initAccordion } from './components/Accordion/Accordion'
import { Title } from './components/Title/Title'

// Theme state
interface Theme {
  mode: 'light' | 'dark' | 'system';
  colors: {
    light: {
      primary: string;
      secondary: string;
    };
    dark: {
      primary: string;
      secondary: string;
    };
  };
}

const defaultTheme: Theme = {
  mode: 'dark',
  colors: {
    light: {
      primary: '#ff9500',
      secondary: '#007aff'
    },
    dark: {
      primary: '#ff9500',
      secondary: '#5856d6'
    }
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

function getEffectiveTheme(): 'light' | 'dark' {
  if (currentTheme.mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return currentTheme.mode;
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const body = document.body;
  const effectiveTheme = getEffectiveTheme();
  
  // Apply theme attribute to both root and body
  root.setAttribute('data-theme', effectiveTheme);
  body.setAttribute('data-theme', effectiveTheme);
  
  // Set accent color properties based on effective theme
  root.style.setProperty('--accent-primary', theme.colors[effectiveTheme].primary);
  root.style.setProperty('--accent-secondary', theme.colors[effectiveTheme].secondary);
  // Keep backward compatibility
  root.style.setProperty('--accent-light', theme.colors.light.primary);
  root.style.setProperty('--accent-dark', theme.colors.dark.primary);
  
  // Update color picker visibility
  updateColorPickerVisibility();
}

function setThemeMode(mode: 'light' | 'dark' | 'system'): void {
  currentTheme.mode = mode;
  saveTheme(currentTheme);
}

function updateAccentColor(themeMode: 'light' | 'dark', colorType: 'primary' | 'secondary', value: string): void {
  currentTheme.colors[themeMode][colorType] = value;
  saveTheme(currentTheme);
}

function updateColorPickerVisibility(): void {
  const effectiveTheme = getEffectiveTheme();
  const lightColors = document.querySelector('.header-colors-light') as HTMLElement;
  const darkColors = document.querySelector('.header-colors-dark') as HTMLElement;
  
  if (lightColors && darkColors) {
    lightColors.style.display = effectiveTheme === 'light' ? 'flex' : 'none';
    darkColors.style.display = effectiveTheme === 'dark' ? 'flex' : 'none';
  }
}

// Initialize App
function initApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  
  if (!app) {
    console.error('App element not found!');
    return;
  }
  
  const themeStateIndex = currentTheme.mode === 'light' ? 0 : currentTheme.mode === 'dark' ? 1 : 2;
  const effectiveTheme = getEffectiveTheme();
  
  app.innerHTML = `
    <header class="kwami-header">
      <div class="header-logo">
        ${Title('KWAMI UI')}
      </div>
      <div class="theme-controls">
        <div class="header-color-pickers">
          <div class="header-colors-light" style="display: ${effectiveTheme === 'light' ? 'flex' : 'none'}">
            <div class="header-color-group">
              <span class="header-color-label">Primary</span>
              ${ColorPicker({ defaultColor: currentTheme.colors.light.primary })}
            </div>
            <div class="header-color-group">
              <span class="header-color-label">Secondary</span>
              ${ColorPicker({ defaultColor: currentTheme.colors.light.secondary })}
            </div>
          </div>
          <div class="header-colors-dark" style="display: ${effectiveTheme === 'dark' ? 'flex' : 'none'}">
            <div class="header-color-group">
              <span class="header-color-label">Primary</span>
              ${ColorPicker({ defaultColor: currentTheme.colors.dark.primary })}
            </div>
            <div class="header-color-group">
              <span class="header-color-label">Secondary</span>
              ${ColorPicker({ defaultColor: currentTheme.colors.dark.secondary })}
            </div>
          </div>
        </div>
        <div class="header-theme-toggle" data-state="${themeStateIndex}">
          <button class="kwami-toggle-btn" title="Click to toggle theme">
            <iconify-icon class="kwami-toggle-icon" icon="${currentTheme.mode === 'light' ? 'solar:sun-bold' : currentTheme.mode === 'dark' ? 'solar:moon-bold' : 'solar:monitor-bold'}" width="14" height="14"></iconify-icon>
          </button>
          <span class="kwami-toggle-label">${currentTheme.mode === 'light' ? 'Light' : currentTheme.mode === 'dark' ? 'Dark' : 'System'}</span>
        </div>
      </div>
    </header>

    <main class="components-grid">
      ${Expandable({ title: 'Button', content: Button(), id: 'button' })}
      ${Box({ title: 'Toggle', content: Toggle(), id: 'toggle' })}
      ${Box({ title: 'Activator', content: Activator(), id: 'activator' })}
      ${Box({ title: 'Switch', content: Switch(), id: 'switch' })}
      ${Box({ title: 'Input', content: Input(), id: 'input' })}
      ${Box({ title: 'Selector', content: Selector(), id: 'selector' })}
      ${Box({ title: 'Slider', content: Slider(), id: 'slider' })}
      ${Box({ title: 'Knob', content: Knob(), id: 'knob' })}
      ${Box({ title: 'Fader', content: Fader(), id: 'fader' })}
      ${Box({ title: 'Popover', content: Popover(), id: 'popover' })}
      ${Box({ title: 'Tooltip', content: Tooltip(), id: 'tooltip' })}
      ${Box({ title: 'Color Picker', content: ColorPicker(), id: 'colorpicker' })}
      ${Box({ title: 'Checkbox', content: Checkbox(), id: 'checkbox' })}
      ${Box({ title: 'Radio', content: Radio(), id: 'radio' })}
      ${Box({ title: 'Stepper', content: Stepper(), id: 'stepper' })}
      ${Box({ title: 'Tabs', content: Tabs(), id: 'tabs' })}
      ${Box({ title: 'Accordion', content: Accordion(), id: 'accordion' })}
    </main>
  `;

  // Initialize Expandable functionality
  initExpandable(app);

  // Initialize component event listeners
  const buttonWrapper = document.querySelector('[data-component="button"]') as HTMLElement;
  const toggleWrapper = document.querySelector('[data-component="toggle"]') as HTMLElement;
  const activatorWrapper = document.querySelector('[data-component="activator"]') as HTMLElement;
  const switchWrapper = document.querySelector('[data-component="switch"]') as HTMLElement;
  const inputWrapper = document.querySelector('[data-component="input"]') as HTMLElement;
  const selectorWrapper = document.querySelector('[data-component="selector"]') as HTMLElement;
  const sliderWrapper = document.querySelector('[data-component="slider"]') as HTMLElement;
  const knobWrapper = document.querySelector('[data-component="knob"]') as HTMLElement;
  const faderWrapper = document.querySelector('[data-component="fader"]') as HTMLElement;
  const popoverWrapper = document.querySelector('[data-component="popover"]') as HTMLElement;
  const tooltipWrapper = document.querySelector('[data-component="tooltip"]') as HTMLElement;
  const colorPickerWrapper = document.querySelector('[data-component="colorpicker"]') as HTMLElement;
  const checkboxWrapper = document.querySelector('[data-component="checkbox"]') as HTMLElement;
  const radioWrapper = document.querySelector('[data-component="radio"]') as HTMLElement;
  const stepperWrapper = document.querySelector('[data-component="stepper"]') as HTMLElement;
  const tabsWrapper = document.querySelector('[data-component="tabs"]') as HTMLElement;
  const accordionWrapper = document.querySelector('[data-component="accordion"]') as HTMLElement;

  if (buttonWrapper) initButton(buttonWrapper);
  if (toggleWrapper) initToggle(toggleWrapper);
  if (activatorWrapper) initActivator(activatorWrapper);
  if (switchWrapper) initSwitch(switchWrapper);
  if (inputWrapper) initInput(inputWrapper);
  if (selectorWrapper) initSelector(selectorWrapper);
  if (sliderWrapper) initSlider(sliderWrapper);
  if (knobWrapper) initKnob(knobWrapper);
  if (faderWrapper) initFader(faderWrapper);
  if (popoverWrapper) initPopover(popoverWrapper);
  if (tooltipWrapper) initTooltip(tooltipWrapper);
  if (colorPickerWrapper) initColorPicker(colorPickerWrapper);
  if (checkboxWrapper) initCheckbox(checkboxWrapper);
  if (radioWrapper) initRadio(radioWrapper);
  if (stepperWrapper) initStepper(stepperWrapper);
  if (tabsWrapper) initTabs(tabsWrapper);
  if (accordionWrapper) initAccordion(accordionWrapper);

  // Initialize header color pickers
  const headerColorPickers = document.querySelector('.header-color-pickers') as HTMLElement;
  if (headerColorPickers) {
    initColorPicker(headerColorPickers);
  }

  // Header theme toggle
  const headerToggle = document.querySelector('.header-theme-toggle') as HTMLElement;
  if (headerToggle) {
    const btn = headerToggle.querySelector('.kwami-toggle-btn') as HTMLButtonElement;
    const icon = headerToggle.querySelector('.kwami-toggle-icon') as HTMLElement;
    const label = headerToggle.querySelector('.kwami-toggle-label') as HTMLElement;
    
    interface ToggleState {
      mode: 'light' | 'dark' | 'system';
      icon: string;
      label: string;
    }
    
    const states: ToggleState[] = [
      { mode: 'light', icon: 'solar:sun-bold', label: 'Light' },
      { mode: 'dark', icon: 'solar:moon-bold', label: 'Dark' },
      { mode: 'system', icon: 'solar:monitor-bold', label: 'System' }
    ];
    
    let currentStateIndex = states.findIndex(s => s.mode === currentTheme.mode);
    if (currentStateIndex === -1) currentStateIndex = 1;
    
    btn?.addEventListener('click', () => {
      currentStateIndex = (currentStateIndex + 1) % states.length;
      const state = states[currentStateIndex];
      
      icon?.classList.add('switching');
      
      setTimeout(() => {
        icon?.setAttribute('icon', state.icon);
        if (label) label.textContent = state.label;
        headerToggle.setAttribute('data-state', String(currentStateIndex));
        
        setTimeout(() => icon?.classList.remove('switching'), 150);
      }, 100);
      
      setThemeMode(state.mode);
    });
  }
  
  // Color picker change listeners for header
  const lightPrimary = document.querySelector('.header-colors-light .header-color-group:nth-child(1) .kwami-colorpicker');
  const lightSecondary = document.querySelector('.header-colors-light .header-color-group:nth-child(2) .kwami-colorpicker');
  const darkPrimary = document.querySelector('.header-colors-dark .header-color-group:nth-child(1) .kwami-colorpicker');
  const darkSecondary = document.querySelector('.header-colors-dark .header-color-group:nth-child(2) .kwami-colorpicker');
  
  lightPrimary?.addEventListener('colorchange', (e) => {
    updateAccentColor('light', 'primary', (e as CustomEvent).detail.color);
  });
  
  lightSecondary?.addEventListener('colorchange', (e) => {
    updateAccentColor('light', 'secondary', (e as CustomEvent).detail.color);
  });
  
  darkPrimary?.addEventListener('colorchange', (e) => {
    updateAccentColor('dark', 'primary', (e as CustomEvent).detail.color);
  });
  
  darkSecondary?.addEventListener('colorchange', (e) => {
    updateAccentColor('dark', 'secondary', (e as CustomEvent).detail.color);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentTheme.mode === 'system') {
      applyTheme(currentTheme);
    }
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
