import { Component, DestroyRef, inject } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { environment } from '../../environments/environment';
import { CardComponent } from '../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataStore } from '../core/store/data.store';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Movie, RecommendedMovie } from '../core/models/movie.model';
import { movieDetailsFields, movieOverviewFields } from './movies-fields.const';
import { configGlobal } from '../../config/config.global';
import { CarouselComponent } from '../shared/components/carousel/carousel.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, CardComponent, CarouselComponent, MatProgressSpinnerModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  readonly LAST_SELECTED_MOVIE_LS_KEY = 'last_selected_movie';
  readonly RECOMMENDED_MOVIES_LS_KEY = 'recommended_movies';
  readonly IMG_URL = environment.apiImageUrl;
  readonly movieOverviewFields = movieOverviewFields;
  readonly recommenderEnabled = configGlobal.recommenderEnabled;

  showRecommender = false;
  recommendedMovies: RecommendedMovie[] = [];

  private moviesService = inject(MoviesService);
  private dialog = inject(MatDialog);
  private dataStore = inject(DataStore);
  private destroyRef$ = inject(DestroyRef);

  movies$: Observable<Movie[]> = this.dataStore.searchTerm$.pipe(
    catchError(error => {
      console.log('error on searchTerm stream! ', error);
      return of('');
    }),
    switchMap(value => {
      if (!value) {
        const lastSelectedMovie = localStorage.getItem(this.LAST_SELECTED_MOVIE_LS_KEY);
        if (this.recommenderEnabled && lastSelectedMovie) {
          this.showRecommender = true;
          this.getRecommendedMovies();
        }

        return this.moviesService.getTop10Movies();
      }

      if (value && value.length >= configGlobal.searchMinChars) {
        this.showRecommender = false;
        return this.moviesService.searchMovie(value);
      }

      return this.movies$;
    })
  );

  getRecommendedMovies(): void {
    const lastSelectedMovie = localStorage.getItem(this.LAST_SELECTED_MOVIE_LS_KEY);
    if (lastSelectedMovie) {
      this.moviesService
        .getMoviesRecommendations(lastSelectedMovie)
        .pipe(
          map((moviesResponse: { error: string } | RecommendedMovie[]) => {
            if ('error' in moviesResponse) {
              const previousRecommendedMovies = localStorage.getItem(this.RECOMMENDED_MOVIES_LS_KEY);
              return previousRecommendedMovies ? JSON.parse(previousRecommendedMovies ?? '') : [];
            }
            localStorage.setItem(this.RECOMMENDED_MOVIES_LS_KEY, JSON.stringify(moviesResponse));

            return moviesResponse;
          }),
          takeUntilDestroyed(this.destroyRef$),
          catchError(error => {
            console.error('Error on fetching recommendation: ', error);
            return of([]);
          })
        )
        .subscribe({
          next: recommendedMovies => {
            this.recommendedMovies = recommendedMovies;
          },
          error: error => {
            console.error(error);
          },
        });
    }
  }

  openMovieDetailsDialog(id: number): void {
    this.moviesService
      .getMovieDetailsById(id)
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
        next: movieDetailsData => {
          localStorage.setItem(this.LAST_SELECTED_MOVIE_LS_KEY, movieDetailsData.title);
          this.dialog.open(DialogComponent, {
            data: {
              name: movieDetailsData.title,
              originalName: movieDetailsData.original_title,
              overview: movieDetailsData.overview,
              additionalInfo: {
                fields: movieDetailsFields,
                data: movieDetailsData,
              },
            },
          });
        },
        error: error => {
          console.log(error);
        },
      });
  }
}
