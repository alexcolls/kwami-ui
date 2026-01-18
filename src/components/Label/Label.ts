import { Component } from '../../core/Component';
import './Label.css';

export interface LabelProps {
    /** The label text */
    text: string;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Whether the label indicates a required field */
    required?: boolean;
    /** Label color */
    color?: string;
    /** For attribute (associates with form input) */
    htmlFor?: string;
    /** Additional CSS class */
    className?: string;
}

export class Label extends Component<LabelProps> {
    constructor(props: LabelProps) {
        super(props);
    }

    render(): string {
        const {
            text,
            size = 'md',
            required = false,
            color,
            htmlFor,
            className = ''
        } = this.props;

        const forAttr = htmlFor ? `for="${htmlFor}"` : '';
        const style = color ? `style="color: ${color}"` : '';
        const requiredMark = required ? '<span class="kwami-label-required">*</span>' : '';

        return `
            <label class="kwami-label kwami-label-${size} ${className}" 
                   data-kwami-id="${this.id}"
                   ${forAttr}
                   ${style}>
                ${text}${requiredMark}
            </label>
        `;
    }

    protected onHydrate(): void {
        // Label is purely visual
    }

    setText(text: string): void {
        if (this.element) {
            const required = this.element.querySelector('.kwami-label-required');
            this.element.textContent = text;
            if (required) this.element.appendChild(required);
        }
    }

    setColor(color: string): void {
        if (this.element) {
            this.element.style.color = color;
        }
    }
}
