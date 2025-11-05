import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { ImagenPipe } from '../../pipes/imagen-pipe';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ImagenPipe],
})
export class SlideshowPosterComponent implements AfterViewInit, OnChanges {
  @Input() peliculas: Pelicula[] = [];
  @ViewChild('posterContainer') private posterContainer?: ElementRef<HTMLDivElement>;

  canScrollPrev = false;
  canScrollNext = false;
  private scrollFrame = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['peliculas']) {
      queueMicrotask(() => this.updateScrollButtons());
    }
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.updateScrollButtons());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollButtons();
  }

  scroll(direction: 'prev' | 'next'): void {
    const container = this.posterContainer?.nativeElement;
    if (!container) {
      return;
    }

    const offset = direction === 'next' ? container.clientWidth * 0.8 : -container.clientWidth * 0.8;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  }

  onScroll(): void {
    if (this.scrollFrame) {
      cancelAnimationFrame(this.scrollFrame);
    }

    this.scrollFrame = requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.updateScrollButtons();
    });
  }

  private updateScrollButtons(): void {
    const container = this.posterContainer?.nativeElement;
    if (!container) {
      this.canScrollPrev = false;
      this.canScrollNext = false;
      return;
    }

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    this.canScrollPrev = container.scrollLeft > 0;
    this.canScrollNext = container.scrollLeft < maxScrollLeft - 1;
  }
}
