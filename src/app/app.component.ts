import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is("android"))
        this.statusBar.styleLightContent()
      else
        this.statusBar.styleDefault();

      this.splashScreen.hide();
      if (localStorage.getItem('isLoggedIn') == 'true') {
        this.afAuth.onAuthStateChanged(user => {
          if (user == null)
            this.router.navigateByUrl('/login', { replaceUrl: true, skipLocationChange: true })
          else
            this.router.navigateByUrl('/tabs/tab1', { skipLocationChange: true, replaceUrl: true })
        })
      }
      else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
