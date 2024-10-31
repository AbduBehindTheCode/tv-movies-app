import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movie, MovieDetails } from '../models/movie.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  search = 'search/movie';
  topRated = 'movie/top_rated';
  details = 'movie';

  private http = inject(HttpClient);

  getTop10Movies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.apiUrl}/${this.topRated}`).pipe(
      map((data: any) => data.results.slice(0, 10)));
  }

  getMovieDetailsById(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${environment.apiUrl}/${this.details}/${id}`);
  }

  searchMovie(searchTerm: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.apiUrl}/${this.search}`, { params: {query: searchTerm}}).pipe(
      map((data: any) => data.results)
    )
  }
}
