import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {

  constructor(public router: Router,
              private authService: AuthService,
              private eventService: EventService) { }
  eventName: string = '';
  time: string = '';
  city: string = '';
  location: string = '';
  maxTickets: number = 0;
  price: number = 0;

  onSubmit() {
    if(this.eventName === '' || this.time === '' || this.city === '' || this.location === '' || this.maxTickets === 0 || this.price === 0){
      alert('Please fill in all fields');
      return;
    }
    const event = {
      EventName: this.eventName,
      Time: this.time,
      City: this.city,
      Location: this.location,
      MaxTickets: this.maxTickets,
      Price: this.price
    }
    this.eventService.addEvent(event).subscribe(
      (response: string) => {
        console.log('response', response);
        // this.router.navigate(['/user']);
      }, (error: { error: string; }) => {
        if (error.error) {
          alert(error.error);
        } else {
          alert('Failed to connect to the server');
        }
      });
  }
}
