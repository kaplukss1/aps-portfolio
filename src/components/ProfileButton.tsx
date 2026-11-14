"use client";

import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export default function ProfileButton({ person }: { person: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/about">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: "inline-flex", 
          alignItems: "center", 
          gap: 12,
          padding: "8px 16px 8px 8px", 
          borderRadius: 999,
          border: "1px solid var(--border)",
          background: "var(--bg)",
          marginBottom: 80,
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
      >
        {person?.logo ? (
          <img
            src={urlFor(person.logo).width(48).height(48).url()}
            alt={person.name}
            style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--border)" }} />
        )}
        
        <span style={{ fontSize: 15, fontWeight: 500, color: "var(--fg)" }}>
          About — {person?.name || "Me"}
        </span>

        {/* Tanda Panah dengan Animasi */}
        <div style={{
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Jika hover, tanda panah muncul (opacity 1) dan bergeser sedikit ke kanan (translateX)
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateX(4px)" : "translateX(0px)",
          transition: "all 0.3s ease",
          color: "var(--fg-muted)",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}