import { Component, OnInit } from '@angular/core';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getFeature().subscribe((resp: RespuestaMDB) => {
      this.peliculasRecientes = resp.results;
    });

    this.moviesService.resetPopulares();
    this.populares = [];
    this.cargarMas();
  }

  cargarMas(): void {
    this.getPopulares();
  }

  private getPopulares(): void {
    this.moviesService.getPopulares().subscribe((resp: RespuestaMDB) => {
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    });
  }
}
