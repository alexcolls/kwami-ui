import { Component } from '../../core/Component';
import { hslToHex, hslToRgb, parseColor } from '../../utils/color';
import './ColorPicker.css';

// EyeDropper API type declaration
declare global {
  interface Window {
      EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>;
      };
  }
}

export interface ColorPickerProps {
  /** Initial color value (HEX format) */
  defaultColor?: string;
  /** Callback when color changes */
  onChange?: (color: string) => void;
  /** Show/hide pipette button (only works if browser supports EyeDropper API) */
  showPipette?: boolean;
  /** Popup direction */
  popupDirection?: 'up' | 'down';
}

type ColorFormat = 'hex' | 'rgb' | 'hsl';

export class ColorPicker extends Component<ColorPickerProps> {
  private ctx: CanvasRenderingContext2D | null = null;
  private isOpen = false;
  private isDragging = false;
  private currentHue = 30;
  private currentSaturation = 100;
  private currentLightness = 50;
  private currentFormat: ColorFormat = 'hex';

  // DOM references
  private trigger: HTMLButtonElement | null = null;
  private popup: HTMLElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private cursor: HTMLElement | null = null;
  private preview: HTMLElement | null = null;
  private brightnessSlider: HTMLInputElement | null = null;
  private formatToggle: HTMLButtonElement | null = null;
  private valueInput: HTMLInputElement | null = null;
  private pipetteBtn: HTMLButtonElement | null = null;

  constructor(props: ColorPickerProps = {}) {
      super(props);
      // Parse initial color
      const parsed = parseColor(props.defaultColor || '#ff9500');
      if (parsed) {
      this.currentHue = parsed.h;
      this.currentSaturation = parsed.s;
      this.currentLightness = parsed.l;
      }
  }

