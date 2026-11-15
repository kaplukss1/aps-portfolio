"use client";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { useState } from "react";

export default function ProjectCard({ project }: { project: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `1px solid ${isHovered ? "var(--fg-muted)" : "var(--border)"}`,
        borderRadius: 16,
        padding: 16,
        background: "var(--bg-elevated)",
        display: "flex", flexDirection: "column", gap: 12,
        height: "100%",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <Link href={`/projects/${project.slug.current}`}>
        {project.coverImage && (
          <img
            src={urlFor(project.coverImage).width(700).url()}
            alt={project.title}
            style={{ borderRadius: 12, aspectRatio: "16/10", objectFit: "cover", width: "100%" }}
          />
        )}
        <h3 style={{ margin: "12px 0 0", fontSize: 20, fontWeight: 600 }}>{project.title}</h3>
      </Link>
      
      {/* Deskripsi dengan Expand */}
      <div style={{ position: "relative" }}>
        <p style={{ 
          margin: 0, fontSize: 14, color: "var(--fg-muted)",
          display: "-webkit-box", 
          WebkitLineClamp: isExpanded ? "unset" : 3, // Batasi 3 baris jika belum di-expand
          WebkitBoxOrient: "vertical", 
          overflow: "hidden" 
        }}>
          {project.summary || "Tidak ada deskripsi."}
        </p>
        
        {/* Tombol Lihat Selengkapnya */}
        {/* {project.summary?.length > 100 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: "none", border: "none", color: "#3b82f6",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              padding: "8px 0 0", display: "block"
            }}
          >
            {isExpanded ? "Tampilkan Lebih Sedikit" : "Lihat Selengkapnya"}
          </button>
        )} */}
      </div>
    </div>
  );
}