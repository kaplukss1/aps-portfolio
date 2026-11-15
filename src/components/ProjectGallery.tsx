"use client";
import { useState } from "react";
import { urlFor } from "@/lib/sanity/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectGallery({ gallery }: { gallery: any[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div style={{ marginBottom: 60 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Project Gallery</h2>
      
      {/* Grid Gambar */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
        gap: 16 
      }}>
        {gallery.map((img, idx) => {
          const imgUrl = urlFor(img).width(800).url();
          return (
            <div 
              key={idx} 
              onClick={() => setSelectedImage(imgUrl)}
              style={{ 
                cursor: "pointer", borderRadius: 12, overflow: "hidden",
                aspectRatio: "4/3", border: "1px solid var(--border)"
              }}
            >
              <img 
                src={imgUrl} 
                alt={`Gallery ${idx}`} 
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} 
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
              display: "flex", justifyContent: "center", alignItems: "center", padding: 24
            }}
          >
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={selectedImage} alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 12, objectFit: "contain" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}