import { Component } from '../../core/Component';
import { Text } from './Text';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import './TextConfigurator.css';

export interface TextConfiguration {
  content: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight: number;
  color: string;
  align: 'left' | 'center' | 'right';
}

export interface TextConfiguratorProps {
  initialConfig?: Partial<TextConfiguration>;
  onChange?: (config: TextConfiguration) => void;
  showControls?: boolean;
}

const DEFAULT_CONFIG: TextConfiguration = {
  content: 'Sample text content',
  size: 'md',
  weight: 400,
  color: '#333333',
  align: 'left',
};

export class TextConfigurator extends Component<TextConfiguratorProps> {
  private config: TextConfiguration;
  private text: Text | null = null;
  private colorPicker: ColorPicker | null = null;

  constructor(props: TextConfiguratorProps = {}) {
    super(props);
    this.config = { ...DEFAULT_CONFIG, ...props.initialConfig };
  }

  render(): string {
    const { showControls = true } = this.props;
    this.text = new Text({
      content: this.config.content,
      size: this.config.size,
      weight: this.config.weight as TextProps['weight'],
      color: this.config.color,
      align: this.config.align,
    });

    return `
   <div class="kwami-text-configurator" data-kwami-id="${this.id}">
    <div class="kwami-text-configurator-preview">
     ${this.text.render()}
    </div>
    ${showControls ? this.renderControls() : ''}
   </div>
        `;
  }

  private renderControls(): string {
    const { config } = this;
    return `
   <div class="kwami-text-configurator-controls">
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Content</label>
     <input type="text" class="kwami-cfg-input" data-prop="content" value="${config.content}" />
    </div>
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Size</label>
     <div class="kwami-cfg-select-group">
      <button class="kwami-cfg-select-btn ${config.size === 'xs' ? 'active' : ''}" data-size="xs">XS</button>
      <button class="kwami-cfg-select-btn ${config.size === 'sm' ? 'active' : ''}" data-size="sm">SM</button>
      <button class="kwami-cfg-select-btn ${config.size === 'md' ? 'active' : ''}" data-size="md">MD</button>
      <button class="kwami-cfg-select-btn ${config.size === 'lg' ? 'active' : ''}" data-size="lg">LG</button>
      <button class="kwami-cfg-select-btn ${config.size === 'xl' ? 'active' : ''}" data-size="xl">XL</button>
     </div>
    </div>
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Weight</label>
     <div class="kwami-cfg-slider-wrap">
      <input type="range" class="kwami-cfg-slider" data-prop="weight" min="300" max="700" step="100" value="${config.weight}" />
      <span class="kwami-cfg-value">${config.weight}</span>
     </div>
    </div>
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Color</label>
     <div class="kwami-cfg-color" data-color-target="text"></div>
    </div>
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Align</label>
     <div class="kwami-cfg-select-group">
      <button class="kwami-cfg-select-btn ${config.align === 'left' ? 'active' : ''}" data-align="left">
       <iconify-icon icon="solar:align-left-linear" width="16"></iconify-icon>
      </button>
      <button class="kwami-cfg-select-btn ${config.align === 'center' ? 'active' : ''}" data-align="center">
       <iconify-icon icon="solar:align-horizontal-center-linear" width="16"></iconify-icon>
      </button>
      <button class="kwami-cfg-select-btn ${config.align === 'right' ? 'active' : ''}" data-align="right">
       <iconify-icon icon="solar:align-right-linear" width="16"></iconify-icon>
      </button>
     </div>
    </div>
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    // Hydrate text
    const textEl = this.element.querySelector('.kwami-text');
    if (textEl && this.text) {
      this.text.hydrate(textEl as HTMLElement);
    }

    // Setup color picker
    const colorContainer = this.element.querySelector('[data-color-target="text"]');
    if (colorContainer) {
      this.colorPicker = new ColorPicker({
        defaultColor: this.config.color,
        popupDirection: 'up',
        onChange: (color) => {
          this.config.color = color;
          this.text?.setStyle({ color });
          this.emitChange();
        },
      });
      colorContainer.innerHTML = this.colorPicker.render();
      const pickerEl = colorContainer.querySelector('.kwami-colorpicker');
      if (pickerEl) this.colorPicker.hydrate(pickerEl as HTMLElement);
    }

    // Setup content input
    const contentInput = this.element.querySelector('[data-prop="content"]') as HTMLInputElement;
    if (contentInput) {
      this.addListener(contentInput, 'input', () => {
        this.config.content = contentInput.value;
        this.text?.setContent(contentInput.value);
        this.emitChange();
      });
    }

    // Setup size buttons
    const sizeButtons = this.element.querySelectorAll('[data-size]');
    sizeButtons.forEach((btn) => {
      this.addListener(btn, 'click', () => {
        const size = btn.getAttribute('data-size') as TextConfiguration['size'];
        this.config.size = size;
        sizeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const textEl = this.element?.querySelector('.kwami-text');
        if (textEl) {
          textEl.className = `kwami-text kwami-text-${size}`;
        }
        this.emitChange();
      });
    });

    // Setup weight slider
    const weightSlider = this.element.querySelector('[data-prop="weight"]') as HTMLInputElement;
    const weightValue = this.element.querySelector('.kwami-cfg-slider-wrap .kwami-cfg-value');
    if (weightSlider) {
      this.addListener(weightSlider, 'input', () => {
        const weight = parseInt(weightSlider.value);
        this.config.weight = weight;
        if (weightValue) weightValue.textContent = String(weight);
        this.text?.setStyle({ weight: weight as TextProps['weight'] });
        this.emitChange();
      });
    }

    // Setup align buttons
    const alignButtons = this.element.querySelectorAll('[data-align]');
    alignButtons.forEach((btn) => {
      this.addListener(btn, 'click', () => {
        const align = btn.getAttribute('data-align') as TextConfiguration['align'];
        this.config.align = align;
        alignButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.text?.setStyle({ align });
        this.emitChange();
      });
    });
  }

  private emitChange(): void {
    if (this.props.onChange) {
      this.props.onChange({ ...this.config });
    }
  }

  getConfiguration(): TextConfiguration {
    return { ...this.config };
  }
}

// Need to import TextProps for the type
import type { TextProps } from './Text';

export { DEFAULT_CONFIG as defaultTextConfig };
