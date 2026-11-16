import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://aps-portfolio-gules.vercel.app"), // GANTI URL INI
  title: {
    default: "Andika Prayoga | Frontend Developer",
    template: "%s | Andika Prayoga" // Jika di halaman About, judulnya jadi "About | Andika Prayoga"
  },
  description: "Portfolio of Andika Prayoga. A Product Designer and Developer crafting intuitive user experiences and building digital products.",
  keywords: ["Andika Prayoga", "Product Designer", "Frontend Developer", "UI/UX", "Portfolio", "Jakarta"],
  authors: [{ name: "Andika Prayoga" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://aps-portfolio-gules.vercel.app", // GANTI URL INI
    title: "Andika Prayoga | Product Designer & Developer",
    description: "Crafting intuitive user experiences and building digital products.",
    siteName: "Andika Prayoga Portfolio",
    images: [{
      url: "/og-image.jpg", // Pastikan kamu punya gambar ini di folder public
      width: 1200,
      height: 630,
      alt: "Andika Prayoga Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andika Prayoga | Product Designer & Developer",
    description: "Crafting intuitive user experiences and building digital products.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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