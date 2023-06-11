import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TicketComponent } from './ticket.component';
import { EventService } from '../services/event.service';
import { TicketService } from '../services/ticket.service';
import { Event } from '../models/event';
import { Ticket } from '../models/ticket';

describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let eventServiceSpy: jasmine.SpyObj<EventService>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    eventServiceSpy = jasmine.createSpyObj('EventService', ['getEventById']);
    ticketServiceSpy = jasmine.createSpyObj('TicketService', ['getTicketById']);
    activatedRouteStub = {
      url: of([{ path: 'buy' }, { path: '1' }] as UrlSegment[]),
    };

    TestBed.configureTestingModule({
      declarations: [TicketComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: EventService, useValue: eventServiceSpy },
        { provide: TicketService, useValue: ticketServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
  });

  it('should load event details on initialization when route includes "/buy"', () => {
    const event: Event = {
      EventId: 1,
      EventName: 'Test Event',
      Time: '2023-01-01',
      Location: 'Test Location',
      City: 'Test City',
      Price: 10,
      MaxTickets: 100,
    };
    eventServiceSpy.getEventById.and.returnValue(of(event));

    fixture.detectChanges();

    expect(component.event).toEqual(event);
    expect(component.EventName).toBe(event.EventName);
    expect(component.Time).toBe(event.Time);
    expect(component.Location).toBe(event.Location + ', ' + event.City);
    expect(component.Price).toBe(event.Price);
    expect(eventServiceSpy.getEventById).toHaveBeenCalledWith(1);
  });

  it('should display an error message when failed to load event details on initialization', () => {
    eventServiceSpy.getEventById.and.returnValue(throwError({ error: 'Failed to load event' }));
    spyOn(window, 'alert');

    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Failed to load event');
  });

  it('should load ticket details on initialization when route includes "/your"', () => {
    const ticket: Ticket = {
      EventId: 1,
      TicketId: 1,
      EventName: 'Test Event',
      Time: '2023-01-01',
      Location: 'Test Location',
      Price: 10,
      IsPaid: false,
      IsBooked: true,
    };
    spyOn(ticketServiceSpy, 'getTicketById').and.returnValue(of(ticket));

    spyOnProperty(activatedRouteStub, 'url', 'get').and.returnValue(of([{ path: 'your-ticket' }, { path: '20' }] as UrlSegment[]));

    fixture.detectChanges();

    expect(component.ticket).toEqual(ticket);
    expect(component.EventName).toBe(ticket.EventName);
    expect(component.Time).toBe(ticket.Time);
    expect(component.Location).toBe(ticket.Location);
    expect(component.Price).toBe(ticket.Price);
    expect(component.Status).toBe('Booked');
    expect(ticketServiceSpy.getTicketById).toHaveBeenCalledWith(1);
  });

  it('should display an error message when failed to load ticket details on initialization', () => {
    spyOn(ticketServiceSpy, 'getTicketById').and.returnValue(throwError({ error: 'Failed to load ticket' }));
    spyOn(window, 'alert');

    ticketServiceSpy.getTicketById.calls.reset();

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (param: string) => {
            if (param === 'id') {
              return '1';
            }
            return '';
          }
        }
      }
    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
    fixture.detectChanges();

    expect(ticketServiceSpy.getTicketById).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Failed to load ticket');
  });

});
