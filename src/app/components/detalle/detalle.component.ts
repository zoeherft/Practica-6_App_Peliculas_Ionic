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
import { ModalController, NavController } from '@ionic/angular';
import { ImagenPipe } from '../../pipes/imagen-pipe';
import { Cast, PeliculaDetalle } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies';
import { Router } from '@angular/router';
import { DataLocalService } from '../../services/data-local.service';

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
  oculto = 280;
  mostrarOverviewCompleto = false;
  private navCtrl = inject(NavController);

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) {}

  ngOnInit(): void {
    if (this.id == null) {
      return;
    }

    this.moviesService.getPeliculaDetalle(String(this.id)).subscribe((resp) => {
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula(String(this.id)).subscribe((resp) => {
      this.actores = resp.cast ?? [];
    });
  }

  verMas(): void {
    this.mostrarOverviewCompleto = true;
  }

  async regresar(): Promise<void> {
    await this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  favorito(): void {
    if (!this.pelicula) {
      return;
    }

    this.dataLocal.guardarPelicula(this.pelicula);
  }

  cerrar(): void {
    this.modalCtrl.dismiss();
  }
}





