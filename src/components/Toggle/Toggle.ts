import { Component } from '../../core/Component';
import './Toggle.css';

interface ToggleState {
  icon: string;
  label: string;
}

export interface ToggleProps {
  /** Array of states to cycle through */
  states?: ToggleState[];
  /** Initial state index */
  initialState?: number;
  /** Callback when toggle state changes */
  onChange?: (state: { index: number; icon: string; label: string }) => void;
  /** Additional CSS class */
  className?: string;
}

const defaultStates: ToggleState[] = [
  { icon: 'solar:sun-bold', label: 'Light' },
  { icon: 'solar:moon-bold', label: 'Dark' },
  { icon: 'solar:monitor-bold', label: 'System' },
];

export class Toggle extends Component<ToggleProps> {
  private currentState: number;
  private states: ToggleState[];

  // DOM references
  private btn: HTMLButtonElement | null = null;
  private icon: HTMLElement | null = null;
  private label: HTMLElement | null = null;

  constructor(props: ToggleProps = {}) {
    super(props);
    this.states = props.states || defaultStates;
    this.currentState = props.initialState || 0;
  }

  render(): string {
    const { className = '' } = this.props;
    const state = this.states[this.currentState];

    return `
   <div class="kwami-toggle ${className}" data-kwami-id="${this.id}" data-state="${this.currentState}">
    <button class="kwami-toggle-btn" title="Click to toggle">
     <span class="kwami-toggle-highlight"></span>
     <iconify-icon class="kwami-toggle-icon" icon="${state.icon}" width="20" height="20"></iconify-icon>
    </button>
    <span class="kwami-toggle-label">${state.label}</span>
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.btn = this.element.querySelector('.kwami-toggle-btn');
    this.icon = this.element.querySelector('.kwami-toggle-icon');
    this.label = this.element.querySelector('.kwami-toggle-label');

    if (!this.btn || !this.icon || !this.label) return;

    this.addListener(this.btn, 'click', () => {
      this.cycle();
    });
  }

  private updateState(stateIndex: number): void {
    if (!this.icon || !this.label) return;

    this.currentState = stateIndex % this.states.length;
    const state = this.states[this.currentState];

    // Add animation class
    this.icon.classList.add('switching');

    setTimeout(() => {
      this.icon!.setAttribute('icon', state.icon);
      this.label!.textContent = state.label;
      this.element?.setAttribute('data-state', String(this.currentState));

      // Remove animation class
      setTimeout(() => this.icon!.classList.remove('switching'), 150);
    }, 100);

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('togglechange', {
        detail: {
          state: this.currentState,
          icon: state.icon,
          label: state.label,
        },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange({
        index: this.currentState,
        icon: state.icon,
        label: state.label,
      });
    }
  }

  /** Cycle to the next state */
  cycle(): void {
    this.updateState(this.currentState + 1);
  }

  /** Set a specific state by index */
  setState(index: number): void {
    if (index >= 0 && index < this.states.length) {
      this.updateState(index);
    }
  }

  /** Get current state */
  getState(): { index: number; icon: string; label: string } {
    const state = this.states[this.currentState];
    return {
      index: this.currentState,
      icon: state.icon,
      label: state.label,
    };
  }
}
