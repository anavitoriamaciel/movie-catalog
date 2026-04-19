const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + TOKEN,
  "Content-Type": "application/json",
};

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export async function getTrendingMovies() {
  const res = await fetch(BASE_URL + "/trending/movie/week?language=pt-BR", { headers });
  const data = await res.json();
  return data.results;
}

export async function searchMovies(query: string) {
  const res = await fetch(
    BASE_URL + "/search/movie?query=" + encodeURIComponent(query) + "&language=pt-BR",
    { headers }
  );
  const data = await res.json();
  return data.results;
}

export async function getMovieDetails(id: string) {
  const res = await fetch(BASE_URL + "/movie/" + id + "?language=pt-BR", { headers });
  return await res.json();
}

export async function getMoviesByGenre(genreId: number) {
  const res = await fetch(
    BASE_URL + "/discover/movie?with_genres=" + genreId + "&language=pt-BR&sort_by=popularity.desc",
    { headers }
  );
  const data = await res.json();
  return data.results;
}

export async function getGenres() {
  const res = await fetch(BASE_URL + "/genre/movie/list?language=pt-BR", { headers });
  const data = await res.json();
  return data.genres;
}
