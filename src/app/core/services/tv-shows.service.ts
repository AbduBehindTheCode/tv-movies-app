import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TvShow, TvShowDetails } from '../models/tv-show.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  search = 'search/tv';
  topRated = 'tv/top_rated';
  details = 'tv';

  private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  getTop10TvShows(): Observable<TvShow[]> {
    const url = environment.apiUrl + '/' + this.topRated;
    return this.cacheService
      .cacheObservable<TvShow[]>(url, this.http.get<TvShow[]>(url))
      .pipe(map((data: any) => data.results.slice(0, 10)));
  }

  getTvShowDetailsById(id: number): Observable<TvShowDetails> {
    const url = environment.apiUrl + '/' + this.details + '/' + id;
    return this.cacheService.cacheObservable<TvShowDetails>(url, this.http.get<TvShowDetails>(url));
  }

  searchTvShow(searchTerm: string): Observable<TvShow[]> {
    const url = environment.apiUrl + '/' + this.search;
    const cacheKey = url + '_' + searchTerm;

    return this.cacheService
      .cacheObservable<TvShow[]>(cacheKey, this.http.get<TvShow[]>(url, { params: { query: searchTerm } }))
      .pipe(map((data: any) => data.results));
  }
}
