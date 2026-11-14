"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export default function ProjectCarousel({ projects }: { projects: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fungsi untuk geser selanjutnya / sebelumnya
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    // Efek Auto-Slide setiap 4 detik
    useEffect(() => {
        if (projects.length <= 1) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [currentIndex, projects.length]);

    if (!projects || projects.length === 0) return null;

    return (
        <div style={{
            position: "relative",
            width: "80%",
            maxWidth: 1000, // Ukuran maksimal carousel
            margin: "0 auto 80px", // Center dan beri jarak bawah
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "0 24px 48px -12px rgba(0,0,0,0.2)",
            aspectRatio: "16/9", // Rasio gambar landscape lebar
        }}>

            {/* WADAH GAMBAR */}
            {projects.map((project, index) => (
                <div
                    key={project._id}
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: index === currentIndex ? 1 : 0,
                        transition: "opacity 0.6s ease-in-out",
                        pointerEvents: index === currentIndex ? "auto" : "none", // Hanya bisa diklik jika aktif
                    }}
                >
                    <Link href={`/projects/${project.slug.current}`}>
                        {project.coverImage && (
                            <img
                                src={urlFor(project.coverImage).width(1600).url()}
                                alt={project.title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                }}
                            />
                        )}

                        {/* Overlay Teks (Opsional, agar judul project terlihat jelas) */}
                        <div style={{
                            position: "absolute",
                            bottom: 0, left: 0, right: 0,
                            padding: "40px 24px 24px",
                            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                            color: "white",
                        }}>
                            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
                                {project.title}
                            </h3>
                        </div>
                    </Link>
                </div>
            ))}

            {/* TOMBOL PANAH KIRI */}
            <button
                onClick={prevSlide}
                style={{
                    position: "absolute", top: "50%", left: 16,
                    transform: "translateY(-50%)",
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(0,0,0,0.5)", color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                    cursor: "pointer", zIndex: 10,
                    display: "grid", placeItems: "center",
                    backdropFilter: "blur(4px)",
                    transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
                aria-label="Previous"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* TOMBOL PANAH KANAN */}
            <button
                onClick={nextSlide}
                style={{
                    position: "absolute", top: "50%", right: 16,
                    transform: "translateY(-50%)",
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(0,0,0,0.5)", color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                    cursor: "pointer", zIndex: 10,
                    display: "grid", placeItems: "center",
                    backdropFilter: "blur(4px)",
                    transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
                aria-label="Next"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* TITIK INDIKATOR (Dots) DI BAWAH */}
            <div style={{
                position: "absolute", bottom: 16, left: 0, right: 0,
                display: "flex", justifyContent: "center", gap: 8, zIndex: 10,
            }}>
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        style={{
                            width: "8px",          // <-- Gunakan string dengan px
                            height: "8px",         // <-- Gunakan string dengan px
                            padding: 0,            // <-- Hapus padding bawaan browser
                            borderRadius: "50%",   // <-- 50% lebih aman untuk lingkaran sempurna
                            border: "none",
                            cursor: "pointer",
                            background: idx === currentIndex ? "white" : "rgba(255,255,255,0.4)",
                            transition: "background 1s, transform 1s",
                            transform: idx === currentIndex ? "scale(1.3)" : "scale(1)",
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}