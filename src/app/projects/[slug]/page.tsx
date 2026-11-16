import { getProjectBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = project.coverImage 
    ? urlFor(project.coverImage).width(1200).height(630).url() 
    : "/og-image.jpg";

  return {
    title: project.title,
    description: project.summary || `Project by Andika Prayoga: ${project.title}`,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [ogImage, ...previousImages],
    },
  };
}

export const instant = false;

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="container" style={{ maxWidth: 900 }}>

      {/* HEADER */}
      <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 }}>
        {project.title}
      </h1>
      <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--fg-muted)", marginBottom: 40 }}>
        {project.summary}
      </p>

      {project.coverImage && (
        <img
          src={urlFor(project.coverImage).width(1200).url()}
          alt={project.title}
          style={{ borderRadius: 20, marginBottom: 60, width: "100%" }}
        />
      )}

      {/* PROJECT BRIEF */}
      {project.brief && (
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Project Brief</h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24
          }}>
            {["background", "goals", "problems", "solutions"].map((key) => (
              project.brief[key] && (
                <div key={key} style={{
                  padding: 24, background: "var(--bg-elevated)", borderRadius: 16, border: "1px solid var(--border)"
                }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, textTransform: "capitalize", marginBottom: 12 }}>
                    {key === "background" ? "Latar Belakang" :
                      key === "goals" ? "Tujuan" :
                        key === "problems" ? "Permasalahan" : "Solusi"}
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

      {/* WORKFLOW */}
      {project.workflow && project.workflow.length > 0 && (
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Workflow</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {project.workflow.map((step: any, idx: number) => (
              <div key={idx} style={{ display: "flex", gap: 24 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: "var(--fg)", color: "var(--bg)",
                  display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", flexShrink: 0
                }}>
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

      {/* GALLERY (Menggunakan Komponen Baru) */}
      {project.gallery && <ProjectGallery gallery={project.gallery} />}

      {/* TOMBOL AKSI (Demo / Live URL) */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        flexWrap: "wrap",
        marginTop: 60,
        paddingTop: 40,
        borderTop: "1px solid var(--border)"
      }}>

        {/* Tombol Demo Dinamis */}
        {project.isDemoActive && project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="demo-btn"
            style={{
              padding: "14px 32px",
              borderRadius: 999,
              background: "var(--fg)",
              color: "var(--bg)",
              border: "4px solid transparent", // Border transparan agar ukuran tidak berubah saat hover
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {project.demoLabel || "Live Demo"}
            {/* Tanda panah dibungkus span agar bisa dianimasikan */}
            <span className="arrow">↗</span>
          </a>
        )}
      </div>

      {/* CSS Animasi Hover & Warna Light Mode */}
      <style>{`
        .demo-btn {
          transition: all 0.3s ease;
        }
        
        /* ==== UBAH WARNA KHUSUS LIGHT MODE DI SINI ==== */
        [data-theme="light"] .demo-btn {
          background: #ffffff !important; /* Ganti dengan warna yang diinginkan (contoh: Biru) */
          color: #000000 !important;      /* Warna teks jadi putih */
        }

        /* Efek saat di-hover */
        .demo-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px -10px var(--fg);
          opacity: 0.9;
        }

        /* Warna saat di-hover (Khusus Light Mode) */
        [data-theme="light"] .demo-btn:hover {
          background: #2563eb !important; /* Biru yang sedikit lebih gelap saat di-hover */
          box-shadow: 0 10px 20px -10px rgba(52, 52, 52, 0.5);
        }

        .arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .demo-btn:hover .arrow {
          transform: translate(4px, -4px);
        }
      `}</style>

    </article>
  );
}