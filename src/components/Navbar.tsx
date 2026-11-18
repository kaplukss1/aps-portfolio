"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme/ThemeToggle";

export default function Navbar() {
  const path = usePathname();

  const links = [
    { href: "/", label: "Home", icon: "/icons/home.svg" },
    { href: "/about", label: "About", icon: "/icons/user.svg" },
    { href: "/projects", label: "Work", icon: "/icons/work.svg" },
    { href: "/blog", label: "Blog", icon: "/icons/blog.svg" },
  ];

  return (
    <div style={{
      position: "fixed", top: 24, left: 0, right: 0,
      display: "flex", justifyContent: "center", zIndex: 100,
      pointerEvents: "none" // Agar klik di luar navbar tembus ke background
    }}>
      <nav style={{
        pointerEvents: "auto",
        display: "flex", alignItems: "center", gap: 4,
        padding: "6px 8px",
        // --- TAMBAHKAN EFEK BLUR DI SINI ---
        background: "color-mix(in srgb, var(--bg) 75%, transparent)", 
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(16px)",
        //---
        borderRadius: 999,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: "1px solid var(--border)",
      }}>
        {links.map((l) => {
          const isActive = path === l.href;
          return (
            <Link key={l.href} href={l.href} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 999,
              fontSize: 14, fontWeight: 500,
              background: isActive ? "var(--bg-elevated)" : "transparent",
              color: isActive ? "var(--fg)" : "var(--fg-muted)",
              transition: "all 0.2s"
            }}>
              {/* 2. Ganti <span> emoji menjadi tag <img> */}
              <img 
                src={l.icon} 
                alt={l.label} 
                style={{ 
                  width: 16, 
                  height: 16, 
                  objectFit: "contain",
                  // Trik agar SVG hitam otomatis jadi putih saat Dark Mode
                  filter: "var(--icon-filter, none)" 
                }} 
              />
              <span className="nav-label">{l.label}</span>
            </Link>
          );
        })}
        
        {/* Garis pemisah */}
        <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 8px" }} />
        <ThemeToggle />
      </nav>

      {/* Sembunyikan teks di HP, hanya tampilkan icon */}
      <style>{`
        @media (max-width: 640px) {
          .nav-label { display: none; }
          nav { gap: 2px; padding: 6px; }
        }
      `}</style>
    </div>
  );
}