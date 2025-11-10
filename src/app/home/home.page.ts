import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonIcon,
} from '@ionic/angular/standalone';
import { MoviesService } from '../services/movies';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonIcon,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  nuevas: any[] = [];
  cartelera: any[] = [];
  populares: any[] = [];

  currentPopularPage = 1;
  totalPopularPages = 1;
  loadingMore = false;
  hasMorePopular = true;

  constructor(private moviesService: MoviesService, private router: Router) {
    addIcons({ addCircleOutline });
  }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getUpcoming().subscribe((res) => {
      this.nuevas = res.results.slice(0, 10);
    });

    this.moviesService.getNowPlaying().subscribe((res) => {
      this.cartelera = res.results.slice(0, 10);
    });

    this.loadPopularMovies();
  }

  loadPopularMovies() {
    this.moviesService.getPopular(this.currentPopularPage).subscribe((res) => {
      this.populares = [...this.populares, ...res.results];
      this.totalPopularPages = res.total_pages;
      this.hasMorePopular = this.currentPopularPage < this.totalPopularPages;
      this.loadingMore = false;
    });
  }

  getPopularColumns(): any[][] {
    const itemsWithLoadMore = [...this.populares];

    // Agregar el botón de cargar más si hay más páginas
    if (this.hasMorePopular) {
      itemsWithLoadMore.push({ isLoadMore: true });
    }

    // Dividir en columnas de 4 elementos cada una
    const columns: any[][] = [];
    const itemsPerColumn = 4;

    for (let i = 0; i < itemsWithLoadMore.length; i += itemsPerColumn) {
      columns.push(itemsWithLoadMore.slice(i, i + itemsPerColumn));
    }

    return columns;
  }

  loadMorePopular() {
    if (this.loadingMore || !this.hasMorePopular) {
      return;
    }

    this.loadingMore = true;
    this.currentPopularPage++;

    this.moviesService.getPopular(this.currentPopularPage).subscribe({
      next: (res) => {
        this.hasMorePopular = this.currentPopularPage < res.total_pages;
        this.populares = [...this.populares, ...res.results];
        this.loadingMore = false;
      },
      error: (err) => {
        console.error('Error al cargar más películas populares:', err);
        this.loadingMore = false;
        this.currentPopularPage--;
      },
    });
  }

  getImageUrl(path: string): string {
    return this.moviesService.getImageUrl(path);
  }

  getBackdropUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/w780${path}` : 'assets/no-image.png';
  }

  openMovie(id: number) {
    this.router.navigate(['/movie-detail', id]);
  }
}
