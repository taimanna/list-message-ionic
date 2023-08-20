import { FirebaseAuthService } from './../services/firebase-auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = 'nhan78104@gmail.com';
  password: string = '123456';

  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  handleLoginWithPassword() {
    this.firebaseAuthService
      .signInWithPassword(this.email, this.password)
      .then((res: any) => {
        console.log(res.user.email);
        this.router.navigate(['/list-message']);
      })
      .catch((error) => console.log(error));
  }

  handleSignUpWithPassword() {
    this.firebaseAuthService
      .signUpWithPassword(this.email, this.password)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  handleLoginWithGoogle() {}

  handleLoginWithFacebook() {}
}
