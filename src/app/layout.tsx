import React from "react";
import ThemeWrapper from "@/components/ThemeWrapper";

export const metadata = {
  title: "AulaGen",
  description: "Plataforma de planos de aula",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}