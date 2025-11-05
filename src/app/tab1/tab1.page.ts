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
      console.log('Resp', resp);
      this.peliculasRecientes = resp.results;
    });
    this.moviesService.getPopulares().subscribe((resp: RespuestaMDB) => {
      console.log('Populares', resp);
      this.populares = resp.results;
    });
  }

}
