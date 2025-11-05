import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Tab1Page } from './tab1.page';
import { ImagenPipe } from '../pipes/imagen-pipe';
import { SlideshowBackdropComponent } from '../components/slideshow-backdrop/slideshow-backdrop.component';
import { SlideshowPosterComponent } from '../components/slideshow-poster/slideshow-poster.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  declarations: [Tab1Page],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ImagenPipe,
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
  ],
})
export class Tab1PageModule {}
