import { FirebaseAuthService } from './../services/firebase-auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  handleLoginWithPassword() {
    this.firebaseAuthService
      .signInWithPassword(this.email, this.password)
      .then((res: any) => {
        this.router.navigate(['/list-message']);
      })
      .catch((error) => console.log(error));
  }

  handleLoginWithGoogle() {
    this.firebaseAuthService.signInWithGoogle();
  }

  handleLoginWithFacebook() {
    this.firebaseAuthService.signInWithFacebook();
  }
}
