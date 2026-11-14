import { client } from "./client";
import { cacheLife } from "next/cache";

export const getPerson = async () => {
  "use cache";
  cacheLife("minutes");
  return client.fetch(`*[_type == "person"][0]`);
};

export const getFeaturedProjects = async () => {
  "use cache";
  cacheLife("minutes");
  return client.fetch(`*[_type == "project" && featured == true] | order(publishedAt desc)[0...4]`);
};

export const getProjects = async () => {
  "use cache";
  cacheLife("minutes");
  return client.fetch(`*[_type == "project"] | order(publishedAt desc)`);
};

export const getProjectBySlug = async (slug: string) => {
  "use cache";
  cacheLife("minutes");
  return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
};