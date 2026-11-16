import SocialIcon from "./SocialIcon";

export default function Connect({ person }: { person: any }) {
  return (
    <div 
      className="connect-container"
      style={{
        width: "100%",
        maxWidth: 1000,
        margin: "0px auto 6px",
        padding: "20px 10px",
        borderRadius: 24,
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2 style={{
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        marginBottom: 30,
        color: "var(--fg)"
      }}>
        Let's build something great.
      </h2>

      {/* <p style={{
        fontSize: "clamp(16px, 2vw, 18px)",
        color: "var(--fg-muted)",
        marginBottom: 40,
        maxWidth: 600,
        lineHeight: 1.6
      }}>
        Saat ini saya terbuka untuk peluang kerja penuh waktu, proyek freelance, atau sekadar berdiskusi tentang desain dan teknologi. Mari terhubung!
      </p> */}

      {/* Tombol Email Utama */}
      {person?.email && (
        <a 
          href={`mailto:${person.email}`}
          className="email-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            borderRadius: 999,
            background: "var(--fg)",
            color: "var(--bg)",
            fontSize: 18,
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: 48,
          }}
        >
          <SocialIcon platform="email" />
          {person.email}
        </a>
      )}

      {/* Ikon Sosial Media */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {person?.socials?.map((social: any, idx: number) => {
          const url = social.url?.startsWith("http") ? social.url : `https://${social.url}`;
          return (
            <a 
              key={idx} 
              href={url} 
              target="_blank" 
              rel="noreferrer"
              className="social-link"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 999,
                border: "1px solid var(--border)", 
                background: "var(--bg-elevated)",
                fontSize: 15, fontWeight: 500, textTransform: "capitalize",
                textDecoration: "none", color: "var(--fg)"
              }}
            >
              <SocialIcon platform={social.platform} />
              {social.platform}
            </a>
          );
        })}
      </div>

      {/* CSS Animasi & Gradient */}
      <style>{`
        .connect-container {
          background: linear-gradient(135deg, rgba(224, 242, 254, 0.6) 0%, rgba(243, 232, 255, 0.4) 50%, var(--bg) 100%);
        }
        [data-theme="dark"] .connect-container {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 20, 50, 0.5) 50%, var(--bg) 100%);
        }
        
        .email-btn {
          transition: all 0.3s ease;
        }
        .email-btn:hover {
          transform: translateY(-3px);
          opacity: 0.9;
          box-shadow: 0 10px 20px -10px var(--fg);
        }

        .social-link {
          transition: all 0.3s ease;
        }
        .social-link:hover {
          border-color: var(--fg-muted);
          background: var(--bg);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}