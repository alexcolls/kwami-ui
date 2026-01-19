import { Component } from '../../core/Component';
import { Title } from '../Title/Title';
import './Expandable.css';

/** Screen configuration for multi-screen expandables */
export interface ExpandableScreen {
  /** Unique identifier for this screen */
  id: string;
  /** Iconify icon name for the action button */
  icon: string;
  /** Tooltip/title for the button */
  title?: string;
  /** Content HTML for this screen */
  content: string;
  /** Expanded width for this screen (CSS value) */
  expandedWidth?: string;
  /** Expanded height for this screen (CSS value) */
  expandedHeight?: string;
  /** Disable scrollbar for this screen (useful for configurators that fit content) */
  noScroll?: boolean;
}

export interface ExpandableProps {
  /** Title text displayed at the top */
  title: string;
  /** Content HTML to render inside (single-screen mode) */
  content?: string;
  /** Preview content shown in collapsed state (multi-screen mode) */
  preview?: string;
  /** Multiple expandable screens (multi-screen mode) */
  screens?: ExpandableScreen[];
  /** Unique identifier for this expandable */
  expandableId: string;
  /** Expanded size width (CSS value) - for single-screen mode */
  expandedWidth?: string;
  /** Expanded size height (CSS value) - for single-screen mode */
  expandedHeight?: string;
  /** Callback when expanded */
  onExpand?: (screenId?: string) => void;
  /** Callback when collapsed */
  onCollapse?: () => void;
}

export class Expandable extends Component<ExpandableProps> {
  private isExpanded = false;
  private isAnimating = false;
  private activeScreenId: string | null = null;
  private overlay: HTMLElement | null = null;
  private placeholder: HTMLElement | null = null;
  private minimizeBtn: HTMLElement | null = null;
  private screenBtns: Map<string, HTMLElement> = new Map();
  private titleComponent: Title | null = null;
  private contentEl: HTMLElement | null = null;
  private previewEl: HTMLElement | null = null;

  constructor(props: ExpandableProps) {
      super(props);
      this.titleComponent = new Title({ text: props.title });
  }

  /** Check if using multi-screen mode */
  private isMultiScreen(): boolean {
      return Array.isArray(this.props.screens) && this.props.screens.length > 0;
  }

  render(): string {
      const { expandableId, expandedWidth = 'min(90vw, 500px)', expandedHeight = 'min(90vh, 500px)' } = this.props;
      const titleHtml = this.titleComponent ? this.titleComponent.render() : '';

      if (this.isMultiScreen()) {
          return this.renderMultiScreen(titleHtml, expandableId);
      } else {
          return this.renderSingleScreen(titleHtml, expandableId, expandedWidth, expandedHeight);
      }
  }

