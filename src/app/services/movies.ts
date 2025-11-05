import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaMDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly featureUrl =
    'https://api.themoviedb.org/3/discover/movie?api_key=330e7ee291e8aad106cba45b53ca3838&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22';

  constructor(private http: HttpClient) {}

  getFeature(): Observable<RespuestaMDB> {
    return this.http.get<RespuestaMDB>(this.featureUrl);
  }
}
