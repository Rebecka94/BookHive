import { create } from "zustand";

export type FavoriteBook = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
};

type FavoritesStore = {
  favorites: Record<string, FavoriteBook>;
  setFavorites: (books: FavoriteBook[]) => void;
  toggleFavorite: (book: FavoriteBook) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: {},

  setFavorites: (books) => {
    const map = Object.fromEntries(books.map((b) => [b.id, b]));
    set({ favorites: map });
  },

  toggleFavorite: (book) => {
    const { favorites } = get();

    if (favorites[book.id]) {
      const { [book.id]: _, ...rest } = favorites;
      set({ favorites: rest });
    } else {
      set({
        favorites: {
          ...favorites,
          [book.id]: book,
        },
      });
    }
  },

  isFavorite: (id) => Boolean(get().favorites[id]),
}));
