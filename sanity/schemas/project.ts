export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (r: any) => r.required() },
    { name: "slug", type: "slug", options: { source: "title" }, validation: (r: any) => r.required().error("Slug wajib diisi! Silakan klik tombol 'Generate'.") },
    { name: "summary", type: "text", title: "Short Summary (Tampil di Card)" },
    { name: "coverImage", type: "image", options: { hotspot: true } },
    { name: "tags", type: "array", of: [{ type: "string" }] },
    { name: "publishedAt", type: "datetime" },
    {
      name: "subtitle",
      title: "Subtitle / Label (misal: Personal Project · UI Design)",
      type: "string"
    },
    {
      name: "role",
      title: "Role (misal: Lead Designer)",
      type: "string"
    },
    {
      name: "tools",
      title: "Tools Used (Tekan Enter untuk menambah)",
      type: "array",
      of: [{ type: "string" }]
    },

    // --- BAGIAN BRIEF ---
    {
      name: "brief",
      title: "Project Brief",
      type: "object",
      fields: [
        { name: "background", title: "Background", type: "text" },
        { name: "goals", title: "Goals", type: "text" },
        { name: "problems", title: "Problems", type: "text" },
        { name: "solutions", title: "Solutions", type: "text" },
      ],
    },

    // --- BAGIAN WORKFLOW ---
    {
      name: "workflow",
      title: "Project Workflow",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "phase", title: "Fase (misal: Research, Design)", type: "string" },
          { name: "description", title: "Deskripsi Fase", type: "text" },
        ],
      }],
    },

    // --- BAGIAN GALLERY ---
    {
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },

    // --- BAGIAN DEMO / FIGMA ---
    { name: "isDemoActive", title: "Tampilkan Tombol Demo?", type: "boolean", initialValue: false },
    { name: "demoUrl", title: "URL Demo / Figma Prototype", type: "url" },
    { name: "demoLabel", title: "Label Tombol (misal: View Prototype)", type: "string", initialValue: "Live Demo" },
    { name: "featured", type: "boolean", initialValue: false },

    // Field lama tetap dibiarkan
    // { name: "content", type: "array", of: [{ type: "block" }, { type: "image" }] },
    // { name: "liveUrl", type: "url" },
    // { name: "repoUrl", type: "url" },

  ],
};