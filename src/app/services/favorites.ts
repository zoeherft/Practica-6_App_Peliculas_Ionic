import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: { id: number; name: string }[];
  addedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'favoriteMovies';
  private _storage: Storage | null = null;

  private _favorites$ = new BehaviorSubject<FavoriteMovie[]>([]);
  public favorites$ = this._favorites$.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadFavorites();
  }

  private async loadFavorites(): Promise<void> {
    if (!this._storage) return;
    const favorites = (await this._storage.get(this.storageKey)) || [];
    this._favorites$.next(favorites);
  }

  async addToFavorites(movie: any): Promise<void> {
    if (!this._storage) return;

    const favorites = await this.getFavorites();

    const favoriteMovie: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      genres: movie.genres || [],
      addedAt: new Date(),
    };

    const existingIndex = favorites.findIndex((fav) => fav.id === movie.id);
    if (existingIndex >= 0) {
      favorites[existingIndex] = favoriteMovie;
    } else {
      favorites.push(favoriteMovie);
    }

    await this._storage.set(this.storageKey, favorites);
    this._favorites$.next(favorites);
  }

  async removeFromFavorites(movieId: number): Promise<void> {
    if (!this._storage) return;

    const favorites = await this.getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);

    await this._storage.set(this.storageKey, updatedFavorites);
    this._favorites$.next(updatedFavorites);
  }

  async getFavorites(): Promise<FavoriteMovie[]> {
    if (!this._storage) return [];
    return (await this._storage.get(this.storageKey)) || [];
  }

  getFavoritesByGenre(): Map<string, FavoriteMovie[]> {
    const currentFavorites = this._favorites$.value;
    const genreMap = new Map<string, FavoriteMovie[]>();

    currentFavorites.forEach((movie) => {
      if (movie.genres && movie.genres.length > 0) {
        movie.genres.forEach((genre) => {
          if (!genreMap.has(genre.name)) {
            genreMap.set(genre.name, []);
          }
          const genreMovies = genreMap.get(genre.name)!;
          if (!genreMovies.find((m) => m.id === movie.id)) {
            genreMovies.push(movie);
          }
        });
      }
    });

    return genreMap;
  }

  isFavorite(movieId: number): boolean {
    return this._favorites$.value.some((fav) => fav.id === movieId);
  }
}
