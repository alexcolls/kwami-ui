export declare class Accordion extends Component<AccordionProps> {
    private items;
    private allowMultiple;
    constructor(props?: AccordionProps);
    render(): string;
    protected onHydrate(): void;
    /** Expand a specific section by ID */
    expand(itemId: string): void;
    /** Collapse a specific section by ID */
    collapse(itemId: string): void;
    /** Check if a section is expanded */
    isExpanded(itemId: string): boolean;
}

export declare interface AccordionItem {
    /** Unique ID for the section */
    id: string;
    /** Section header text */
    title: string;
    /** Section content */
    content: string;
    /** Whether the section is initially expanded */
    expanded?: boolean;
}

export declare interface AccordionProps {
    /** Array of accordion items */
    items?: AccordionItem[];
    /** Allow multiple sections open at once */
    allowMultiple?: boolean;
    /** Callback when section changes */
    onChange?: (itemId: string, expanded: boolean) => void;
    /** Additional CSS class */
    className?: string;
}

export declare class Activator extends Component<ActivatorProps> {
    private isActive;
    private ledColor;
    private activator;
    private led;
    constructor(props?: ActivatorProps);
    render(): string;
    protected onHydrate(): void;
    private updateLedStyle;
    private adjustBrightness;
    /** Toggle the active state */
    toggle(): void;
    /** Set the active state */
    setActive(active: boolean): void;
    /** Get current active state */
    getActive(): boolean;
    /** Set LED color */
    setLedColor(color: string): void;
}

export declare interface ActivatorProps {
    /** Button text label */
    text?: string;
    /** Label shown below the button */
    label?: string;
    /** Initial active state */
    active?: boolean;
    /** Callback when state changes */
    onChange?: (active: boolean) => void;
    /** Callback on click (for momentary mode) */
    onClick?: () => void;
    /** LED color when active (hex) */
    ledColor?: string;
    /** Additional CSS class */
    className?: string;
}

/**
 * Adjust color brightness by a percentage
 * @param hex HEX color string
 * @param percent Percentage to adjust (-100 to 100)
 */
export declare function adjustBrightness(hex: string, percent: number): string;

/**
 * Applies the theme configuration to the document.
 * When mode is 'system', automatically responds to OS theme changes.
 * @param theme The theme configuration to apply.
 * @returns Cleanup function to remove the system theme listener (call when unmounting).
 */
export declare function applyTheme(theme: ThemeConfig): ThemeCleanup;

export declare class Button extends Component<ButtonProps> {
    private btn;
    private isDisabled;
    private isLoading;
    constructor(props?: ButtonProps);
    render(): string;
    protected onHydrate(): void;
    /** Enable or disable the button */
    setDisabled(disabled: boolean): void;
    /** Set loading state */
    setLoading(loading: boolean): void;
    /** Update button label */
    setLabel(label: string): void;
    /** Get current disabled state */
    isButtonDisabled(): boolean;
    /** Get current loading state */
    isButtonLoading(): boolean;
}

export declare interface ButtonConfiguration {
    label: string;
    bezel: {
        color: string;
        radius: number;
        padding: number;
        shadowDepth: number;
    };
    face: {
        color: string;
        radius: number;
        depth: number;
        brightness: number;
    };
    highlight: {
        color: string;
        opacity: number;
        height: number;
    };
    text: {
        color: string;
        size: number;
        spacing: number;
        weight: number;
    };
}

export declare class ButtonConfigurator extends Component<ButtonConfiguratorProps> {
    private config;
    private button;
    private bezelEl;
    private faceEl;
    private highlightEl;
    private textEl;
    private colorPickers;
    constructor(props?: ButtonConfiguratorProps);
    render(): string;
    private renderControls;
    private renderBezelPanel;
    private renderFacePanel;
    private renderHighlightPanel;
    private renderTextPanel;
    protected onHydrate(): void;
    private setupColorPickers;
    private getColorForTarget;
    private handleColorChange;
    private setupPartSelector;
    private highlightPart;
    private setupSliders;
    private handleSliderChange;
    private setupTextInput;
    private emitChange;
    /** Get the current configuration */
    getConfiguration(): ButtonConfiguration;
    /** Set configuration programmatically */
    setConfiguration(config: Partial<ButtonConfiguration>): void;
}

export declare interface ButtonConfiguratorProps {
    /** Initial configuration */
    initialConfig?: Partial<ButtonConfiguration>;
    /** Callback when configuration changes */
    onChange?: (config: ButtonConfiguration) => void;
    /** Whether to show controls (true) or just the preview (false) */
    showControls?: boolean;
}