  render(): string {
      const { defaultColor = '#ff9500', popupDirection = 'up' } = this.props;
      const popupClass = popupDirection === 'down' ? 'kwami-colorpicker-popup-down' : '';

      return `
      <div class="kwami-colorpicker" data-kwami-id="${this.id}" data-color="${defaultColor}">
          <button class="kwami-colorpicker-trigger" aria-label="Pick a color" title="Pick a color">
        <span class="kwami-colorpicker-preview" style="background-color: ${defaultColor}"></span>
        <iconify-icon icon="solar:palette-linear" width="16" height="16"></iconify-icon>
          </button>
          <div class="kwami-colorpicker-popup ${popupClass}">
        <button class="kwami-colorpicker-pipette" aria-label="Pick from screen" title="Pick color from screen">
            <iconify-icon icon="solar:pipette-linear" width="16" height="16"></iconify-icon>
        </button>
        <div class="kwami-colorpicker-wheel">
            <canvas class="kwami-colorpicker-canvas" width="200" height="200"></canvas>
            <div class="kwami-colorpicker-cursor"></div>
        </div>
        <div class="kwami-colorpicker-brightness">
            <iconify-icon icon="solar:sun-linear" width="14" height="14"></iconify-icon>
            <input type="range" class="kwami-colorpicker-brightness-slider" min="0" max="100" value="${this.currentLightness}" />
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

  protected onHydrate(): void {
      if (!this.element) return;

      // Get DOM references
      this.trigger = this.element.querySelector('.kwami-colorpicker-trigger');
      this.popup = this.element.querySelector('.kwami-colorpicker-popup');
      this.canvas = this.element.querySelector('.kwami-colorpicker-canvas');
      this.cursor = this.element.querySelector('.kwami-colorpicker-cursor');
      this.preview = this.element.querySelector('.kwami-colorpicker-preview');
      this.brightnessSlider = this.element.querySelector('.kwami-colorpicker-brightness-slider');
      this.formatToggle = this.element.querySelector('.kwami-colorpicker-format-toggle');
      this.valueInput = this.element.querySelector('.kwami-colorpicker-value-input');
      this.pipetteBtn = this.element.querySelector('.kwami-colorpicker-pipette');

      if (!this.trigger || !this.popup || !this.canvas || !this.cursor ||
      !this.preview || !this.brightnessSlider || !this.formatToggle ||
      !this.valueInput || !this.pipetteBtn) return;

      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      // Hide pipette if not supported
      if (!window.EyeDropper || this.props.showPipette === false) {
      this.pipetteBtn.style.display = 'none';
      }

      // Draw initial wheel
      this.drawWheel();

      // Setup event listeners
      this.setupEventListeners();
  }

  private setupEventListeners(): void {
      if (!this.trigger || !this.canvas || !this.brightnessSlider ||
      !this.formatToggle || !this.valueInput || !this.pipetteBtn || !this.popup) return;

      // Toggle popup
      this.addListener(this.trigger, 'click', (e) => {
      e.stopPropagation();
      this.togglePopup();
      });

      // Canvas interactions
      this.addListener(this.canvas, 'mousedown', (e) => {
      this.isDragging = true;
      this.updateFromWheel(e as MouseEvent);
      });

      this.addListener(this.canvas, 'mousemove', (e) => {
      if (this.isDragging) this.updateFromWheel(e as MouseEvent);
      });

      // Global mouseup
      const mouseUpHandler = () => { this.isDragging = false; };
      document.addEventListener('mouseup', mouseUpHandler);

      // Touch support
      this.addListener(this.canvas, 'touchstart', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.updateFromWheel((e as TouchEvent).touches[0]);
      });

      this.addListener(this.canvas, 'touchmove', (e) => {
      e.preventDefault();
      if (this.isDragging) this.updateFromWheel((e as TouchEvent).touches[0]);
      });

      this.addListener(this.canvas, 'touchend', () => {
      this.isDragging = false;
      });

      // Brightness slider
      this.addListener(this.brightnessSlider, 'input', () => {
      this.currentLightness = parseInt(this.brightnessSlider!.value);
      this.drawWheel();
      this.updateFinalColor();
      });

      // Format toggle
      this.addListener(this.formatToggle, 'click', (e) => {
      e.stopPropagation();
      this.cycleFormat();
      });

      // Pipette / EyeDropper
      this.addListener(this.pipetteBtn, 'click', (e) => {
      e.stopPropagation();
      this.pickFromScreen();
      });

      // Value input
      this.addListener(this.valueInput, 'input', () => {
      this.handleInputChange();
      });

      this.addListener(this.valueInput, 'blur', () => {
      this.valueInput!.value = this.getColorString();
      });

      this.addListener(this.valueInput, 'keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') {
          this.valueInput!.blur();
      }
      });

      // Close on outside click
      const outsideClickHandler = (e: Event) => {
      if (this.isOpen && !this.element?.contains(e.target as Node)) {
          this.closePopup();
      }
      };
      document.addEventListener('click', outsideClickHandler);

      // Close on ESC
      const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen) {
          this.closePopup();
      }
      };
      document.addEventListener('keydown', escHandler as EventListener);
  }

  private togglePopup(): void {
      this.isOpen = !this.isOpen;
      this.popup?.classList.toggle('active', this.isOpen);
      this.element?.classList.toggle('active', this.isOpen);
  }

  private closePopup(): void {
      this.isOpen = false;
      this.popup?.classList.remove('active');
      this.element?.classList.remove('active');
  }

  private drawWheel(): void {
      if (!this.ctx || !this.canvas) return;

      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 5;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = (angle + 1) * Math.PI / 180;

      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      this.ctx.closePath();

      const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `hsl(${angle}, 0%, ${this.currentLightness}%)`);
      gradient.addColorStop(1, `hsl(${angle}, 100%, ${this.currentLightness}%)`);

      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      }
  }

  private updateFromWheel(e: MouseEvent | Touch): void {
      if (!this.canvas || !this.cursor) return;

      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 5;

      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= radius) {
      this.cursor.style.left = `${x / scaleX}px`;
      this.cursor.style.top = `${y / scaleY}px`;
      this.cursor.style.opacity = '1';

      let hue = Math.atan2(dy, dx) * (180 / Math.PI);
      if (hue < 0) hue += 360;

      this.currentHue = hue;
      this.currentSaturation = Math.min((distance / radius) * 100, 100);

      this.updateFinalColor();
      }
  }

  private updateCursorPosition(): void {
      if (!this.canvas || !this.cursor) return;

      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 5;

      const angle = this.currentHue * (Math.PI / 180);
      const distance = (this.currentSaturation / 100) * radius;

      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      this.cursor.style.left = `${x}px`;
      this.cursor.style.top = `${y}px`;
      this.cursor.style.opacity = '1';
  }

  private getColorString(): string {
      const rgb = hslToRgb(this.currentHue, this.currentSaturation, this.currentLightness);
      switch (this.currentFormat) {
      case 'hex':
          return hslToHex(this.currentHue, this.currentSaturation, this.currentLightness).toUpperCase();
      case 'rgb':
          return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'hsl':
          return `hsl(${Math.round(this.currentHue)}, ${Math.round(this.currentSaturation)}%, ${Math.round(this.currentLightness)}%)`;
      }
  }

  private updateFinalColor(updateInput = true): void {
      const hexColor = hslToHex(this.currentHue, this.currentSaturation, this.currentLightness);

      if (this.preview) {
      this.preview.style.backgroundColor = hexColor;
      }
      this.element?.setAttribute('data-color', hexColor);

      if (updateInput && this.valueInput) {
      this.valueInput.value = this.getColorString();
      }

      // Dispatch custom event
      this.element?.dispatchEvent(new CustomEvent('colorchange', {
      detail: { color: hexColor },
      bubbles: true
      }));

      // Call onChange callback
      if (this.props.onChange) {
      this.props.onChange(hexColor);
      }
  }

  private handleInputChange(): void {
      if (!this.valueInput) return;

      const parsed = parseColor(this.valueInput.value);
      if (parsed) {
      this.currentHue = parsed.h;
      this.currentSaturation = parsed.s;
      this.currentLightness = parsed.l;

      if (this.brightnessSlider) {
          this.brightnessSlider.value = String(this.currentLightness);
      }
      this.drawWheel();
      this.updateCursorPosition();
      this.updateFinalColor(false);
      }
  }

  private cycleFormat(): void {
      const formats: ColorFormat[] = ['hex', 'rgb', 'hsl'];
      const currentIndex = formats.indexOf(this.currentFormat);
      this.currentFormat = formats[(currentIndex + 1) % formats.length];

      if (this.formatToggle) {
      this.formatToggle.textContent = this.currentFormat.toUpperCase();
      this.formatToggle.setAttribute('data-format', this.currentFormat);
      }
      if (this.valueInput) {
      this.valueInput.value = this.getColorString();
      }
  }

  private async pickFromScreen(): Promise<void> {
      if (!window.EyeDropper || !this.pipetteBtn || !this.popup) return;

      try {
      const eyeDropper = new window.EyeDropper();
      this.pipetteBtn.classList.add('active');

      this.popup.classList.remove('active');
      this.element?.classList.remove('active');

      const result = await eyeDropper.open();
      const color = result.sRGBHex;

      this.popup.classList.add('active');
      this.element?.classList.add('active');

      const parsed = parseColor(color);
      if (parsed) {
          this.currentHue = parsed.h;
          this.currentSaturation = parsed.s;
          this.currentLightness = parsed.l;

          if (this.brightnessSlider) {
        this.brightnessSlider.value = String(this.currentLightness);
          }
          this.drawWheel();
          this.updateCursorPosition();
          this.updateFinalColor();
      }
      } catch {
      this.popup.classList.add('active');
      this.element?.classList.add('active');
      } finally {
      this.pipetteBtn?.classList.remove('active');
      }
  }

  /** Get the current color value */
  getColor(): string {
      return hslToHex(this.currentHue, this.currentSaturation, this.currentLightness);
  }

  /** Set the color programmatically */
  setColor(color: string): void {
      const parsed = parseColor(color);
      if (parsed) {
      this.currentHue = parsed.h;
      this.currentSaturation = parsed.s;
      this.currentLightness = parsed.l;

      if (this.brightnessSlider) {
          this.brightnessSlider.value = String(this.currentLightness);
      }
      this.drawWheel();
      this.updateCursorPosition();
      this.updateFinalColor();
      }
  }
}
