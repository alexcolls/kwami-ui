import { Component } from '../../core/Component';
import './Radio.css';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps {
  /** Radio group name */
  name?: string;
  /** Options to display */
  options?: RadioOption[];
  /** Initially selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

const defaultOptions: RadioOption[] = [
  { value: 'a', label: 'Choice A' },
  { value: 'b', label: 'Choice B' },
  { value: 'c', label: 'Choice C' },
];

export class Radio extends Component<RadioProps> {
  private selectedValue: string;
  private groupName: string;

  constructor(props: RadioProps = {}) {
    super(props);
    this.selectedValue = props.value || props.options?.[0]?.value || defaultOptions[0].value;
    this.groupName = props.name || `radio-${this.id}`;
  }

  render(): string {
    const { options = defaultOptions, className = '', disabled = false } = this.props;

    const disabledClass = disabled ? 'kwami-radio-group-disabled' : '';

    const optionsHtml = options
      .map((opt, index) => {
        const isChecked = opt.value === this.selectedValue || (index === 0 && !this.selectedValue);
        return `
    <label class="kwami-radio">
     <input type="radio" name="${this.groupName}" value="${opt.value}" ${isChecked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
     <span class="kwami-radio-circle">
      <span class="kwami-radio-dot"></span>
     </span>
     <span class="kwami-radio-label">${opt.label}</span>
    </label>
            `;
      })
      .join('');

    return `
   <div class="kwami-radio-group ${className} ${disabledClass}" data-kwami-id="${this.id}" role="radiogroup">
    ${optionsHtml}
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    const radios = this.element.querySelectorAll('.kwami-radio input');

    radios.forEach((radio) => {
      this.addListener(radio, 'change', (e) => {
        const input = e.target as HTMLInputElement;
        this.selectedValue = input.value;

        // Dispatch event
        this.element?.dispatchEvent(
          new CustomEvent('radiochange', {
            detail: { value: this.selectedValue },
            bubbles: true,
          })
        );

        // Call onChange callback
        if (this.props.onChange) {
          this.props.onChange(this.selectedValue);
        }
      });
    });
  }

  /** Get selected value */
  getValue(): string {
    return this.selectedValue;
  }

  /** Set selected value */
  setValue(value: string): void {
    const input = this.element?.querySelector(`input[value="${value}"]`) as HTMLInputElement;
    if (input) {
      input.checked = true;
      this.selectedValue = value;
    }
  }
}
