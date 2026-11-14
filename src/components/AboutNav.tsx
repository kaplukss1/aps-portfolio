"use client";

import { useEffect, useState } from "react";

export default function AboutNav() {
    const [activeSection, setActiveSection] = useState("intro");

    const links = [
        { id: "intro", label: "Introduction" },
        { id: "experience", label: "Work Experience" },
        { id: "organization", label: "Organization" },
        { id: "studies", label: "Studies" },
        { id: "skills", label: "Technical skills" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px" } // Menyesuaikan titik fokus scroll
        );

        links.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Scroll manual agar lebih mulus
            const yOffset = -100; // Jarak offset dari atas
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setActiveSection(id);
        }
    };

    return (
        <nav style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 15,
            color: "var(--fg-muted)",
            fontWeight: 500
        }}>
            {links.map((link) => {
                const isActive = activeSection === link.id;

                return (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => handleClick(e, link.id)}
                        className="nav-link"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            color: isActive ? "var(--fg)" : "var(--fg-muted)",
                            transition: "color 0.3s ease",
                            cursor: "pointer",
                            textDecoration: "none",
                        }}
                    >
                        {/* Garis Animasi */}
                        <span style={{
                            display: "block",
                            height: 1,
                            width: isActive ? 32 : 16, // Memanjang saat aktif
                            background: isActive ? "var(--fg)" : "var(--border)",
                            transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                            className="nav-dash"
                        />
                        {link.label}
                    </a>
                );
            })}

            {/* CSS untuk animasi hover */}
            <style>{`
        .nav-link:hover {
          color: var(--fg) !important;
        }
        .nav-link:hover .nav-dash {
          width: 32px !important;
          background: var(--fg) !important;
        }
      `}</style>
        </nav>
    );
}