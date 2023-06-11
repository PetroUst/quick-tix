import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FindEventComponent } from './find-event.component';
import { EventService } from '../services/event.service';
import { of, throwError } from 'rxjs';
import { Event } from '../models/event';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

describe('FindEventComponent', () => {
  let component: FindEventComponent;
  let fixture: ComponentFixture<FindEventComponent>;
  let eventService: EventService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [FindEventComponent],
      providers: [
        { provide: EventService, useValue: { getAllEvents: () => of([]) } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindEventComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load events on initialization', () => {
    const events: Event[] = [{
      EventId: 1,
      EventName: 'Event 1',
      Time: '2023-06-01',
      City: 'City Name',
      Location: 'Location Name',
      Price: 10,
      MaxTickets: 100
    }, {
      EventId: 2,
      EventName: 'Event 3',
      Time: '2023-06-01',
      City: 'City Name',
      Location: 'Location Name',
      Price: 10,
      MaxTickets: 100
    }];
    spyOn(eventService, 'getAllEvents').and.returnValue(of(events));

    component.ngOnInit();

    expect(component.events).toEqual(events);
    expect(component.filteredEvents).toEqual(events);
  });

  it('should show alert if loading events fails', () => {
    const alertSpy = spyOn(window, 'alert');
    spyOn(eventService, 'getAllEvents').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(alertSpy).toHaveBeenCalledWith('Failed to load events');
  });

  it('should perform search and filter events', () => {
    const events: Event[] = [{
      EventId: 1,
      EventName: 'Event 1',
      Time: '2023-06-01',
      City: 'City Name',
      Location: 'Location Name',
      Price: 10,
      MaxTickets: 100
    }, {
      EventId: 2,
      EventName: 'Event 2',
      Time: '2023-06-01',
      City: 'City Name',
      Location: 'Location Name',
      Price: 10,
      MaxTickets: 100
    }, {
      EventId: 3,
      EventName: 'Event 3',
      Time: '2023-06-01',
      City: 'City Name',
      Location: 'Location Name',
      Price: 10,
      MaxTickets: 100
    }];
    component.events = events;

    component.searchKeyword = 'event';
    component.performSearch();

    expect(component.filteredEvents.length).toBe(3);
    expect(component.filteredEvents[0].EventName).toBe('Event 1');
    expect(component.filteredEvents[1].EventName).toBe('Event 2');
    expect(component.filteredEvents[2].EventName).toBe('Event 3');
  });

  it('should navigate to /buy-ticket/:eventId', () => {
    const event: Event = {
      EventId: 1,
      EventName: 'Event 1',
      Time: '2023-06-01',
      City: 'City Name',
      Location: 'Location Name',
      Price: 10,
      MaxTickets: 100
    };
    const navigateSpy = spyOn(router, 'navigate');

    component.openTicketPage(event);

    expect(navigateSpy).toHaveBeenCalledWith(['/buy-ticket', event.EventId]);
  });
});
