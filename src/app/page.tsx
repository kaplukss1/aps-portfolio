import { getPerson, getFeaturedProjects } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Link from "next/link";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProfileButton from "@/components/ProfileButton";
import Newsletter from "@/components/Newsletter";

export const instant = false;

export default async function Home() {
  const [person, projects] = await Promise.all([getPerson(), getFeaturedProjects()]);

  return (
    <div className="container" style={{ maxWidth: 1200, textAlign: "center" }}>

      {/* 1. BADGE KECIL */}
      {/* <div style={{
        display: "inline-flex", alignItems: "center", gap: 12,
        padding: "6px 16px", borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--bg)",
        fontSize: 13, color: "var(--fg-muted)",
        marginBottom: 40,
      }}>
        <span style={{ color: "var(--fg)", fontWeight: 600 }}>Once UI</span>
        <span style={{ width: 1, height: 14, background: "var(--border)" }} />
        <span>Featured work</span>
      </div> */}

      {/* 2. TEKS RAKSASA */}
      <h1 style={{
        fontSize: "clamp(48px, 8vw, 96px)",
        fontWeight: 550,
        letterSpacing: "-0.04em",
        margin: "0 auto",
        lineHeight: 1.05,
        maxWidth: 900,
        color: "var(--fg)"
      }}>
        Turning ideas into meaningful digital experiences
      </h1>

      {/* 3. SUBTITLE */}
      <p style={{
        fontSize: "clamp(18px, 2.5vw, 24px)",
        color: "var(--fg-muted)",
        marginTop: 24,
        marginBottom: 40,
        maxWidth: 700,
        margin: "24px auto 40px",
        lineHeight: 1.5
      }}>
        I'm {person?.name || "Andika Prayoga Siswono"}, an {person?.role || "Information Systems Graduate"} with a passion for Frontend Development and UI/UX Design. I enjoy building intuitive, responsive, and visually engaging digital experiences while exploring new technologies and creative ideas.
      </p>

      {/* 4. TOMBOL PROFIL KAPSUL */}
      <ProfileButton person={person} />

      {/* 5. CAROUSEL DATAR */}
      <ProjectCarousel projects={projects} />

      {/* 6. NEWSLETTER */}
      <Newsletter name={person?.name || "My"} />

    </div>
  );
}