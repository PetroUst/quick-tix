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
  onSubmit() {
    if (this.username === '' || this.password === '' || this.email === '' || this.name === '' || this.surname === '') {
      this.confirm('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.confirm('Passwords do not match');
      return;
    }

    if (this.password.length < 8) {
      this.confirm('Password must be at least 8 characters long');
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
          this.confirm(error.error);
        } else {
          this.confirm('Failed to connect to the server');
        }
      }
    );
  }

  protected readonly confirm = confirm;
}
