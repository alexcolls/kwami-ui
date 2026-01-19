import { Component } from '../../core/Component';
import './Slider.css';

export interface SliderProps {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Initial value */
  value?: number;
  /** Step increment */
  step?: number;
  /** Label text */
  label?: string;
  /** Callback when value changes */
  onChange?: (value: number) => void;
}

export class Slider extends Component<SliderProps> {
  private input: HTMLInputElement | null = null;
  private valueDisplay: HTMLElement | null = null;
  private fill: HTMLElement | null = null;
  private thumbVisual: HTMLElement | null = null;
  private currentValue: number;

  constructor(props: SliderProps = {}) {
    super(props);
    this.currentValue = props.value ?? 50;
  }

  render(): string {
    const { min = 0, max = 100, value = 50, step = 1, label = 'SLIDER' } = this.props;

    const percent = ((value - min) / (max - min)) * 100;

    return `
   <div class="kwami-slider-container" data-kwami-id="${this.id}">
    <div class="kwami-slider-bezel">
     <div class="kwami-slider-track">
      <div class="kwami-slider-fill" style="width: ${percent}%"></div>
      <input 
       type="range" 
       class="kwami-slider" 
       min="${min}" 
       max="${max}" 
       value="${value}"
       step="${step}"
      />
      <div class="kwami-slider-thumb-visual" style="left: ${percent}%"></div>
     </div>
    </div>
    <div class="kwami-slider-value-container">
     <span class="kwami-slider-value">${value}</span>
    </div>
    <span class="kwami-slider-label">${label}</span>
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.input = this.element.querySelector('.kwami-slider');
    this.valueDisplay = this.element.querySelector('.kwami-slider-value');
    this.fill = this.element.querySelector('.kwami-slider-fill');
    this.thumbVisual = this.element.querySelector('.kwami-slider-thumb-visual');

    if (!this.input) return;

    this.addListener(this.input, 'input', () => {
      this.handleChange();
    });
  }

  private handleChange(): void {
    if (!this.input) return;

    const { min = 0, max = 100 } = this.props;
    this.currentValue = parseFloat(this.input.value);
    const percent = ((this.currentValue - min) / (max - min)) * 100;

    if (this.fill) {
      this.fill.style.width = `${percent}%`;
    }
    if (this.thumbVisual) {
      this.thumbVisual.style.left = `${percent}%`;
    }
    if (this.valueDisplay) {
      this.valueDisplay.textContent = String(this.currentValue);
    }

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('sliderchange', {
        detail: { value: this.currentValue },
        bubbles: true,
      })
    );

    if (this.props.onChange) {
      this.props.onChange(this.currentValue);
    }
  }

  /** Get the current value */
  getValue(): number {
    return this.currentValue;
  }

  /** Set the value programmatically */
  setValue(value: number): void {
    const { min = 0, max = 100 } = this.props;
    this.currentValue = value;
    const percent = ((value - min) / (max - min)) * 100;

    if (this.input) {
      this.input.value = String(value);
    }
    if (this.fill) {
      this.fill.style.width = `${percent}%`;
    }
    if (this.thumbVisual) {
      this.thumbVisual.style.left = `${percent}%`;
    }
    if (this.valueDisplay) {
      this.valueDisplay.textContent = String(value);
    }
  }
}
