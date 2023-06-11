import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceStub = {
      authenticated$: new BehaviorSubject<boolean>(false),
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should initialize username as null if no value is present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();

    expect(component.username).toBeNull();
  });

  it('should initialize username with the value from localStorage', () => {
    const username = 'JohnDoe';
    spyOn(localStorage, 'getItem').and.returnValue(username);

    component.ngOnInit();

    expect(component.username).toEqual(username);
  });

  it('should clear localStorage and navigate to login on logout', () => {
    spyOn(localStorage, 'clear');
    const routerNavigateSpy = spyOn(component.router, 'navigate');

    component.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to events-find on Enter key press', () => {
    const searchQuery = 'event';
    component.searchQuery = searchQuery;
    const routerNavigateSpy = spyOn(component.router, 'navigate');

    component.onKeyUp({ key: 'Enter' } as KeyboardEvent);

    expect(routerNavigateSpy).toHaveBeenCalledWith(['/events-find', searchQuery]);
  });
});
