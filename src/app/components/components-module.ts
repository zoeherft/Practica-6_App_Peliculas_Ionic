import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
  ],
  exports: [SlideshowBackdropComponent, SlideshowPosterComponent, SlideshowParesComponent],
})
export class ComponentsModule {}
