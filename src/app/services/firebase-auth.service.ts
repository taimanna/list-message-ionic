import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async getCurrentUser() {
    return this.afAuth.currentUser;
  }

  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      if (result.user) {
        const userEmail = result.user.email;
        const userName = result.user.displayName;
        this.router.navigate(['/list-message'], {
          queryParams: { email: userEmail, name: userName },
        });
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  async signInWithFacebook() {
    try {
      const provider = new firebase.auth.GithubAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      if (result.user) {
        const userEmail = result.user.email;
        const userName = result.user.displayName;
        this.router.navigate(['/list-message'], {
          queryParams: { email: userEmail, name: userName },
        });
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  async signUpWithPassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async signInWithPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
