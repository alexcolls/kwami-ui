import './ColorPicker.css'
import 'iconify-icon'

// EyeDropper API type declaration
declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
    };
  }
}

interface ColorPickerProps {
  defaultColor?: string;
}

export function ColorPicker({ defaultColor = '#ff9500' }: ColorPickerProps = {}): string {
  return `
    <div class="kwami-colorpicker" data-color="${defaultColor}">
      <button class="kwami-colorpicker-trigger" aria-label="Pick a color" title="Pick a color">
        <span class="kwami-colorpicker-preview" style="background-color: ${defaultColor}"></span>
        <iconify-icon icon="solar:palette-linear" width="16" height="16"></iconify-icon>
      </button>
      <div class="kwami-colorpicker-popup">
        <button class="kwami-colorpicker-pipette" aria-label="Pick from screen" title="Pick color from screen">
          <iconify-icon icon="solar:pipette-linear" width="16" height="16"></iconify-icon>
        </button>
        <div class="kwami-colorpicker-wheel">
          <canvas class="kwami-colorpicker-canvas" width="200" height="200"></canvas>
          <div class="kwami-colorpicker-cursor"></div>
        </div>
        <div class="kwami-colorpicker-brightness">
          <iconify-icon icon="solar:sun-linear" width="14" height="14"></iconify-icon>
          <input type="range" class="kwami-colorpicker-brightness-slider" min="0" max="100" value="50" />
          <iconify-icon icon="solar:moon-linear" width="14" height="14"></iconify-icon>
        </div>
        <div class="kwami-colorpicker-value-row">
          <button class="kwami-colorpicker-format-toggle" data-format="hex" title="Toggle format">HEX</button>
          <input type="text" class="kwami-colorpicker-value-input" value="${defaultColor}" spellcheck="false" />
        </div>
      </div>
    </div>
  `;
}

// Helper: HSL to RGB to Hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Helper: HSL to RGB
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };
  return { r: f(0), g: f(8), b: f(4) };
}

// Helper: Hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Helper: RGB to HSL
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Helper: Parse any color format
function parseColor(input: string): { h: number; s: number; l: number } | null {
  input = input.trim();
  
  // HEX format
  if (input.startsWith('#')) {
    const rgb = hexToRgb(input);
    if (rgb) return rgbToHsl(rgb.r, rgb.g, rgb.b);
  }
  
  // RGB format
  const rgbMatch = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (rgbMatch) {
    return rgbToHsl(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]));
  }
  
  // HSL format
  const hslMatch = input.match(/^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)$/i);
  if (hslMatch) {
    return { h: parseInt(hslMatch[1]), s: parseInt(hslMatch[2]), l: parseInt(hslMatch[3]) };
  }
  
  return null;
}

