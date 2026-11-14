import { getProjectBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { notFound } from "next/navigation";

export const instant = false;

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  // Di Next.js 16, params di-await terlebih dahulu (Best Practice)
  const { slug } = await params; 
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container" style={{ maxWidth: 800 }}>
      <h1 style={{
        fontSize: "clamp(32px, 6vw, 48px)", fontWeight: 800,
        letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1,
      }}>
        {project.title}
      </h1>
      <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "var(--fg-muted)", marginBottom: 40 }}>
        {project.summary}
      </p>

      {project.coverImage && (
        <img
          src={urlFor(project.coverImage).width(1200).url()}
          alt={project.title}
          style={{ borderRadius: 20, marginBottom: 40, width: "100%" }}
        />
      )}

      {/* Tombol Link */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{
            padding: "12px 24px", borderRadius: 999,
            background: "var(--accent-bg)", color: "var(--accent-fg)", fontWeight: 600,
          }}>
            Live Demo ↗
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noreferrer" style={{
            padding: "12px 24px", borderRadius: 999,
            border: "1px solid var(--border)",
          }}>
            Source Code ↗
          </a>
        )}
      </div>
    </article>
  );
}