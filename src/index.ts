// Core
export { Component } from './core/Component';

// Theme
export {
  applyTheme,
  defaultTheme,
  getEffectiveTheme,
  defaultLightColors,
  defaultDarkColors,
  type ThemeConfig,
  type ThemeColors,
  type ThemeCleanup,
} from './theme';
import './theme/variables.css';

// Utilities
export * from './utils/color';

// Components - Button
export {
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
  type ButtonType,
  type IconPosition,
} from './components/Button/Button';
export {
  ButtonConfigurator,
  defaultButtonConfig,
  type ButtonConfiguratorProps,
  type ButtonConfiguration,
} from './components/Button/ButtonConfigurator';

// Components - Title
export { Title, renderTitle, type TitleProps } from './components/Title/Title';
export {
  TitleConfigurator,
  defaultTitleConfig,
  type TitleConfiguratorProps,
  type TitleConfiguration,
} from './components/Title/TitleConfigurator';

// Components - Text
export { Text, type TextProps } from './components/Text/Text';
export {
  TextConfigurator,
  defaultTextConfig,
  type TextConfiguratorProps,
  type TextConfiguration,
} from './components/Text/TextConfigurator';

// Components - Label
export { Label, type LabelProps } from './components/Label/Label';
export {
  LabelConfigurator,
  defaultLabelConfig,
  type LabelConfiguratorProps,
  type LabelConfiguration,
} from './components/Label/LabelConfigurator';

// Components - Icon
export { Icon, type IconProps } from './components/Icon/Icon';
export {
  IconConfigurator,
  defaultIconConfig,
  type IconConfiguratorProps,
  type IconConfiguration,
} from './components/Icon/IconConfigurator';

// Components - ColorPicker
export { ColorPicker, type ColorPickerProps } from './components/ColorPicker/ColorPicker';

// Components - Slider
export { Slider, type SliderProps } from './components/Slider/Slider';

// Components - Expandable
export {
  Expandable,
  type ExpandableProps,
  type ExpandableScreen,
} from './components/Expandable/Expandable';

// Components - Toggle
export { Toggle, type ToggleProps } from './components/Toggle/Toggle';

// Components - Activator
export { Activator, type ActivatorProps } from './components/Activator/Activator';

// Components - Switch
export { Switch, type SwitchProps } from './components/Switch/Switch';

// Components - TextInput
export { TextInput, type TextInputProps } from './components/TextInput/TextInput';

// Components - TextArea
export { TextArea, type TextAreaProps } from './components/TextArea/TextArea';

// Components - Pin
export { Pin, type PinProps } from './components/Pin/Pin';

// Components - Selector
export { Selector, type SelectorProps, type SelectorOption } from './components/Selector/Selector';

// Components - Checkbox
export { Checkbox, type CheckboxProps, type CheckboxOption } from './components/Checkbox/Checkbox';

// Components - Radio
export { Radio, type RadioProps, type RadioOption } from './components/Radio/Radio';

// Components - DatePicker
export { DatePicker, type DatePickerProps } from './components/DatePicker/DatePicker';

// Components - Stepper
export { Stepper, type StepperProps } from './components/Stepper/Stepper';

// Components - Fader
export { Fader, type FaderProps } from './components/Fader/Fader';

// Components - Knob
export { Knob, type KnobProps } from './components/Knob/Knob';

// Components - Tabs
export { Tabs, type TabsProps, type TabItem } from './components/Tabs/Tabs';

// Components - Accordion
export {
  Accordion,
  type AccordionProps,
  type AccordionItem,
} from './components/Accordion/Accordion';

// Components - Popover
export { Popover, type PopoverProps } from './components/Popover/Popover';

// Components - Tooltip
export { Tooltip, type TooltipProps } from './components/Tooltip/Tooltip';

// Components - Modal
export { Modal, type ModalProps } from './components/Modal/Modal';

// Components - Toast
export {
  Toast,
  type ToastProps,
  type ToastType,
  type ToastPosition,
} from './components/Toast/Toast';

// Components - Depth
export { Depth, type DepthProps } from './components/Depth/Depth';

// Components - Shallow
export { Shallow, type ShallowProps } from './components/Shallow/Shallow';

// Components - ThemeControl
export {
  ThemeControl,
  defaultThemeControlConfig,
  type ThemeControlProps,
  type ThemeControlConfig,
  type ThemeControlColors,
} from './components/ThemeControl/ThemeControl';
