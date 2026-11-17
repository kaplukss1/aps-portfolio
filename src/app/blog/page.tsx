import Link from "next/link";
import { getPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and stories about design, development, and technology by Andika Prayoga.",
};

export const instant = false;

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <h1 style={{
        fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 800,
        letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1.05,
      }}>
        Blog
      </h1>
      <p style={{ fontSize: 18, color: "var(--fg-muted)", marginBottom: 48 }}>
        Thoughts, tutorials, and stories about design and development.
      </p>

      {posts.length === 0 ? (
        <p style={{ color: "var(--fg-muted)" }}>Belum ada artikel yang ditulis.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {posts.map((post: any) => {
            if (!post.slug?.current) return null; 

            return (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                {/* Menggunakan class 'blog-card' agar rapi */}
                <div className="blog-card">
                  
                  {post.coverImage && (
                    <img
                      src={urlFor(post.coverImage).width(500).height(300).url()}
                      alt={post.title}
                      className="blog-image"
                    />
                  )}
                  
                  <div>
                    <div style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 8 }}>
                      {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: 16, color: "var(--fg-muted)", margin: 0, lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* CSS Khusus untuk Merapikan Tampilan Mobile */}
      <style>{`
        .blog-card {
          display: grid;
          grid-template-columns: minmax(150px, 250px) 1fr;
          gap: 24px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border);
          align-items: center;
        }

        .blog-image {
          border-radius: 16px;
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
        }

        /* Jika layar HP (di bawah 768px), ubah jadi 1 kolom (tumpuk ke bawah) */
        @media (max-width: 768px) {
          .blog-card {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .blog-image {
            aspect-ratio: 16/9;
            max-height: 250px;
          }
          h2 {
            font-size: 20px !important; /* Perkecil sedikit judul di HP */
          }
        }
      `}</style>
    </div>
  );
}