import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, inject } from '@angular/core';
import {
  IonButtons,
  IonCard,
  IonButton,
  IonContent,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonTitle,
  IonToolbar,
  IonChip,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { ImagenPipe } from '../../pipes/imagen-pipe';
import { Cast, PeliculaDetalle } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonCard,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonNote,
    IonChip,
    ImagenPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetalleComponent implements OnInit {
  @Input() id?: number;
  pelicula?: PeliculaDetalle;
  actores: Cast[] = [];
  oculto = 150;
  mostrarOverviewCompleto = false;
  private router = inject(Router);

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) {}

  ngOnInit(): void {
    if (this.id == null) {
      return;
    }

    this.moviesService.getPeliculaDetalle(String(this.id)).subscribe((resp) => {
      console.log('DetalleComponent detalle', resp);
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula(String(this.id)).subscribe((resp) => {
      console.log('DetalleComponent actores', resp);
      this.actores = resp.cast ?? [];
    });
  }

  verMas(): void {
    this.mostrarOverviewCompleto = true;
  }

  async regresar(): Promise<void> {
    await this.modalCtrl.dismiss();
    await this.router.navigateByUrl('/tabs/tab1');
  }

  favorito(): void {
    console.log('favorito: ', this.pelicula?.id);
  }

  cerrar(): void {
    this.modalCtrl.dismiss();
  }
}



