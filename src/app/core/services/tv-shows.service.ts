import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TvShow, TvShowDetails } from '../models/tv-show.model';
import { HttpClient } from '@angular/common/http';
import { globalConfig } from '../../../config/global-config';


@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  search = 'search/tv';
  topRated = 'tv/top_rated';
  details = 'tv';

  private http = inject(HttpClient);

  //todo: check types
  getTop10TvShows(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${globalConfig.apiUrl}/${this.topRated}`).pipe(
      map((data: any) => data.results.slice(0, 10)));
  }

  getTvShowDetailsById(id: number): Observable<TvShowDetails> {
    return this.http.get<TvShowDetails>(`${globalConfig.apiUrl}/${this.details}/${id}`);
  }

  searchTvShow(searchTerm: string): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${globalConfig.apiUrl}/${this.search}`, { params: {query: searchTerm}}).pipe(
      map((data: any) => data.results)
    )
  }
}
