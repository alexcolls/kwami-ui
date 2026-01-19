import { Component } from '../../core/Component';
import './Modal.css';

export interface ModalProps {
  /** Trigger button text */
  triggerText?: string;
  /** Modal title */
  title?: string;
  /** Modal content */
  content?: string;
  /** Show close button */
  showCloseButton?: boolean;
  /** Callback when modal opens/closes */
  onChange?: (isOpen: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

export class Modal extends Component<ModalProps> {
  private isOpen: boolean = false;

  // DOM references
  private trigger: HTMLButtonElement | null = null;
  private overlay: HTMLElement | null = null;
  private closeBtn: HTMLButtonElement | null = null;
  private escHandler: ((e: KeyboardEvent) => void) | null = null;

  constructor(props: ModalProps = {}) {
    super(props);
  }

  private getOverlayHTML(): string {
    const {
      title = 'Modal Title',
      content = 'This is a neumorphic modal dialog with smooth animations and hardware-inspired styling.',
      showCloseButton = true,
    } = this.props;

    return `
   <div class="kwami-modal-overlay hidden" data-modal-id="${this.id}">
    <div class="kwami-modal">
     <div class="kwami-modal-header">
      <h3 class="kwami-modal-title">${title}</h3>
      ${
        showCloseButton
          ? `
                            <button class="kwami-modal-close" aria-label="Close modal">
                                <iconify-icon icon="solar:close-circle-linear" width="24" height="24"></iconify-icon>
                            </button>
                        `
          : ''
      }
     </div>
     <div class="kwami-modal-content">
      <p>${content}</p>
     </div>
     <div class="kwami-modal-footer">
      <button class="kwami-modal-btn kwami-modal-btn-secondary">Cancel</button>
      <button class="kwami-modal-btn kwami-modal-btn-primary">Confirm</button>
     </div>
    </div>
   </div>
        `;
  }

  render(): string {
    const { className = '', triggerText = 'OPEN' } = this.props;

    return `
   <div class="kwami-modal-wrapper ${className}" data-kwami-id="${this.id}">
    <div class="kwami-modal-trigger-bezel">
     <button class="kwami-modal-trigger">
      <span class="kwami-modal-trigger-face">
       <span class="kwami-modal-trigger-highlight"></span>
       <span class="kwami-modal-trigger-text">${triggerText}</span>
      </span>
     </button>
    </div>
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.trigger = this.element.querySelector('.kwami-modal-trigger');
    if (!this.trigger) return;

    // Create overlay and append to body (portal pattern)
    const overlayContainer = document.createElement('div');
    overlayContainer.innerHTML = this.getOverlayHTML();
    this.overlay = overlayContainer.firstElementChild as HTMLElement;
    document.body.appendChild(this.overlay);

    this.closeBtn = this.overlay.querySelector('.kwami-modal-close');

    // Trigger click
    this.addListener(this.trigger, 'click', (e: Event) => {
      e.stopPropagation();
      this.open();
    });

    // Close button click
    if (this.closeBtn) {
      this.addListener(this.closeBtn, 'click', () => {
        this.close();
      });
    }

    // Overlay click to close
    this.addListener(this.overlay, 'click', (e: Event) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Cancel button
    const cancelBtn = this.overlay.querySelector('.kwami-modal-btn-secondary');
    if (cancelBtn) {
      this.addListener(cancelBtn, 'click', () => {
        this.close();
      });
    }

    // Confirm button
    const confirmBtn = this.overlay.querySelector('.kwami-modal-btn-primary');
    if (confirmBtn) {
      this.addListener(confirmBtn, 'click', () => {
        this.element?.dispatchEvent(
          new CustomEvent('modalconfirm', {
            bubbles: true,
          })
        );
        this.close();
      });
    }

    // ESC key to close
    this.escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    };
    document.addEventListener('keydown', this.escHandler);
  }

  /** Open the modal */
  open(): void {
    if (!this.trigger || !this.overlay || this.isOpen) return;

    this.isOpen = true;
    this.overlay.classList.remove('hidden');
    this.trigger.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('modalchange', {
        detail: { isOpen: true },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange(true);
    }
  }

  /** Close the modal */
  close(): void {
    if (!this.trigger || !this.overlay || !this.isOpen) return;

    this.isOpen = false;
    this.overlay.classList.add('hidden');
    this.trigger.classList.remove('active');
    document.body.style.overflow = '';

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('modalchange', {
        detail: { isOpen: false },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange(false);
    }
  }

  /** Check if modal is open */
  getIsOpen(): boolean {
    return this.isOpen;
  }

  destroy(): void {
    if (this.escHandler) {
      document.removeEventListener('keydown', this.escHandler);
    }
    // Remove overlay from body
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    document.body.style.overflow = '';
    super.destroy();
  }
}
