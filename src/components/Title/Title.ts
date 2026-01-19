import { Component } from '../../core/Component';
import './Title.css';

export interface TitleProps {
  /** The text to display */
  text: string;
  /** HTML tag to use (default: h3) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

export class Title extends Component<TitleProps> {
  constructor(props: TitleProps) {
    super(props);
  }

  render(): string {
    const { text, as = 'h3' } = this.props;

    // Split text into individual characters for the lighting effect
    const chars = text
      .split('')
      .map((char, index) => {
        if (char === ' ') {
          return `<span class="kwami-title-char kwami-title-space" style="--char-index: ${index}">&nbsp;</span>`;
        }
        return `<span class="kwami-title-char" style="--char-index: ${index}">${char}</span>`;
      })
      .join('');

    return `
 <${as} class="kwami-title" data-kwami-id="${this.id}">
  <span class="kwami-title-text">${chars}</span>
  <span class="kwami-title-glow" aria-hidden="true">${text}</span>
 </${as}>
      `;
  }

  protected onHydrate(): void {
    // Title is purely visual, no interactive behavior needed
  }
}

/**
 * Functional helper for simple usage (renders HTML string only)
 */
export function renderTitle(text: string, as?: TitleProps['as']): string {
  return new Title({ text, as }).render();
}
