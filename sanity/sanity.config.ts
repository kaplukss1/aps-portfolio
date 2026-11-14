import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas"; // Pastikan path ini benar

export default defineConfig({
  name: "default",
  title: "APS Portfolio",
  
  // GANTI DENGAN PROJECT ID DARI SANITY KAMU
  projectId: "32yp5w53", 
  dataset: "production",
  
  basePath: "/studio", // Ini wajib agar bisa jalan di Next.js
  
  plugins: [structureTool(), visionTool()],
  
  schema: {
    types: schemaTypes,
  },
});