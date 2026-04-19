import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MoviesStore {
  favorites: Movie[];
  watchlist: Movie[];
  watched: Movie[];
  ratings: Record<number, number>;

  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;

  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;

  addToWatched: (movie: Movie) => void;
  removeFromWatched: (id: number) => void;
  isWatched: (id: number) => boolean;

  setRating: (id: number, rating: number) => void;
  getRating: (id: number) => number;
}

export const useMoviesStore = create<MoviesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      watched: [],
      ratings: {},

      addFavorite: (movie) => set((state) => ({ favorites: [...state.favorites, movie] })),
      removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((m) => m.id !== id) })),
      isFavorite: (id) => get().favorites.some((m) => m.id === id),

      addToWatchlist: (movie) => set((state) => ({ watchlist: [...state.watchlist, movie] })),
      removeFromWatchlist: (id) => set((state) => ({ watchlist: state.watchlist.filter((m) => m.id !== id) })),
      isInWatchlist: (id) => get().watchlist.some((m) => m.id === id),

      addToWatched: (movie) => set((state) => ({ watched: [...state.watched, movie] })),
      removeFromWatched: (id) => set((state) => ({ watched: state.watched.filter((m) => m.id !== id) })),
      isWatched: (id) => get().watched.some((m) => m.id === id),

      setRating: (id, rating) => set((state) => ({ ratings: { ...state.ratings, [id]: rating } })),
      getRating: (id) => get().ratings[id] ?? 0,
    }),
    { name: "movies-storage" }
  )
);
