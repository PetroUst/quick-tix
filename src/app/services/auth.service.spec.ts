import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit authentication status on initialization', () => {
    expect(service.authenticated$.value).toBe(localStorage.getItem('username') !== null);
  });

  describe('signup', () => {
    const user = { username: 'testuser', password: 'testpassword' };

    it('should send a POST request to /User endpoint when flag is false', () => {
      service.signup(user, false).subscribe();

      const req = httpMock.expectOne('/User');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(user);

      req.flush('', { status: 200, statusText: 'OK' });
    });

    it('should send a POST request to /SuperUser endpoint when flag is true', () => {
      service.signup(user, true).subscribe();

      const req = httpMock.expectOne('/SuperUser');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(user);

      req.flush('', { status: 200, statusText: 'OK' });
    });
  });

  describe('login', () => {
    const user = { username: 'testuser', password: 'testpassword' };

    it('should send a POST request to /User/login endpoint', () => {
      service.login(user).subscribe();

      const req = httpMock.expectOne('/User/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(user);

      req.flush('', { status: 200, statusText: 'OK' });
    });
  });

  describe('getUser', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.returnValues('testuser', 'testpassword');
    });

    it('should send a GET request to /User/get-user endpoint with proper authorization header', () => {
      service.getUser().subscribe();

      const req = httpMock.expectOne('/User/get-user');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk');

      req.flush('', { status: 200, statusText: 'OK' });
    });
  });
});
