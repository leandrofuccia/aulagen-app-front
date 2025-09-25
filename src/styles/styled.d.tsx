import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      border: string;
      button: {
        background: string;
        text: string;
        hoverBackground: string;
        hoverText: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      h2: string;
      h3: string;
      p: string;
    };
    buttonVariants: {
      primary: {
        background: string;
        color: string;
        border: string;
      };
      outlined: {
        background: string;
        color: string;
        border: string;
      };
    };
  }
}
