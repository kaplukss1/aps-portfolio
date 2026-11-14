export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (r: any) => r.required() },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "summary", type: "text" },
    { name: "coverImage", type: "image", options: { hotspot: true } },
    { name: "tags", type: "array", of: [{ type: "string" }] },
    { name: "publishedAt", type: "datetime" },
    { name: "content", type: "array", of: [{ type: "block" }, { type: "image" }] },
    { name: "liveUrl", type: "url" },
    { name: "repoUrl", type: "url" },
    { name: "featured", type: "boolean", initialValue: false },
  ],
};