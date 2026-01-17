# ✨ Kwami UI - Glassmorphic Component Library

## 🎨 Features Implemented

### 1. **Glassmorphic Design System**
- Real glass effect with backdrop-filter blur
- Beautiful transparency and frosted glass aesthetics
- Gradient borders on all components using CSS mask techniques
- Dynamic background with overlay image for glass visibility

### 2. **Theme Controls** (Header)
- **Dark/Light Mode Toggle**: Click the sun/moon icon to switch themes
- **Color Palette Customizer**: 
  - Primary color picker
  - Secondary color picker
  - Tertiary color picker
  - All gradient borders update in real-time based on selected colors
  - Theme preferences saved to localStorage

### 3. **Grid Layout**
- Responsive 3-column grid (auto-adjusts on mobile)
- Components organized by category

### 4. **Atomic Components**

#### Column 1: Cards & Badges
- **Glass Cards**: Dashboard, Messages, Settings with icons
- **Gradient-bordered badges**: Active, Pending, Complete states

#### Column 2: Buttons & Inputs
- **Glass Buttons**: Primary, Secondary, Tertiary variants with gradient borders
- **Glass Inputs**: Text, Email, Date inputs with glassmorphic styling

#### Column 3: Progress & Controls
- **Animated Progress Bars**: With shimmer effect and gradient fills
- **Toggle Switches**: Smooth glassmorphic switches with gradient sliders

## 🎯 Technical Highlights

- Pure TypeScript implementation
- No external dependencies
- CSS custom properties for theming
- LocalStorage persistence
- Responsive design (mobile-first)
- Beautiful scrollbar styling
- Smooth animations and transitions
- Gradient border technique using CSS masks

## 🚀 Usage

```bash
cd app
npm install
npm run dev
```

Visit `http://localhost:5173` to see your glassmorphic components in action!

## 🎨 Customization

All gradient borders automatically update when you change the color palette in the header. The theme system uses CSS custom properties:

- `--color-primary`
- `--color-secondary`
- `--color-tertiary`

These cascade throughout all components, creating a cohesive design system.
