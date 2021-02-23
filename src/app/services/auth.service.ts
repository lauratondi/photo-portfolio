import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../models/Admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  admin: Observable<Admin> | any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log(`You have successfully signed in ${email}`))
      .catch((error: any) => console.log(error.message));
  }

  getAuth(): boolean {
    return this.afAuth !== null;
  }

  // googleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider();

  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then(function (result) {
  //       // This gives you a Google Access Token.

  //       // The signed-in user info.
  //       var admin = result.user;
  //     });
  // }
}
