import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MoviesComponent } from './movies/movies.component';
import { configGlobal } from '../config/config.global';

export const routes: Routes = [
  { path: '', redirectTo: configGlobal.defaultSelectedTab, pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'tv-shows',
        component: TvShowsComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
    ],
  },
  { path: '**', redirectTo: configGlobal.defaultSelectedTab },
];
