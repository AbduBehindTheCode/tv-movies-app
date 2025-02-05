import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { DataStore } from '../core/store/data.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    RouterLinkActive,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  search = new FormControl('');
  tabs = [
    {
      label: 'Tv-Shows',
      link: 'tv-shows',
    },
    {
      label: 'Movies',
      link: 'movies',
    },
  ];

  private dataStore = inject(DataStore);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: searchTerm => {
          this.dataStore.updateSearchTerm(searchTerm ?? '');
        },
        error: error => {
          console.error(error);
        },
      });
  }
}
