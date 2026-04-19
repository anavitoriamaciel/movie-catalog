"use client";

import Image from "next/image";
import Link from "next/link";
import { useMoviesStore } from "@/store/moviesStore";
import { IMAGE_BASE_URL } from "@/lib/tmdb";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useMoviesStore();
  const favorite = isFavorite(movie.id);

  function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  const year = movie.release_date?.split("-")[0] ?? "—";
  const rating = movie.vote_average?.toFixed(1) ?? "—";

  return (
    <Link href={"/movie/" + movie.id} style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundColor: "#111111",
          border: "1px solid #2a2a2a",
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
          transition: "transform 0.2s, border-color 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "#e53935";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
        }}
      >
        <div style={{ position: "relative", aspectRatio: "2/3", width: "100%" }}>
          {movie.poster_path ? (
            <Image
              src={IMAGE_BASE_URL + movie.poster_path}
              alt={movie.title}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#757575",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "12px",
              }}
            >
              SEM IMAGEM
            </div>
          )}

          <button
            onClick={toggleFavorite}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "rgba(0,0,0,0.7)",
              border: favorite ? "1px solid #e53935" : "1px solid #444",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {favorite ? "❤️" : "🤍"}
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              backgroundColor: "rgba(0,0,0,0.85)",
              border: "1px solid #e53935",
              borderRadius: "3px",
              padding: "2px 6px",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "11px",
              color: "#e53935",
            }}
          >
            {"★ " + rating}
          </div>
        </div>

        <div style={{ padding: "10px 12px 12px" }}>
          <p
            className="font-title"
            style={{
              fontSize: "15px",
              color: "#e0e0e0",
              marginBottom: "4px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {movie.title}
          </p>
          <p className="font-mono" style={{ fontSize: "11px", color: "#757575" }}>
            {year}
          </p>
        </div>
      </div>
    </Link>
  );
}
