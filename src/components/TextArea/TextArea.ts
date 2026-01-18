import { Component } from '../../core/Component';
import './TextArea.css';

export interface TextAreaProps {
    /** Placeholder text */
    placeholder?: string;
    /** Initial value */
    value?: string;
    /** Number of visible rows */
    rows?: number;
    /** Label shown below the textarea */
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
    /** Allow resize */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export class TextArea extends Component<TextAreaProps> {
    // DOM references
    private textarea: HTMLTextAreaElement | null = null;
    private wrapper: HTMLElement | null = null;
    private highlight: HTMLElement | null = null;

    constructor(props: TextAreaProps = {}) {
        super(props);
    }

    render(): string {
        const {
            placeholder = 'Enter text...',
            value = '',
            rows = 3,
            label = '',
            className = '',
            disabled = false,
            resize = 'vertical'
        } = this.props;

        const disabledAttr = disabled ? 'disabled' : '';
        const disabledClass = disabled ? 'kwami-textarea-disabled' : '';

        return `
            <div class="kwami-textarea-container ${className} ${disabledClass}" data-kwami-id="${this.id}">
                <div class="kwami-textarea-bezel">
                    <div class="kwami-textarea-wrapper">
                        <textarea 
                            class="kwami-textarea" 
                            placeholder="${placeholder}"
                            rows="${rows}"
                            style="resize: ${resize}"
                            ${disabledAttr}
                        >${value}</textarea>
                        <span class="kwami-textarea-highlight"></span>
                    </div>
                </div>
                ${label ? `<span class="kwami-textarea-label">${label}</span>` : ''}
            </div>
        `;
    }

    protected onHydrate(): void {
        if (!this.element) return;

        this.textarea = this.element.querySelector('.kwami-textarea');
        this.wrapper = this.element.querySelector('.kwami-textarea-wrapper');
        this.highlight = this.element.querySelector('.kwami-textarea-highlight');

        if (!this.textarea || !this.wrapper || !this.highlight) return;

        // Focus event
        this.addListener(this.textarea, 'focus', () => {
            this.wrapper?.classList.add('focused');
            if (this.highlight) {
                this.highlight.style.width = '80%';
            }
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        });

        // Blur event
        this.addListener(this.textarea, 'blur', () => {
            this.wrapper?.classList.remove('focused');
            if (this.highlight) {
                this.highlight.style.width = '0';
            }
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        });

        // Input change event
        this.addListener(this.textarea, 'input', () => {
            if (this.props.onChange && this.textarea) {
                this.props.onChange(this.textarea.value);
            }
        });
    }

    /** Get current value */
    getValue(): string {
        return this.textarea?.value || '';
    }

    /** Set value */
    setValue(value: string): void {
        if (this.textarea) {
            this.textarea.value = value;
        }
    }

    /** Focus the textarea */
    focus(): void {
        this.textarea?.focus();
    }

    /** Blur the textarea */
    blur(): void {
        this.textarea?.blur();
    }
}
