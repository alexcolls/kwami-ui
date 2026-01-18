import { Component } from '../../core/Component';
import './Icon.css';

export interface IconProps {
    /** Iconify icon name (e.g., 'solar:home-linear') */
    icon: string;
    /** Icon size in pixels */
    size?: number;
    /** Icon color */
    color?: string;
    /** Additional CSS class */
    className?: string;
}

export class Icon extends Component<IconProps> {
    constructor(props: IconProps) {
        super(props);
    }

    render(): string {
        const {
            icon,
            size = 24,
            color,
            className = ''
        } = this.props;

        const style = color ? `color: ${color}` : '';

        return `
            <span class="kwami-icon ${className}" data-kwami-id="${this.id}" style="${style}">
                <iconify-icon icon="${icon}" width="${size}" height="${size}"></iconify-icon>
            </span>
        `;
    }

    protected onHydrate(): void {
        // Icon is purely visual
    }

    /** Change the icon */
    setIcon(icon: string): void {
        const iconEl = this.element?.querySelector('iconify-icon');
        if (iconEl) {
            iconEl.setAttribute('icon', icon);
        }
    }

    /** Change the size */
    setSize(size: number): void {
        const iconEl = this.element?.querySelector('iconify-icon');
        if (iconEl) {
            iconEl.setAttribute('width', String(size));
            iconEl.setAttribute('height', String(size));
        }
    }

    /** Change the color */
    setColor(color: string): void {
        if (this.element) {
            this.element.style.color = color;
        }
    }
}
