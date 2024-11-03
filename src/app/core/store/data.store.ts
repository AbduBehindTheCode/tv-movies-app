import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStore {
  private _searchTerm = new BehaviorSubject<string>('');
  readonly searchTerm$ = this._searchTerm.asObservable();

  updateSearchTerm(value: string): void {
    this._searchTerm.next(value);
  }
}
