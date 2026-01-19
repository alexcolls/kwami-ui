import { Component } from '../../core/Component';
import './Button.css';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost';
export type ButtonType = 'button' | 'submit' | 'reset';
export type IconPosition = 'left' | 'right';

export interface ButtonProps {
    /** Button label text */
    label?: string;
    /** Click event handler */
    onClick?: (event: MouseEvent) => void;
    /** Additional CSS class */
    className?: string;
    /** Button size variant */
    size?: ButtonSize;
    /** Button color variant */
    variant?: ButtonVariant;
    /** Disabled state */
    disabled?: boolean;
    /** Loading state (shows spinner and disables interaction) */
    loading?: boolean;
    /** Iconify icon name */
    icon?: string;
    /** Icon position relative to label */
    iconPosition?: IconPosition;
    /** HTML button type */
    type?: ButtonType;
    /** Expand to full container width */
    fullWidth?: boolean;
}

export class Button extends Component<ButtonProps> {
    private btn: HTMLButtonElement | null = null;
    private isDisabled: boolean;
    private isLoading: boolean;

    constructor(props: ButtonProps = {}) {
        super(props);
        this.isDisabled = props.disabled ?? false;
        this.isLoading = props.loading ?? false;
    }

    render(): string {
        const { 
            label = 'CLICK',
            className = '',
            size = 'md',
            variant = 'default',
            disabled = false,
            loading = false,
            icon,
            iconPosition = 'left',
            type = 'button',
            fullWidth = false
        } = this.props;

        const bezelClasses = [
            'kwami-button-bezel',
            `kwami-button-bezel--${size}`,
            `kwami-button-bezel--${variant}`,
            disabled || loading ? 'kwami-button-disabled' : '',
            fullWidth ? 'kwami-button-bezel--full' : '',
            className
        ].filter(Boolean).join(' ');

        const iconHtml = icon ? `<iconify-icon class="kwami-button-icon" icon="${icon}" width="18" height="18"></iconify-icon>` : '';
        const spinnerHtml = loading ? `<span class="kwami-button-spinner"></span>` : '';
        
        const contentHtml = icon && iconPosition === 'right'
            ? `<span class="kwami-button-text">${label}</span>${iconHtml}`
            : `${iconHtml}<span class="kwami-button-text">${label}</span>`;

        return `
            <div class="${bezelClasses}" data-kwami-id="${this.id}">
                <button 
                    class="kwami-button" 
                    type="${type}"
                    ${disabled || loading ? 'disabled aria-disabled="true"' : ''}
                    ${loading ? 'aria-busy="true"' : ''}
                >
                    <span class="kwami-button-face">
                        <span class="kwami-button-highlight"></span>
                        ${loading ? spinnerHtml : contentHtml}
                    </span>
                </button>
            </div>
        `;
    }

    protected onHydrate(): void {
        if (!this.element) return;

        this.btn = this.element.querySelector('.kwami-button');
        if (!this.btn) return;

        this.addListener(this.btn, 'click', (e) => {
            if (this.isDisabled || this.isLoading) return;

            this.btn!.classList.add('pressed');
            setTimeout(() => this.btn!.classList.remove('pressed'), 150);

            // Dispatch custom event
            this.element?.dispatchEvent(new CustomEvent('buttonclick', {
                detail: { originalEvent: e },
                bubbles: true
            }));

            if (this.props.onClick) {
                this.props.onClick(e as MouseEvent);
            }
        });
    }

    /** Enable or disable the button */
    setDisabled(disabled: boolean): void {
        this.isDisabled = disabled;
        if (this.btn) {
            this.btn.disabled = disabled;
            this.btn.setAttribute('aria-disabled', String(disabled));
        }
        this.element?.classList.toggle('kwami-button-disabled', disabled);
    }

    /** Set loading state */
    setLoading(loading: boolean): void {
        this.isLoading = loading;
        this.setDisabled(loading);
        
        if (this.btn) {
            this.btn.setAttribute('aria-busy', String(loading));
        }
        this.element?.classList.toggle('kwami-button-loading', loading);

        // Update content
        const face = this.element?.querySelector('.kwami-button-face');
        if (face) {
            const highlight = face.querySelector('.kwami-button-highlight');
            if (loading) {
                face.innerHTML = '';
                if (highlight) face.appendChild(highlight);
                const spinner = document.createElement('span');
                spinner.className = 'kwami-button-spinner';
                face.appendChild(spinner);
            } else {
                // Re-render content
                const { label = 'CLICK', icon, iconPosition = 'left' } = this.props;
                const iconHtml = icon ? `<iconify-icon class="kwami-button-icon" icon="${icon}" width="18" height="18"></iconify-icon>` : '';
                const contentHtml = icon && iconPosition === 'right'
                    ? `<span class="kwami-button-text">${label}</span>${iconHtml}`
                    : `${iconHtml}<span class="kwami-button-text">${label}</span>`;
                
                face.innerHTML = `<span class="kwami-button-highlight"></span>${contentHtml}`;
            }
        }
    }

    /** Update button label */
    setLabel(label: string): void {
        const textEl = this.element?.querySelector('.kwami-button-text');
        if (textEl) {
            textEl.textContent = label;
        }
    }

    /** Get current disabled state */
    isButtonDisabled(): boolean {
        return this.isDisabled;
    }

    /** Get current loading state */
    isButtonLoading(): boolean {
        return this.isLoading;
    }
}
