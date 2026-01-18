import { Component } from '../../core/Component';
import { Icon } from './Icon';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import './IconConfigurator.css';

export interface IconConfiguration {
    icon: string;
    size: number;
    color: string;
}

export interface IconConfiguratorProps {
    initialConfig?: Partial<IconConfiguration>;
    onChange?: (config: IconConfiguration) => void;
    showControls?: boolean;
}

const DEFAULT_CONFIG: IconConfiguration = {
    icon: 'solar:star-bold',
    size: 48,
    color: '#ff9500'
};

// Popular icons for quick selection
const PRESET_ICONS = [
    'solar:star-bold',
    'solar:heart-bold',
    'solar:home-2-bold',
    'solar:user-bold',
    'solar:settings-bold',
    'solar:bell-bold',
    'solar:chat-round-dots-bold',
    'solar:folder-bold',
    'solar:camera-bold',
    'solar:music-note-bold',
    'solar:map-point-bold',
    'solar:sun-bold'
];

export class IconConfigurator extends Component<IconConfiguratorProps> {
    private config: IconConfiguration;
    private icon: Icon | null = null;
    private colorPicker: ColorPicker | null = null;

    constructor(props: IconConfiguratorProps = {}) {
        super(props);
        this.config = { ...DEFAULT_CONFIG, ...props.initialConfig };
    }

    render(): string {
        const { showControls = true } = this.props;
        this.icon = new Icon({
            icon: this.config.icon,
            size: this.config.size,
            color: this.config.color
        });

        return `
            <div class="kwami-icon-configurator" data-kwami-id="${this.id}">
                <div class="kwami-icon-configurator-preview">
                    ${this.icon.render()}
                </div>
                ${showControls ? this.renderControls() : ''}
            </div>
        `;
    }

    private renderControls(): string {
        const { config } = this;
        const iconGrid = PRESET_ICONS.map(icon => `
            <button class="kwami-icon-preset ${icon === config.icon ? 'active' : ''}" data-icon="${icon}" title="${icon}">
                <iconify-icon icon="${icon}" width="20" height="20"></iconify-icon>
            </button>
        `).join('');

        return `
            <div class="kwami-icon-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Icon</label>
                    <input type="text" class="kwami-cfg-input kwami-cfg-input-sm" data-prop="icon" value="${config.icon}" placeholder="solar:icon-name" />
                </div>
                <div class="kwami-icon-preset-grid">
                    ${iconGrid}
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Size</label>
                    <div class="kwami-cfg-slider-wrap">
                        <input type="range" class="kwami-cfg-slider" data-prop="size" min="16" max="96" value="${config.size}" />
                        <span class="kwami-cfg-value">${config.size}px</span>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Color</label>
                    <div class="kwami-cfg-color" data-color-target="icon"></div>
                </div>
            </div>
        `;
    }

    protected onHydrate(): void {
        if (!this.element) return;

        const iconEl = this.element.querySelector('.kwami-icon');
        if (iconEl && this.icon) {
            this.icon.hydrate(iconEl as HTMLElement);
        }

        // Color picker
        const colorContainer = this.element.querySelector('[data-color-target="icon"]');
        if (colorContainer) {
            this.colorPicker = new ColorPicker({
                defaultColor: this.config.color,
                popupDirection: 'up',
                onChange: (color) => {
                    this.config.color = color;
                    this.icon?.setColor(color);
                    this.emitChange();
                }
            });
            colorContainer.innerHTML = this.colorPicker.render();
            const pickerEl = colorContainer.querySelector('.kwami-colorpicker');
            if (pickerEl) this.colorPicker.hydrate(pickerEl as HTMLElement);
        }

        // Icon input
        const iconInput = this.element.querySelector('[data-prop="icon"]') as HTMLInputElement;
        if (iconInput) {
            this.addListener(iconInput, 'input', () => {
                this.config.icon = iconInput.value;
                this.icon?.setIcon(iconInput.value);
                this.updatePresetSelection(iconInput.value);
                this.emitChange();
            });
        }

        // Size slider
        const sizeSlider = this.element.querySelector('[data-prop="size"]') as HTMLInputElement;
        const sizeValue = this.element.querySelector('.kwami-cfg-slider-wrap .kwami-cfg-value');
        if (sizeSlider) {
            this.addListener(sizeSlider, 'input', () => {
                const size = parseInt(sizeSlider.value);
                this.config.size = size;
                if (sizeValue) sizeValue.textContent = `${size}px`;
                this.icon?.setSize(size);
                this.emitChange();
            });
        }

        // Preset icons
        const presetButtons = this.element.querySelectorAll('.kwami-icon-preset');
        presetButtons.forEach(btn => {
            this.addListener(btn, 'click', () => {
                const icon = btn.getAttribute('data-icon')!;
                this.config.icon = icon;
                this.icon?.setIcon(icon);
                if (iconInput) iconInput.value = icon;
                this.updatePresetSelection(icon);
                this.emitChange();
            });
        });
    }

    private updatePresetSelection(selectedIcon: string): void {
        const presetButtons = this.element?.querySelectorAll('.kwami-icon-preset');
        presetButtons?.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-icon') === selectedIcon);
        });
    }

    private emitChange(): void {
        if (this.props.onChange) {
            this.props.onChange({ ...this.config });
        }
    }

    getConfiguration(): IconConfiguration {
        return { ...this.config };
    }
}

export { DEFAULT_CONFIG as defaultIconConfig };
