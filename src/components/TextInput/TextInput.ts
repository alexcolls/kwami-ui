import { Component } from '../../core/Component';
import './TextInput.css';

export interface TextInputProps {
  /** Placeholder text */
  placeholder?: string;
  /** Initial value */
  value?: string;
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  /** Label shown below the input */
  label?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback on focus */
  onFocus?: () => void;
  /** Callback on blur */
  onBlur?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

export class TextInput extends Component<TextInputProps> {
  // DOM references
  private input: HTMLInputElement | null = null;
  private wrapper: HTMLElement | null = null;
  private highlight: HTMLElement | null = null;

  constructor(props: TextInputProps = {}) {
    super(props);
  }

  render(): string {
    const {
      placeholder = 'Type here...',
      value = '',
      type = 'text',
      label = '',
      className = '',
      disabled = false,
    } = this.props;

    const disabledAttr = disabled ? 'disabled' : '';
    const disabledClass = disabled ? 'kwami-textinput-disabled' : '';

    return `
   <div class="kwami-textinput-container ${className} ${disabledClass}" data-kwami-id="${this.id}">
    <div class="kwami-textinput-bezel">
     <div class="kwami-textinput-wrapper">
      <input 
       type="${type}" 
       class="kwami-textinput" 
       placeholder="${placeholder}"
       value="${value}"
       ${disabledAttr}
      />
      <span class="kwami-textinput-highlight"></span>
     </div>
    </div>
                ${label ? `<span class="kwami-textinput-label">${label}</span>` : ''}
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.input = this.element.querySelector('.kwami-textinput');
    this.wrapper = this.element.querySelector('.kwami-textinput-wrapper');
    this.highlight = this.element.querySelector('.kwami-textinput-highlight');

    if (!this.input || !this.wrapper || !this.highlight) return;

    // Focus event
    this.addListener(this.input, 'focus', () => {
      this.wrapper?.classList.add('focused');
      if (this.highlight) {
        this.highlight.style.width = '80%';
      }
      if (this.props.onFocus) {
        this.props.onFocus();
      }
    });

    // Blur event
    this.addListener(this.input, 'blur', () => {
      this.wrapper?.classList.remove('focused');
      if (this.highlight) {
        this.highlight.style.width = '0';
      }
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    });

    // Input change event
    this.addListener(this.input, 'input', () => {
      if (this.props.onChange && this.input) {
        this.props.onChange(this.input.value);
      }
    });
  }

  /** Get current value */
  getValue(): string {
    return this.input?.value || '';
  }

  /** Set value */
  setValue(value: string): void {
    if (this.input) {
      this.input.value = value;
    }
  }

  /** Focus the input */
  focus(): void {
    this.input?.focus();
  }

  /** Blur the input */
  blur(): void {
    this.input?.blur();
  }
}