export declare interface ButtonProps {
    /** Button label text */
    label?: string;
    /** Click event handler */
    onClick?: (event: MouseEvent) => void;
    /** Additional CSS class */
    className?: string;
    /** Button size variant */
    size?: ButtonSize;
    /** Button color variant */
    variant?: ButtonVariant;
    /** Disabled state */
    disabled?: boolean;
    /** Loading state (shows spinner and disables interaction) */
    loading?: boolean;
    /** Iconify icon name */
    icon?: string;
    /** Icon position relative to label */
    iconPosition?: IconPosition;
    /** HTML button type */
    type?: ButtonType;
    /** Expand to full container width */
    fullWidth?: boolean;
}

export declare type ButtonSize = 'sm' | 'md' | 'lg';

export declare type ButtonType = 'button' | 'submit' | 'reset';

export declare type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost';

export declare class Checkbox extends Component<CheckboxProps> {
    private selectedValues;
    constructor(props?: CheckboxProps);
    render(): string;
    protected onHydrate(): void;
    /** Get all selected values */
    getValues(): string[];
    /** Check if a value is selected */
    isChecked(value: string): boolean;
    /** Set a checkbox value */
    setChecked(value: string, checked: boolean): void;
    /** Select all checkboxes */
    selectAll(): void;
    /** Deselect all checkboxes */
    deselectAll(): void;
}

export declare interface CheckboxOption {
    value: string;
    label: string;
    checked?: boolean;
}

export declare interface CheckboxProps {
    /** Options to display */
    options?: CheckboxOption[];
    /** Callback when selection changes */
    onChange?: (values: string[]) => void;
    /** Additional CSS class */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
}

export declare class ColorPicker extends Component<ColorPickerProps> {
    private ctx;
    private isOpen;
    private isDragging;
    private currentHue;
    private currentSaturation;
    private currentLightness;
    private currentOpacity;
    private currentFormat;
    private defaultHue;
    private defaultSaturation;
    private defaultLightness;
    private defaultOpacity;
    private trigger;
    private popup;
    private canvas;
    private cursor;
    private preview;
    private brightnessSlider;
    private opacitySlider;
    private formatToggle;
    private valueInput;
    private pipetteBtn;
    private randomizeBtn;
    private resetBtn;
    private copyOppositeBtn;
    constructor(props?: ColorPickerProps);
    render(): string;
    protected onHydrate(): void;
    private setupEventListeners;
    private togglePopup;
    private closePopup;
    private drawWheel;
    private updateFromWheel;
    private updateCursorPosition;
    private getColorString;
    private updateFinalColor;
    private handleInputChange;
    private cycleFormat;
    private pickFromScreen;
    /** Randomize the color */
    private randomizeColor;
    /** Reset to default color (simple button, not toggle) */
    private resetToDefault;
    /** Copy current color to opposite theme */
    private copyToOppositeTheme;
    /** Get the current color value */
    getColor(): string;
    /** Set the color programmatically */
    setColor(color: string): void;
    /** Set the default color for reset feature */
    setDefaultColor(color: string): void;
}

export declare interface ColorPickerProps {
    /** Initial color value (HEX format) */
    defaultColor?: string;
    /** Callback when color changes */
    onChange?: (color: string) => void;
    /** Show/hide pipette button (only works if browser supports EyeDropper API) */
    showPipette?: boolean;
    /** Show randomize button */
    showRandomize?: boolean;
    /** Show reset to default button */
    showReset?: boolean;
    /** Show copy to opposite theme button */
    showCopyToOpposite?: boolean;
    /** Show opacity slider */
    showOpacity?: boolean;
    /** Popup direction */
    popupDirection?: 'up' | 'down';
    /** Callback when copy to opposite theme is requested */
    onCopyToOpposite?: (color: string) => void;
}

/**
 * Base abstract class for all UI components.
 * @template P The type of the properties object.
 */
