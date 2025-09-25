'use client';

import { ThemeContextProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