  private renderSingleScreen(titleHtml: string, expandableId: string, expandedWidth: string, expandedHeight: string): string {
      const { content = '' } = this.props;

      return `
      <div class="kwami-expandable-placeholder" data-placeholder-for="${expandableId}"></div>
      <div class="kwami-expandable" data-kwami-id="${this.id}" data-expandable-id="${expandableId}"
           style="--end-width: ${expandedWidth}; --end-height: ${expandedHeight}">
          <div class="kwami-expandable-inner">
              <div class="kwami-expandable-actions">
                  <button class="kwami-expandable-btn kwami-expandable-btn-expand" aria-label="Expand" title="Expand">
                      <iconify-icon class="kwami-expandable-icon-expand" icon="solar:maximize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
                  </button>
                  <button class="kwami-expandable-btn kwami-expandable-btn-minimize" aria-label="Minimize" title="Minimize">
                      <iconify-icon icon="solar:minimize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
                  </button>
              </div>
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

  private renderMultiScreen(titleHtml: string, expandableId: string): string {
      const { preview = '', screens = [] } = this.props;
      const firstScreen = screens[0];
      const defaultWidth = firstScreen?.expandedWidth || 'min(90vw, 500px)';
      const defaultHeight = firstScreen?.expandedHeight || 'min(90vh, 500px)';

      // Render screen action buttons
      const screenBtnsHtml = screens.map(screen => `
          <button class="kwami-expandable-btn kwami-expandable-btn-screen" 
                  data-screen-id="${screen.id}" 
                  aria-label="${screen.title || screen.id}" 
                  title="${screen.title || screen.id}">
              <iconify-icon icon="${screen.icon}" width="18" height="18"></iconify-icon>
          </button>
      `).join('');

      // Render screen contents (hidden by default)
      const screensHtml = screens.map(screen => `
          <div class="kwami-expandable-screen" data-screen="${screen.id}" 
               data-width="${screen.expandedWidth || defaultWidth}"
               data-height="${screen.expandedHeight || defaultHeight}"
               ${screen.noScroll ? 'data-no-scroll="true"' : ''}>
              ${screen.content}
          </div>
      `).join('');

      return `
      <div class="kwami-expandable-placeholder" data-placeholder-for="${expandableId}"></div>
      <div class="kwami-expandable kwami-expandable-multi" data-kwami-id="${this.id}" data-expandable-id="${expandableId}"
           style="--end-width: ${defaultWidth}; --end-height: ${defaultHeight}">
          <div class="kwami-expandable-inner">
              <div class="kwami-expandable-actions">
                  ${screenBtnsHtml}
                  <button class="kwami-expandable-btn kwami-expandable-btn-minimize" aria-label="Minimize" title="Minimize">
                      <iconify-icon icon="solar:minimize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
                  </button>
              </div>
              <div class="kwami-expandable-title">
                  ${titleHtml}
              </div>
              <div class="kwami-expandable-preview">
                  ${preview}
              </div>
              <div class="kwami-expandable-screens">
                  ${screensHtml}
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

      this.overlay = parent.querySelector(`[data-overlay-for="${expandableId}"]`);
      this.placeholder = parent.querySelector(`[data-placeholder-for="${expandableId}"]`);
      this.minimizeBtn = this.element.querySelector('.kwami-expandable-btn-minimize');
      this.contentEl = this.element.querySelector('.kwami-expandable-content');
      this.previewEl = this.element.querySelector('.kwami-expandable-preview');

      if (!this.overlay || !this.placeholder) return;

      // Hydrate title component
      const titleEl = this.element.querySelector('.kwami-title');
      if (titleEl && this.titleComponent) {
          this.titleComponent.hydrate(titleEl as HTMLElement);
      }

      if (this.isMultiScreen()) {
          this.hydrateMultiScreen();
      } else {
          this.hydrateSingleScreen();
      }

      // Overlay click to close
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

  private hydrateSingleScreen(): void {
      const expandBtn = this.element?.querySelector('.kwami-expandable-btn-expand');
      
      if (expandBtn) {
          this.addListener(expandBtn, 'click', (e) => {
              e.stopPropagation();
              this.expand();
          });
      }

      if (this.minimizeBtn) {
          this.addListener(this.minimizeBtn, 'click', (e) => {
              e.stopPropagation();
              this.collapse();
          });
      }
  }

  private hydrateMultiScreen(): void {
      // Find all screen action buttons
      const screenBtns = this.element?.querySelectorAll('.kwami-expandable-btn-screen');
      screenBtns?.forEach(btn => {
          const screenId = btn.getAttribute('data-screen-id');
          if (screenId) {
              this.screenBtns.set(screenId, btn as HTMLElement);
              this.addListener(btn, 'click', (e) => {
                  e.stopPropagation();
                  this.expandToScreen(screenId);
              });
          }
      });

      // Minimize button
      if (this.minimizeBtn) {
          this.addListener(this.minimizeBtn, 'click', (e) => {
              e.stopPropagation();
              this.collapse();
          });
      }
  }

  /** Expand to a specific screen (multi-screen mode) */
  expandToScreen(screenId: string): void {
      if (this.isAnimating || !this.element || !this.placeholder || !this.overlay) return;

      const screen = this.element.querySelector(`[data-screen="${screenId}"]`) as HTMLElement;
      if (!screen) return;

      // Get screen dimensions
      const width = screen.dataset.width || 'min(90vw, 500px)';
      const height = screen.dataset.height || 'min(90vh, 500px)';

      // Update dimensions
      this.element.style.setProperty('--end-width', width);
      this.element.style.setProperty('--end-height', height);

      // Hide all screens and show active one
      this.element.querySelectorAll('.kwami-expandable-screen').forEach(s => {
          s.classList.remove('active');
      });
      screen.classList.add('active');

      // Update active button state
      this.screenBtns.forEach((btn, id) => {
          btn.classList.toggle('active', id === screenId);
      });

      this.activeScreenId = screenId;

      if (!this.isExpanded) {
          this.expand(screenId);
      }
  }

  expand(screenId?: string): void {
      if (this.isAnimating || !this.element || !this.placeholder || !this.overlay) return;
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

      // After animation completes
      const onExpanded = () => {
          this.element?.removeEventListener('animationend', onExpanded);
          this.element?.classList.remove('expanding');
          this.element?.classList.add('expanded');
          this.isExpanded = true;
          this.isAnimating = false;

          if (this.props.onExpand) {
              this.props.onExpand(screenId);
          }
      };

      this.element.addEventListener('animationend', onExpanded, { once: true });
  }

  collapse(): void {
      if (this.isAnimating || !this.element || !this.placeholder || !this.overlay) return;
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

      // After animation completes
      const onCollapsed = () => {
          this.element?.removeEventListener('animationend', onCollapsed);
          this.element?.classList.remove('collapsing');
          this.placeholder?.classList.remove('active');
          document.body.style.overflow = '';
          this.isExpanded = false;
          this.isAnimating = false;

          // Hide active screen and reset
          if (this.isMultiScreen()) {
              this.element?.querySelectorAll('.kwami-expandable-screen').forEach(s => {
                  s.classList.remove('active');
              });
              this.screenBtns.forEach(btn => btn.classList.remove('active'));
              this.activeScreenId = null;
          }

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

  /** Get the currently active screen ID (multi-screen mode) */
  getActiveScreenId(): string | null {
      return this.activeScreenId;
  }

  /** Get the content container element */
  getContentElement(): HTMLElement | null {
      return this.element?.querySelector('.kwami-expandable-content') || null;
  }

  /** Get a specific screen element by ID */
  getScreenElement(screenId: string): HTMLElement | null {
      return this.element?.querySelector(`[data-screen="${screenId}"]`) || null;
  }

  /** Get the preview element (multi-screen mode) */
  getPreviewElement(): HTMLElement | null {
      return this.previewEl;
  }
}
