import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {EventService} from "../services/event.service";
import {Event} from "../models/event";
import {TicketService} from "../services/ticket.service";
import {Ticket} from "../models/ticket";

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
  tickets: Ticket[] = [];

  constructor(private router: Router,
              private authService: AuthService,
              private eventService: EventService,
              private ticketService:TicketService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (response) => {
        // console.log(response.getData());
        this.username = response.Username;
        this.name = response.Name;
        this.surname = response.Surname;
        this.email = response.Email;
        this.userRole = response.Role;
        if (this.userRole === 'SuperUser') {
          this.eventService.getUserEvents().subscribe(
            (events: Event[]) => {
              this.events = events;
            });
        }else if(this.userRole === 'User'){
          this.ticketService.getUserTickets().subscribe(
            (tickets: Ticket[]) => {
              console.log(this.tickets);
              this.tickets=tickets;
            },error => {
              alert("Failed to load tickets");
            });
        }
      },
      (error) => {
        console.error(error);
      });


  }
  openTicketPage(ticket: Ticket) {
    this.router.navigate(['/your-ticket', ticket.TicketId]);
  }

}
