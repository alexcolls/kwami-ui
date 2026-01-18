import { Component } from '../../core/Component';
import './Activator.css';

export interface ActivatorProps {
    /** Button text label */
    text?: string;
    /** Label shown below the button */
    label?: string;
    /** Initial active state */
    active?: boolean;
    /** Callback when state changes */
    onChange?: (active: boolean) => void;
    /** Callback on click (for momentary mode) */
    onClick?: () => void;
    /** LED color when active (hex) */
    ledColor?: string;
    /** Additional CSS class */
    className?: string;
}

export class Activator extends Component<ActivatorProps> {
    private isActive: boolean;
    private ledColor: string;

    // DOM references
    private activator: HTMLButtonElement | null = null;
    private led: HTMLElement | null = null;

    constructor(props: ActivatorProps = {}) {
        super(props);
        this.isActive = props.active || false;
        this.ledColor = props.ledColor || '#ff9500';
    }

    render(): string {
        const { text = 'PUSH', label = '', className = '' } = this.props;
        const activeClass = this.isActive ? 'active' : '';

        return `
            <div class="kwami-activator-container ${className}" data-kwami-id="${this.id}">
                <div class="kwami-activator-bezel">
                    <button class="kwami-activator ${activeClass}">
                        <span class="kwami-activator-face">
                            <span class="kwami-activator-highlight"></span>
                            <span class="kwami-activator-text">${text}</span>
                        </span>
                        <span class="kwami-activator-led ${activeClass}"></span>
                    </button>
                </div>
                ${label ? `<span class="kwami-activator-label">${label}</span>` : ''}
            </div>
        `;
    }

    protected onHydrate(): void {
        if (!this.element) return;

        this.activator = this.element.querySelector('.kwami-activator');
        this.led = this.element.querySelector('.kwami-activator-led');

        if (!this.activator || !this.led) return;

        // Apply initial LED style if active
        if (this.isActive) {
            this.updateLedStyle();
        }

        this.addListener(this.activator, 'click', () => {
            this.toggle();
            
            // Call onClick callback (for momentary/trigger use)
            if (this.props.onClick) {
                this.props.onClick();
            }
        });
    }

    private updateLedStyle(): void {
        if (!this.led || !this.isActive) return;

        const glowSize = 12;
        this.led.style.background = `radial-gradient(circle at 30% 30%, ${this.adjustBrightness(this.ledColor, 40)}, ${this.ledColor})`;
        this.led.style.boxShadow = `
            0 0 ${glowSize}px ${this.ledColor}cc,
            0 0 ${glowSize * 2}px ${this.ledColor}80,
            0 0 ${glowSize * 3}px ${this.ledColor}4d
        `;
    }

    private adjustBrightness(hex: string, percent: number): string {
        hex = hex.replace(/^#/, '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        r = Math.min(255, Math.max(0, r + Math.round(r * percent / 100)));
        g = Math.min(255, Math.max(0, g + Math.round(g * percent / 100)));
        b = Math.min(255, Math.max(0, b + Math.round(b * percent / 100)));

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    /** Toggle the active state */
    toggle(): void {
        this.setActive(!this.isActive);
    }

    /** Set the active state */
    setActive(active: boolean): void {
        this.isActive = active;

        if (this.isActive) {
            this.led?.classList.add('active');
            this.activator?.classList.add('active');
            this.updateLedStyle();
        } else {
            this.led?.classList.remove('active');
            this.activator?.classList.remove('active');
            if (this.led) {
                this.led.style.background = '';
                this.led.style.boxShadow = '';
            }
        }

        // Dispatch event
        this.element?.dispatchEvent(new CustomEvent('activatorchange', {
            detail: { active: this.isActive },
            bubbles: true
        }));

        // Call onChange callback
        if (this.props.onChange) {
            this.props.onChange(this.isActive);
        }
    }

    /** Get current active state */
    getActive(): boolean {
        return this.isActive;
    }

    /** Set LED color */
    setLedColor(color: string): void {
        this.ledColor = color;
        if (this.isActive) {
            this.updateLedStyle();
        }
    }
}
