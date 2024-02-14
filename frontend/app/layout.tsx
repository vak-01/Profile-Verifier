import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile Verifier",
  description: "Detect Fake Instagram Accounts",
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: any) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
