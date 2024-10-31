import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TvShow, TvShowDetails } from '../models/tv-show.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  search = 'search/tv';
  topRated = 'tv/top_rated';
  details = 'tv';

  private http = inject(HttpClient);

  getTop10TvShows(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${environment.apiUrl}/${this.topRated}`).pipe(
      map((data: any) => data.results.slice(0, 10)));
  }

  getTvShowDetailsById(id: number): Observable<TvShowDetails> {
    return this.http.get<TvShowDetails>(`${environment.apiUrl}/${this.details}/${id}`);
  }

  searchTvShow(searchTerm: string): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${environment.apiUrl}/${this.search}`, { params: {query: searchTerm}}).pipe(
      map((data: any) => data.results)
    )
  }
}
