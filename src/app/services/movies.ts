<<<<<<< HEAD
﻿import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula, RespuestaMDB, PeliculaDetalle, Credits as RespuestaCredits } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
=======
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
>>>>>>> upstream/main

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
<<<<<<< HEAD
  private popularesPage = 0;

  constructor(private http: HttpClient) {}

  private ejecutarQuery<T>(query: string): Observable<T> {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getFeature(): Observable<RespuestaMDB> {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    const mesString = mes < 10 ? `0${mes}` : `${mes}`;

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(
      `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`
    );
  }

  resetPopulares(): void {
    this.popularesPage = 0;
  }

  getPopulares(): Observable<RespuestaMDB> {
    this.popularesPage += 1;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id: string): Observable<PeliculaDetalle> {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string): Observable<RespuestaCredits> {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas(texto: string): Observable<RespuestaMDB> {
    if (!texto?.trim()) {
      return this.ejecutarQuery<RespuestaMDB>('/search/movie?query=');
    }
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
  }
}

=======
  private apiKey = 'c394f684f1e4b06867c8429e413c0358';
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient) {}

  getPopular(page: number = 1): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-MX&page=${page}`
    );
  }

  getNowPlaying(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=es-MX`
    );
  }

  getUpcoming(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&language=es-MX`
    );
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=es-MX&query=${query}`
    );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=es-MX`
    );
  }

  getImageUrl(path: string): string {
    return this.imageUrl + path;
  }

  getMovieCredits(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=es-MX`
    );
  }
}
>>>>>>> upstream/main
