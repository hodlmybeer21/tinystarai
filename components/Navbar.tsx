"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="glass" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 4L19 12L27 13L21 19L23 27L16 23L9 27L11 19L5 13L13 12L16 4Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="1"/>
          </svg>
          <span className="font-display" style={{ fontSize: 20, color: "#f8fafc" }}>TinyStarAI</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
            ← Back
          </Link>
        </div>
      </div>
    </nav>
  );
}
