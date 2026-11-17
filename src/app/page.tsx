import { getPerson, getFeaturedProjects, getPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
import Connect from "@/components/Connect";
import ProfileButton from "@/components/ProfileButton";

export const instant = false;

export default async function Home() {
  // Ambil data Person, Projects, dan Posts secara paralel
  const [person, projects, posts] = await Promise.all([
    getPerson(),
    getFeaturedProjects(),
    getPosts()
  ]);

  // Ambil maksimal 3 artikel blog terbaru
  const latestPosts = posts?.slice(0, 3) || [];

  return (
    <div className="container" style={{ maxWidth: 1200, textAlign: "center" }}>

      {/* 1. TEKS RAKSASA */}
      <h1 style={{
        fontSize: "clamp(48px, 8vw, 96px)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        margin: "0 auto",
        lineHeight: 1.05,
        maxWidth: 900,
        color: "var(--fg)"
      }}>
        Building bridges between design and code
      </h1>

      {/* 2. SUBTITLE */}
      <p style={{
        fontSize: "clamp(18px, 2.5vw, 24px)",
        color: "var(--fg-muted)",
        marginTop: 24,
        marginBottom: 40,
        maxWidth: 700,
        margin: "24px auto 40px",
        lineHeight: 1.5
      }}>
        I'm {person?.name || "Your Name"}, a {person?.role || "Developer"} at <strong style={{ color: "var(--fg)" }}>Once UI</strong>, where I craft intuitive user experiences. After hours, I build my own projects.
      </p>

      {/* 3. TOMBOL HERO (BARU: Download CV & Hubungi Saya) */}
      {/* <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
        {person?.cvUrl && (
          <a href={person.cvUrl} target="_blank" rel="noreferrer" style={{
            padding: "14px 28px", borderRadius: 999,
            background: "var(--fg)", color: "var(--bg)", fontWeight: 600, fontSize: 15,
            display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none"
          }}>
            Download CV ↗
          </a>
        )}
        <a href="#connect" style={{
          padding: "14px 28px", borderRadius: 999,
          border: "1px solid var(--border)", color: "var(--fg)",
          fontWeight: 600, fontSize: 15, textDecoration: "none"
        }}>
          Hubungi Saya
        </a>
      </div> */}

      {/* 4. TOMBOL PROFIL KAPSUL */}
      <ProfileButton person={person} />

      {/* 5. CAROUSEL DATAR */}
      <ProjectCarousel projects={projects} />

      {/* 6. SECTION BLOG (BARU) */}
      {latestPosts.length > 0 && (
        <section style={{ marginTop: 100, textAlign: "left", maxWidth: 1000,  margin: "100px auto 0"}}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, margin: 0 }}>
              Latest Articles
            </h2>

            {/* Tombol See all articles (muncul jika artikel > 3) */}
            {posts.length > 3 && (
              <Link href="/blog" style={{ fontSize: 15, fontWeight: 600, color: "var(--fg-muted)", textDecoration: "underline" }}>
                See all articles →
              </Link>
            )}
          </div>

          <div className="grid-auto">
            {latestPosts.map((post: any) => {
              if (!post.slug?.current) return null;
              return (
                <Link key={post._id} href={`/blog/${post.slug.current}`}>
                  <div style={{
                    border: "1px solid var(--border)", borderRadius: 16,
                    padding: 20, background: "var(--bg-elevated)", height: "100%",
                    display: "flex", flexDirection: "column", gap: 12,
                  }}>
                    <div style={{ fontSize: 13, color: "var(--fg-muted)" }}>
                      {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--fg-muted)", margin: 0, lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. LET'S CONNECT */}
      <div id="connect" style={{ marginTop: 100 }}>
        <Connect person={person} />
      </div>

    </div>
  );
}