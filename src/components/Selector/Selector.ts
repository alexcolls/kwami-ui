import { Component } from '../../core/Component';
import './Selector.css';

export interface SelectorOption {
  value: string;
  label: string;
}

export interface SelectorProps {
  /** Options to display */
  options?: SelectorOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Initially selected value */
  value?: string;
  /** Label shown below the selector */
  label?: string;
  /** Callback when selection changes */
  onChange?: (value: string, label: string) => void;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

const defaultOptions: SelectorOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export class Selector extends Component<SelectorProps> {
  private isOpen = false;
  private selectedValue: string;

  // DOM references
  private selector: HTMLElement | null = null;
  private valueDisplay: HTMLElement | null = null;
  private dropdown: HTMLElement | null = null;

  constructor(props: SelectorProps = {}) {
    super(props);
    this.selectedValue = props.value || '';
  }

  render(): string {
    const {
      options = defaultOptions,
      placeholder = 'Select...',
      label = '',
      className = '',
      disabled = false,
    } = this.props;

    const disabledClass = disabled ? 'kwami-selector-disabled' : '';
    const selectedOption = options.find((opt) => opt.value === this.selectedValue);
    const displayText = selectedOption ? selectedOption.label : placeholder;
    const isPlaceholder = !selectedOption;

    const optionsHtml = options
      .map(
        (opt) => `
   <div class="kwami-selector-option ${opt.value === this.selectedValue ? 'selected' : ''}" 
    data-value="${opt.value}" 
    role="option"
    tabindex="0">
    ${opt.label}
   </div>
        `
      )
      .join('');

    return `
   <div class="kwami-selector-container ${className} ${disabledClass}" data-kwami-id="${this.id}">
    <div class="kwami-selector-bezel">
     <div class="kwami-selector" tabindex="0" role="listbox" aria-expanded="false">
      <div class="kwami-selector-face">
       <span class="kwami-selector-value" data-placeholder="${isPlaceholder}">${displayText}</span>
       <span class="kwami-selector-arrow">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
         <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
       </span>
      </div>
      <div class="kwami-selector-dropdown">
       ${optionsHtml}
      </div>
     </div>
    </div>
                ${label ? `<span class="kwami-selector-label">${label}</span>` : ''}
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.selector = this.element.querySelector('.kwami-selector');
    this.valueDisplay = this.element.querySelector('.kwami-selector-value');
    this.dropdown = this.element.querySelector('.kwami-selector-dropdown');

    if (!this.selector || !this.valueDisplay || !this.dropdown) return;

    const options = this.element.querySelectorAll('.kwami-selector-option');

    // Click to toggle
    this.addListener(this.selector, 'click', (e) => {
      if (!(e.target as Element).closest('.kwami-selector-option')) {
        this.toggleDropdown();
      }
    });

    // Option click
    options.forEach((option) => {
      this.addListener(option, 'click', () => {
        this.selectOption(option);
      });

      // Option keyboard selection
      this.addListener(option, 'keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
          e.preventDefault();
          this.selectOption(option);
        }
      });
    });

    // Keyboard navigation
    this.addListener(this.selector, 'keydown', (e) => {
      const key = (e as KeyboardEvent).key;
      switch (key) {
        case 'Enter':
        case ' ':
          if (!this.isOpen) {
            e.preventDefault();
            this.toggleDropdown(true);
          }
          break;
        case 'Escape':
          this.toggleDropdown(false);
          this.selector?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!this.isOpen) {
            this.toggleDropdown(true);
          } else {
            const current = this.dropdown?.querySelector(
              '.kwami-selector-option:focus'
            ) as HTMLElement;
            const next = current?.nextElementSibling as HTMLElement;
            next?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (this.isOpen) {
            const current = this.dropdown?.querySelector(
              '.kwami-selector-option:focus'
            ) as HTMLElement;
            const prev = current?.previousElementSibling as HTMLElement;
            prev?.focus();
          }
          break;
      }
    });

    // Close on outside click
    const outsideClickHandler = (e: Event) => {
      if (!this.element?.contains(e.target as Node) && this.isOpen) {
        this.toggleDropdown(false);
      }
    };
    document.addEventListener('click', outsideClickHandler);

    // Close on focus out
    this.addListener(this.selector, 'focusout', (e) => {
      if (!this.selector?.contains((e as FocusEvent).relatedTarget as Node)) {
        this.toggleDropdown(false);
      }
    });
  }

  private toggleDropdown(open?: boolean): void {
    this.isOpen = open !== undefined ? open : !this.isOpen;
    this.selector?.setAttribute('aria-expanded', this.isOpen.toString());

    if (this.isOpen) {
      this.selector?.classList.add('open');
      // Focus selected option or first option
      const selected = this.dropdown?.querySelector(
        '.kwami-selector-option.selected'
      ) as HTMLElement;
      const firstOption = this.dropdown?.querySelector('.kwami-selector-option') as HTMLElement;
      (selected || firstOption)?.focus();
    } else {
      this.selector?.classList.remove('open');
    }
  }

  private selectOption(option: Element): void {
    const value = option.getAttribute('data-value') || '';
    const text = option.textContent?.trim() || '';

    // Update selection state
    const options = this.element?.querySelectorAll('.kwami-selector-option');
    options?.forEach((opt) => opt.classList.remove('selected'));
    option.classList.add('selected');

    // Update display
    this.selectedValue = value;
    if (this.valueDisplay) {
      this.valueDisplay.textContent = text;
      this.valueDisplay.setAttribute('data-placeholder', 'false');
    }

    this.toggleDropdown(false);
    this.selector?.focus();

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('selectorchange', {
        detail: { value, label: text },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange(value, text);
    }
  }

  /** Get current selected value */
  getValue(): string {
    return this.selectedValue;
  }

  /** Set selected value */
  setValue(value: string): void {
    const option = this.element?.querySelector(`.kwami-selector-option[data-value="${value}"]`);
    if (option) {
      this.selectOption(option);
    }
  }

  /** Open the dropdown */
  open(): void {
    this.toggleDropdown(true);
  }

  /** Close the dropdown */
  close(): void {
    this.toggleDropdown(false);
  }
}
