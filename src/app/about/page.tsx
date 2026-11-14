import { getPerson } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const instant = false;

export default async function About() {
  const person = await getPerson();

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <h1 style={{
        fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 800,
        letterSpacing: "-0.03em", margin: "0 0 40px", lineHeight: 1.05,
      }}>
        About Me
      </h1>

      {person?.avatar && (
        <img
          src={urlFor(person.avatar).width(300).url()}
          alt={person.name}
          style={{ borderRadius: 20, marginBottom: 32, width: "100%", maxWidth: 250 }}
        />
      )}

      <h2 style={{ fontSize: 28, marginBottom: 16 }}>{person?.name}</h2>
      <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--fg-muted)" }}>
        {person?.bio || "Belum ada bio."}
      </p>

      {person?.skills && person.skills.length > 0 && (
        <>
          <h3 style={{ fontSize: 22, marginTop: 48, marginBottom: 16 }}>Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {person.skills.map((skill: string) => (
              <span key={skill} style={{
                padding: "8px 16px", borderRadius: 999,
                border: "1px solid var(--border)", fontSize: 14,
              }}>
                {skill}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}