export declare abstract class Component<P = {}> {
    private static counter;
    /** Unique identifier for this component instance */
    protected readonly id: string;
    protected props: P;
    protected element: HTMLElement | null;
    private listeners;
    constructor(props: P);
    /**
     * Generates the HTML string for the component.
     * @returns The HTML string.
     */
    abstract render(): string;
    /**
     * Convenience method to render HTML and hydrate in one step.
     * Renders the component into the container and attaches event listeners.
     * @param container The container element to mount into.
     * @returns The root element of the component.
     */
    mount(container: HTMLElement): HTMLElement;
    /**
     * Attaches event listeners and initializes behavior for the component.
     * This method should be called after the component's HTML has been inserted into the DOM.
     * @param element The root element of the component.
     */
    hydrate(element: HTMLElement): void;
    /**
     * Lifecycle method called during hydration.
     * Override this to attach event listeners.
     */
    protected onHydrate(): void;
    /**
     * Helper method to add event listeners with automatic cleanup tracking.
     * Use this instead of direct addEventListener calls.
     * @param el The element to attach the listener to.
     * @param type The event type (e.g., 'click', 'input').
     * @param handler The event handler function.
     */
    protected addListener(el: Element, type: string, handler: EventListener): void;
    /**
     * Cleans up the component by removing all event listeners and references.
     * Call this before removing the component from the DOM to prevent memory leaks.
     */
    destroy(): void;
    /**
     * Updates the component's properties and re-renders if necessary.
     * Note: This is a simple implementation and might require full re-hydration depending on usage.
     * @param newProps Partial properties to update.
     */
    update(newProps: Partial<P>): void;
}

export declare class DatePicker extends Component<DatePickerProps> {
    private currentMonth;
    private selectedDate;
    private isOpen;
    private trigger;
    private popup;
    private monthLabel;
    private daysGrid;
    private prevBtn;
    private nextBtn;
    private valueDisplay;
    constructor(props?: DatePickerProps);
    render(): string;
    private formatDate;
    private renderWeekdays;
    protected onHydrate(): void;
    private setupEventListeners;
    private togglePopup;
    private closePopup;
    private navigateMonth;
    private renderMonth;
    private generateDays;
    private selectDate;
    /** Get the currently selected date */
    getDate(): Date | null;
    /** Set the date programmatically */
    setDate(date: Date): void;
    /** Clear the selected date */
    clear(): void;
    /** Navigate to a specific month */
    goToMonth(year: number, month: number): void;
}

export declare interface DatePickerProps {
    /** Initial selected date */
    defaultDate?: Date;
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** First day of week (0 = Sunday, 1 = Monday, etc.) */
    firstDayOfWeek?: number;
    /** Callback when date changes */
    onChange?: (date: Date) => void;
    /** Label for the date picker */
    label?: string;
    /** Locale for date formatting */
    locale?: string;
    /** Placeholder text when no date selected */
    placeholder?: string;
    /** Popup direction */
    popupDirection?: 'up' | 'down';
}

export declare const defaultButtonConfig: ButtonConfiguration;

/** Default dark theme colors */
export declare const defaultDarkColors: ThemeColors;

export declare const defaultIconConfig: IconConfiguration;

export declare const defaultLabelConfig: LabelConfiguration;

/** Default light theme colors */
export declare const defaultLightColors: ThemeColors;

export declare const defaultTextConfig: TextConfiguration;

export declare const defaultTheme: ThemeConfig;

export declare const defaultThemeControlConfig: ThemeControlConfig;

export declare const defaultTitleConfig: TitleConfiguration;

/**
 * Depth - An inset/pressed neumorphic container for notes, hints, or highlighted content.
 * Creates a "sunken" effect that draws attention inward.
 */
export declare class Depth extends Component<DepthProps> {
    constructor(props?: DepthProps);
    render(): string;
    protected onHydrate(): void;
    /** Update the content dynamically */
    setContent(content: string): void;
    /** Update the icon dynamically */
    setIcon(icon: string | null): void;
}

export declare interface DepthProps {
    /** Content to display inside the depth container */
    content?: string;
    /** Optional icon (iconify icon name) */
    icon?: string;
    /** Padding size */
    padding?: 'sm' | 'md' | 'lg';
    /** Additional CSS class */
    className?: string;
}

export declare class Expandable extends Component<ExpandableProps> {
    private isExpanded;
    private isAnimating;
    private activeScreenId;
    private overlay;
    private placeholder;
    private minimizeBtn;
    private screenBtns;
    private titleComponent;
    private contentEl;
    private previewEl;
    constructor(props: ExpandableProps);
    /** Check if using multi-screen mode */
    private isMultiScreen;
    render(): string;
    private renderSingleScreen;
    private renderMultiScreen;
    protected onHydrate(): void;
    private hydrateSingleScreen;
    private hydrateMultiScreen;
    /** Expand to a specific screen (multi-screen mode) */
    expandToScreen(screenId: string): void;
    expand(screenId?: string): void;
    collapse(): void;
    /** Check if currently expanded */
    getIsExpanded(): boolean;
    /** Get the currently active screen ID (multi-screen mode) */
    getActiveScreenId(): string | null;
    /** Get the content container element */
    getContentElement(): HTMLElement | null;
    /** Get a specific screen element by ID */
    getScreenElement(screenId: string): HTMLElement | null;
    /** Get the preview element (multi-screen mode) */
    getPreviewElement(): HTMLElement | null;
}

