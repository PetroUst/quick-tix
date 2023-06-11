import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserpageComponent } from './userpage.component';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { TicketService } from '../services/ticket.service';
import { Event } from '../models/event';
import { Ticket } from '../models/ticket';

describe('UserpageComponent', () => {
  let component: UserpageComponent;
  let fixture: ComponentFixture<UserpageComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let eventServiceSpy: jasmine.SpyObj<EventService>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    eventServiceSpy = jasmine.createSpyObj('EventService', ['getUserEvents']);
    ticketServiceSpy = jasmine.createSpyObj('TicketService', ['getUserTickets']);

    TestBed.configureTestingModule({
      declarations: [UserpageComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: EventService, useValue: eventServiceSpy },
        { provide: TicketService, useValue: ticketServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserpageComponent);
    component = fixture.componentInstance;
  });

  it('should load user details and SuperUser events on initialization', () => {
    const user = {
      Username: 'testUser',
      Name: 'John',
      Surname: 'Doe',
      Email: 'johndoe@example.com',
      Role: 'SuperUser',
    };
    const events: Event[] = [
      {
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
      },
    ];
    authServiceSpy.getUser.and.returnValue(of(user));
    eventServiceSpy.getUserEvents.and.returnValue(of(events));

    fixture.detectChanges();

    expect(component.username).toBe(user.Username);
    expect(component.name).toBe(user.Name);
    expect(component.surname).toBe(user.Surname);
    expect(component.email).toBe(user.Email);
    expect(component.userRole).toBe(user.Role);
    expect(component.events).toEqual(events);
    expect(eventServiceSpy.getUserEvents).toHaveBeenCalled();
  });

  it('should load user details and tickets on initialization for User role', () => {
    const user = {
      Username: 'testUser',
      Name: 'John',
      Surname: 'Doe',
      Email: 'johndoe@example.com',
      Role: 'User',
    };
    const tickets: Ticket[] = [
      { EventId: 1, TicketId: 1, EventName: 'Event 1', Time: '2023-01-01', Location: 'Location 1', Price: 10,IsPaid: false, IsBooked: true },
      { EventId: 2, TicketId: 2, EventName: 'Event 2', Time: '2023-01-02', Location: 'Location 2', Price: 20, IsPaid:false, IsBooked: true},
    ];
    authServiceSpy.getUser.and.returnValue(of(user));
    ticketServiceSpy.getUserTickets.and.returnValue(of(tickets));

    fixture.detectChanges();

    expect(component.username).toBe(user.Username);
    expect(component.name).toBe(user.Name);
    expect(component.surname).toBe(user.Surname);
    expect(component.email).toBe(user.Email);
    expect(component.userRole).toBe(user.Role);
    expect(component.tickets).toEqual(tickets);
    expect(ticketServiceSpy.getUserTickets).toHaveBeenCalled();
  });

  it('should display an error message when failed to load tickets on initialization', () => {
    const user = {
      Username: 'testUser',
      Name: 'John',
      Surname: 'Doe',
      Email: 'johndoe@example.com',
      Role: 'User',
    };
    authServiceSpy.getUser.and.returnValue(of(user));
    ticketServiceSpy.getUserTickets.and.returnValue(throwError({ error: 'Failed to load tickets' }));
    spyOn(window, 'alert');

    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Failed to load tickets');
  });

  it('should navigate to the ticket page when openTicketPage is called', () => {
    const ticket: Ticket = { TicketId: 1 } as Ticket;

    component.openTicketPage(ticket);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/your-ticket', ticket.TicketId]);
  });
});
