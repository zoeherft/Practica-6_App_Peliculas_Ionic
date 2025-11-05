import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { ImagenPipe } from '../../pipes/imagen-pipe';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ImagenPipe],
})
export class SlideshowParesComponent {
  @Input() peliculas: Pelicula[] = [];
  @Input() small = false;

  get pares(): Pelicula[][] {
    const resultado: Pelicula[][] = [];
    for (let index = 0; index < this.peliculas.length; index += 2) {
      resultado.push(this.peliculas.slice(index, index + 2));
    }
    return resultado;
  }
}
