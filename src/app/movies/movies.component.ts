import { Component, DestroyRef, inject } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { environment } from '../../environment/environment';
import { CardComponent } from '../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataStore } from '../core/store/data.store';
import { catchError, Observable, switchMap } from 'rxjs';
import { Movie } from '../core/models/movie.model';
import { movieDetailsFields, movieOverviewFields } from './movies-fields.const';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  readonly IMG_URL = environment.apiImageUrl;
  readonly movieOverviewFields = movieOverviewFields;

  private moviesService = inject(MoviesService);
  private dialog = inject(MatDialog);
  private dataStore = inject(DataStore)
  private destroyRef$ = inject(DestroyRef);
  
  movies$: Observable<Movie[]> = this.dataStore.searchTerm$.pipe(
    catchError((error) => {
      console.log('error on searchTerm stream! ', error)
      return ''
    }),
    switchMap((value) => {
      if(!value) return this.moviesService.getTop10Movies();

      if (value && value.length >= environment.searchMinChars) return this.moviesService.searchMovie(value);

      return this.movies$;
    })
  );
  
  openMovieDetailsDialog(id: number): void {
    this.moviesService.getMovieDetailsById(id)
    .pipe(takeUntilDestroyed(this.destroyRef$))
    .subscribe({
      next: (movieDetailsData) => {
        this.dialog.open(DialogComponent, {
          data: {
            name: movieDetailsData.title,
            originalName: movieDetailsData.original_title,
            overview: movieDetailsData.overview,
            additionalInfo: {
              fields: movieDetailsFields,
              data: movieDetailsData
            }
          }
        })
      },
      error: (error) => { console.log(error) }
    })
  }
}
