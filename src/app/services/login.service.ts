import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import 'firebase/auth';

import { LoadingService } from './loading.service';
import { Platform } from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: any = {};

  constructor(
    private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,
    private loadingProvider: LoadingService,
    private platform: Platform,
    private gplus: GooglePlus,
    private facebook: Facebook,
    private router: Router,
  ) { }

  login(email, password) {
    this.loadingProvider.show();
    this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
      console.log(res)
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/');
      this.loadingProvider.hide();
    }).catch(err => {
      console.log(err);
      this.loadingProvider.hide();
      this.loadingProvider.showToast(err.message)
    })
  }

  register(name, username, email, password, img) {
    this.loadingProvider.show();
    this.afAuth.createUserWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('isLoggedIn', 'true');
      this.loadingProvider.hide();
      this.createNewUser(firebase.auth().currentUser.uid, name, username, firebase.auth().currentUser.email, "I am available", "Firebase", img);
    }).catch(err => {
      console.log(err);
      this.loadingProvider.hide();
      this.loadingProvider.showToast(err.message);
    })
  }

  reset(email) {
    console.log(email);
    this.loadingProvider.show();
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.loadingProvider.hide();
      this.loadingProvider.showToast("Please Check your inbox");
    }).catch(err => {
      this.loadingProvider.hide();
      this.loadingProvider.showToast(err.message);
    })
  }

  fbLogin() {
    if (this.platform.is('desktop')) {
      this.loadingProvider.show();
      this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res: any) => {
        this.loadingProvider.hide();
        let credential = firebase.auth.FacebookAuthProvider.credential(res.credential.accessToken);
        this.afAuth.signInWithCredential(credential).then(() => {
          if (res.additionalUserInfo.isNewUser) {
            let uid = res.user.uid;
            let userInfo = res.additionalUserInfo.profile;
            this.createNewUser(uid, userInfo.name, uid, userInfo.email, 'Available', 'Facebook', userInfo.picture);
          }
          else {
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigateByUrl('/');
          }
        }).catch(err => console.log(err))

      }).catch(err => {
        console.log(err)
        this.loadingProvider.hide();
      })
    }
    else {
      this.facebook.login(['public_profile', 'email']).then(res => {
        console.log(res);
        let credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.loadingProvider.show();
        this.afAuth.signInWithCredential(credential).then((res) => {
          if (res.additionalUserInfo.isNewUser) {
            this.facebook.api("me/?fields=id,email,first_name,picture,gender", ["public_profile", "email"])
              .then(data => {
                console.log(data)
                let uid = res.user.uid;
                this.createNewUser(uid, data.first_name, uid, data.email, 'I am available', 'Facebook', data.picture.data.url);
              })
              .catch(err => {
                console.log(err);
                this.loadingProvider.hide();
              })
          }
          else {
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigateByUrl('/');
          }
        })
          .catch((error) => {
            this.loadingProvider.hide();
          });

      }).catch(err => console.log(err));
    }
  }

  gLogin() {
    if (this.platform.is('desktop')) {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res: any) => {
        let credential = firebase.auth.GoogleAuthProvider.credential(res.credential.idToken, res.credential.accessToken);
        this.afAuth.signInWithCredential(credential).then(() => {
          if (res.additionalUserInfo.isNewUser) {
            let uid = res.user.uid;
            let userInfo = res.additionalUserInfo.profile;
            this.createNewUser(uid, userInfo.name, uid, userInfo.email, 'Available', 'Google', userInfo.picture);
          } else {
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigateByUrl('/');
          }
        }).catch((err) => {
          console.log("Err! signInWithCredential" + err)
        })
      }).catch(err => {
        console.log('Err! signInWithCredential' + err);
      })
    }
    else {
      this.gplus.login({
        webClientId: environment.googleClientId
      }).then((result: any) => {
        console.log(result);
        let credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, null);
        this.afAuth.signInWithCredential(credential).then((res: any) => {
          if (res.additionalUserInfo.isNewUser) {
            let uid = res.user.uid;
            let userInfo = res.additionalUserInfo.profile;
            this.createNewUser(uid, userInfo.name, uid, userInfo.email, 'Available', 'Google', userInfo.picture);
          }
          else {
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigateByUrl('/');
          }
        }).catch((err) => {
          console.log("Err! signInWithCredential" + err)
        })
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  createNewUser(userId, name, username, email, description = "I'm available", provider, img = "./assets/images/default-dp.png") {
    let dateCreated = new Date();
    this.afdb.object('/accounts/' + userId).update({
      dateCreated, username, name, userId, email, description, provider, img
    }).then(() => {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/');
    });
  }

  getUserData(uid) {
    return this.afdb.object('/accounts/' + uid).snapshotChanges();
  }

  setUser(user) {
    return this.user = user;
  }

  getUser() {
    return this.user;
  }

  updateUser(obj) {
    return this.afdb.object('accounts/' + obj.userId).update(obj);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.clear();
      this.gplus.logout();
      this.facebook.logout();
      this.router.navigateByUrl('/login', { replaceUrl: true, skipLocationChange: true })
    })
  }
}
