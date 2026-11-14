import { getProjects } from "@/lib/sanity/queries";
import ProjectCard from "@/components/ProjectCard";

export const instant = false;

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="container">
      <h1 style={{
        fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 800,
        letterSpacing: "-0.03em", margin: "0 0 40px", lineHeight: 1.05,
      }}>
        All Projects
      </h1>
      
      {projects.length === 0 ? (
        <p style={{ color: "var(--fg-muted)" }}>Belum ada project yang ditambahkan.</p>
      ) : (
        <div className="grid-auto">
          {projects.map((p: any) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}