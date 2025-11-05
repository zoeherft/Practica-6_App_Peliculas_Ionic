import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
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
export class SlideshowBackdropComponent implements AfterViewInit {
  @Input() peliculas: Pelicula[] = [];
  @ViewChild('slidesContainer') private slidesContainer?: ElementRef<HTMLDivElement>;

  canScrollPrev = false;
  canScrollNext = false;

  private scrollFrame = 0;

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

    const offset = direction === 'next' ? container.clientWidth : -container.clientWidth;
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
    const container = this.slidesContainer?.nativeElement;
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
