import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // form!: FormGroup;
  password = '';
  username = '';

  constructor(public router: Router, private authService: AuthService){}

  onSubmit() {
    if (this.username === '' || this.password === '') {
      alert('Please fill in all fields');
      return;
    }
    const user = {
      Username: this.username,
      Password: this.password,
    }
    this.authService.login(user).subscribe(
      (response: string) => {
        console.log('response', response);
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        this.authService.authenticated$.next(true);
        this.router.navigate(['/']);
      }, (error: { error: string; }) => {
        console.log(error);
        if (error.error) {
          alert(error.error);
        } else {
          alert('Failed to connect to the server');
        }
      });
    this.router.navigate(['/']);
  }
}
