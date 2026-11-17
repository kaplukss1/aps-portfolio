import { getPerson } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import SocialIcon from "@/components/SocialIcon";
import AboutNav from "@/components/AboutNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Andika Prayoga, his background, work experience, and technical skills.",
};

export const instant = false;

export default async function About() {
  const person = await getPerson();

  return (
    <div style={{
      maxWidth: 1200,
      margin: "0 auto",
      padding: "60px 24px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 60,
      alignItems: "flex-start"
    }}>

      {/* ================= KOLOM KIRI (Sidebar) ================= */}
      <aside style={{
        flex: "1 1 250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "sticky",
        top: 120, // Agar tetap menempel saat di-scroll
      }}>

        {/* 1. Foto Profil Bulat */}
        {person?.avatar && (
          <div style={{
            width: 200, height: 200,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid var(--border)",
            marginBottom: 24,
          }}>
            <img
              src={urlFor(person.avatar).width(400).height(400).url()}
              alt={person.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* 2. Lokasi */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          color: "var(--fg)", fontSize: 16, fontWeight: 500,
          marginBottom: 24
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {person?.location || "Jakarta, ID"}
        </div>

        {/* 3. Tombol Bahasa (Opsional, statis sesuai gambar) */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
          <span style={{ padding: "6px 12px", fontSize: 13, borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-elevated)" }}>English</span>
          <span style={{ padding: "6px 12px", fontSize: 13, borderRadius: 8, border: "1px solid var(--border)" }}>Bahasa</span>
        </div>

        {/* 4. Menu Navigasi (Anchor Links) */}
        <AboutNav />

      </aside>

      {/* ================= KOLOM KANAN (Konten Utama) ================= */}
      <main style={{ flex: "2 1 600px", paddingBottom: 100 }}>

        {/* 1. Header (Nama & Role) */}
        <section id="intro" style={{ marginBottom: 60 }}>
          <h1 style={{
            fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 800,
            letterSpacing: "-0.04em", margin: 0, lineHeight: 1
          }}>
            {person?.name || "Your Name"}
          </h1>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400,
            color: "var(--fg-muted)", margin: "12px 0 24px"
          }}>
            {person?.role || "Design Engineer"}
          </h2>

          {/* Sosial Media (Tombol Kapsul) */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            {person?.socials?.map((social: any, idx: number) => (
              <a key={idx} href={social.url} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 999,
                border: "1px solid var(--border)", background: "var(--bg-elevated)",
                fontSize: 14, fontWeight: 500, textTransform: "capitalize"
              }}>
                <SocialIcon platform={social.platform} />
                {social.platform}
              </a>
            ))}
            {person?.email && (
              <a href={`mailto:${person.email}`} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 999,
                border: "1px solid var(--border)", background: "var(--bg-elevated)",
                fontSize: 14, fontWeight: 500
              }}>
                <SocialIcon platform="email" />
                Email
              </a>
            )}

            {/* TAMBAHKAN TOMBOL CV DI SINI */}
            {person?.cvUrl && (
              <a href={person.cvUrl} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 999,
                border: "1px solid var(--border)", background: "var(--bg-elevated)",
                fontSize: 14, fontWeight: 500, color: "var(--fg)", textDecoration: "none"
              }}>
                <span>📄</span> Download CV
              </a>
            )}
          </div>



          {/* Bio */}
          <p style={{
            fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.7,
            color: "var(--fg)", opacity: 0.9
          }}>
            {person?.bio || "Belum ada bio. Silakan isi di Sanity Studio."}
          </p>
        </section>

        {/* 2. Studies */}
        {person?.studies && person.studies.length > 0 && (
          <section id="studies" style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 32 }}>
              Studies
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {person.studies.map((edu: any, idx: number) => (
                <div key={idx} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", flexWrap: "wrap", gap: 16,
                  paddingBottom: 24, borderBottom: "1px solid var(--border)"
                }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>
                      {edu.institution}
                    </h3>

                    {/* Pembungkus Degree & GPA */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <p style={{ fontSize: 16, color: "#3b82f6", margin: 0, fontWeight: 500 }}>
                        {edu.degree}
                      </p>

                      {/* Badge GPA */}
                      {edu.gpa && (
                        <span style={{
                          fontSize: 13,
                          padding: "2px 8px",
                          borderRadius: 6,
                          border: "1px solid var(--border)",
                          background: "var(--bg-elevated)",
                          fontWeight: 600
                        }}>
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>

                    {/* Deskripsi dengan whiteSpace */}
                    {edu.description && (
                      <p style={{
                        fontSize: 15,
                        color: "var(--fg-muted)",
                        marginTop: 12,
                        maxWidth: 500,
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap"
                      }}>
                        {edu.description}
                      </p>
                    )}
                  </div>

                  {/* Tanggal */}
                  <div style={{ fontSize: 16, color: "var(--fg-muted)", fontWeight: 500 }}>
                    {edu.startDate} — {edu.endDate || "Present"}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Work Experience */}
        {person?.experience && person.experience.length > 0 && (
          <section id="experience" style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 32 }}>
              Work Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {person.experience.map((exp: any, idx: number) => (
                <div key={idx} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", flexWrap: "wrap", gap: 16,
                  paddingBottom: 24, borderBottom: "1px solid var(--border)"
                }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>
                      {exp.company}
                    </h3>
                    <p style={{ fontSize: 16, color: "#3b82f6", margin: 0, fontWeight: 500 }}>
                      {exp.role}
                    </p>
                    <p style={{ fontSize: 15, color: "var(--fg-muted)", marginTop: 12, maxWidth: 500, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                      {exp.description}
                    </p>
                  </div>
                  <div style={{ fontSize: 16, color: "var(--fg-muted)", fontWeight: 500 }}>
                    {exp.startDate} — {exp.endDate || "Present"}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Organization Experience */}
        {person?.organizations && person.organizations.length > 0 && (
          <section id="organization" style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 32 }}>
              Organization Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {person.organizations.map((org: any, idx: number) => (
                <div key={idx} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", flexWrap: "wrap", gap: 16,
                  paddingBottom: 24, borderBottom: "1px solid var(--border)"
                }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>
                      {org.organization}
                    </h3>
                    <p style={{ fontSize: 16, color: "#3b82f6", margin: 0, fontWeight: 500 }}>
                      {org.role}
                    </p>
                    <p style={{
                      fontSize: 15, color: "var(--fg-muted)", marginTop: 12, maxWidth: 500, lineHeight: 1.6,
                      whiteSpace: "pre-wrap"
                    }}>
                      {org.description}
                    </p>
                  </div>
                  <div style={{ fontSize: 16, color: "var(--fg-muted)", fontWeight: 500 }}>
                    {org.startDate} — {org.endDate || "Present"}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Technical Skills */}
        {person?.skills && person.skills.length > 0 && (
          <section id="skills" style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 32 }}>
              Technical Skills
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {person.skills.map((skill: any, idx: number) => (
                <div key={idx} style={{ paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>

                  {/* Judul Skill */}
                  <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px", color: "var(--fg)" }}>
                    {skill.title}
                  </h3>

                  {/* Deskripsi Skill */}
                  {skill.description && (
                    <p style={{ fontSize: 16, color: "var(--fg-muted)", margin: "0 0 16px", lineHeight: 1.6 }}>
                      {skill.description}
                    </p>
                  )}

                  {/* Tags (Tombol-tombol kecil) */}
                  {skill.tags && skill.tags.length > 0 && (
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {skill.tags.map((tag: string) => (
                        <span key={tag} style={{
                          padding: "6px 14px",
                          borderRadius: 999,
                          border: "1px solid var(--border)",
                          background: "var(--bg)",
                          fontSize: 14,
                          color: "var(--fg)",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* CSS Khusus untuk Responsivitas Layar HP */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="display: flex"][style*="flex-direction: row"] {
            flex-direction: column !important;
            align-items: center !important;
          }
          aside {
            position: static !important;
            width: 100%;
            margin-bottom: 40px;
          }
          main {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}