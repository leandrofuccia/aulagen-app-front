import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#fff',
    text: '#000',
    primary: '#005bb5',
    secondary: '#0070f3',
    border: '#ccc',
    button: {
      background: '#0070f3',
      text: '#fff',
      hoverBackground: '#005bb5',
      hoverText: '#fff',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  fontSizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    h2: "2rem",
    h3: "1.5rem",
    p: "1rem",
  },
  buttonVariants: {
    primary: {
      background: '#0070f3',
      color: '#fff',
      border: '1px solid #0070f3',
    },
    outlined: {
      background: 'transparent',
      color: '#0070f3',
      border: '1px solid #0070f3',
    },
  },
  
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#121212',
    text: '#ffffff',
    primary: '#90caf9',
    secondary: '#64b5f6',
    border: '#444',
    button: {
      background: '#64b5f6',
      text: '#000',
      hoverBackground: '#90caf9',
      hoverText: '#000',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',   
  },
  fontSizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    h2: "2rem",
    h3: "1.5rem",
    p: "1rem",
    
    
  },
  buttonVariants: {
    primary: {
      background: '#64b5f6',
      color: '#000',
      border: '1px solid #64b5f6',
    },
    outlined: {
      background: 'transparent',
      color: '#64b5f6',
      border: '1px solid #64b5f6',
    },
  },
};
