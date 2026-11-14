"use client";

import { useState } from "react";

export default function Newsletter({ name }: { name: string }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div 
      className="newsletter-container"
      style={{
        width: "100%",
        maxWidth: 1000,
        margin: "0 auto 80px",
        padding: "64px 32px",
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
        fontSize: "clamp(24px, 4vw, 32px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        marginBottom: 16,
        color: "var(--fg)"
      }}>
        Subscribe to {name}'s Newsletter
      </h2>

      <p style={{
        fontSize: 16,
        color: "var(--fg-muted)",
        marginBottom: 40,
        maxWidth: 500,
      }}>
        My weekly newsletter about creativity and engineering
      </p>

      {/* Form menggunakan class agar responsif di HP tanpa error Hydration */}
      <form 
        onSubmit={handleSubmit}
        className="newsletter-form"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            flex: 1,
            padding: "14px 20px",
            borderRadius: 999,
            border: "1px solid transparent",
            background: "var(--bg-elevated)",
            color: "var(--fg)",
            fontSize: 15,
            outline: "none",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid var(--fg-muted)";
            e.target.style.background = "var(--bg)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid transparent";
            e.target.style.background = "var(--bg-elevated)";
          }}
        />

        <button
          type="submit"
          style={{
            padding: "14px 28px",
            borderRadius: 999,
            background: "var(--fg)", 
            color: "var(--bg)",
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {isSubmitted ? "Subscribed!" : "Subscribe"}
        </button>
      </form>

      {isSubmitted && (
        <p style={{ marginTop: 16, fontSize: 14, color: "#10b981", fontWeight: 500 }}>
          Terima kasih! Email kamu telah terdaftar.
        </p>
      )}

      {/* CSS Khusus untuk Dark Mode & Responsivitas */}
      <style>{`
        /* 1. Warna Gradient untuk Light Mode */
        .newsletter-container {
          background: linear-gradient(135deg, rgba(224, 242, 254, 0.6) 0%, rgba(243, 232, 255, 0.4) 50%, var(--bg) 100%);
        }

        /* 2. Warna Gradient untuk Dark Mode (Lebih Gelap & Elegan) */
        [data-theme="dark"] .newsletter-container {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 20, 50, 0.5) 50%, var(--bg) 100%);
        }

        /* 3. Responsivitas Form (Tumpuk ke bawah di HP) */
        .newsletter-form {
          display: flex;
          gap: 12px;
          width: 100%;
          max-width: 450px;
        }
        @media (max-width: 600px) {
          .newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}