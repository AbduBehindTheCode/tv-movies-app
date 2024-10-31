import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tv-shows', pathMatch: 'full' },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'tv-shows',
                component: TvShowsComponent
            },
            {
                path: 'movies',
                component: MoviesComponent
            }
        ]
    },
    { path: '**', redirectTo: 'tv-shows' }
];
