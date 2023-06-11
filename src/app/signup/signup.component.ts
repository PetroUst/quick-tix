import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private authService: AuthService,public router: Router){}

  username = '';
  password = '';
  confirmPassword = '';
  email = '';
  name = '';
  surname = '';
  organizerFlag: boolean = false;

  onChange(isChecked: any) {
    this.organizerFlag = !this.organizerFlag;
  }

  isEmailValid(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  onSubmit() {
    if (this.username === '' || this.password === '' || this.email === '' || this.name === '' || this.surname === '') {
      alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!this.isEmailValid(this.email)) {
      alert('Please enter a valid email address');
      return;
    }


    if (this.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    const user = {
      Username: this.username,
      Name: this.name,
      Surname: this.surname,
      Email: this.email,
      Password: this.password,
    }
    this.authService.signup(user,this.organizerFlag).subscribe(
      (response: string) => {
        console.log('response', response);
        this.router.navigate(['/login']);
      }, (error: { error: string; }) => {
        console.log(error);
        if (error.error) {
          alert(error.error);
        } else {
          alert('Failed to connect to the server');
        }
      }
    );
  }
}
