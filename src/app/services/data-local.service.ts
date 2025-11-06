import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {}

  async guardarPelicula(pelicula: PeliculaDetalle): Promise<void> {
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregado a favoritos';
    }

    await this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);
  }

  private async presentToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });

    await toast.present();
  }
}
