export default function AuroraBg() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1, // Pastikan di belakang konten
        pointerEvents: "none",
        background: `
          radial-gradient(40% 40% at 20% 20%, rgba(99, 102, 241, 0.15), transparent 60%),
          radial-gradient(40% 40% at 80% 30%, rgba(236, 72, 153, 0.12), transparent 60%),
          radial-gradient(45% 45% at 50% 80%, rgba(34, 211, 238, 0.15), transparent 60%)
        `,
        filter: "blur(60px)",
        animation: "auroraMove 18s ease-in-out infinite alternate",
      }}
    >
      <style>{`
        @keyframes auroraMove {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(-40px,20px,0) scale(1.08); }
        }
      `}</style>
    </div>
  );
}