export default {
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    { name: "name", type: "string", validation: (r: any) => r.required() },
    { name: "role", type: "string" },
    { name: "avatar", type: "image", options: { hotspot: true } },
    { name: "logo", type: "image", options: { hotspot: true } },
    { name: "bio", type: "text" },
    { name: "email", type: "string" },
    { name: "cvUrl", title: "URL CV / Resume (Link Google Drive / PDF)", type: "url" },
    { name: "location", type: "string" },
    {
      name: "socials",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "platform", type: "string" },
          { name: "url", type: "url" },
        ],
      }],
    },

    // BLOK STUDI / PENDIDIKAN
    {
      name: "studies",
      title: "Studies / Education",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "institution", title: "Institution / University", type: "string" },
          { name: "degree", title: "Degree / Major", type: "string" },
           { name: "gpa", title: "GPA / IPK", type: "string" },
          { name: "startDate", type: "string" },
          { name: "endDate", type: "string" },
          { name: "description", type: "text" },
        ],
      }],
    },

    // BLOK PENGALAMAN KERJA
    {
      name: "experience",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "company", type: "string" },
          { name: "role", type: "string" },
          { name: "startDate", type: "string" },
          { name: "endDate", type: "string" },
          { name: "description", type: "text" },
        ],
      }],
    },

    // BLOK ORGANIZATION
    {
      name: "organizations",
      title: "Organizations",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "organization", title: "Organization Name", type: "string" },
          { name: "role", type: "string" },
          { name: "startDate", type: "string" },
          { name: "endDate", type: "string" },
          { name: "description", type: "text" },
        ],
      }],
    },

    // BLOK SKILLS
    {
      name: "skills",
      title: "Technical Skills",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "title", title: "Skill Name (e.g. Next.js)", type: "string" },
          { name: "description", title: "Description", type: "text" },
          { name: "tags", title: "Tools/Tags (e.g. JavaScript, Supabase)", type: "array", of: [{ type: "string" }] },
        ],
      }],
    },
  ],
};