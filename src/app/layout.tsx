import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "APS Portfolio",
  description: "Portfolio built with Next.js & Sanity",
};

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          {/* Gunakan ConditionalLayout di sini */}
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}