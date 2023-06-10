import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Event} from "../models/event";
import {EventService} from "../services/event.service";
import {TicketService} from "../services/ticket.service";
import {Ticket} from "../models/ticket";
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  event: Event | undefined;
  ticket: Ticket | undefined;
  eventId: number | undefined;
  numOfTickets: number = 1;
  EventName: string = '';
  Time: string = '';
  Location: string = '';
  Price: number = 0;
  Status: string = '';
  constructor(private router: Router,
              private eventService: EventService,
              private ticketService: TicketService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id:number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
    if(this.router.url.includes('buy')){
      this.eventService.getEventById(id).subscribe(
        (event: Event) => {
          this.event = event;
          this.EventName = event.EventName;
          this.Time = event.Time;
          this.Location = event.Location+", "+event.City;
          this.Price = event.Price;
        }, error => {
          alert("Failed to load event");
        });
    }
    if(this.router.url.includes('your')){
      this.ticketService.getTicketById(id).subscribe(
        (ticket: Ticket) => {
          this.ticket = ticket;
          this.EventName = ticket.EventName;
          this.Time = ticket.Time;
          this.Location = ticket.Location;
          this.Price = ticket.Price;
          if(ticket.IsPaid){
            this.Status = 'Paid';
          } else{
            this.Status = 'Booked';
          }
        }, error => {
          alert("Failed to load ticket");
        });

    }
  }
  submit(opt : number){

    let IsBooked: number = 0;
    let IsPaid:number = 0;
    if(opt === 0){
      IsBooked = 1;
    }
    else{
      IsPaid = 1;
    }
    const data = {
      EventId: this.event?.EventId,
      IsBooked: IsBooked,
      IsPaid: IsPaid,
      NumOfTickets: this.numOfTickets
    }


    this.ticketService.saveTicket(data).subscribe(
(response: string) => {
          console.log('response', response);
        }, (error: { error: string; }) => {
        console.log(error);
        if (error.error) {
          alert(error.error);
        } else {
          alert('Failed to connect to the server');
        }
      });
  }

  cancel(){
    this.ticketService.cancelBooking(this.ticket?.TicketId).subscribe(
(response: string) => {
          console.log('response', response);
          this.router.navigate(['/user']);
        }, (error: { error: string; }) => {
        if (error.error) {
          alert(error.error);
        } else {
          alert('Failed to connect to the server');
        }
      }
      );}

  buy(){
    this.ticketService.buyTicket(this.ticket?.TicketId).subscribe(
      (response: string) => {
        console.log('response', response);
        this.router.navigate(['/user']);
      }, (error: { error: string; }) => {
        if (error.error) {
          alert(error.error);
        } else {
          alert('Failed to connect to the server');
        }
      }
    );}
}