export declare interface ExpandableProps {
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

/** Screen configuration for multi-screen expandables */
export declare interface ExpandableScreen {
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

export declare class Fader extends Component<FaderProps> {
    private currentValue;
    private isDragging;
    private track;
    private knob;
    private fill;
    constructor(props?: FaderProps);
    render(): string;
    protected onHydrate(): void;
    private setupEventListeners;
    private handleMove;
    private updatePosition;
    /** Get the current value */
    getValue(): number;
    /** Set the value programmatically */
    setValue(value: number): void;
}

export declare interface FaderProps {
    /** Initial value */
    value?: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Label text */
    label?: string;
    /** Callback when value changes */
    onChange?: (value: number) => void;
}

/**
 * Generate a gradient array from a base color
 */
export declare function generateGradientColors(baseHex: string): {
    start: string;
    light: string;
    mid: string;
    dark: string;
    end: string;
};

/**
 * Gets the effective theme mode based on config and system preferences.
 * @param theme The theme configuration.
 * @returns 'light' or 'dark'
 */
export declare function getEffectiveTheme(theme: ThemeConfig): 'light' | 'dark';

/**
 * Convert HEX color string to RGB object
 */
export declare function hexToRgb(hex: string): RGB | null;

export declare interface HSL {
    h: number;
    s: number;
    l: number;
}

/**
 * Convert HSL values to HEX color string
 */
export declare function hslToHex(h: number, s: number, l: number): string;

/**
 * Convert HSL values to RGB object
 */
export declare function hslToRgb(h: number, s: number, l: number): RGB;

export declare class Icon extends Component<IconProps> {
    constructor(props: IconProps);
    render(): string;
    protected onHydrate(): void;
    /** Change the icon */
    setIcon(icon: string): void;
    /** Change the size */
    setSize(size: number): void;
    /** Change the color */
    setColor(color: string): void;
}

export declare interface IconConfiguration {
    icon: string;
    size: number;
    color: string;
}

export declare class IconConfigurator extends Component<IconConfiguratorProps> {
    private config;
    private icon;
    private colorPicker;
    constructor(props?: IconConfiguratorProps);
    render(): string;
    private renderControls;
    protected onHydrate(): void;
    private updatePresetSelection;
    private emitChange;
    getConfiguration(): IconConfiguration;
}

export declare interface IconConfiguratorProps {
    initialConfig?: Partial<IconConfiguration>;
    onChange?: (config: IconConfiguration) => void;
    showControls?: boolean;
}

export declare type IconPosition = 'left' | 'right';

export declare interface IconProps {
    /** Iconify icon name (e.g., 'solar:home-linear') */
    icon: string;
    /** Icon size in pixels */
    size?: number;
    /** Icon color */
    color?: string;
    /** Additional CSS class */
    className?: string;
}

export declare class Knob extends Component<KnobProps> {
    private currentValue;
    private isDragging;
    private startY;
    private startValue;
    private knobEl;
    private track;
    private ledsContainer;
    constructor(props?: KnobProps);
    render(): string;
    protected onHydrate(): void;
    private setupEventListeners;
    private handleStart;
    private handleMove;
    private handleEnd;
    private updateLeds;
    private updateKnob;
    /** Get the current value */
    getValue(): number;
    /** Set the value programmatically */
    setValue(value: number): void;
}

export declare interface KnobProps {
    /** Initial value (0-100) */
    value?: number;
    /** Label text */
    label?: string;
    /** Callback when value changes */
    onChange?: (value: number) => void;
}

export declare class Label extends Component<LabelProps> {
    constructor(props: LabelProps);
    render(): string;
    protected onHydrate(): void;
    setText(text: string): void;
    setColor(color: string): void;
}

export declare interface LabelConfiguration {
    text: string;
    size: 'sm' | 'md' | 'lg';
    color: string;
    required: boolean;
}

export declare class LabelConfigurator extends Component<LabelConfiguratorProps> {
    private config;
    private label;
    private colorPicker;
    constructor(props?: LabelConfiguratorProps);
    render(): string;
    private renderControls;
    protected onHydrate(): void;
    private emitChange;
    getConfiguration(): LabelConfiguration;
}

export declare interface LabelConfiguratorProps {
    initialConfig?: Partial<LabelConfiguration>;
    onChange?: (config: LabelConfiguration) => void;
    showControls?: boolean;
}

export declare interface LabelProps {
    /** The label text */
    text: string;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Whether the label indicates a required field */
    required?: boolean;
    /** Label color */
    color?: string;
    /** For attribute (associates with form input) */
    htmlFor?: string;
    /** Additional CSS class */
    className?: string;
}

export declare class Modal extends Component<ModalProps> {
    private isOpen;
    private trigger;
    private overlay;
    private closeBtn;
    private escHandler;
    constructor(props?: ModalProps);
    private getOverlayHTML;
    render(): string;
    protected onHydrate(): void;
    /** Open the modal */
    open(): void;
    /** Close the modal */
    close(): void;
    /** Check if modal is open */
    getIsOpen(): boolean;
    destroy(): void;
}

export declare interface ModalProps {
    /** Trigger button text */
    triggerText?: string;
    /** Modal title */
    title?: string;
    /** Modal content */
    content?: string;
    /** Show close button */
    showCloseButton?: boolean;
    /** Callback when modal opens/closes */
    onChange?: (isOpen: boolean) => void;
    /** Additional CSS class */
    className?: string;
}

/**
 * Parse any color format (HEX, RGB, RGBA, HSL, HSLA) to HSL object
 */
export declare function parseColor(input: string): HSL | null;

export declare class Pin extends Component<PinProps> {
    private inputs;
    private values;
    constructor(props?: PinProps);
    render(): string;
    protected onHydrate(): void;
    private notifyChange;
    private isComplete;
    /** Get current value */
    getValue(): string;
    /** Set value */
    setValue(value: string): void;
    /** Clear all inputs */
    clear(): void;
    /** Focus the first input */
    focus(): void;
}

export declare interface PinProps {
    /** Number of digits */
    length?: number;
    /** Label shown below the pin input */
    label?: string;
    /** Mask the input (like password) */
    masked?: boolean;
    /** Callback when value changes */
    onChange?: (value: string) => void;
    /** Callback when all digits are filled */
    onComplete?: (value: string) => void;
    /** Additional CSS class */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
}

export declare class Popover extends Component<PopoverProps> {
    private isOpen;
    private trigger;
    private popover;
    private documentClickHandler;
    constructor(props?: PopoverProps);
    render(): string;
    protected onHydrate(): void;
    private toggle;
    /** Open the popover */
    open(): void;
    /** Close the popover */
    close(): void;
    /** Check if popover is open */
    getIsOpen(): boolean;
    destroy(): void;
}

export declare interface PopoverProps {
    /** Trigger button text */
    triggerText?: string;
    /** Popover title */
    title?: string;
    /** Popover content */
    content?: string;
    /** Callback when popover opens/closes */
    onChange?: (isOpen: boolean) => void;
    /** Additional CSS class */
    className?: string;
}

export declare class Radio extends Component<RadioProps> {
    private selectedValue;
    private groupName;
    constructor(props?: RadioProps);
    render(): string;
    protected onHydrate(): void;
    /** Get selected value */
    getValue(): string;
    /** Set selected value */
    setValue(value: string): void;
}

export declare interface RadioOption {
    value: string;
    label: string;
}

export declare interface RadioProps {
    /** Radio group name */
    name?: string;
    /** Options to display */
    options?: RadioOption[];
    /** Initially selected value */
    value?: string;
    /** Callback when selection changes */
    onChange?: (value: string) => void;
    /** Additional CSS class */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
}

/**
 * Functional helper for simple usage (renders HTML string only)
 */
export declare function renderTitle(text: string, as?: TitleProps['as']): string;

/**
 * Color utility functions for HSL/RGB/HEX conversions and manipulations
 */
export declare interface RGB {
    r: number;
    g: number;
    b: number;
}

/**
 * Convert RGB values to HSL object
 */
export declare function rgbToHsl(r: number, g: number, b: number): HSL;

export declare class Selector extends Component<SelectorProps> {
    private isOpen;
    private selectedValue;
    private selector;
    private valueDisplay;
    private dropdown;
    constructor(props?: SelectorProps);
    render(): string;
    protected onHydrate(): void;
    private toggleDropdown;
    private selectOption;
    /** Get current selected value */
    getValue(): string;
    /** Set selected value */
    setValue(value: string): void;
    /** Open the dropdown */
    open(): void;
    /** Close the dropdown */
    close(): void;
}

export declare interface SelectorOption {
    value: string;
    label: string;
}

export declare interface SelectorProps {
    /** Options to display */
    options?: SelectorOption[];
    /** Placeholder text */
    placeholder?: string;
    /** Initially selected value */
    value?: string;
    /** Label shown below the selector */
    label?: string;
    /** Callback when selection changes */
    onChange?: (value: string, label: string) => void;
    /** Additional CSS class */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
}

/**
 * Shallow - A raised/elevated neumorphic container for notes, callouts, or highlighted content.
 * Creates a "floating" effect that stands out from the surface.
 */
export declare class Shallow extends Component<ShallowProps> {
    constructor(props?: ShallowProps);
    render(): string;
    protected onHydrate(): void;
    /** Update the content dynamically */
    setContent(content: string): void;
    /** Update the icon dynamically */
    setIcon(icon: string | null): void;
}

export declare interface ShallowProps {
    /** Content to display inside the shallow container */
    content?: string;
    /** Optional icon (iconify icon name) */
    icon?: string;
    /** Padding size */
    padding?: 'sm' | 'md' | 'lg';
    /** Additional CSS class */
    className?: string;
}

export declare class Slider extends Component<SliderProps> {
    private input;
    private valueDisplay;
    private fill;
    private thumbVisual;
    private currentValue;
    constructor(props?: SliderProps);
    render(): string;
    protected onHydrate(): void;
    private handleChange;
    /** Get the current value */
    getValue(): number;
    /** Set the value programmatically */
    setValue(value: number): void;
}

export declare interface SliderProps {
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Initial value */
    value?: number;
    /** Step increment */
    step?: number;
    /** Label text */
    label?: string;
    /** Callback when value changes */
    onChange?: (value: number) => void;
}

export declare class Stepper extends Component<StepperProps> {
    private currentValue;
    private valueDisplay;
    private minusBtn;
    private plusBtn;
    constructor(props?: StepperProps);
    render(): string;
    protected onHydrate(): void;
    private updateButtonStates;
    private updateValue;
    private increment;
    private decrement;
    /** Get the current value */
    getValue(): number;
    /** Set the value programmatically */
    setValue(value: number): void;
}

export declare interface StepperProps {
    /** Initial value */
    value?: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Label text */
    label?: string;
    /** Callback when value changes */
    onChange?: (value: number) => void;
}

export declare class Switch extends Component<SwitchProps> {
    private isChecked;
    private activeThumbColor;
    private activeTrackColor;
    private input;
    private track;
    private thumb;
    constructor(props?: SwitchProps);
    render(): string;
    protected onHydrate(): void;
    private updateActiveStyles;
    private resetStyles;
    private adjustBrightness;
    /** Toggle the switch */
    toggle(): void;
    /** Set checked state */
    setChecked(checked: boolean): void;
    /** Get checked state */
    getChecked(): boolean;
    /** Set active thumb color */
    setActiveThumbColor(color: string): void;
    /** Set active track color */
    setActiveTrackColor(color: string): void;
}

export declare interface SwitchProps {
    /** Initial checked state */
    checked?: boolean;
    /** Label shown below the switch */
    label?: string;
    /** Callback when state changes */
    onChange?: (checked: boolean) => void;
    /** Active thumb color (hex) */
    activeThumbColor?: string;
    /** Active track color (hex) */
    activeTrackColor?: string;
    /** Additional CSS class */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
}

export declare interface TabItem {
    /** Unique ID for the tab */
    id: string;
    /** Tab label */
    label: string;
    /** Tab content */
    content: string;
}

export declare class Tabs extends Component<TabsProps> {
    private tabs;
    private activeTabId;
    private indicator;
    private tabButtons;
    private panels;
    constructor(props?: TabsProps);
    render(): string;
    protected onHydrate(): void;
    private updateIndicator;
    private activateTab;
    /** Set active tab by ID */
    setActiveTab(tabId: string): void;
    /** Get current active tab ID */
    getActiveTab(): string;
}

export declare interface TabsProps {
    /** Array of tab items */
    tabs?: TabItem[];
    /** Initially active tab ID */
    activeTab?: string;
    /** Callback when tab changes */
    onChange?: (tabId: string) => void;
    /** Additional CSS class */
    className?: string;
}

declare class Text_2 extends Component<TextProps> {
    constructor(props: TextProps);
    render(): string;
    protected onHydrate(): void;
    /** Update the text content */
    setContent(content: string): void;
    /** Update text styles */
    setStyle(styles: Partial<Pick<TextProps, 'color' | 'weight' | 'align'>>): void;
}
export { Text_2 as Text }

export declare class TextArea extends Component<TextAreaProps> {
    private textarea;
    private wrapper;
    private highlight;
    constructor(props?: TextAreaProps);
    render(): string;
    protected onHydrate(): void;
    /** Get current value */
    getValue(): string;
    /** Set value */
    setValue(value: string): void;
    /** Focus the textarea */
    focus(): void;
    /** Blur the textarea */
    blur(): void;
}

export declare interface TextAreaProps {
    /** Placeholder text */
    placeholder?: string;
    /** Initial value */
    value?: string;
    /** Number of visible rows */
    rows?: number;
    /** Label shown below the textarea */
    label?: string;
    /** Callback when value changes */
    onChange?: (value: string) => void;
    /** Callback on focus */
    onFocus?: () => void;
    /** Callback on blur */
    onBlur?: () => void;
    /** Additional CSS class */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Allow resize */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export declare interface TextConfiguration {
    content: string;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    weight: number;
    color: string;
    align: 'left' | 'center' | 'right';
}

export declare class TextConfigurator extends Component<TextConfiguratorProps> {
    private config;
    private text;
    private colorPicker;
    constructor(props?: TextConfiguratorProps);
    render(): string;
    private renderControls;
    protected onHydrate(): void;
    private emitChange;
    getConfiguration(): TextConfiguration;
}

export declare interface TextConfiguratorProps {
    initialConfig?: Partial<TextConfiguration>;
    onChange?: (config: TextConfiguration) => void;
    showControls?: boolean;
}

export declare class TextInput extends Component<TextInputProps> {
    private input;
    private wrapper;
    private highlight;
    constructor(props?: TextInputProps);
    render(): string;
    protected onHydrate(): void;
    /** Get current value */
    getValue(): string;
    /** Set value */
    setValue(value: string): void;
    /** Focus the input */
    focus(): void;
    /** Blur the input */
    blur(): void;
}

export declare interface TextInputProps {
    /** Placeholder text */
    placeholder?: string;
    /** Initial value */
    value?: string;
    /** Input type */
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    /** Label shown below the input */
    label?: string;
    /** Callback when value changes */
    onChange?: (value: string) => void;
    /** Callback on focus */
    onFocus?: () => void;
    /** Callback on blur */
    onBlur?: () => void;
    /** Additional CSS class */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
}

export declare interface TextProps {
    /** The text content */
    content: string;
    /** Text size variant */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Text weight */
    weight?: 300 | 400 | 500 | 600 | 700;
    /** Text color (CSS color value) */
    color?: string;
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Additional CSS class */
    className?: string;
}

/** Cleanup function returned by applyTheme */
export declare type ThemeCleanup = () => void;

export declare interface ThemeColors {
    primary: string;
    secondary: string;
    /** Background/surface color */
    background?: string;
    /** Dark shadow color for neumorphic effect */
    shadow?: string;
    /** Light shadow color for neumorphic effect */
    light?: string;
}

export declare interface ThemeConfig {
    mode: 'light' | 'dark' | 'system';
    colors: {
        light: ThemeColors;
        dark: ThemeColors;
    };
}

export declare class ThemeControl extends Component<ThemeControlProps> {
    private config;
    private toggle;
    private colorPickers;
    private systemThemeListener;
    constructor(props?: ThemeControlProps);
    private loadConfig;
    private mergeConfig;
    private saveConfig;
    getEffectiveMode(): 'light' | 'dark';
    private getControls;
    render(): string;
    protected onHydrate(): void;
    private setupEventListeners;
    /** Update color picker default colors when theme mode changes */
    private updateColorPickerDefaults;
    private setupSystemThemeListener;
    private updateColorPickerValues;
    private onConfigChange;
    private applyTheme;
    /** Get the current theme configuration */
    getConfig(): ThemeControlConfig;
    /** Set the theme configuration programmatically */
    setConfig(config: Partial<ThemeControlConfig>): void;
    /** Set the theme mode */
    setMode(mode: 'light' | 'dark' | 'system'): void;
    /** Reset to default configuration */
    reset(): void;
    destroy(): void;
}

export declare interface ThemeControlColors {
    /** Primary accent color */
    primary: string;
    /** Secondary accent color */
    secondary: string;
    /** Background/surface color */
    background: string;
    /** Dark shadow color for neumorphic effect */
    shadow: string;
    /** Light shadow color for neumorphic effect */
    light: string;
}

export declare interface ThemeControlConfig {
    mode: 'light' | 'dark' | 'system';
    colors: {
        light: ThemeControlColors;
        dark: ThemeControlColors;
    };
}

export declare interface ThemeControlProps {
    /** Initial theme configuration */
    config?: Partial<ThemeControlConfig>;
    /** Controls to show. Defaults to all controls. */
    controls?: ('mode' | 'primary' | 'secondary' | 'background' | 'shadow' | 'light')[];
    /** Layout direction */
    layout?: 'horizontal' | 'vertical';
    /** Show labels for color pickers */
    showLabels?: boolean;
    /** Callback when theme changes */
    onChange?: (config: ThemeControlConfig) => void;
    /** LocalStorage key for persistence. Set to null to disable persistence. */
    storageKey?: string | null;
}

export declare class Title extends Component<TitleProps> {
    constructor(props: TitleProps);
    render(): string;
    protected onHydrate(): void;
}

export declare interface TitleConfiguration {
    text: string;
    glowColor: string;
}

export declare class TitleConfigurator extends Component<TitleConfiguratorProps> {
    private config;
    private title;
    private colorPicker;
    constructor(props?: TitleConfiguratorProps);
    render(): string;
    private renderControls;
    protected onHydrate(): void;
    private updateTitleText;
    private emitChange;
    getConfiguration(): TitleConfiguration;
}

export declare interface TitleConfiguratorProps {
    initialConfig?: Partial<TitleConfiguration>;
    onChange?: (config: TitleConfiguration) => void;
    showControls?: boolean;
}

export declare interface TitleProps {
    /** The text to display */
    text: string;
    /** HTML tag to use (default: h3) */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

export declare class Toast extends Component<ToastProps> {
    private isVisible;
    private hideTimeout;
    private trigger;
    private toast;
    private closeBtn;
    constructor(props?: ToastProps);
    private getIcon;
    private getToastHTML;
    render(): string;
    protected onHydrate(): void;
    /** Show the toast */
    show(): void;
    /** Hide the toast */
    hide(): void;
    /** Check if toast is visible */
    getIsVisible(): boolean;
    /** Update the message dynamically */
    setMessage(message: string): void;
    /** Update the type dynamically */
    setType(type: ToastType): void;
    destroy(): void;
}

export declare type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export declare interface ToastProps {
    /** Trigger button text */
    triggerText?: string;
    /** Toast message */
    message?: string;
    /** Toast type */
    type?: ToastType;
    /** Duration in ms (0 for persistent) */
    duration?: number;
    /** Position of the toast */
    position?: ToastPosition;
    /** Callback when toast shows/hides */
    onChange?: (isVisible: boolean) => void;
    /** Additional CSS class */
    className?: string;
}

export declare type ToastType = 'info' | 'success' | 'warning' | 'error';

export declare class Toggle extends Component<ToggleProps> {
    private currentState;
    private states;
    private btn;
    private icon;
    private label;
    constructor(props?: ToggleProps);
    render(): string;
    protected onHydrate(): void;
    private updateState;
    /** Cycle to the next state */
    cycle(): void;
    /** Set a specific state by index */
    setState(index: number): void;
    /** Get current state */
    getState(): {
        index: number;
        icon: string;
        label: string;
    };
}

export declare interface ToggleProps {
    /** Array of states to cycle through */
    states?: ToggleState[];
    /** Initial state index */
    initialState?: number;
    /** Callback when toggle state changes */
    onChange?: (state: {
        index: number;
        icon: string;
        label: string;
    }) => void;
    /** Additional CSS class */
    className?: string;
}

declare interface ToggleState {
    icon: string;
    label: string;
}

export declare class Tooltip extends Component<TooltipProps> {
    private isVisible;
    private trigger;
    private tooltip;
    constructor(props?: TooltipProps);
    render(): string;
    protected onHydrate(): void;
    /** Show the tooltip */
    show(): void;
    /** Hide the tooltip */
    hide(): void;
    /** Check if tooltip is visible */
    getIsVisible(): boolean;
}

export declare interface TooltipProps {
    /** Trigger button text */
    triggerText?: string;
    /** Tooltip text */
    text?: string;
    /** Callback when tooltip shows/hides */
    onChange?: (isVisible: boolean) => void;
    /** Additional CSS class */
    className?: string;
}

export { }


declare global {
    interface Window {
        EyeDropper?: new () => {
            open: () => Promise<{
                sRGBHex: string;
            }>;
        };
    }
}

