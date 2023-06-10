import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(localStorage.getItem('username') !== null);

  signup(user: any, flag: boolean) {
    if(flag){
      return this.http.post('/SuperUser', user, { responseType: 'text' });
    }
    return this.http.post('/User', user, { responseType: 'text' });
  }

  login(user: any) {
    return this.http.post('/User/login', user, { responseType: 'text' });
  }
  getUser(){
    const header = new HttpHeaders().set(
      'Authorization',
      `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`
    );
    return this.http.get<any>('/User/get-user', { headers: header });
  }

}
