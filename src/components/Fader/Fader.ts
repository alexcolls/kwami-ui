import { Component } from '../../core/Component';
import './Fader.css';

export interface FaderProps {
  /** Initial value */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Label text */
  label?: string;
  /** Callback when value changes */
  onChange?: (value: number) => void;
}

export class Fader extends Component<FaderProps> {
  private currentValue: number;
  private isDragging = false;
  private track: HTMLElement | null = null;
  private knob: HTMLElement | null = null;
  private fill: HTMLElement | null = null;

  constructor(props: FaderProps = {}) {
    super(props);
    this.currentValue = props.value ?? 75;
  }

  render(): string {
    const { value = 75, min = 0, max = 100, label } = this.props;

    return `
   <div class="kwami-fader-container" data-kwami-id="${this.id}">
                ${label ? `<span class="kwami-fader-label">${label}</span>` : ''}
    <div class="kwami-fader" data-value="${value}" data-min="${min}" data-max="${max}">
     <div class="kwami-fader-track">
      <div class="kwami-fader-groove"></div>
      <div class="kwami-fader-fill"></div>
      <div class="kwami-fader-knob">
       <div class="kwami-fader-knob-grip"></div>
       <div class="kwami-fader-knob-grip"></div>
       <div class="kwami-fader-knob-grip"></div>
      </div>
     </div>
     <div class="kwami-fader-ticks">
      <span></span><span></span><span></span><span></span><span></span>
     </div>
    </div>
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.track = this.element.querySelector('.kwami-fader-track');
    this.knob = this.element.querySelector('.kwami-fader-knob');
    this.fill = this.element.querySelector('.kwami-fader-fill');

    if (!this.track || !this.knob || !this.fill) return;

    this.setupEventListeners();
    this.updatePosition(this.currentValue);
  }

  private setupEventListeners(): void {
    if (!this.knob || !this.track) return;

    // Mouse events
    this.addListener(this.knob, 'mousedown', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.knob?.classList.add('dragging');
    });

    const mouseMoveHandler = (e: Event) => {
      if (this.isDragging) this.handleMove((e as MouseEvent).clientY);
    };
    document.addEventListener('mousemove', mouseMoveHandler);

    const mouseUpHandler = () => {
      this.isDragging = false;
      this.knob?.classList.remove('dragging');
    };
    document.addEventListener('mouseup', mouseUpHandler);

    // Touch events
    this.addListener(this.knob, 'touchstart', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.knob?.classList.add('dragging');
    });

    const touchMoveHandler = (e: Event) => {
      if (this.isDragging) this.handleMove((e as TouchEvent).touches[0].clientY);
    };
    document.addEventListener('touchmove', touchMoveHandler);

    const touchEndHandler = () => {
      this.isDragging = false;
      this.knob?.classList.remove('dragging');
    };
    document.addEventListener('touchend', touchEndHandler);

    // Click on track
    this.addListener(this.track, 'click', (e) => {
      if (e.target === this.knob || this.knob?.contains(e.target as Node)) return;
      this.handleMove((e as MouseEvent).clientY);
    });
  }

  private handleMove(clientY: number): void {
    if (!this.track) return;

    const { min = 0, max = 100 } = this.props;
    const rect = this.track.getBoundingClientRect();
    const trackHeight = rect.height - 40; // Account for knob size
    const relativeY = rect.bottom - 20 - clientY; // From bottom
    const percent = Math.max(0, Math.min(100, (relativeY / trackHeight) * 100));
    const newValue = min + (percent / 100) * (max - min);

    this.updatePosition(newValue);
  }

  private updatePosition(newValue: number): void {
    const { min = 0, max = 100 } = this.props;

    this.currentValue = Math.max(min, Math.min(max, newValue));
    const percent = ((this.currentValue - min) / (max - min)) * 100;

    if (this.knob) {
      this.knob.style.bottom = `calc(${percent}% - 20px)`;
    }
    if (this.fill) {
      this.fill.style.height = `${percent}%`;
    }

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('faderchange', {
        detail: { value: Math.round(this.currentValue) },
        bubbles: true,
      })
    );

    if (this.props.onChange) {
      this.props.onChange(Math.round(this.currentValue));
    }
  }

  /** Get the current value */
  getValue(): number {
    return Math.round(this.currentValue);
  }

  /** Set the value programmatically */
  setValue(value: number): void {
    this.updatePosition(value);
  }
}
