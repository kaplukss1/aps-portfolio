"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Efek pegas (spring) agar kursor mengikuti mouse dengan halus
  const sx = useSpring(x, { stiffness: 400, damping: 40 });
  const sy = useSpring(y, { stiffness: 400, damping: 40 });

  useEffect(() => {
    // Hanya aktifkan di perangkat dengan mouse (PC/Laptop)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    
    const move = (e: MouseEvent) => { 
      x.set(e.clientX); 
      y.set(e.clientY); 
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed", left: sx, top: sy,
        width: 16, height: 16, borderRadius: "50%",
        background: "#fff", mixBlendMode: "difference",
        pointerEvents: "none", zIndex: 9999,
        translateX: "-50%", translateY: "-50%",
      }}
    />
  );
}