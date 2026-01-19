import { Component } from '../../core/Component';
import './Switch.css';

export interface SwitchProps {
  /** Initial checked state */
  checked?: boolean;
  /** Label shown below the switch */
  label?: string;
  /** Callback when state changes */
  onChange?: (checked: boolean) => void;
  /** Active thumb color (hex) */
  activeThumbColor?: string;
  /** Active track color (hex) */
  activeTrackColor?: string;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

export class Switch extends Component<SwitchProps> {
  private isChecked: boolean;
  private activeThumbColor: string;
  private activeTrackColor: string;

  // DOM references
  private input: HTMLInputElement | null = null;
  private track: HTMLElement | null = null;
  private thumb: HTMLElement | null = null;

  constructor(props: SwitchProps = {}) {
    super(props);
    this.isChecked = props.checked || false;
    this.activeThumbColor = props.activeThumbColor || '#ff9500';
    this.activeTrackColor = props.activeTrackColor || '#ffe8cc';
  }

  render(): string {
    const { label = '', className = '', disabled = false } = this.props;
    const checkedAttr = this.isChecked ? 'checked' : '';
    const disabledAttr = disabled ? 'disabled' : '';

    return `
            <div class="kwami-switch-container ${className}" data-kwami-id="${this.id}">
                <label class="kwami-switch ${disabled ? 'kwami-switch-disabled' : ''}">
                    <input type="checkbox" class="kwami-switch-input" ${checkedAttr} ${disabledAttr}>
                    <span class="kwami-switch-bezel">
                        <span class="kwami-switch-track">
                            <span class="kwami-switch-thumb">
                                <span class="kwami-switch-thumb-highlight"></span>
                            </span>
                        </span>
                    </span>
                </label>
                ${label ? `<span class="kwami-switch-label">${label}</span>` : ''}
            </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.input = this.element.querySelector('.kwami-switch-input');
    this.track = this.element.querySelector('.kwami-switch-track');
    this.thumb = this.element.querySelector('.kwami-switch-thumb');

    if (!this.input || !this.track || !this.thumb) return;

    // Apply initial styles if checked
    if (this.isChecked) {
      this.updateActiveStyles();
    }

    this.addListener(this.input, 'change', () => {
      this.isChecked = this.input!.checked;

      if (this.isChecked) {
        this.updateActiveStyles();
      } else {
        this.resetStyles();
      }

      // Dispatch event
      this.element?.dispatchEvent(
        new CustomEvent('switchchange', {
          detail: { checked: this.isChecked },
          bubbles: true,
        })
      );

      // Call onChange callback
      if (this.props.onChange) {
        this.props.onChange(this.isChecked);
      }
    });
  }

  private updateActiveStyles(): void {
    if (!this.track || !this.thumb) return;

    // Apply custom active track color
    const trackLight = this.adjustBrightness(this.activeTrackColor, 10);
    this.track.style.background = `linear-gradient(145deg, ${this.activeTrackColor} 0%, ${trackLight} 100%)`;

    // Apply custom active thumb color with glow
    const thumbHighlight = this.adjustBrightness(this.activeThumbColor, 30);
    const thumbMid = this.adjustBrightness(this.activeThumbColor, 10);
    const thumbDark = this.adjustBrightness(this.activeThumbColor, -15);
    const thumbShadow = this.adjustBrightness(this.activeThumbColor, -25);
    this.thumb.style.background = `linear-gradient(160deg, ${thumbHighlight} 0%, ${thumbMid} 20%, ${this.activeThumbColor} 50%, ${thumbDark} 80%, ${thumbShadow} 100%)`;

    const glowSize = 10;
    this.thumb.style.boxShadow = `
            0 3px ${glowSize}px ${this.activeThumbColor}66,
            0 2px 6px ${this.activeThumbColor}4d,
            0 0 ${glowSize * 2}px ${this.activeThumbColor}4d,
            inset 0 2px 3px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px ${thumbShadow}4d
        `;
  }

  private resetStyles(): void {
    if (!this.track || !this.thumb) return;
    this.track.style.background = '';
    this.thumb.style.background = '';
    this.thumb.style.boxShadow = '';
  }

  private adjustBrightness(hex: string, percent: number): string {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.min(255, Math.max(0, r + Math.round((r * percent) / 100)));
    g = Math.min(255, Math.max(0, g + Math.round((g * percent) / 100)));
    b = Math.min(255, Math.max(0, b + Math.round((b * percent) / 100)));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  /** Toggle the switch */
  toggle(): void {
    this.setChecked(!this.isChecked);
  }

  /** Set checked state */
  setChecked(checked: boolean): void {
    if (this.input) {
      this.input.checked = checked;
      this.input.dispatchEvent(new Event('change'));
    }
  }

  /** Get checked state */
  getChecked(): boolean {
    return this.isChecked;
  }

  /** Set active thumb color */
  setActiveThumbColor(color: string): void {
    this.activeThumbColor = color;
    if (this.isChecked) {
      this.updateActiveStyles();
    }
  }

  /** Set active track color */
  setActiveTrackColor(color: string): void {
    this.activeTrackColor = color;
    if (this.isChecked) {
      this.updateActiveStyles();
    }
  }
}
