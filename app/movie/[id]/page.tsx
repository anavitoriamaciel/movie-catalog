import Image from "next/image";
import { getMovieDetails, BACKDROP_BASE_URL, IMAGE_BASE_URL } from "@/lib/tmdb";
import StarRating from "@/components/StarRating";
import AddToListButton from "@/components/AddToListButton";
import FavoriteButton from "@/components/FavoriteButton";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  const year = movie.release_date?.split("-")[0] ?? "—";
  const runtime = movie.runtime
    ? String(Math.floor(movie.runtime / 60)) + "h " + String(movie.runtime % 60) + "min"
    : "—";
  const genreNames = movie.genres?.map((g: { name: string }) => g.name).join(", ") ?? "—";

  const movieData = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };

  return (
    <div>
      {movie.backdrop_path && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "360px",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "40px",
          }}
        >
          <Image
            src={BACKDROP_BASE_URL + movie.backdrop_path}
            alt={movie.title}
            fill
            style={{ objectFit: "cover", opacity: 0.4 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #0a0a0a 0%, transparent 60%)",
            }}
          />
        </div>
      )}

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div
          style={{
            flexShrink: 0,
            width: "200px",
            borderRadius: "4px",
            overflow: "hidden",
            border: "1px solid #2a2a2a",
            position: "relative",
            aspectRatio: "2/3",
          }}
        >
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
              }}
            >
              SEM IMAGEM
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h1 className="font-title" style={{ fontSize: "42px", color: "#e0e0e0", lineHeight: 1.1 }}>
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="font-mono" style={{ color: "#e53935", fontSize: "12px", marginTop: "6px" }}>
                {'"'}{movie.tagline}{'"'}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "ANO", value: year },
              { label: "DURACAO", value: runtime },
              { label: "NOTA TMDB", value: "★ " + (movie.vote_average?.toFixed(1) ?? "—") },
              { label: "GENEROS", value: genreNames },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono" style={{ fontSize: "10px", color: "#757575", marginBottom: "2px" }}>
                  {item.label}
                </p>
                <p className="font-mono" style={{ fontSize: "13px", color: "#e0e0e0" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {movie.overview && (
            <div>
              <p className="font-mono" style={{ fontSize: "10px", color: "#757575", marginBottom: "6px" }}>
                SINOPSE
              </p>
              <p style={{ color: "#bdbdbd", fontSize: "14px", lineHeight: 1.7 }}>
                {movie.overview}
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "flex-start",
              paddingTop: "8px",
              borderTop: "1px solid #2a2a2a",
            }}
          >
            <FavoriteButton movie={movieData} />
            <AddToListButton movie={movieData} />
          </div>

          <StarRating movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}
