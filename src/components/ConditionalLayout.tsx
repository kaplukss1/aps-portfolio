"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Cursor from "./animations/Cursor";
import AuroraBg from "./animations/AuroraBg";
import SmoothScroll from "./animations/SmoothScroll";


export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Jika sedang di halaman studio, tampilkan halaman studio saja tanpa navbar/animasi
  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  // Jika di halaman biasa, tampilkan dengan lengkap
  return (
    <SmoothScroll>
      <AuroraBg />
      <Cursor />
      <Navbar />
      <main style={{ minHeight: "100vh" }}>{children}</main>

    </SmoothScroll>
  );
}
