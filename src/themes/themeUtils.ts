import { colorPalette, gradients, shadows, Theme } from './colors';

/**
 * Converts HSL color values to CSS HSL format
 */
const formatHSLColor = (color: string): string => {
  // If it's already in HSL format, return as is
  if (color.startsWith('hsl(')) return color;
  
  // Convert hex to HSL if needed
  if (color.startsWith('#')) {
    return hexToHSL(color);
  }
  
  return color;
};

/**
 * Convert hex color to HSL format for CSS variables
 */
const hexToHSL = (hex: string): string => {
  // Remove the hash if present
  hex = hex.replace('#', '');
  
  // Parse r, g, b values
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
};

/**
 * Generate CSS variables from color palette
 */
export const generateCSSVariables = (theme: Theme): Record<string, string> => {
  const colors = colorPalette[theme];
  const themeGradients = gradients[theme];
  const themeShadows = shadows[theme];
  
  const variables: Record<string, string> = {};
  
  // Background colors
  variables['--background'] = formatHSLColor(colors.background.primary);
  variables['--foreground'] = formatHSLColor(colors.text.primary);
  
  // Card colors
  variables['--card'] = formatHSLColor(colors.background.secondary);
  variables['--card-foreground'] = formatHSLColor(colors.text.primary);
  
  // Popover colors
  variables['--popover'] = formatHSLColor(colors.background.secondary);
  variables['--popover-foreground'] = formatHSLColor(colors.text.primary);
  
  // Primary colors
  variables['--primary'] = formatHSLColor(colors.primary[500]);
  variables['--primary-foreground'] = formatHSLColor(colors.text.inverse);
  
  // Secondary colors
  variables['--secondary'] = formatHSLColor(colors.background.tertiary);
  variables['--secondary-foreground'] = formatHSLColor(colors.text.primary);
  
  // Muted colors
  variables['--muted'] = formatHSLColor(colors.neutral[200]);
  variables['--muted-foreground'] = formatHSLColor(colors.text.secondary);
  
  // Accent colors
  variables['--accent'] = formatHSLColor(colors.background.tertiary);
  variables['--accent-foreground'] = formatHSLColor(colors.text.primary);
  
  // Destructive colors
  variables['--destructive'] = formatHSLColor(colors.error);
  variables['--destructive-foreground'] = formatHSLColor(colors.text.inverse);
  
  // Border and input
  variables['--border'] = formatHSLColor(colors.border.light);
  variables['--input'] = formatHSLColor(colors.border.light);
  variables['--ring'] = formatHSLColor(colors.primary[500]);
  
  // Custom gradient variables
  variables['--gradient-primary'] = themeGradients.primary;
  variables['--gradient-hero'] = themeGradients.hero;
  variables['--gradient-card'] = themeGradients.card;
  variables['--gradient-subtle'] = themeGradients.subtle;
  
  // Shadow variables
  variables['--shadow-glow'] = themeShadows.glow;
  variables['--shadow-card'] = themeShadows.md;
  variables['--shadow-lg'] = themeShadows.lg;
  
  // Success, Warning, Error
  variables['--success'] = formatHSLColor(colors.success);
  variables['--success-foreground'] = formatHSLColor(colors.text.inverse);
  variables['--warning'] = formatHSLColor(colors.warning);
  variables['--warning-foreground'] = formatHSLColor(colors.text.inverse);
  variables['--error'] = formatHSLColor(colors.error);
  variables['--error-foreground'] = formatHSLColor(colors.text.inverse);
  
  // Button colors
  variables['--button'] = formatHSLColor(colors.primary[500]);
  variables['--button-foreground'] = formatHSLColor(colors.text.inverse);
  
  // Transitions
  variables['--transition-smooth'] = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  variables['--transition-spring'] = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  
  return variables;
};

/**
 * Apply CSS variables to document root
 */
export const applyCSSVariables = (theme: Theme): void => {
  const variables = generateCSSVariables(theme);
  const root = document.documentElement;
  
  // Apply all variables to the root element
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Also apply theme class for any remaining static styles
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

/**
 * Get dynamic color value for a specific color token
 */
export const getDynamicColor = (theme: Theme, colorPath: string): string => {
  const colors = colorPalette[theme];
  
  // Handle nested color paths like 'primary.500' or 'text.primary'
  const pathParts = colorPath.split('.');
  let color: unknown = colors;
  
  for (const part of pathParts) {
    if (color && typeof color === 'object' && part in color) {
      color = (color as Record<string, unknown>)[part];
    } else {
      console.warn(`Color path '${colorPath}' not found in theme '${theme}'`);
      return colors.primary[500]; // fallback
    }
  }
  
  return typeof color === 'string' ? color : colors.primary[500];
};

/**
 * Create dynamic style object for React components
 */
export const createDynamicStyles = (theme: Theme, styleMap: Record<string, string>): Record<string, string> => {
  const styles: Record<string, string> = {};
  
  Object.entries(styleMap).forEach(([property, colorPath]) => {
    styles[property] = getDynamicColor(theme, colorPath);
  });
  
  return styles;
};
