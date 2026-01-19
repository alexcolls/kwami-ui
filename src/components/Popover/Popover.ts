import { Component } from '../../core/Component';
import './Popover.css';

export interface PopoverProps {
  /** Trigger button text */
  triggerText?: string;
  /** Popover title */
  title?: string;
  /** Popover content */
  content?: string;
  /** Callback when popover opens/closes */
  onChange?: (isOpen: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

export class Popover extends Component<PopoverProps> {
  private isOpen: boolean = false;

  // DOM references
  private trigger: HTMLButtonElement | null = null;
  private popover: HTMLElement | null = null;
  private documentClickHandler: ((e: Event) => void) | null = null;

  constructor(props: PopoverProps = {}) {
    super(props);
  }

  render(): string {
    const {
      className = '',
      triggerText = 'INFO',
      title = 'Popover Title',
      content = 'This is a neumorphic popover panel with hardware-inspired styling.',
    } = this.props;

    return `
            <div class="kwami-popover-wrapper ${className}" data-kwami-id="${this.id}">
                <div class="kwami-popover-trigger-bezel">
                    <button class="kwami-popover-trigger">
                        <span class="kwami-popover-trigger-face">
                            <span class="kwami-popover-trigger-highlight"></span>
                            <span class="kwami-popover-trigger-text">${triggerText}</span>
                        </span>
                    </button>
                </div>
                <div class="kwami-popover hidden">
                    <div class="kwami-popover-content">
                        <h4>${title}</h4>
                        <p>${content}</p>
                    </div>
                    <div class="kwami-popover-arrow"></div>
                </div>
            </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.trigger = this.element.querySelector('.kwami-popover-trigger');
    this.popover = this.element.querySelector('.kwami-popover');

    if (!this.trigger || !this.popover) return;

    this.addListener(this.trigger, 'click', (e: Event) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close when clicking outside
    this.documentClickHandler = (e: Event) => {
      if (!this.element?.contains(e.target as Node)) {
        this.close();
      }
    };
    document.addEventListener('click', this.documentClickHandler);
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Open the popover */
  open(): void {
    if (!this.trigger || !this.popover || this.isOpen) return;

    this.isOpen = true;
    this.popover.classList.remove('hidden');
    this.trigger.classList.add('active');

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('popoverchange', {
        detail: { isOpen: true },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange(true);
    }
  }

  /** Close the popover */
  close(): void {
    if (!this.trigger || !this.popover || !this.isOpen) return;

    this.isOpen = false;
    this.popover.classList.add('hidden');
    this.trigger.classList.remove('active');

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('popoverchange', {
        detail: { isOpen: false },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange(false);
    }
  }

  /** Check if popover is open */
  getIsOpen(): boolean {
    return this.isOpen;
  }

  destroy(): void {
    if (this.documentClickHandler) {
      document.removeEventListener('click', this.documentClickHandler);
    }
    super.destroy();
  }
}
