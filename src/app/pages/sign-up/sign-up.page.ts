import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  email: string = '';
  password: string = '';
  rePassword: string = '';
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  handleSignUpWithPassword() {
    if (this.password === this.rePassword) {
      this.firebaseAuthService
        .signUpWithPassword(this.email, this.password)
        .then(() => {
          this.router.navigate(['/list-message']);
        })
        .catch((error) => console.log(error));
    }
  }
}
