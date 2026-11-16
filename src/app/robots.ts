import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://aps-portfolio-gules.vercel.app"; // GANTI URL INI
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio/", // Mencegah Google mengindeks halaman admin
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}