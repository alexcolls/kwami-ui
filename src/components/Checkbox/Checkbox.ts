import { Component } from '../../core/Component';
import './Checkbox.css';

export interface CheckboxOption {
  value: string;
  label: string;
  checked?: boolean;
}

export interface CheckboxProps {
  /** Options to display */
  options?: CheckboxOption[];
  /** Callback when selection changes */
  onChange?: (values: string[]) => void;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

const defaultOptions: CheckboxOption[] = [
  { value: 'a', label: 'Option A', checked: true },
  { value: 'b', label: 'Option B', checked: false },
  { value: 'c', label: 'Option C', checked: false },
];

export class Checkbox extends Component<CheckboxProps> {
  private selectedValues: Set<string>;

  constructor(props: CheckboxProps = {}) {
    super(props);
    const options = props.options || defaultOptions;
    this.selectedValues = new Set(options.filter((opt) => opt.checked).map((opt) => opt.value));
  }

  render(): string {
    const { options = defaultOptions, className = '', disabled = false } = this.props;

    const disabledClass = disabled ? 'kwami-checkbox-group-disabled' : '';

    const optionsHtml = options
      .map(
        (opt) => `
     <label class="kwami-checkbox">
      <input type="checkbox" value="${opt.value}" ${opt.checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
      <span class="kwami-checkbox-box">
       <iconify-icon icon="solar:check-read-linear" width="14" height="14"></iconify-icon>
      </span>
      <span class="kwami-checkbox-label">${opt.label}</span>
     </label>
        `
      )
      .join('');

    return `
   <div class="kwami-checkbox-group ${className} ${disabledClass}" data-kwami-id="${this.id}">
    ${optionsHtml}
   </div>
    `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    const checkboxes = this.element.querySelectorAll('.kwami-checkbox input');

    checkboxes.forEach((checkbox) => {
      this.addListener(checkbox, 'change', (e) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;

        if (input.checked) {
          this.selectedValues.add(value);
        } else {
          this.selectedValues.delete(value);
        }

        // Dispatch event
        this.element?.dispatchEvent(
          new CustomEvent('checkboxchange', {
            detail: { values: this.getValues(), changed: value, checked: input.checked },
            bubbles: true,
          })
        );

        // Call onChange callback
        if (this.props.onChange) {
          this.props.onChange(this.getValues());
        }
      });
    });
  }

  /** Get all selected values */
  getValues(): string[] {
    return Array.from(this.selectedValues);
  }

  /** Check if a value is selected */
  isChecked(value: string): boolean {
    return this.selectedValues.has(value);
  }

  /** Set a checkbox value */
  setChecked(value: string, checked: boolean): void {
    const input = this.element?.querySelector(`input[value="${value}"]`) as HTMLInputElement;
    if (input) {
      input.checked = checked;
      if (checked) {
        this.selectedValues.add(value);
      } else {
        this.selectedValues.delete(value);
      }
    }
  }

  /** Select all checkboxes */
  selectAll(): void {
    const checkboxes = this.element?.querySelectorAll(
      '.kwami-checkbox input'
    ) as NodeListOf<HTMLInputElement>;
    checkboxes?.forEach((input) => {
      input.checked = true;
      this.selectedValues.add(input.value);
    });
  }

  /** Deselect all checkboxes */
  deselectAll(): void {
    const checkboxes = this.element?.querySelectorAll(
      '.kwami-checkbox input'
    ) as NodeListOf<HTMLInputElement>;
    checkboxes?.forEach((input) => {
      input.checked = false;
    });
    this.selectedValues.clear();
  }
}
