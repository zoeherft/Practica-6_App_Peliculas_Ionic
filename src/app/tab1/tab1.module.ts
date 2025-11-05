import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Tab1Page } from './tab1.page';
import { SlideshowBackdropComponent } from '../components/slideshow-backdrop/slideshow-backdrop.component';
import { SlideshowPosterComponent } from '../components/slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from '../components/slideshow-pares/slideshow-pares.component';

@NgModule({
  declarations: [Tab1Page],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
  ],
})
export class Tab1PageModule {}
