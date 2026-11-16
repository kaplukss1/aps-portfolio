import { PortableText as PT } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

const components = {
  types: {
    image: ({ value }: any) => (
      <img 
        src={urlFor(value).width(1200).url()} 
        alt="Blog Image" 
        style={{ borderRadius: 12, margin: "32px 0", width: "100%" }} 
      />
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 style={{ fontSize: 36, fontWeight: 800, marginTop: 40, marginBottom: 16 }}>{children}</h1>,
    h2: ({ children }: any) => <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ fontSize: 22, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>{children}</h3>,
    normal: ({ children }: any) => <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--fg-muted)", marginBottom: 20 }}>{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: "4px solid var(--border)", paddingLeft: 16, margin: "24px 0", fontStyle: "italic", color: "var(--fg)" }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noreferrer" style={{ color: "#3b82f6", textDecoration: "underline" }}>
        {children}
      </a>
    ),
  },
};

export default function PortableText({ value }: { value: any }) {
  return <PT value={value} components={components} />;
}