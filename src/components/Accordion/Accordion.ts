import { Component } from '../../core/Component';
import './Accordion.css';

export interface AccordionItem {
  /** Unique ID for the section */
  id: string;
  /** Section header text */
  title: string;
  /** Section content */
  content: string;
  /** Whether the section is initially expanded */
  expanded?: boolean;
}

export interface AccordionProps {
  /** Array of accordion items */
  items?: AccordionItem[];
  /** Allow multiple sections open at once */
  allowMultiple?: boolean;
  /** Callback when section changes */
  onChange?: (itemId: string, expanded: boolean) => void;
  /** Additional CSS class */
  className?: string;
}

const defaultItems: AccordionItem[] = [
  { id: 'section1', title: 'Section 1', content: 'Content for section 1', expanded: true },
  { id: 'section2', title: 'Section 2', content: 'Content for section 2' },
];

export class Accordion extends Component<AccordionProps> {
  private items: AccordionItem[];
  private allowMultiple: boolean;

  constructor(props: AccordionProps = {}) {
    super(props);
    this.items = props.items || defaultItems;
    this.allowMultiple = props.allowMultiple ?? true;
  }

  render(): string {
    const { className = '' } = this.props;

    const sections = this.items
      .map(
        (item) => `
            <div class="kwami-accordion-item${item.expanded ? ' expanded' : ''}" data-item="${item.id}">
                <button class="kwami-accordion-header">
                    <span>${item.title}</span>
                    <iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16"></iconify-icon>
                </button>
                <div class="kwami-accordion-content">
                    <div class="kwami-accordion-body">
                        ${item.content}
                    </div>
                </div>
            </div>
        `
      )
      .join('');

    return `
            <div class="kwami-accordion ${className}" data-kwami-id="${this.id}">
                ${sections}
            </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    const items = this.element.querySelectorAll('.kwami-accordion-item');

    items.forEach((item) => {
      const header = item.querySelector('.kwami-accordion-header');
      const content = item.querySelector('.kwami-accordion-content') as HTMLElement;
      const body = item.querySelector('.kwami-accordion-body') as HTMLElement;

      if (!header || !content || !body) return;

      // Set initial height for expanded items
      if (item.classList.contains('expanded')) {
        content.style.maxHeight = `${body.offsetHeight}px`;
      }

      this.addListener(header, 'click', () => {
        const isExpanded = item.classList.contains('expanded');
        const itemId = item.getAttribute('data-item') || '';

        if (isExpanded) {
          content.style.maxHeight = '0';
          item.classList.remove('expanded');
        } else {
          // If not allowing multiple, close others first
          if (!this.allowMultiple) {
            items.forEach((otherItem) => {
              if (otherItem !== item && otherItem.classList.contains('expanded')) {
                const otherContent = otherItem.querySelector(
                  '.kwami-accordion-content'
                ) as HTMLElement;
                if (otherContent) {
                  otherContent.style.maxHeight = '0';
                  otherItem.classList.remove('expanded');
                }
              }
            });
          }
          content.style.maxHeight = `${body.offsetHeight}px`;
          item.classList.add('expanded');
        }

        // Dispatch event
        this.element?.dispatchEvent(
          new CustomEvent('accordionchange', {
            detail: {
              itemId,
              expanded: !isExpanded,
            },
            bubbles: true,
          })
        );

        // Call onChange callback
        if (this.props.onChange) {
          this.props.onChange(itemId, !isExpanded);
        }
      });
    });
  }

  /** Expand a specific section by ID */
  expand(itemId: string): void {
    if (!this.element) return;

    const item = this.element.querySelector(`[data-item="${itemId}"]`);
    if (item && !item.classList.contains('expanded')) {
      const header = item.querySelector('.kwami-accordion-header') as HTMLElement;
      header?.click();
    }
  }

  /** Collapse a specific section by ID */
  collapse(itemId: string): void {
    if (!this.element) return;

    const item = this.element.querySelector(`[data-item="${itemId}"]`);
    if (item && item.classList.contains('expanded')) {
      const header = item.querySelector('.kwami-accordion-header') as HTMLElement;
      header?.click();
    }
  }

  /** Check if a section is expanded */
  isExpanded(itemId: string): boolean {
    if (!this.element) return false;

    const item = this.element.querySelector(`[data-item="${itemId}"]`);
    return item?.classList.contains('expanded') ?? false;
  }
}
