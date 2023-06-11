import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, HttpClientTestingModule], // Add the HttpClientModule here
      providers: [AuthService, Router],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display an alert if either username or password is empty', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should login and navigate to home page on successful authentication', () => {
    spyOn(authService, 'login').and.returnValue(of('Success'));
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');

    component.username = 'testuser';
    component.password = 'testpassword';
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({
      Username: 'testuser',
      Password: 'testpassword',
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('username', 'testuser');
    expect(localStorage.setItem).toHaveBeenCalledWith('password', 'testpassword');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display an alert on authentication error', () => {
    spyOn(window, 'alert');
    spyOn(authService, 'login').and.returnValue(throwError({ error: 'Invalid credentials' }));

    component.username = 'testuser';
    component.password = 'testpassword';
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });

});
