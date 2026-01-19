import { Component } from '../../core/Component';
import './Depth.css';

export interface DepthProps {
  /** Content to display inside the depth container */
  content?: string;
  /** Optional icon (iconify icon name) */
  icon?: string;
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
}

/**
 * Depth - An inset/pressed neumorphic container for notes, hints, or highlighted content.
 * Creates a "sunken" effect that draws attention inward.
 */
export class Depth extends Component<DepthProps> {
  constructor(props: DepthProps = {}) {
    super(props);
  }

  render(): string {
    const {
      className = '',
      content = 'This is a depth note with an inset neumorphic style.',
      icon,
      padding = 'md',
    } = this.props;

    const iconHtml = icon
      ? `<iconify-icon class="kwami-depth-icon" icon="${icon}" width="18" height="18"></iconify-icon>`
      : '';

    return `
            <div class="kwami-depth kwami-depth-${padding} ${className}" data-kwami-id="${this.id}">
                ${iconHtml}
                <div class="kwami-depth-content">${content}</div>
            </div>
        `;
  }

  protected onHydrate(): void {
    // No interactivity needed for this component
  }

  /** Update the content dynamically */
  setContent(content: string): void {
    const contentEl = this.element?.querySelector('.kwami-depth-content');
    if (contentEl) {
      contentEl.innerHTML = content;
    }
  }

  /** Update the icon dynamically */
  setIcon(icon: string | null): void {
    if (!this.element) return;

    const existingIcon = this.element.querySelector('.kwami-depth-icon');

    if (icon) {
      if (existingIcon) {
        existingIcon.setAttribute('icon', icon);
      } else {
        const iconEl = document.createElement('iconify-icon');
        iconEl.className = 'kwami-depth-icon';
        iconEl.setAttribute('icon', icon);
        iconEl.setAttribute('width', '18');
        iconEl.setAttribute('height', '18');
        this.element.insertBefore(iconEl, this.element.firstChild);
      }
    } else if (existingIcon) {
      existingIcon.remove();
    }
  }
}
