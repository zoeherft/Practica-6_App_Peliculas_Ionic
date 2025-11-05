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
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ImagenPipe],
})
export class SlideshowBackdropComponent implements AfterViewInit, OnChanges {
  @Input() peliculas: Pelicula[] = [];
  @ViewChild('slidesContainer') private slidesContainer?: ElementRef<HTMLDivElement>;

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
    const container = this.slidesContainer?.nativeElement;
    if (!container) {
      return;
    }

    const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
    const atStart = container.scrollLeft <= 1;
    const atEnd = container.scrollLeft >= maxScrollLeft - 1;
    const offset = container.clientWidth * 0.8;

    if (direction === 'next' && atEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction === 'prev' && atStart) {
      container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }

    container.scrollBy({
      left: direction === 'next' ? offset : -offset,
      behavior: 'smooth',
    });
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
    const container = this.slidesContainer?.nativeElement;
    const canScroll =
      !!container &&
      container.scrollWidth > container.clientWidth &&
      (this.peliculas?.length ?? 0) > 1;

    this.canScrollPrev = canScroll;
    this.canScrollNext = canScroll;
  }
}
