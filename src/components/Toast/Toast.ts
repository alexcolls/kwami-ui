import { Component } from '../../core/Component';
import './Toast.css';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastProps {
  /** Trigger button text */
  triggerText?: string;
  /** Toast message */
  message?: string;
  /** Toast type */
  type?: ToastType;
  /** Duration in ms (0 for persistent) */
  duration?: number;
  /** Position of the toast */
  position?: ToastPosition;
  /** Callback when toast shows/hides */
  onChange?: (isVisible: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

export class Toast extends Component<ToastProps> {
  private isVisible: boolean = false;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  // DOM references
  private trigger: HTMLButtonElement | null = null;
  private toast: HTMLElement | null = null;
  private closeBtn: HTMLButtonElement | null = null;

  constructor(props: ToastProps = {}) {
    super(props);
  }

  private getIcon(type: ToastType): string {
    const icons: Record<ToastType, string> = {
      info: 'solar:info-circle-linear',
      success: 'solar:check-circle-linear',
      warning: 'solar:danger-triangle-linear',
      error: 'solar:close-circle-linear',
    };
    return icons[type];
  }

  private getToastHTML(): string {
    const {
      message = 'This is a notification toast!',
      type = 'info',
      position = 'top-right',
    } = this.props;

    return `
            <div class="kwami-toast kwami-toast-${type} kwami-toast-${position} hidden" data-toast-id="${this.id}">
                <div class="kwami-toast-icon">
                    <iconify-icon icon="${this.getIcon(type)}" width="20" height="20"></iconify-icon>
                </div>
                <span class="kwami-toast-message">${message}</span>
                <button class="kwami-toast-close" aria-label="Close toast">
                    <iconify-icon icon="solar:close-square-linear" width="18" height="18"></iconify-icon>
                </button>
                <div class="kwami-toast-progress"></div>
            </div>
        `;
  }

  render(): string {
    const { className = '', triggerText = 'NOTIFY' } = this.props;

    return `
            <div class="kwami-toast-wrapper ${className}" data-kwami-id="${this.id}">
                <div class="kwami-toast-trigger-bezel">
                    <button class="kwami-toast-trigger">
                        <span class="kwami-toast-trigger-face">
                            <span class="kwami-toast-trigger-highlight"></span>
                            <span class="kwami-toast-trigger-text">${triggerText}</span>
                        </span>
                    </button>
                </div>
            </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.trigger = this.element.querySelector('.kwami-toast-trigger');
    if (!this.trigger) return;

    // Create toast and append to body (portal pattern)
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = this.getToastHTML();
    this.toast = toastContainer.firstElementChild as HTMLElement;
    document.body.appendChild(this.toast);

    this.closeBtn = this.toast.querySelector('.kwami-toast-close');

    this.addListener(this.trigger, 'click', (e: Event) => {
      e.stopPropagation();
      this.show();
    });

    if (this.closeBtn) {
      this.addListener(this.closeBtn, 'click', () => {
        this.hide();
      });
    }
  }

  /** Show the toast */
  show(): void {
    if (!this.toast) return;

    // Clear any existing timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.isVisible = true;
    this.toast.classList.remove('hidden', 'hiding');
    this.toast.classList.add('showing');

    // Update progress bar animation
    const duration = this.props.duration ?? 3000;
    const progress = this.toast.querySelector('.kwami-toast-progress') as HTMLElement;
    if (progress && duration > 0) {
      progress.style.animation = 'none';
      void progress.offsetHeight; // Trigger reflow
      progress.style.animation = `kwami-toast-progress ${duration}ms linear forwards`;
    }

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('toastchange', {
        detail: { isVisible: true },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange(true);
    }

    // Auto-hide after duration
    if (duration > 0) {
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, duration);
    }
  }

  /** Hide the toast */
  hide(): void {
    if (!this.toast || !this.isVisible) return;

    // Clear timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.isVisible = false;
    this.toast.classList.remove('showing');
    this.toast.classList.add('hiding');

    // Wait for animation to complete
    setTimeout(() => {
      this.toast?.classList.add('hidden');
      this.toast?.classList.remove('hiding');
    }, 300);

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('toastchange', {
        detail: { isVisible: false },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange(false);
    }
  }

  /** Check if toast is visible */
  getIsVisible(): boolean {
    return this.isVisible;
  }

  /** Update the message dynamically */
  setMessage(message: string): void {
    const messageEl = this.toast?.querySelector('.kwami-toast-message');
    if (messageEl) {
      messageEl.textContent = message;
    }
  }

  /** Update the type dynamically */
  setType(type: ToastType): void {
    if (!this.toast) return;

    // Remove old type classes
    this.toast.classList.remove(
      'kwami-toast-info',
      'kwami-toast-success',
      'kwami-toast-warning',
      'kwami-toast-error'
    );
    this.toast.classList.add(`kwami-toast-${type}`);

    // Update icon
    const iconEl = this.toast.querySelector('.kwami-toast-icon iconify-icon');
    if (iconEl) {
      iconEl.setAttribute('icon', this.getIcon(type));
    }
  }

  destroy(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    // Remove toast from body
    if (this.toast && this.toast.parentNode) {
      this.toast.parentNode.removeChild(this.toast);
    }
    super.destroy();
  }
}
