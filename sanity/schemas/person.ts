export default {
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    { name: "name", type: "string", validation: (r: any) => r.required() },
    { name: "role", type: "string" },
    { name: "avatar", type: "image", options: { hotspot: true } },
    { name: "bio", type: "text" },
    { name: "email", type: "string" },
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
    { name: "skills", type: "array", of: [{ type: "string" }] },
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
  ],
};