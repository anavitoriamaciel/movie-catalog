"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/favorites", label: "Favoritos" },
    { href: "/watchlist", label: "Minhas Listas" },
  ];

  return (
    <nav style={{ backgroundColor: "#0a0a0a", borderBottom: "1px solid #2a2a2a", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="font-title glow" style={{ fontSize: "28px", color: "#e53935", letterSpacing: "2px" }}>
            FRAME
          </span>
        </Link>

        <div style={{ display: "flex", gap: "32px" }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  color: isActive ? "#e53935" : "#757575",
                  borderBottom: isActive ? "1px solid #e53935" : "none",
                  paddingBottom: "2px",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
