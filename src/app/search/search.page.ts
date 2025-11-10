import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonItem, IonLabel,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { MoviesService } from '../services/movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonList, IonItem, IonLabel,
    IonGrid, IonRow, IonCol
  ]
})
export class SearchPage {
  searchQuery = '';
  movies: any[] = [];
  ideas = [
    'Spiderman', 'Avengers: Endgame', 'El señor de los anillos',
    'Matrix', 'Interestelar', 'Jurassic Park', 'Toy Story',
    'Harry Potter', 'El padrino', 'Avatar', 'Black Panther',
    'Guardianes de la galaxia', 'Inception', 'Batman: El caballero de la noche', 'Coco'
  ];

  constructor(
    public moviesService: MoviesService,
    private router: Router
  ) {}

  onSearchChange(event: any) {
    const query = event.detail.value;
    if (query && query.length > 2) {
      this.moviesService.searchMovies(query).subscribe(res => {
        this.movies = res.results;
      });
    } else {
      this.movies = [];
    }
  }

  searchIdea(idea: string) {
    this.searchQuery = idea;
    this.moviesService.searchMovies(idea).subscribe(res => {
      this.movies = res.results;
    });
  }

  openMovie(id: number) {
    this.router.navigate(['/movie-detail', id]);
  }
}
