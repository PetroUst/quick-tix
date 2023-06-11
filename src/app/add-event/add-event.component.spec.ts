import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AddEventComponent } from './add-event.component';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { of, throwError } from 'rxjs';

describe('AddEventComponent', () => {
  let component: AddEventComponent;
  let fixture: ComponentFixture<AddEventComponent>;
  let authService: AuthService;
  let eventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule], // Add FormsModule here
      declarations: [AddEventComponent],
      providers: [
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: EventService, useValue: { addEvent: () => of('Success') } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /user after successful event addition', () => {
    const routerSpy = spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    const addEventSpy = spyOn(eventService, 'addEvent').and.returnValue(of('Success'));

    component.eventName = 'Test Event';
    component.time = '12:00 PM';
    component.city = 'Test City';
    component.location = 'Test Location';
    component.maxTickets = 10;
    component.price = 20;

    component.onSubmit();

    expect(addEventSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/user']);
  });

  it('should show alert if any field is missing', () => {
    const alertSpy = spyOn(window, 'alert');
    const addEventSpy = spyOn(eventService, 'addEvent');

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    expect(addEventSpy).not.toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });

  it('should show server error alert if adding event fails', () => {
    const alertSpy = spyOn(window, 'alert');
    const addEventSpy = spyOn(eventService, 'addEvent').and.returnValue(throwError({ error: 'Server error' }));

    component.eventName = 'Test Event';
    component.time = '12:00 PM';
    component.city = 'Test City';
    component.location = 'Test Location';
    component.maxTickets = 10;
    component.price = 20;

    spyOn(component.router, 'navigate'); // Add this line to spy on the navigate method

    component.onSubmit();

    expect(addEventSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Server error');
    expect(component.router.navigate).not.toHaveBeenCalled();
  });
});
