import {
  getTrendingMovies,
  searchMovies,
  getGenres,
  getMoviesByGenre,
} from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{ search?: string; genre?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchQuery = params.search ?? "";
  const genreId = params.genre ?? "";

  const genres = await getGenres();

  let movies = [];
  let pageTitle = "EM ALTA ESSA SEMANA";

  if (searchQuery) {
    movies = await searchMovies(searchQuery);
    pageTitle = "RESULTADOS PARA: " + searchQuery.toUpperCase();
  } else if (genreId) {
    movies = await getMoviesByGenre(Number(genreId));
    const found = genres.find((g: { id: number }) => g.id === Number(genreId));
    pageTitle = "GENERO: " + (found?.name?.toUpperCase() ?? "");
  } else {
    movies = await getTrendingMovies();
  }

  const todosBorder =
    !genreId && !searchQuery ? "1px solid #e53935" : "1px solid #2a2a2a";
  const todosColor = !genreId && !searchQuery ? "#e53935" : "#757575";

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <div>
          <h1
            className="font-title glow"
            style={{ fontSize: "48px", color: "#e53935" }}
          >
            FRAME
          </h1>
          <p
            className="font-mono"
            style={{ color: "#757575", fontSize: "12px", marginTop: "4px" }}
          >
            SEU CATALOGO PESSOAL DE FILMES
          </p>
        </div>

        <SearchBar />

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "11px",
              padding: "4px 12px",
              borderRadius: "3px",
              border: todosBorder,
              color: todosColor,
              textDecoration: "none",
            }}
          >
            TODOS
          </Link>

          {genres.map((g: { id: number; name: string }) => {
            const isActive = Number(genreId) === g.id;
            const borderColor = isActive
              ? "1px solid #e53935"
              : "1px solid #2a2a2a";
            const textColor = isActive ? "#e53935" : "#757575";
            return (
              <Link
                key={g.id}
                href={"/?genre=" + String(g.id)}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "11px",
                  padding: "4px 12px",
                  borderRadius: "3px",
                  border: borderColor,
                  color: textColor,
                  textDecoration: "none",
                }}
              >
                {g.name.toUpperCase()}
              </Link>
            );
          })}
        </div>
      </div>

      <h2
        className="font-title"
        style={{
          fontSize: "22px",
          color: "#e0e0e0",
          marginBottom: "24px",
          borderLeft: "3px solid #e53935",
          paddingLeft: "12px",
        }}
      >
        {pageTitle}
      </h2>

      {movies.length === 0 ? (
        <p className="font-mono" style={{ color: "#757575", fontSize: "13px" }}>
          NENHUM FILME ENCONTRADO.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "20px",
          }}
        >
          {movies.map(
            (movie: {
              id: number;
              title: string;
              poster_path: string;
              release_date: string;
              vote_average: number;
            }) => (
              <MovieCard key={movie.id} movie={movie} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
