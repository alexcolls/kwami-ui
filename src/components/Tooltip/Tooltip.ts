import { Component } from '../../core/Component';
import './Tooltip.css';

export interface TooltipProps {
    /** Trigger button text */
    triggerText?: string;
    /** Tooltip text */
    text?: string;
    /** Callback when tooltip shows/hides */
    onChange?: (isVisible: boolean) => void;
    /** Additional CSS class */
    className?: string;
}

export class Tooltip extends Component<TooltipProps> {
    private isVisible: boolean = false;

    // DOM references
    private trigger: HTMLButtonElement | null = null;
    private tooltip: HTMLElement | null = null;

    constructor(props: TooltipProps = {}) {
        super(props);
    }

    render(): string {
        const {
            className = '',
            triggerText = 'HOVER',
            text = 'Helpful tooltip info!'
        } = this.props;

        return `
            <div class="kwami-tooltip-wrapper ${className}" data-kwami-id="${this.id}">
                <div class="kwami-tooltip-trigger-bezel">
                    <button class="kwami-tooltip-trigger">
                        <span class="kwami-tooltip-trigger-face">
                            <span class="kwami-tooltip-trigger-highlight"></span>
                            <span class="kwami-tooltip-trigger-text">${triggerText}</span>
                        </span>
                    </button>
                </div>
                <div class="kwami-tooltip hidden">
                    <span class="kwami-tooltip-text">${text}</span>
                    <div class="kwami-tooltip-arrow"></div>
                </div>
            </div>
        `;
    }

    protected onHydrate(): void {
        if (!this.element) return;

        this.trigger = this.element.querySelector('.kwami-tooltip-trigger');
        this.tooltip = this.element.querySelector('.kwami-tooltip');

        if (!this.trigger || !this.tooltip) return;

        this.addListener(this.trigger, 'mouseenter', () => {
            this.show();
        });

        this.addListener(this.trigger, 'mouseleave', () => {
            this.hide();
        });

        // Also handle focus for accessibility
        this.addListener(this.trigger, 'focus', () => {
            this.show();
        });

        this.addListener(this.trigger, 'blur', () => {
            this.hide();
        });
    }

    /** Show the tooltip */
    show(): void {
        if (!this.tooltip || this.isVisible) return;

        this.isVisible = true;
        this.tooltip.classList.remove('hidden');

        // Dispatch event
        this.element?.dispatchEvent(new CustomEvent('tooltipchange', {
            detail: { isVisible: true },
            bubbles: true
        }));

        // Call onChange callback
        if (this.props.onChange) {
            this.props.onChange(true);
        }
    }

    /** Hide the tooltip */
    hide(): void {
        if (!this.tooltip || !this.isVisible) return;

        this.isVisible = false;
        this.tooltip.classList.add('hidden');

        // Dispatch event
        this.element?.dispatchEvent(new CustomEvent('tooltipchange', {
            detail: { isVisible: false },
            bubbles: true
        }));

        // Call onChange callback
        if (this.props.onChange) {
            this.props.onChange(false);
        }
    }

    /** Check if tooltip is visible */
    getIsVisible(): boolean {
        return this.isVisible;
    }
}
