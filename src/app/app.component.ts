import { Component } from '@angular/core';
import { IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { film, search, star } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class AppComponent {
  constructor() {
    addIcons({ film, search, star });
  }
}
