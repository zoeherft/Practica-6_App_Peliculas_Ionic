import { Component } from '@angular/core';
import { ModalController, SearchbarCustomEvent } from '@ionic/angular';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = [
    'Spiderman',
    'Avengers: Endgame',
    'El señor de los anillos',
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

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) {}

  buscar(evento: SearchbarCustomEvent): void {
    const valor = evento.detail.value ?? '';
    this.buscarPorTexto(valor);
  }

  buscarIdea(idea: string): void {
    this.buscarPorTexto(idea);
  }

  async detalle(id: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id },
    });

    await modal.present();
  }

  private buscarPorTexto(valor: string): void {
    this.textoBuscar = valor;

    if (!valor.trim()) {
      this.peliculas = [];
      this.buscando = false;
      return;
    }

    this.buscando = true;
    this.peliculas = [];

    this.moviesService.buscarPeliculas(valor).subscribe({
      next: (resp: RespuestaMDB) => {
        this.peliculas = resp.results ?? [];
      },
      error: (error) => {
        console.error('Error al buscar películas', error);
        this.peliculas = [];
        this.buscando = false;
      },
      complete: () => {
        this.buscando = false;
      },
    });
  }
}
