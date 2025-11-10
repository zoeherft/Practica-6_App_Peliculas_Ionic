import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { film, search, star } from 'ionicons/icons';
>>>>>>> upstream/main

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
<<<<<<< HEAD
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}
=======
  standalone: true,
  imports: [IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class AppComponent {
  constructor() {
    addIcons({ film, search, star });
  }
>>>>>>> upstream/main
}
