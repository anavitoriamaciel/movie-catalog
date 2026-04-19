"use client";

import { useState } from "react";
import { useMoviesStore } from "@/store/moviesStore";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function AddToListButton({ movie }: { movie: Movie }) {
  const [open, setOpen] = useState(false);
  const {
    isInWatchlist, addToWatchlist, removeFromWatchlist,
    isWatched, addToWatched, removeFromWatched,
  } = useMoviesStore();

  const inWatchlist = isInWatchlist(movie.id);
  const watched = isWatched(movie.id);

  function toggleWatchlist() {
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
    setOpen(false);
  }

  function toggleWatched() {
    if (watched) removeFromWatched(movie.id);
    else addToWatched(movie);
    setOpen(false);
  }

  const items = [
    { label: inWatchlist ? "✓ QUERO VER" : "QUERO VER", active: inWatchlist, action: toggleWatchlist },
    { label: watched ? "✓ JA ASSISTI" : "JA ASSISTI", active: watched, action: toggleWatched },
  ];

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: "transparent",
          border: "1px solid #2a2a2a",
          borderRadius: "4px",
          padding: "10px 20px",
          color: "#757575",
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "16px",
          letterSpacing: "1px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#757575";
          e.currentTarget.style.color = "#e0e0e0";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#2a2a2a";
          e.currentTarget.style.color = "#757575";
        }}
      >
        + ADICIONAR A LISTA
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            backgroundColor: "#111111",
            border: "1px solid #2a2a2a",
            borderRadius: "4px",
            overflow: "hidden",
            zIndex: 50,
            minWidth: "200px",
          }}
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: item.active ? "#1a1a1a" : "transparent",
                border: "none",
                borderBottom: "1px solid #2a2a2a",
                color: item.active ? "#e53935" : "#e0e0e0",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "12px",
                letterSpacing: "1px",
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = item.active ? "#1a1a1a" : "transparent")}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
