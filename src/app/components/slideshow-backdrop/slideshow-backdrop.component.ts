import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { ImagenPipe } from '../../pipes/imagen-pipe';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent, IonIcon, ImagenPipe],
})
export class SlideshowBackdropComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() peliculas: Pelicula[] = [];
  @ViewChild('slidesContainer') private slidesContainer?: ElementRef<HTMLDivElement>;

  canScrollPrev = false;
  canScrollNext = false;
  private scrollFrame = 0;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {}

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

  async verDetalle(id: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id },
    });

    await modal.present();
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
