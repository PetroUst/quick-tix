import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {subscriptionLogsToBeFn} from "rxjs/internal/testing/TestScheduler";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(public router: Router,private authService: AuthService){}
  username:string|null = '';
  searchQuery: string = '';

  ngOnInit(): void {
    this.authService.authenticated$.subscribe(logged => {
      if (localStorage.getItem('username')) {
        this.username = localStorage.getItem('username');
      }
      else {
        this.username = null;
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.router.navigate(['/events-find', this.searchQuery]);
    }
  }


  protected readonly localStorage = localStorage;
}
