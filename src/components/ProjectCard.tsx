"use client";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { useState } from "react";

export default function ProjectCard({ project }: { project: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/projects/${project.slug.current}`}>
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
        {/* GAMBAR COVER DI SINI */}
        {project.coverImage && (
          <img
            src={urlFor(project.coverImage).width(700).url()}
            alt={project.title}
            style={{ borderRadius: 12, aspectRatio: "16/10", objectFit: "cover", width: "100%" }}
          />
        )}
        
        <div style={{ marginTop: 4 }}>
          {/* JUDUL PROJECT */}
          <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 600 }}>{project.title}</h3>
          
          {/* SUBTITLE (PERSONAL PROJECT · UI DESIGN) */}
          {project.subtitle && (
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--fg-muted)", fontWeight: 500 }}>
              {project.subtitle}
            </p>
          )}
          
          {/* SUMMARY */}
          <p style={{ margin: 0, fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.5 }}>
            {project.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}