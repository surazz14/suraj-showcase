// Color Palette for Light and Dark Themes
type HexColor = `#${string}`;
type CssValue = string;

export type ThemeMode = 'light' | 'dark';

interface ColorScale {
  50: HexColor;
  100: HexColor;
  200: HexColor;
  300: HexColor;
  400: HexColor;
  500: HexColor;
  600: HexColor;
  700: HexColor;
  800: HexColor;
  900: HexColor;
  [key: string]: HexColor;
}

interface ThemeColors {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: HexColor;
  warning: HexColor;
  error: HexColor;
  background: {
    primary: HexColor;
    secondary: HexColor;
    tertiary: HexColor;
  };
  text: {
    primary: HexColor;
    secondary: HexColor;
    tertiary: HexColor;
    inverse: HexColor;
  };
  border: {
    light: HexColor;
    medium: HexColor;
    dark: HexColor;
  };
  css: {
    [key: `--${string}`]: CssValue;
  };
}

interface ColorPalette {
  light: ThemeColors;
  dark: ThemeColors;
}

export const applyThemeColors = (theme: ThemeMode): void => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const colors = colorPalette[theme].css;
  
  Object.entries(colors).forEach(([key, value]) => {
    if (key.startsWith('--')) {
      root.style.setProperty(key, value);
    }
  });
  
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

export const colorPalette: ColorPalette = {
  light: {
    // Primary Colors - Modern Blue Gradient
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main primary
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Secondary Colors - Elegant Purple
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff', 
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7', // Main secondary
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    
    // Neutral Colors - Clean Grays
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    
    // Success, Warning, Error
    success: '#10b981',
    warning: '#f59e0b', 
    error: '#ef4444',
    
    // Background variants
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    
    // Text variants
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
    },
    
    // Border and dividers
    border: {
      light: '#e2e8f0',
      medium: '#cbd5e1',
      dark: '#94a3b8',
    },
    
    // CSS Variables from theme.js
    css: {
      '--background': '0 0% 100%',
      '--foreground': '222 84% 5%',
      '--card': '0 0% 100%',
      '--card-foreground': '222 84% 5%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '222 84% 5%',
      '--primary': '221 83% 53%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '210 40% 98%',
      '--secondary-foreground': '222 84% 5%',
      '--muted': '210 40% 96%',
      '--muted-foreground': '215 16% 47%',
      '--accent': '210 40% 96%',
      '--accent-foreground': '222 84% 5%',
      '--destructive': '0 84% 60%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '214 32% 91%',
      '--input': '214 32% 91%',
      '--ring': '221 83% 53%',
      '--radius': '0.75rem',
      '--gradient-from': 'hsl(221 83% 53%)',
      '--gradient-to': 'hsl(258 90% 66%)',
      '--gradient-primary': 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))',
      '--gradient-hero': 'hsl(0 0% 100%)',
      '--gradient-card': 'hsl(0 0% 100%)',
      '--gradient-subtle': 'hsl(210 40% 98%)',
      '--shadow-glow': '0 0 20px hsl(221 83% 53% / 0.2)',
      '--shadow-card': '0 4px 16px hsl(0 0% 0% / 0.1)',
      '--shadow-lg': '0 10px 15px -3px hsl(0 0% 0% / 0.1), 0 4px 6px -2px hsl(0 0% 0% / 0.05)',
      '--transition-smooth': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '--transition-spring': 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  },
  
  dark: {
    // Primary Colors - Vibrant Blue for Dark Mode
    primary: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#3b82f6', // Main primary (same as light for consistency)
      600: '#60a5fa',
      700: '#93c5fd',
      800: '#bfdbfe',
      900: '#dbeafe',
    },
    
    // Secondary Colors - Electric Purple
    secondary: {
      50: '#1e1b4b',
      100: '#312e81',
      200: '#3730a3',
      300: '#4338ca',
      400: '#5b21b6',
      500: '#a855f7', // Main secondary
      600: '#c084fc',
      700: '#d8b4fe',
      800: '#e9d5ff',
      900: '#f3e8ff',
    },
    
    // Neutral Colors - Rich Dark Grays
    neutral: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#94a3b8',
      600: '#cbd5e1',
      700: '#e2e8f0',
      800: '#f1f5f9',
      900: '#f8fafc',
    },
    
    // Success, Warning, Error (adjusted for dark mode)
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
    
    // Background variants
    background: {
      primary: '#0f172a',
      secondary: '#1e293b', 
      tertiary: '#334155',
    },
    
    // Text variants
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      tertiary: '#64748b',
      inverse: '#0f172a',
    },
    
    // Border and dividers
    border: {
      light: '#1e293b',
      medium: '#334155',
      dark: '#475569',
    },
    
    // CSS Variables from theme.js
    css: {
      '--background': '222 84% 5%',
      '--foreground': '210 40% 98%',
      '--card': '215 28% 17%',
      '--card-foreground': '210 40% 98%',
      '--popover': '215 28% 17%',
      '--popover-foreground': '210 40% 98%',
      '--primary': '221 83% 53%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '217 33% 17%',
      '--secondary-foreground': '210 40% 98%',
      '--muted': '217 33% 17%',
      '--muted-foreground': '215 20% 65%',
      '--accent': '217 33% 17%',
      '--accent-foreground': '210 40% 98%',
      '--destructive': '0 63% 31%',
      '--destructive-foreground': '210 40% 98%',
      '--border': '217 33% 17%',
      '--input': '217 33% 17%',
      '--ring': '221 83% 53%',
      '--gradient-from': 'hsl(217 91% 60%)',
      '--gradient-to': 'hsl(269 89% 75%)',
      '--gradient-primary': 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))',
      '--gradient-hero': 'hsl(222 84% 5%)',
      '--gradient-card': 'hsl(215 28% 17%)',
      '--gradient-subtle': 'hsl(217 33% 17%)',
      '--shadow-glow': '0 0 40px hsl(221 83% 53% / 0.4)',
      '--shadow-card': '0 4px 16px hsl(0 0% 0% / 0.4)',
      '--shadow-lg': '0 10px 15px -3px hsl(0 0% 0% / 0.4), 0 4px 6px -2px hsl(0 0% 0% / 0.3)',
      '--transition-smooth': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '--transition-spring': 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  }
} as const;

// Simple solid colors (no gradients)
export const gradients = {
  light: {
    primary: '#3b82f6', // Simple blue
    hero: '#ffffff', // Clean white
    card: '#ffffff', // Simple white cards
    subtle: '#f8fafc', // Light gray background
  },
  dark: {
    primary: '#3b82f6', // Simple blue
    hero: '#0f172a', // Dark background
    card: '#1e293b', // Dark cards
    subtle: '#334155', // Dark gray background
  }
} as const;

// Shadow definitions
export const shadows = {
  light: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 40px rgba(59, 130, 246, 0.3)',
  },
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
    glow: '0 0 40px rgba(59, 130, 246, 0.4)',
  }
} as const;

