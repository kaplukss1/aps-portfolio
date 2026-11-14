export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", type: "text" },
    { name: "coverImage", type: "image", options: { hotspot: true } },
    { name: "publishedAt", type: "datetime" },
    { name: "body", type: "array", of: [{ type: "block" }, { type: "image" }] },
  ],
};