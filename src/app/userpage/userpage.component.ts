import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {EventService} from "../services/event.service";
import {Event} from "../models/event";

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {
  username = '';
  name = '';
  surname = '';
  email = '';
  userRole = '';
  events: Event[] = [];

  constructor(private router: Router,
              private authService: AuthService,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (response) => {
        // console.log(response.getData());
        this.username = response.Username;
        this.name = response.Name;
        this.surname = response.Surname;
        this.email = response.Email;
        this.userRole = response.Role;
      },
      (error) => {
        console.error(error);
      });
    this.userRole = 'SuperUser'
    this.eventService.getUserEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
      });
  }

}