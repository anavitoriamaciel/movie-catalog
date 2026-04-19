"use client";

import { useMoviesStore } from "@/store/moviesStore";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function FavoriteButton({ movie }: { movie: Movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useMoviesStore();
  const favorite = isFavorite(movie.id);

  function toggle() {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <button
      onClick={toggle}
      style={{
        backgroundColor: favorite ? "#e53935" : "transparent",
        border: "1px solid #e53935",
        borderRadius: "4px",
        padding: "10px 20px",
        color: favorite ? "#fff" : "#e53935",
        fontFamily: "'Bebas Neue', cursive",
        fontSize: "16px",
        letterSpacing: "1px",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e53935";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = favorite ? "#e53935" : "transparent";
        e.currentTarget.style.color = favorite ? "#fff" : "#e53935";
      }}
    >
      {favorite ? "❤ FAVORITADO" : "♡ FAVORITAR"}
    </button>
  );
}
