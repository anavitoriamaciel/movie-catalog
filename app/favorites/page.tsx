"use client";

import Link from "next/link";
import { useMoviesStore } from "@/store/moviesStore";
import MovieCard from "@/components/MovieCard";

export default function FavoritesPage() {
  const { favorites } = useMoviesStore();

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1 className="font-title glow" style={{ fontSize: "42px", color: "#e53935" }}>
          FAVORITOS
        </h1>
        <p className="font-mono" style={{ color: "#757575", fontSize: "12px", marginTop: "4px" }}>
          {favorites.length} FILME{favorites.length !== 1 ? "S" : ""} SALVOS
        </p>
      </div>

      {favorites.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "80px 0",
            borderTop: "1px solid #2a2a2a",
          }}
        >
          <p className="font-title" style={{ fontSize: "64px", opacity: 0.2 }}>♡</p>
          <p className="font-mono" style={{ color: "#757575", fontSize: "13px" }}>
            NENHUM FAVORITO AINDA.
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
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
