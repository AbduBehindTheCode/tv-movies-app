import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movie, MovieDetails } from '../models/movie.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  search = 'search/movie';
  topRated = 'movie/top_rated';
  details = 'movie';

  private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  getTop10Movies(): Observable<Movie[]> {
    const url = environment.apiUrl + '/' + this.topRated;
    return this.cacheService
      .cacheObservable<Movie[]>(url, this.http.get<Movie[]>(url))
      .pipe(map((data: any) => data.results.slice(0, 10)));
  }

  getMovieDetailsById(id: number): Observable<MovieDetails> {
    const url = environment.apiUrl + '/' + this.details + '/' + id;
    return this.cacheService.cacheObservable<MovieDetails>(url, this.http.get<MovieDetails>(url));
  }

  searchMovie(searchTerm: string): Observable<Movie[]> {
    const url = environment.apiUrl + '/' + this.search;
    const cacheKey = url + '_' + searchTerm;

    return this.cacheService
      .cacheObservable<Movie[]>(cacheKey, this.http.get<Movie[]>(url, { params: { query: searchTerm } }))
      .pipe(map((data: any) => data.results));
  }
}
