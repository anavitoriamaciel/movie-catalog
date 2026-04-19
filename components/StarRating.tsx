"use client";

import { useState } from "react";
import { useMoviesStore } from "@/store/moviesStore";

export default function StarRating({ movieId }: { movieId: number }) {
  const { getRating, setRating } = useMoviesStore();
  const currentRating = getRating(movieId);
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p className="font-mono" style={{ fontSize: "11px", color: "#757575", letterSpacing: "1px" }}>
        SUA NOTA
      </p>
      <div style={{ display: "flex", gap: "6px" }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isLit = star <= (hovered || currentRating);
          return (
            <button
              key={star}
              onClick={() => setRating(movieId, star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "28px",
                color: isLit ? "#e53935" : "#2a2a2a",
                transition: "color 0.15s, transform 0.15s",
                transform: star <= hovered ? "scale(1.2)" : "scale(1)",
                padding: 0,
              }}
            >
              ★
            </button>
          );
        })}
      </div>
      {currentRating > 0 && (
        <p className="font-mono" style={{ fontSize: "11px", color: "#e53935" }}>
          {currentRating}/5 estrelas
        </p>
      )}
    </div>
  );
}
