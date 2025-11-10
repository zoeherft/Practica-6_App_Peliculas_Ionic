import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { FavoritesService, FavoriteMovie } from '../services/favorites';
import { MoviesService } from '../services/movies';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FavoritesPage implements OnInit {
  favoritesByGenre: Map<string, FavoriteMovie[]> = new Map();
  genres: string[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.favoritesService.favorites$.subscribe(() => {
      this.loadFavorites();
    });
  }

  loadFavorites() {
    this.favoritesByGenre = this.favoritesService.getFavoritesByGenre();
    this.genres = Array.from(this.favoritesByGenre.keys());
  }

  getImageUrl(path: string): string {
    return this.moviesService.getImageUrl(path);
  }

  openMovie(id: number) {
    this.router.navigate(['/movie-detail', id]);
  }

  get hasFavorites(): boolean {
    return this.genres.length > 0;
  }
}
