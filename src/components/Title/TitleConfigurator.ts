import { Component } from '../../core/Component';
import { Title } from './Title';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import './TitleConfigurator.css';

export interface TitleConfiguration {
  text: string;
  glowColor: string;
}

export interface TitleConfiguratorProps {
  initialConfig?: Partial<TitleConfiguration>;
  onChange?: (config: TitleConfiguration) => void;
  showControls?: boolean;
}

const DEFAULT_CONFIG: TitleConfiguration = {
  text: 'TITLE',
  glowColor: '#ff9500',
};

export class TitleConfigurator extends Component<TitleConfiguratorProps> {
  private config: TitleConfiguration;
  private title: Title | null = null;
  private colorPicker: ColorPicker | null = null;

  constructor(props: TitleConfiguratorProps = {}) {
    super(props);
    this.config = { ...DEFAULT_CONFIG, ...props.initialConfig };
  }

  render(): string {
    const { showControls = true } = this.props;
    this.title = new Title({ text: this.config.text });

    return `
            <div class="kwami-title-configurator" data-kwami-id="${this.id}">
                <div class="kwami-title-configurator-preview" style="--kwami-accent: ${this.config.glowColor}">
                    ${this.title.render()}
                </div>
                ${showControls ? this.renderControls() : ''}
            </div>
        `;
  }

  private renderControls(): string {
    const { config } = this;
    return `
            <div class="kwami-title-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Text</label>
                    <input type="text" class="kwami-cfg-input" data-prop="text" value="${config.text}" />
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Glow Color</label>
                    <div class="kwami-cfg-color" data-color-target="glow"></div>
                </div>
                <div class="kwami-cfg-row kwami-cfg-hint">
                    <span>Hover over the title to see the glow effect</span>
                </div>
            </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    const titleEl = this.element.querySelector('.kwami-title');
    if (titleEl && this.title) {
      this.title.hydrate(titleEl as HTMLElement);
    }

    // Color picker
    const colorContainer = this.element.querySelector('[data-color-target="glow"]');
    if (colorContainer) {
      this.colorPicker = new ColorPicker({
        defaultColor: this.config.glowColor,
        popupDirection: 'up',
        onChange: (color) => {
          this.config.glowColor = color;
          const preview = this.element?.querySelector(
            '.kwami-title-configurator-preview'
          ) as HTMLElement;
          if (preview) {
            preview.style.setProperty('--kwami-accent', color);
          }
          this.emitChange();
        },
      });
      colorContainer.innerHTML = this.colorPicker.render();
      const pickerEl = colorContainer.querySelector('.kwami-colorpicker');
      if (pickerEl) this.colorPicker.hydrate(pickerEl as HTMLElement);
    }

    // Text input
    const textInput = this.element.querySelector('[data-prop="text"]') as HTMLInputElement;
    if (textInput) {
      this.addListener(textInput, 'input', () => {
        this.config.text = textInput.value || 'TITLE';
        this.updateTitleText(this.config.text);
        this.emitChange();
      });
    }
  }

  private updateTitleText(text: string): void {
    const titleText = this.element?.querySelector('.kwami-title-text');
    const titleGlow = this.element?.querySelector('.kwami-title-glow');

    if (titleText) {
      const chars = text
        .split('')
        .map((char, index) => {
          if (char === ' ') {
            return `<span class="kwami-title-char kwami-title-space" style="--char-index: ${index}">&nbsp;</span>`;
          }
          return `<span class="kwami-title-char" style="--char-index: ${index}">${char}</span>`;
        })
        .join('');
      titleText.innerHTML = chars;
    }

    if (titleGlow) {
      titleGlow.textContent = text;
    }
  }

  private emitChange(): void {
    if (this.props.onChange) {
      this.props.onChange({ ...this.config });
    }
  }

  getConfiguration(): TitleConfiguration {
    return { ...this.config };
  }
}

export { DEFAULT_CONFIG as defaultTitleConfig };
