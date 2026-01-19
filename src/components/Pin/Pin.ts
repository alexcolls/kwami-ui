import { Component } from '../../core/Component';
import './Pin.css';

export interface PinProps {
  /** Number of digits */
  length?: number;
  /** Label shown below the pin input */
  label?: string;
  /** Mask the input (like password) */
  masked?: boolean;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when all digits are filled */
  onComplete?: (value: string) => void;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

export class Pin extends Component<PinProps> {
  private inputs: HTMLInputElement[] = [];
  private values: string[] = [];

  constructor(props: PinProps = {}) {
    super(props);
    const length = props.length || 4;
    this.values = new Array(length).fill('');
  }

  render(): string {
    const { length = 4, label = '', masked = false, className = '', disabled = false } = this.props;

    const disabledAttr = disabled ? 'disabled' : '';
    const disabledClass = disabled ? 'kwami-pin-disabled' : '';
    const inputType = masked ? 'password' : 'text';

    const inputsHtml = Array.from(
      { length },
      (_, i) => `
            <div class="kwami-pin-digit-wrapper">
                <input 
                    type="${inputType}" 
                    class="kwami-pin-digit" 
                    maxlength="1"
                    inputmode="numeric"
                    pattern="[0-9]"
                    data-index="${i}"
                    ${disabledAttr}
                />
                <span class="kwami-pin-digit-highlight"></span>
            </div>
        `
    ).join('');

    return `
            <div class="kwami-pin-container ${className} ${disabledClass}" data-kwami-id="${this.id}">
                <div class="kwami-pin-bezel">
                    <div class="kwami-pin-inputs">
                        ${inputsHtml}
                    </div>
                </div>
                ${label ? `<span class="kwami-pin-label">${label}</span>` : ''}
            </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.inputs = Array.from(this.element.querySelectorAll('.kwami-pin-digit'));

    this.inputs.forEach((input, index) => {
      // Focus styling
      this.addListener(input, 'focus', () => {
        input.parentElement?.classList.add('focused');
        input.select();
      });

      this.addListener(input, 'blur', () => {
        input.parentElement?.classList.remove('focused');
      });

      // Input handling
      this.addListener(input, 'input', (e) => {
        const target = e.target as HTMLInputElement;
        let value = target.value;

        // Only allow digits
        value = value.replace(/[^0-9]/g, '');
        target.value = value;

        this.values[index] = value;

        if (value && index < this.inputs.length - 1) {
          // Move to next input
          this.inputs[index + 1].focus();
        }

        this.notifyChange();

        // Check if complete
        if (this.isComplete()) {
          if (this.props.onComplete) {
            this.props.onComplete(this.getValue());
          }
        }
      });

      // Keyboard navigation
      this.addListener(input, 'keydown', (e) => {
        const key = (e as KeyboardEvent).key;

        if (key === 'Backspace') {
          if (!input.value && index > 0) {
            // Move to previous input
            this.inputs[index - 1].focus();
            this.inputs[index - 1].value = '';
            this.values[index - 1] = '';
            e.preventDefault();
          } else {
            this.values[index] = '';
          }
          this.notifyChange();
        } else if (key === 'ArrowLeft' && index > 0) {
          e.preventDefault();
          this.inputs[index - 1].focus();
        } else if (key === 'ArrowRight' && index < this.inputs.length - 1) {
          e.preventDefault();
          this.inputs[index + 1].focus();
        }
      });

      // Handle paste
      this.addListener(input, 'paste', (e) => {
        e.preventDefault();
        const pasteData = (e as ClipboardEvent).clipboardData?.getData('text') || '';
        const digits = pasteData.replace(/[^0-9]/g, '').slice(0, this.inputs.length);

        digits.split('').forEach((digit, i) => {
          if (this.inputs[i]) {
            this.inputs[i].value = digit;
            this.values[i] = digit;
          }
        });

        // Focus last filled or next empty
        const focusIndex = Math.min(digits.length, this.inputs.length - 1);
        this.inputs[focusIndex].focus();

        this.notifyChange();

        if (this.isComplete()) {
          if (this.props.onComplete) {
            this.props.onComplete(this.getValue());
          }
        }
      });
    });
  }

  private notifyChange(): void {
    if (this.props.onChange) {
      this.props.onChange(this.getValue());
    }
  }

  private isComplete(): boolean {
    return this.values.every((v) => v !== '');
  }

  /** Get current value */
  getValue(): string {
    return this.values.join('');
  }

  /** Set value */
  setValue(value: string): void {
    const digits = value.replace(/[^0-9]/g, '').slice(0, this.inputs.length);
    this.values = new Array(this.inputs.length).fill('');

    digits.split('').forEach((digit, i) => {
      if (this.inputs[i]) {
        this.inputs[i].value = digit;
        this.values[i] = digit;
      }
    });
  }

  /** Clear all inputs */
  clear(): void {
    this.inputs.forEach((input, i) => {
      input.value = '';
      this.values[i] = '';
    });
    this.inputs[0]?.focus();
  }

  /** Focus the first input */
  focus(): void {
    this.inputs[0]?.focus();
  }
}
