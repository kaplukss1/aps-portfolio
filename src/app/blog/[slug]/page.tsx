import { getPostBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import PortableText from "@/components/PortableText";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

export const instant = false;

// Generate SEO dinamis per artikel
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = post.coverImage 
    ? urlFor(post.coverImage).width(1200).height(630).url() 
    : "/og-image.jpg";

  return {
    title: post.title,
    description: post.excerpt || `Article by Andika Prayoga: ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [ogImage, ...previousImages],
    },
  };
}

export default async function PostDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="container" style={{ maxWidth: 720, paddingTop: 40 }}>
      
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 14, color: "var(--fg-muted)", marginBottom: 16 }}>
          {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 48px)", fontWeight: 800,
          letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.1,
        }}>
          {post.title}
        </h1>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <img
          src={urlFor(post.coverImage).width(1200).url()}
          alt={post.title}
          style={{ borderRadius: 20, marginBottom: 48, width: "100%" }}
        />
      )}

      {/* Isi Konten */}
      {post.body && <PortableText value={post.body} />}

      {/* Tombol Kembali */}
      <div style={{ marginTop: 60, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
        <a href="/blog" style={{ color: "var(--fg)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>
          ← Kembali ke semua artikel
        </a>
      </div>

    </article>
  );
}