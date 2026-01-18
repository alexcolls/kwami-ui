export interface ThemeColors {
  primary: string;
  secondary: string;
  /** Background/surface color */
  background?: string;
  /** Dark shadow color for neumorphic effect */
  shadow?: string;
  /** Light shadow color for neumorphic effect */
  light?: string;
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  colors: {
      light: ThemeColors;
      dark: ThemeColors;
  };
}

/** Default light theme colors */
export const defaultLightColors: ThemeColors = {
  primary: '#ff9500',
  secondary: '#007aff',
  background: '#e0e5ec',
  shadow: 'rgba(163, 177, 198, 0.6)',
  light: 'rgba(255, 255, 255, 0.8)'
};

/** Default dark theme colors */
export const defaultDarkColors: ThemeColors = {
  primary: '#ff9500',
  secondary: '#5856d6',
  background: '#1e1e1e',
  shadow: 'rgba(0, 0, 0, 0.5)',
  light: 'rgba(255, 255, 255, 0.03)'
};

export const defaultTheme: ThemeConfig = {
  mode: 'dark',
  colors: {
      light: defaultLightColors,
      dark: defaultDarkColors
  }
};

/** Cleanup function returned by applyTheme */
export type ThemeCleanup = () => void;

/**
 * Gets the effective theme mode based on config and system preferences.
 * @param theme The theme configuration.
 * @returns 'light' or 'dark'
 */
export function getEffectiveTheme(theme: ThemeConfig): 'light' | 'dark' {
  if (theme.mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme.mode;
}

/**
 * Applies the theme configuration to the document.
 * When mode is 'system', automatically responds to OS theme changes.
 * @param theme The theme configuration to apply.
 * @returns Cleanup function to remove the system theme listener (call when unmounting).
 */
export function applyTheme(theme: ThemeConfig): ThemeCleanup {
  const root = document.documentElement;
  const body = document.body;

  const apply = () => {
      const effectiveTheme = getEffectiveTheme(theme);
      const colors = theme.colors[effectiveTheme];

      // Apply theme attribute to both root and body
      root.setAttribute('data-theme', effectiveTheme);
      body.setAttribute('data-theme', effectiveTheme);

      // Set accent color properties based on effective theme
      root.style.setProperty('--accent-primary', colors.primary);
      root.style.setProperty('--accent-secondary', colors.secondary);
      root.style.setProperty('--kwami-accent', colors.primary);

      // Apply background/surface color if provided
      if (colors.background) {
          root.style.setProperty('--kwami-bg', colors.background);
          root.style.setProperty('--kwami-surface', colors.background);
      }

      // Apply shadow colors for neumorphic effect if provided
      if (colors.shadow) {
          root.style.setProperty('--kwami-shadow-dark', colors.shadow);
      }

      if (colors.light) {
          root.style.setProperty('--kwami-shadow-light', colors.light);
      }
  };

  // Apply theme immediately
  apply();

  // If system mode, listen for OS theme changes
  if (theme.mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', apply);

      // Return cleanup function
      return () => {
      mediaQuery.removeEventListener('change', apply);
      };
  }

  // Return no-op cleanup for non-system modes
  return () => {};
}
