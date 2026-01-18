import { Component } from '../../core/Component';
import { Title } from '../Title/Title';
import './Expandable.css';

export interface ExpandableProps {
  /** Title text displayed at the top */
  title: string;
  /** Content HTML to render inside */
  content: string;
  /** Unique identifier for this expandable */
  expandableId: string;
  /** Expanded size width (CSS value) */
  expandedWidth?: string;
  /** Expanded size height (CSS value) */
  expandedHeight?: string;
  /** Callback when expanded */
  onExpand?: () => void;
  /** Callback when collapsed */
  onCollapse?: () => void;
}

export class Expandable extends Component<ExpandableProps> {
  private isExpanded = false;
  private isAnimating = false;
  private overlay: HTMLElement | null = null;
  private placeholder: HTMLElement | null = null;
  private btn: HTMLElement | null = null;
  private titleComponent: Title | null = null;

  constructor(props: ExpandableProps) {
      super(props);
      this.titleComponent = new Title({ text: props.title });
  }

  render(): string {
      const { content, expandableId, expandedWidth = 'min(90vw, 500px)', expandedHeight = 'min(90vh, 500px)' } = this.props;
      const titleHtml = this.titleComponent ? this.titleComponent.render() : '';

      return `
      <div class="kwami-expandable-placeholder" data-placeholder-for="${expandableId}"></div>
      <div class="kwami-expandable" data-kwami-id="${this.id}" data-expandable-id="${expandableId}"
           style="--end-width: ${expandedWidth}; --end-height: ${expandedHeight}">
          <div class="kwami-expandable-inner">
        <button class="kwami-expandable-btn" aria-label="Expand" title="Expand">
            <iconify-icon class="kwami-expandable-icon-expand" icon="solar:maximize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
            <iconify-icon class="kwami-expandable-icon-minimize" icon="solar:minimize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
        </button>
        <div class="kwami-expandable-title">
            ${titleHtml}
        </div>
        <div class="kwami-expandable-content" data-component="${expandableId}">
            ${content}
        </div>
          </div>
      </div>
      <div class="kwami-expandable-overlay" data-overlay-for="${expandableId}"></div>
      `;
  }

  protected onHydrate(): void {
      if (!this.element) return;

      const { expandableId } = this.props;

      // Find related elements (they're siblings, not children)
      const parent = this.element.parentElement;
      if (!parent) return;

      this.btn = this.element.querySelector('.kwami-expandable-btn');
      this.overlay = parent.querySelector(`[data-overlay-for="${expandableId}"]`);
      this.placeholder = parent.querySelector(`[data-placeholder-for="${expandableId}"]`);

      if (!this.btn || !this.overlay || !this.placeholder) return;

      // Hydrate title component
      const titleEl = this.element.querySelector('.kwami-title');
      if (titleEl && this.titleComponent) {
      this.titleComponent.hydrate(titleEl as HTMLElement);
      }

      // Setup event listeners
      this.addListener(this.btn, 'click', (e) => {
      e.stopPropagation();
      this.toggle();
      });

      this.addListener(this.overlay, 'click', () => {
      if (this.isExpanded && !this.isAnimating) {
          this.collapse();
      }
      });

      // ESC key to close
      const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isExpanded && !this.isAnimating) {
          this.collapse();
      }
      };
      document.addEventListener('keydown', escHandler as EventListener);
  }

  private toggle(): void {
      if (this.isExpanded) {
      this.collapse();
      } else {
      this.expand();
      }
  }

  expand(): void {
      if (this.isAnimating || !this.element || !this.placeholder || !this.overlay || !this.btn) return;
      this.isAnimating = true;

      const rect = this.element.getBoundingClientRect();

      // Store original position
      this.element.style.setProperty('--start-x', `${rect.left}px`);
      this.element.style.setProperty('--start-y', `${rect.top}px`);
      this.element.style.setProperty('--start-width', `${rect.width}px`);
      this.element.style.setProperty('--start-height', `${rect.height}px`);

      // Activate placeholder to maintain grid space
      this.placeholder.classList.add('active');

      // Start expanding animation
      this.element.classList.add('expanding');
      this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.btn.setAttribute('aria-label', 'Minimize');
      this.btn.setAttribute('title', 'Minimize');

      // After animation completes
      const onExpanded = () => {
      this.element?.removeEventListener('animationend', onExpanded);
      this.element?.classList.remove('expanding');
      this.element?.classList.add('expanded');
      this.isExpanded = true;
      this.isAnimating = false;

      if (this.props.onExpand) {
          this.props.onExpand();
      }
      };

      this.element.addEventListener('animationend', onExpanded, { once: true });
  }

  collapse(): void {
      if (this.isAnimating || !this.element || !this.placeholder || !this.overlay || !this.btn) return;
      this.isAnimating = true;

      // Update position in case window was resized
      const placeholderRect = this.placeholder.getBoundingClientRect();
      this.element.style.setProperty('--start-x', `${placeholderRect.left}px`);
      this.element.style.setProperty('--start-y', `${placeholderRect.top}px`);
      this.element.style.setProperty('--start-width', `${placeholderRect.width}px`);
      this.element.style.setProperty('--start-height', `${placeholderRect.height}px`);

      // Start collapsing animation
      this.element.classList.remove('expanded');
      this.element.classList.add('collapsing');
      this.overlay.classList.remove('active');

      this.btn.setAttribute('aria-label', 'Expand');
      this.btn.setAttribute('title', 'Expand');

      // After animation completes
      const onCollapsed = () => {
      this.element?.removeEventListener('animationend', onCollapsed);
      this.element?.classList.remove('collapsing');
      this.placeholder?.classList.remove('active');
      document.body.style.overflow = '';
      this.isExpanded = false;
      this.isAnimating = false;

      if (this.props.onCollapse) {
          this.props.onCollapse();
      }
      };

      this.element.addEventListener('animationend', onCollapsed, { once: true });
  }

  /** Check if currently expanded */
  getIsExpanded(): boolean {
      return this.isExpanded;
  }

  /** Get the content container element */
  getContentElement(): HTMLElement | null {
      return this.element?.querySelector('.kwami-expandable-content') || null;
  }
}
