import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { ImagenPipe } from '../../pipes/imagen-pipe';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonCard, IonCardContent, IonIcon, ImagenPipe],
})
export class SlideshowParesComponent {
  @Input() peliculas: Pelicula[] = [];
  @Output() verMas = new EventEmitter<void>();

  constructor(private modalCtrl: ModalController) {}

  get pares(): Pelicula[][] {
    const resultado: Pelicula[][] = [];
    for (let i = 0; i < this.peliculas.length; i += 2) {
      resultado.push(this.peliculas.slice(i, i + 2));
    }
    return resultado;
  }

  async verDetalle(id: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id },
    });

    await modal.present();
  }

  onClick(): void {
    this.verMas.emit();
  }
}
