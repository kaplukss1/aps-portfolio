import { getPerson } from "@/lib/sanity/queries";
import SocialIcon from "./SocialIcon";

async function getCurrentYear() {
    "use cache";
    return new Date().getFullYear();
}

export default async function Footer() {
    const [person, currentYear] = await Promise.all([
        getPerson(),
        getCurrentYear()
    ]);

    return (
        <footer style={{
            borderTop: "1px solid var(--border)",
            marginTop: 80,
            padding: "32px 40px",
            background: "var(--bg)",
        }}>
            <div style={{
                maxWidth: 1100,
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 24,
            }}>

                {/* BAGIAN KIRI: Copyright */}
                <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontSize: 14, color: "var(--fg-muted)"
                }}>
                    <span>© {currentYear}</span>
                    <span>/</span>
                    <span style={{ color: "var(--fg)" }}>{person?.name || "Your Name"}</span>
                    <span>/</span>
                    <span>
                        Build with ❤️
                    </span>
                </div>

                {/* BAGIAN KANAN: Ikon Sosial Media */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {person?.socials?.map((social: any, idx: number) => (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className="social-link" /* Gunakan class untuk styling hover */
                        >
                            <SocialIcon platform={social.platform} />
                        </a>
                    ))}

                    {/* Tampilkan Email jika ada */}
                    {person?.email && (
                        <a
                            href={`mailto:${person.email}`}
                            className="social-link"
                        >
                            <SocialIcon platform="email" />
                        </a>
                    )}
                </div>

            </div>

            {/* Tambahkan CSS murni agar efek hover tetap berjalan tanpa perlu "use client" */}
            <style>{`
        .social-link {
          color: var(--fg-muted);
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .social-link:hover {
          color: var(--fg);
        }
      `}</style>
        </footer>
    );
}