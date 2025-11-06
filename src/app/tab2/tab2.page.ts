import { Component } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  textoBuscar = '';
  ideas: string[] = [
    'Spiderman',
    'Avengers: Endgame',
    'El senor de los anillos',
    'Matrix',
    'Interestelar',
    'Jurassic Park',
    'Toy Story',
    'Harry Potter',
    'El padrino',
    'Avatar',
    'Black Panther',
    'Guardianes de la galaxia',
    'Inception',
    'Batman: El caballero de la noche',
    'Coco',
  ];

  constructor() {}

  buscar(evento: SearchbarCustomEvent): void {
    this.textoBuscar = evento.detail.value ?? '';
    console.log('Buscando:', this.textoBuscar);
  }
}
