import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatCard, MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-carousel',
    imports: [MatIcon, NgClass, MatCard, MatCardImage],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  @Input() carouselItems: { movie_id: number; title: string; poster_url: string }[];

  @Output() cardClicked = new EventEmitter<number>();

  showArrows = false;
  isSmallScreen = false;

  ngAfterViewInit() {
    this.checkOverflow();
  }

  @HostListener('window:resize')
  checkOverflow() {
    if (this.carousel) {
      const containerWidth = this.carousel.nativeElement.clientWidth;
      const contentWidth = this.carousel.nativeElement.scrollWidth;
      this.showArrows = contentWidth > containerWidth;
      this.isSmallScreen = window.innerWidth <= 768; // Adjust threshold as needed
    }
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -250, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 250, behavior: 'smooth' });
  }

  onCardClick(movieId: number) {
    this.cardClicked.emit(movieId);
  }
}
