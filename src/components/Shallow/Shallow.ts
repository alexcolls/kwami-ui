import { Component } from '../../core/Component';
import './Shallow.css';

export interface ShallowProps {
  /** Content to display inside the shallow container */
  content?: string;
  /** Optional icon (iconify icon name) */
  icon?: string;
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
}

/**
 * Shallow - A raised/elevated neumorphic container for notes, callouts, or highlighted content.
 * Creates a "floating" effect that stands out from the surface.
 */
export class Shallow extends Component<ShallowProps> {
  constructor(props: ShallowProps = {}) {
    super(props);
  }

  render(): string {
    const {
      className = '',
      content = 'This is a shallow note with a raised neumorphic style.',
      icon,
      padding = 'md',
    } = this.props;

    const iconHtml = icon
      ? `<iconify-icon class="kwami-shallow-icon" icon="${icon}" width="18" height="18"></iconify-icon>`
      : '';

    return `
            <div class="kwami-shallow kwami-shallow-${padding} ${className}" data-kwami-id="${this.id}">
                ${iconHtml}
                <div class="kwami-shallow-content">${content}</div>
            </div>
        `;
  }

  protected onHydrate(): void {
    // No interactivity needed for this component
  }

  /** Update the content dynamically */
  setContent(content: string): void {
    const contentEl = this.element?.querySelector('.kwami-shallow-content');
    if (contentEl) {
      contentEl.innerHTML = content;
    }
  }

  /** Update the icon dynamically */
  setIcon(icon: string | null): void {
    if (!this.element) return;

    const existingIcon = this.element.querySelector('.kwami-shallow-icon');

    if (icon) {
      if (existingIcon) {
        existingIcon.setAttribute('icon', icon);
      } else {
        const iconEl = document.createElement('iconify-icon');
        iconEl.className = 'kwami-shallow-icon';
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
