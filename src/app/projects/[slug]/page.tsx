import { getProjectBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import type { Metadata } from "next";

export const instant = false;

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params; 
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="container" style={{ maxWidth: 900 }}>
      
      {/* 1. JUDUL PROJECT (H1) */}
      <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 }}>
        {project.title}
      </h1>

      {/* 2. SUBTITLE */}
      {project.subtitle && (
        <p style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
          {project.subtitle}
        </p>
      )}

      {/* 3. SUMMARY */}
      <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--fg-muted)", marginBottom: 40, lineHeight: 1.6 }}>
        {project.summary}
      </p>

      {/* 4. COVER IMAGE BESAR */}
      {project.coverImage && (
        <img
          src={urlFor(project.coverImage).width(1200).url()}
          alt={project.title}
          style={{ borderRadius: 20, marginBottom: 60, width: "100%" }}
        />
      )}

      {/* 5. ROLE & TOOLS */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: 32, 
        padding: "24px 0", 
        borderTop: "1px solid var(--border)", 
        borderBottom: "1px solid var(--border)", 
        marginBottom: 60 
      }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 8, letterSpacing: 1 }}>
            Role
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
            {project.role || "Designer"}
          </p>
        </div>

        <div>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 8, letterSpacing: 1 }}>
            Tools Used
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tools && project.tools.length > 0 ? (
              project.tools.map((tool: string) => (
                <span key={tool} style={{
                  padding: "6px 14px", borderRadius: 999,
                  border: "1px solid var(--border)", background: "var(--bg-elevated)",
                  fontSize: 13, fontWeight: 500
                }}>
                  {tool}
                </span>
              ))
            ) : (
              <span style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>-</span>
            )}
          </div>
        </div>
      </div>

      {/* 6. PROJECT BRIEF */}
      {project.brief && (
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Project Brief</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {["background", "goals", "problems", "solutions"].map((key) => (
              project.brief[key] && (
                <div key={key} style={{ padding: 24, background: "var(--bg-elevated)", borderRadius: 16, border: "1px solid var(--border)" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, textTransform: "capitalize", marginBottom: 12 }}>
                    {key === "background" ? "Latar Belakang" : key === "goals" ? "Tujuan" : key === "problems" ? "Permasalahan" : "Solusi"}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>
                    {project.brief[key]}
                  </p>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* 7. WORKFLOW */}
      {project.workflow && project.workflow.length > 0 && (
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Workflow</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {project.workflow.map((step: any, idx: number) => (
              <div key={idx} style={{ display: "flex", gap: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--fg)", color: "var(--bg)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", flexShrink: 0 }}>
                  {idx + 1}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>{step.phase}</h3>
                  <p style={{ fontSize: 15, color: "var(--fg-muted)", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. GALLERY */}
      {project.gallery && <ProjectGallery gallery={project.gallery} />}

      {/* 9. TOMBOL DEMO */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 60, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
        {project.isDemoActive && project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="demo-btn" style={{ padding: "14px 32px", borderRadius: 999, background: "var(--fg)", color: "var(--bg)", border: "1px solid transparent", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            {project.demoLabel || "Live Demo"} <span className="arrow">↗</span>
          </a>
        )}
      </div>

      <style>{`
        .demo-btn { transition: all 0.3s ease; }
        .demo-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px -10px var(--fg); opacity: 0.9; }
        .arrow { display: inline-block; transition: transform 0.3s ease; }
        .demo-btn:hover .arrow { transform: translate(4px, -4px); }
      `}</style>

    </article>
  );
}