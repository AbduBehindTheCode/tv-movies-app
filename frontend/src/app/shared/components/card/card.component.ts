import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input({ required: true }) name: string;
  @Input() originalName: string;
  @Input({ required: true }) posterPath: string;
  @Input({ required: true }) overview: string;
  @Input({ required: true }) voteCount: number;
  @Input({ required: true }) voteAverage: number;
  @Input() additionalInfo: { fields: any; data: any };

  @Output() cardClicked = new EventEmitter<void>();

  onCardClick() {
    this.cardClicked.emit();
  }
}
