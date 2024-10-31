import { Component, DestroyRef, inject } from '@angular/core';
import { CardComponent } from '../shared/components/card/card.component';
import { TvShowsService } from '../core/services/tv-shows.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataStore } from '../core/store/data.store';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { TvShow } from '../core/models/tv-show.model';
import { tvShowDetailsFields, tvShowOverviewFields } from './tv-shows-fields.const';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss'
})
export class TvShowsComponent {
  readonly IMG_URL = environment.apiImageUrl;
  readonly tvShowOverviewFields = tvShowOverviewFields;
  
  private tvShowsService = inject(TvShowsService);
  private dialog = inject(MatDialog);
  private dataStore = inject(DataStore)
  private destroyRef$ = inject(DestroyRef);
  
  tvShows$: Observable<TvShow[]> = this.dataStore.searchTerm$.pipe(
    catchError((error) => {
      console.log('error on searchTerm stream! ', error)
      return ''
    }),
    switchMap((value) => {
      if (!value) return this.tvShowsService.getTop10TvShows();

      if (value && value.length >= environment.searchMinChars) return this.tvShowsService.searchTvShow(value);

      return this.tvShows$;
    })
  );

  openTvShowDetailsDialog(id: number): void {
    this.tvShowsService.getTvShowDetailsById(id)
    .pipe(takeUntilDestroyed(this.destroyRef$))
    .subscribe({
      next: (tvShowDetailsData) => {
        this.dialog.open(DialogComponent, {
          data: {
            name: tvShowDetailsData.name,
            originalName: tvShowDetailsData.original_name,
            overview: tvShowDetailsData.overview,
            additionalInfo: {
              fields: tvShowDetailsFields,
              data: tvShowDetailsData
            }
          }
        });
      },
      error: (error) => { console.log(error) }
    })
  }
}
