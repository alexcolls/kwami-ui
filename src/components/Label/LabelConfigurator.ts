import { Component } from '../../core/Component';
import { Label } from './Label';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import './LabelConfigurator.css';

export interface LabelConfiguration {
  text: string;
  size: 'sm' | 'md' | 'lg';
  color: string;
  required: boolean;
}

export interface LabelConfiguratorProps {
  initialConfig?: Partial<LabelConfiguration>;
  onChange?: (config: LabelConfiguration) => void;
  showControls?: boolean;
}

const DEFAULT_CONFIG: LabelConfiguration = {
  text: 'Label',
  size: 'md',
  color: '#666666',
  required: false,
};

export class LabelConfigurator extends Component<LabelConfiguratorProps> {
  private config: LabelConfiguration;
  private label: Label | null = null;
  private colorPicker: ColorPicker | null = null;

  constructor(props: LabelConfiguratorProps = {}) {
    super(props);
    this.config = { ...DEFAULT_CONFIG, ...props.initialConfig };
  }

  render(): string {
    const { showControls = true } = this.props;
    this.label = new Label({
      text: this.config.text,
      size: this.config.size,
      color: this.config.color,
      required: this.config.required,
    });

    return `
   <div class="kwami-label-configurator" data-kwami-id="${this.id}">
    <div class="kwami-label-configurator-preview">
     ${this.label.render()}
    </div>
    ${showControls ? this.renderControls() : ''}
   </div>
        `;
  }

  private renderControls(): string {
    const { config } = this;
    return `
   <div class="kwami-label-configurator-controls">
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Text</label>
     <input type="text" class="kwami-cfg-input" data-prop="text" value="${config.text}" />
    </div>
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Size</label>
     <div class="kwami-cfg-select-group">
      <button class="kwami-cfg-select-btn ${config.size === 'sm' ? 'active' : ''}" data-size="sm">SM</button>
      <button class="kwami-cfg-select-btn ${config.size === 'md' ? 'active' : ''}" data-size="md">MD</button>
      <button class="kwami-cfg-select-btn ${config.size === 'lg' ? 'active' : ''}" data-size="lg">LG</button>
     </div>
    </div>
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Color</label>
     <div class="kwami-cfg-color" data-color-target="label"></div>
    </div>
    <div class="kwami-cfg-row">
     <label class="kwami-cfg-label">Required</label>
     <button class="kwami-cfg-toggle ${config.required ? 'active' : ''}" data-prop="required">
      <span class="kwami-cfg-toggle-track">
       <span class="kwami-cfg-toggle-thumb"></span>
      </span>
     </button>
    </div>
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    const labelEl = this.element.querySelector('.kwami-label');
    if (labelEl && this.label) {
      this.label.hydrate(labelEl as HTMLElement);
    }

    // Color picker
    const colorContainer = this.element.querySelector('[data-color-target="label"]');
    if (colorContainer) {
      this.colorPicker = new ColorPicker({
        defaultColor: this.config.color,
        popupDirection: 'up',
        onChange: (color) => {
          this.config.color = color;
          this.label?.setColor(color);
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
        this.config.text = textInput.value;
        this.label?.setText(textInput.value);
        this.emitChange();
      });
    }

    // Size buttons
    const sizeButtons = this.element.querySelectorAll('[data-size]');
    sizeButtons.forEach((btn) => {
      this.addListener(btn, 'click', () => {
        const size = btn.getAttribute('data-size') as LabelConfiguration['size'];
        this.config.size = size;
        sizeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const labelEl = this.element?.querySelector('.kwami-label');
        if (labelEl) {
          labelEl.className = `kwami-label kwami-label-${size}`;
        }
        this.emitChange();
      });
    });

    // Required toggle
    const requiredToggle = this.element.querySelector('[data-prop="required"]');
    if (requiredToggle) {
      this.addListener(requiredToggle, 'click', () => {
        this.config.required = !this.config.required;
        requiredToggle.classList.toggle('active', this.config.required);

        // Re-render label to show/hide required mark
        const labelEl = this.element?.querySelector('.kwami-label');
        if (labelEl && this.label) {
          labelEl.outerHTML = new Label({
            text: this.config.text,
            size: this.config.size,
            color: this.config.color,
            required: this.config.required,
          }).render();
          this.label = new Label(this.config);
          const newLabelEl = this.element?.querySelector('.kwami-label');
          if (newLabelEl) this.label.hydrate(newLabelEl as HTMLElement);
        }
        this.emitChange();
      });
    }
  }

  private emitChange(): void {
    if (this.props.onChange) {
      this.props.onChange({ ...this.config });
    }
  }

  getConfiguration(): LabelConfiguration {
    return { ...this.config };
  }
}

export { DEFAULT_CONFIG as defaultLabelConfig };
