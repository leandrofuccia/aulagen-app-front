import { DefaultTheme } from "styled-components";

const aulaGenTheme: DefaultTheme = {
  colors: {
    background: "#F5F5F5",
    text: "#333333",
    primary: "#0078D4",
    secondary: "#F57C00",
    border: "#CCCCCC",
    button: {
      background: "#0078D4",
      text: "#fff",
      hoverBackground: "#005fa3",
      hoverText: "#fff",
    },
    input: {
      background: "#fff",
      border: "#CCCCCC",
      focusBorder: "#0078D4",
      text: "#333333",
    },
  },
  fontFamily: "'Segoe UI', Roboto, sans-serif",
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 2px 4px rgba(0,0,0,0.1)",
    lg: "0 4px 8px rgba(0,0,0,0.15)",
  },
  fontSizes: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    h2: "2rem",
    h3: "1.5rem",
    p: "1rem",
  },
  buttonVariants: {
    primary: {
      background: "#0078D4",
      color: "#fff",
      border: "1px solid #0078D4",
    },
    secondary: {
      background: "#F57C00",
      color: "#fff",
      border: "1px solid #F57C00",
    },
    outlined: {
      background: "transparent",
      color: "#0078D4",
      border: "1px solid #0078D4",
    },
  },
};

export default aulaGenTheme;
