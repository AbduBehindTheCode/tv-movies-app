import { Component, DestroyRef, inject } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { globalConfig } from '../../config/global-config';
import { CardComponent } from '../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataStore } from '../core/store/data.store';
import { Observable, switchMap } from 'rxjs';
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
  readonly imgUrl = globalConfig.apiImageUrl;
  readonly movieOverviewFields = movieOverviewFields;

  private moviesService = inject(MoviesService);
  private dialog = inject(MatDialog);
  private dataStore = inject(DataStore)
  private destroyRef$ = inject(DestroyRef);
  
  movies$: Observable<Movie[]> = this.dataStore.searchTerm$.pipe(
    switchMap((value) => {
      if(!value) return this.moviesService.getTop10Movies();

      if (value && value.length >= globalConfig.searchMinChars) return this.moviesService.searchMovie(value);

      return this.movies$;
    })
  );
  
  openMovieDetailsDialog(id: number): void {
    this.moviesService.getMovieDetailsById(id)
    .pipe(takeUntilDestroyed(this.destroyRef$))
    .subscribe(movieDetails => {
      this.dialog.open(DialogComponent, {
        data: {
          name: movieDetails.title,
          originalName: movieDetails.original_title,
          overview: movieDetails.overview,
          additionalInfo: {
            fields: movieDetailsFields,
            data: movieDetails
          }
        }
      })
    })
    
  }
}
