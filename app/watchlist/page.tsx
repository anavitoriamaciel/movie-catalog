"use client";

import { useState } from "react";
import Link from "next/link";
import { useMoviesStore } from "@/store/moviesStore";
import MovieCard from "@/components/MovieCard";

export default function WatchlistPage() {
  const { watchlist, watched } = useMoviesStore();
  const [tab, setTab] = useState<"watchlist" | "watched">("watchlist");

  const movies = tab === "watchlist" ? watchlist : watched;

  const tabs = [
    { key: "watchlist" as const, label: "QUERO VER", count: watchlist.length },
    { key: "watched" as const, label: "JA ASSISTI", count: watched.length },
  ];

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1 className="font-title glow" style={{ fontSize: "42px", color: "#e53935" }}>
          MINHAS LISTAS
        </h1>
        <p className="font-mono" style={{ color: "#757575", fontSize: "12px", marginTop: "4px" }}>
          ORGANIZE SUA EXPERIENCIA CINEMATOGRAFICA
        </p>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #2a2a2a", marginBottom: "32px" }}>
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                borderBottom: isActive ? "2px solid #e53935" : "2px solid transparent",
                padding: "12px 24px",
                color: isActive ? "#e53935" : "#757575",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "12px",
                letterSpacing: "1px",
                cursor: "pointer",
                marginBottom: "-1px",
              }}
            >
              {t.label}
              <span
                style={{
                  marginLeft: "8px",
                  backgroundColor: isActive ? "#e53935" : "#2a2a2a",
                  color: isActive ? "#fff" : "#757575",
                  borderRadius: "3px",
                  padding: "1px 6px",
                  fontSize: "10px",
                }}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {movies.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "80px 0",
          }}
        >
          <p className="font-title" style={{ fontSize: "64px", opacity: 0.2 }}>
            {tab === "watchlist" ? "📋" : "✓"}
          </p>
          <p className="font-mono" style={{ color: "#757575", fontSize: "13px" }}>
            {tab === "watchlist" ? "NENHUM FILME NA FILA." : "NENHUM FILME ASSISTIDO AINDA."}
          </p>
          <Link
            href="/"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "16px",
              color: "#e53935",
              textDecoration: "none",
              letterSpacing: "1px",
              borderBottom: "1px solid #e53935",
              paddingBottom: "2px",
            }}
          >
            EXPLORAR FILMES
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px" }}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
