"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push("/?search=" + encodeURIComponent(query.trim()));
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filme..."
        style={{
          backgroundColor: "#111111",
          border: "1px solid #2a2a2a",
          borderRadius: "4px",
          padding: "10px 16px",
          color: "#e0e0e0",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "13px",
          outline: "none",
          width: "300px",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#e53935")}
        onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#e53935",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          color: "#fff",
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "16px",
          letterSpacing: "1px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#ff1744")}
        onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#e53935")}
      >
        BUSCAR
      </button>
    </form>
  );
}
