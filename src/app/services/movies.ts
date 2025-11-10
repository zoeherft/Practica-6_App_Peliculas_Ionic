import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
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
