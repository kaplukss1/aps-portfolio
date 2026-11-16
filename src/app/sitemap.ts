import { getProjects, getPosts } from "@/lib/sanity/queries";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aps-portfolio-gules.vercel.app"; // GANTI URL INI
  
  const projects = await getProjects();
  const posts = await getPosts();

  const projectUrls = projects.map((project: any) => ({
    url: `${baseUrl}/projects/${project.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt) || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const routes = ["", "/about", "/projects", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  return [...routes, ...projectUrls, ...blogUrls];
}