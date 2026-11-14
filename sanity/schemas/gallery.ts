export default {
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "caption", type: "string" },
    { name: "order", type: "number" },
  ],
};