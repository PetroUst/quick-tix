import {Component, OnInit} from '@angular/core';
import {Event} from "../models/event";
import {EventService} from "../services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-find-event',
  templateUrl: './find-event.component.html',
  styleUrls: ['./find-event.component.scss']
})
export class FindEventComponent implements OnInit{

  events: Event[] = [];
  searchKeyword: string = '';
  filteredEvents: Event[] = [];
  constructor(private eventService: EventService, public router: Router) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
        this.filteredEvents = events;
      },error => {
        alert("Failed to load events");
      });
    if(this.router.url.includes('find')){
      this.searchKeyword = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
      this.performSearch();
    }
  }
  performSearch() {
    this.filteredEvents = this.events.filter((event: Event) =>
      event.EventName.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  openTicketPage(event: Event) {
    this.router.navigate(['/buy-ticket', event.EventId]);
  }
}
