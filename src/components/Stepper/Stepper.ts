import { Component } from '../../core/Component';
import './Stepper.css';

export interface StepperProps {
  /** Initial value */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Label text */
  label?: string;
  /** Callback when value changes */
  onChange?: (value: number) => void;
}

export class Stepper extends Component<StepperProps> {
  private currentValue: number;
  private valueDisplay: HTMLElement | null = null;
  private minusBtn: HTMLButtonElement | null = null;
  private plusBtn: HTMLButtonElement | null = null;

  constructor(props: StepperProps = {}) {
    super(props);
    this.currentValue = props.value ?? 0;
  }

  render(): string {
    const { value = 0, min = -10, max = 10, step = 1, label } = this.props;

    return `
            <div class="kwami-stepper-container" data-kwami-id="${this.id}">
                ${label ? `<span class="kwami-stepper-label">${label}</span>` : ''}
                <div class="kwami-stepper" data-value="${value}" data-min="${min}" data-max="${max}" data-step="${step}">
                    <button class="kwami-stepper-btn kwami-stepper-minus" aria-label="Decrease">
                        <iconify-icon icon="solar:minus-circle-linear" width="20" height="20"></iconify-icon>
                    </button>
                    <div class="kwami-stepper-value">${value}</div>
                    <button class="kwami-stepper-btn kwami-stepper-plus" aria-label="Increase">
                        <iconify-icon icon="solar:add-circle-linear" width="20" height="20"></iconify-icon>
                    </button>
                </div>
            </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.minusBtn = this.element.querySelector('.kwami-stepper-minus');
    this.plusBtn = this.element.querySelector('.kwami-stepper-plus');
    this.valueDisplay = this.element.querySelector('.kwami-stepper-value');

    if (!this.minusBtn || !this.plusBtn || !this.valueDisplay) return;

    this.addListener(this.minusBtn, 'click', () => this.decrement());
    this.addListener(this.plusBtn, 'click', () => this.increment());

    // Update initial state
    this.updateButtonStates();
  }

  private updateButtonStates(): void {
    const { min = -10, max = 10 } = this.props;

    this.minusBtn?.classList.toggle('disabled', this.currentValue <= min);
    this.plusBtn?.classList.toggle('disabled', this.currentValue >= max);
  }

  private updateValue(newValue: number): void {
    const { min = -10, max = 10 } = this.props;

    this.currentValue = Math.max(min, Math.min(max, newValue));

    if (this.valueDisplay) {
      this.valueDisplay.textContent = String(this.currentValue);
    }

    this.updateButtonStates();

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('stepperchange', {
        detail: { value: this.currentValue },
        bubbles: true,
      })
    );

    if (this.props.onChange) {
      this.props.onChange(this.currentValue);
    }
  }

  private increment(): void {
    const { step = 1, max = 10 } = this.props;
    if (this.currentValue >= max) return;

    this.updateValue(this.currentValue + step);

    this.valueDisplay?.classList.add('bump-up');
    setTimeout(() => this.valueDisplay?.classList.remove('bump-up'), 150);
  }

  private decrement(): void {
    const { step = 1, min = -10 } = this.props;
    if (this.currentValue <= min) return;

    this.updateValue(this.currentValue - step);

    this.valueDisplay?.classList.add('bump-down');
    setTimeout(() => this.valueDisplay?.classList.remove('bump-down'), 150);
  }

  /** Get the current value */
  getValue(): number {
    return this.currentValue;
  }

  /** Set the value programmatically */
  setValue(value: number): void {
    this.updateValue(value);
  }
}
