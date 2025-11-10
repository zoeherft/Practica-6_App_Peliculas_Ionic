import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit, OnDestroy {
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];
  cargandoRecientes = false;
  cargandoPopulares = false;

  private readonly destroy$ = new Subject<void>();
  private paginaEnCurso = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.cargarPeliculasRecientes();
    this.resetPopulares();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarMas(): void {
    if (this.paginaEnCurso || this.cargandoPopulares) {
      return;
    }
    this.paginaEnCurso = true;
    this.getPopulares();
  }

  private cargarPeliculasRecientes(): void {
    this.cargandoRecientes = true;
    this.moviesService
      .getFeature()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.cargandoRecientes = false))
      )
      .subscribe({
        next: (resp: RespuestaMDB) => {
          this.peliculasRecientes = resp.results ?? [];
        },
        error: (err) => console.error('Error al cargar estrenos', err),
      });
  }

  private resetPopulares(): void {
    this.moviesService.resetPopulares();
    this.populares = [];
    this.cargandoPopulares = false;
    this.paginaEnCurso = false;
    this.cargarMas();
  }

  private getPopulares(): void {
    this.cargandoPopulares = true;
    this.moviesService
      .getPopulares()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.cargandoPopulares = false;
          this.paginaEnCurso = false;
        })
      )
      .subscribe({
        next: (resp: RespuestaMDB) => {
          this.populares = [...this.populares, ...(resp.results ?? [])];
        },
        error: (err) => console.error('Error al cargar populares', err),
      });
  }
}
