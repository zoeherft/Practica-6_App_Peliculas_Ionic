import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula, RespuestaMDB, PeliculaDetalle, Credits as RespuestaCredits } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
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

