import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonButtons,
  IonButton,
  IonCard,
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
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { ImagenPipe } from '../../pipes/imagen-pipe';
import { PeliculaDetalle } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies';

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
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonItem,
    IonLabel,
    IonNote,
    ImagenPipe,
  ],
})
export class DetalleComponent implements OnInit {
  @Input() id?: number;
  pelicula?: PeliculaDetalle;

  constructor(private modalCtrl: ModalController, private moviesService: MoviesService) {}

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
    });
  }

  cerrar(): void {
    this.modalCtrl.dismiss();
  }
}
