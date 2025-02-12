import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { configGlobal } from '../../../config/config.global';

interface CacheContent {
  expiry: number;
  value: any;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheContent>();

  // Cache and return observable
  cacheObservable<T>(key: string, fallback: Observable<T>, cacheDuration?: number): Observable<T> {
    const cached = this.get<T>(key);
    if (cached) return cached;

    return fallback.pipe(
      tap(value => {
        this.set<T>(key, value, cacheDuration);
      })
    );
  }

  // Get observable from cache
  get<T>(key: string): Observable<T> | undefined {
    const data = this.cache.get(key);
    if (!data) {
      return undefined;
    }

    const now = new Date().getTime();
    if (now > data.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    return of(data.value);
  }

  // Set observable to cache
  set<T>(key: string, value: any, cacheDuration: number = configGlobal.cacheDuration * 60 * 1000): Observable<T> {
    const expiry = new Date().getTime() + cacheDuration;
    this.cache.set(key, { expiry, value });
    return of(value);
  }
}
