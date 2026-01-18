import { Component } from '../../core/Component';
import './Button.css';

export interface ButtonProps {
    label?: string;
    onClick?: (event: MouseEvent) => void;
    className?: string;
    disabled?: boolean;
}

export class Button extends Component<ButtonProps> {
    constructor(props: ButtonProps = {}) {
        super(props);
    }

    render(): string {
        const { label = 'CLICK', className = '', disabled = false } = this.props;
        const disabledAttr = disabled ? 'disabled' : '';
        const disabledClass = disabled ? 'kwami-button-disabled' : '';

        return `
            <div class="kwami-button-bezel ${className} ${disabledClass}" data-kwami-id="${this.id}">
                <button class="kwami-button" ${disabledAttr}>
                    <span class="kwami-button-face">
                        <span class="kwami-button-highlight"></span>
                        <span class="kwami-button-text">${label}</span>
                    </span>
                </button>
            </div>
        `;
    }

    protected onHydrate(): void {
        if (!this.element) return;

        const btn = this.element.querySelector('.kwami-button');
        if (!btn) return;

        this.addListener(btn, 'click', (e) => {
            if (this.props.disabled) return;

            const buttonEl = btn as HTMLElement;
            buttonEl.classList.add('pressed');
            setTimeout(() => buttonEl.classList.remove('pressed'), 150);

            if (this.props.onClick) {
                this.props.onClick(e as MouseEvent);
            }
        });
    }
}
