import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies';
import { FavoritesService } from '../services/favorites';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  star,
  starOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon],
})
export class MovieDetailPage implements OnInit {
  movie: any;
  cast: any[] = [];
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private favoritesService: FavoritesService
  ) {
    addIcons({ arrowBack, star, starOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moviesService.getMovieDetails(Number(id)).subscribe((res) => {
        this.movie = res;
        this.checkIfFavorite();
      });

      this.moviesService.getMovieCredits(Number(id)).subscribe((res) => {
        this.cast = res.cast.slice(0, 10);
      });
    }
  }

  checkIfFavorite() {
    if (this.movie) {
      this.isFavorite = this.favoritesService.isFavorite(this.movie.id);
    }
  }

  getImageUrl(path: string): string {
    return this.moviesService.getImageUrl(path);
  }

  getBackdropUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/original${path}` : '';
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.favoritesService.removeFromFavorites(this.movie.id);
      this.isFavorite = false;
    } else {
      await this.favoritesService.addToFavorites(this.movie);
      this.isFavorite = true;
    }
  }
}