export function initColorPicker(container: HTMLElement): void {
  const pickers = container.querySelectorAll('.kwami-colorpicker');
  
  pickers.forEach(picker => {
    const trigger = picker.querySelector('.kwami-colorpicker-trigger') as HTMLButtonElement;
    const popup = picker.querySelector('.kwami-colorpicker-popup') as HTMLElement;
    const canvas = picker.querySelector('.kwami-colorpicker-canvas') as HTMLCanvasElement;
    const cursor = picker.querySelector('.kwami-colorpicker-cursor') as HTMLElement;
    const preview = picker.querySelector('.kwami-colorpicker-preview') as HTMLElement;
    const brightnessSlider = picker.querySelector('.kwami-colorpicker-brightness-slider') as HTMLInputElement;
    const formatToggle = picker.querySelector('.kwami-colorpicker-format-toggle') as HTMLButtonElement;
    const valueInput = picker.querySelector('.kwami-colorpicker-value-input') as HTMLInputElement;
    const pipetteBtn = picker.querySelector('.kwami-colorpicker-pipette') as HTMLButtonElement;
    
    if (!trigger || !popup || !canvas || !cursor || !preview || !brightnessSlider || !formatToggle || !valueInput || !pipetteBtn) return;
    
    // Check if EyeDropper API is supported
    if (!window.EyeDropper) {
      pipetteBtn.style.display = 'none';
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let isOpen = false;
    let isDragging = false;
    let currentHue = 30; // Orange default
    let currentSaturation = 100;
    let currentLightness = 50;
    let currentFormat: 'hex' | 'rgb' | 'hsl' = 'hex';
    
    const formats: ('hex' | 'rgb' | 'hsl')[] = ['hex', 'rgb', 'hsl'];
    
    // Get color in current format
    const getColorString = (): string => {
      const rgb = hslToRgb(currentHue, currentSaturation, currentLightness);
      switch (currentFormat) {
        case 'hex':
          return hslToHex(currentHue, currentSaturation, currentLightness).toUpperCase();
        case 'rgb':
          return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        case 'hsl':
          return `hsl(${Math.round(currentHue)}, ${Math.round(currentSaturation)}%, ${Math.round(currentLightness)}%)`;
      }
    };
    
    // Draw the color wheel (hue + saturation)
    const drawWheel = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 5;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw hue wheel with saturation gradient
      for (let angle = 0; angle < 360; angle++) {
        const startAngle = (angle - 1) * Math.PI / 180;
        const endAngle = (angle + 1) * Math.PI / 180;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        // Gradient from white (center, 0% sat) to full color (edge, 100% sat)
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, `hsl(${angle}, 0%, ${currentLightness}%)`);
        gradient.addColorStop(1, `hsl(${angle}, 100%, ${currentLightness}%)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };
    
    // Get HSL from wheel position
    const getHSLFromPosition = (x: number, y: number): { h: number; s: number } => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 5;
      
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Hue from angle (0-360)
      let hue = Math.atan2(dy, dx) * (180 / Math.PI);
      if (hue < 0) hue += 360;
      
      // Saturation from distance (0-100)
      const saturation = Math.min((distance / radius) * 100, 100);
      
      return { h: hue, s: saturation };
    };
    
    // Update cursor position on wheel based on current HSL
    const updateCursorPosition = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 5;
      
      const angle = currentHue * (Math.PI / 180);
      const distance = (currentSaturation / 100) * radius;
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.style.opacity = '1';
    };
    
    // Update the final color display
    const updateFinalColor = (updateInput = true) => {
      const hexColor = hslToHex(currentHue, currentSaturation, currentLightness);
      preview.style.backgroundColor = hexColor;
      picker.setAttribute('data-color', hexColor);
      
      if (updateInput) {
        valueInput.value = getColorString();
      }
      
      // Dispatch custom event
      picker.dispatchEvent(new CustomEvent('colorchange', { 
        detail: { color: hexColor },
        bubbles: true 
      }));
    };
    
    // Update cursor position and color from wheel
    const updateFromWheel = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 5;
      
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= radius) {
        // Position cursor (in CSS pixels)
        cursor.style.left = `${(x / scaleX)}px`;
        cursor.style.top = `${(y / scaleY)}px`;
        cursor.style.opacity = '1';
        
        const { h, s } = getHSLFromPosition(x, y);
        currentHue = h;
        currentSaturation = s;
        
        updateFinalColor();
      }
    };
    
    // Brightness slider changes lightness
    const updateFromBrightness = () => {
      currentLightness = parseInt(brightnessSlider.value);
      drawWheel(); // Redraw wheel with new lightness
      updateFinalColor();
    };
    
    // Handle input change (user typing)
    const handleInputChange = () => {
      const parsed = parseColor(valueInput.value);
      if (parsed) {
        currentHue = parsed.h;
        currentSaturation = parsed.s;
        currentLightness = parsed.l;
        
        brightnessSlider.value = String(currentLightness);
        drawWheel();
        updateCursorPosition();
        updateFinalColor(false); // Don't update input while typing
      }
    };
    
    // Toggle format
    const cycleFormat = () => {
      const currentIndex = formats.indexOf(currentFormat);
      currentFormat = formats[(currentIndex + 1) % formats.length];
      formatToggle.textContent = currentFormat.toUpperCase();
      formatToggle.setAttribute('data-format', currentFormat);
      valueInput.value = getColorString();
    };
    
    // Draw wheel on init
    drawWheel();
    
    // Toggle popup
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen = !isOpen;
      popup.classList.toggle('active', isOpen);
      picker.classList.toggle('active', isOpen);
    });
    
    // Canvas interactions
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateFromWheel(e);
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) updateFromWheel(e);
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDragging = true;
      updateFromWheel(e.touches[0]);
    });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (isDragging) updateFromWheel(e.touches[0]);
    });
    
    canvas.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Brightness slider
    brightnessSlider.addEventListener('input', updateFromBrightness);
    
    // Format toggle
    formatToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      cycleFormat();
    });
    
    // Pipette / EyeDropper
    pipetteBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      if (!window.EyeDropper) {
        console.warn('EyeDropper API not supported');
        return;
      }
      
      try {
        const eyeDropper = new window.EyeDropper();
        pipetteBtn.classList.add('active');
        
        // Close popup temporarily so user can pick from screen
        popup.classList.remove('active');
        picker.classList.remove('active');
        
        const result = await eyeDropper.open();
        const color = result.sRGBHex;
        
        // Reopen popup
        popup.classList.add('active');
        picker.classList.add('active');
        
        // Parse the picked color
        const parsed = parseColor(color);
        if (parsed) {
          currentHue = parsed.h;
          currentSaturation = parsed.s;
          currentLightness = parsed.l;
          
          brightnessSlider.value = String(currentLightness);
          drawWheel();
          updateCursorPosition();
          updateFinalColor();
        }
      } catch (err) {
        // User cancelled or error - reopen popup
        popup.classList.add('active');
        picker.classList.add('active');
      } finally {
        pipetteBtn.classList.remove('active');
      }
    });
    
    // Value input
    valueInput.addEventListener('input', handleInputChange);
    valueInput.addEventListener('blur', () => {
      // On blur, ensure the value is valid and formatted correctly
      valueInput.value = getColorString();
    });
    valueInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        valueInput.blur();
      }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (isOpen && !picker.contains(e.target as Node)) {
        isOpen = false;
        popup.classList.remove('active');
        picker.classList.remove('active');
      }
    });
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        popup.classList.remove('active');
        picker.classList.remove('active');
      }
    });
  });
}
