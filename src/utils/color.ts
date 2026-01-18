/**
 * Color utility functions for HSL/RGB/HEX conversions and manipulations
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Convert HSL values to HEX color string
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Convert HSL values to RGB object
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
      const k = (n + h / 30) % 12;
      return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };
  return { r: f(0), g: f(8), b: f(4) };
}

/**
 * Convert HEX color string to RGB object
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB values to HSL object
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
      }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Parse any color format (HEX, RGB, HSL) to HSL object
 */
export function parseColor(input: string): HSL | null {
  input = input.trim();

  // HEX format
  if (input.startsWith('#')) {
      const rgb = hexToRgb(input);
      if (rgb) return rgbToHsl(rgb.r, rgb.g, rgb.b);
  }

  // RGB format
  const rgbMatch = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (rgbMatch) {
      return rgbToHsl(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]));
  }

  // HSL format
  const hslMatch = input.match(/^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)$/i);
  if (hslMatch) {
      return { h: parseInt(hslMatch[1]), s: parseInt(hslMatch[2]), l: parseInt(hslMatch[3]) };
  }

  return null;
}

/**
 * Adjust color brightness by a percentage
 * @param hex HEX color string
 * @param percent Percentage to adjust (-100 to 100)
 */
export function adjustBrightness(hex: string, percent: number): string {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.min(255, Math.max(0, r + Math.round(r * percent / 100)));
  g = Math.min(255, Math.max(0, g + Math.round(g * percent / 100)));
  b = Math.min(255, Math.max(0, b + Math.round(b * percent / 100)));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Generate a gradient array from a base color
 */
export function generateGradientColors(baseHex: string): { start: string; light: string; mid: string; dark: string; end: string } {
  return {
      start: adjustBrightness(baseHex, 30),
      light: adjustBrightness(baseHex, 15),
      mid: baseHex,
      dark: adjustBrightness(baseHex, -10),
      end: adjustBrightness(baseHex, -25)
  };
}
