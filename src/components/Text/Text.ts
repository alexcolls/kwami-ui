import { Component } from '../../core/Component';
import './Text.css';

export interface TextProps {
    /** The text content */
    content: string;
    /** Text size variant */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Text weight */
    weight?: 300 | 400 | 500 | 600 | 700;
    /** Text color (CSS color value) */
    color?: string;
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Additional CSS class */
    className?: string;
}

export class Text extends Component<TextProps> {
    constructor(props: TextProps) {
        super(props);
    }

    render(): string {
        const {
            content,
            size = 'md',
            weight = 400,
            color,
            align = 'left',
            className = ''
        } = this.props;

        const style = [
            color ? `color: ${color}` : '',
            `font-weight: ${weight}`,
            `text-align: ${align}`
        ].filter(Boolean).join('; ');

        return `
            <p class="kwami-text kwami-text-${size} ${className}" 
               data-kwami-id="${this.id}"
               style="${style}">
                ${content}
            </p>
        `;
    }

    protected onHydrate(): void {
        // Text is purely visual, no interactive behavior needed
    }

    /** Update the text content */
    setContent(content: string): void {
        if (this.element) {
            this.element.textContent = content;
        }
    }

    /** Update text styles */
    setStyle(styles: Partial<Pick<TextProps, 'color' | 'weight' | 'align'>>): void {
        if (!this.element) return;
        
        if (styles.color) this.element.style.color = styles.color;
        if (styles.weight) this.element.style.fontWeight = String(styles.weight);
        if (styles.align) this.element.style.textAlign = styles.align;
    }
}
