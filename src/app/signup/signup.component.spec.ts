import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['signup']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Reset the spy on the navigate method before each test case
    routerSpy.navigate.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.username = 'testuser';
      component.password = 'testpassword';
      component.confirmPassword = 'testpassword';
      component.email = 'test@example.com';
      component.name = 'Test';
      component.surname = 'User';
      component.organizerFlag = false;
      routerSpy.navigate.calls.reset();
    });

    it('should display an error message when a field is empty', () => {
      spyOn(window, 'alert');

      component.username = '';
      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
      expect(authServiceSpy.signup).not.toHaveBeenCalled();
    });

    it('should display an error message when passwords do not match', () => {
      spyOn(window, 'alert');

      component.confirmPassword = 'mismatchedpassword';
      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
      expect(authServiceSpy.signup).not.toHaveBeenCalled();
    });

    it('should display an error message when an invalid email is provided', () => {
      spyOn(window, 'alert');

      component.email = 'invalidemail';
      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address');
      expect(authServiceSpy.signup).not.toHaveBeenCalled();
    });

    it('should display an error message when passwords do not match', () => {
      spyOn(window, 'alert');

      component.password = 'short';
      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
      expect(authServiceSpy.signup).not.toHaveBeenCalled();
    });

    it('should display an error message when password is too short', () => {
      spyOn(window, 'alert');

      component.password = 'short';
      component.confirmPassword = 'short';
      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Password must be at least 8 characters long');
      expect(authServiceSpy.signup).not.toHaveBeenCalled();
    });

    it('should call authService.signup and navigate to "/login" on successful signup', () => {
      authServiceSpy.signup.and.returnValue(of('success'));
      spyOn(window, 'alert');
      spyOn(routerSpy, 'navigate');

      component.onSubmit();

      expect(authServiceSpy.signup).toHaveBeenCalledWith(
        {
          Username: 'testuser',
          Name: 'Test',
          Surname: 'User',
          Email: 'test@example.com',
          Password: 'testpassword',
        },
        false
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']); // Check if the navigate method was called with the correct arguments
      expect(window.alert).not.toHaveBeenCalled(); // Ensure no error alert is displayed
    });


    it('should display an error message when signup fails', () => {
      const errorMessage = 'Failed to connect to the server';
      authServiceSpy.signup.and.returnValue(throwError({ error: errorMessage }));
      spyOn(window, 'alert');

      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith(errorMessage);
      expect(authServiceSpy.signup).toHaveBeenCalledWith(
        {
          Username: 'testuser',
          Name: 'Test',
          Surname: 'User',
          Email: 'test@example.com',
          Password: 'testpassword',
        },
        false
      );
    });
  });
});
