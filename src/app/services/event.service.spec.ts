import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';
import { Event } from '../models/event';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addEvent', () => {
    const event = { name: 'Test Event' };

    it('should send a POST request to /Event endpoint with proper authorization header', () => {
      spyOn(localStorage, 'getItem').and.returnValues('testuser', 'testpassword');
      service.addEvent(event).subscribe();

      const req = httpMock.expectOne('/Event');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(event);
      expect(req.request.headers.get('Authorization')).toBe('Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk');

      req.flush('', { status: 200, statusText: 'OK' });
    });
  });

  describe('getUserEvents', () => {
    it('should send a GET request to /Event/get-by-userid endpoint with proper authorization header', () => {
      spyOn(localStorage, 'getItem').and.returnValues('testuser', 'testpassword');
      service.getUserEvents().subscribe();

      const req = httpMock.expectOne('/Event/get-by-userid');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk');

      req.flush([], { status: 200, statusText: 'OK' });
    });
  });

  describe('getAllEvents', () => {
    it('should send a GET request to /Event/get-all-events endpoint', () => {
      service.getAllEvents().subscribe();

      const req = httpMock.expectOne('/Event/get-all-events');
      expect(req.request.method).toBe('GET');

      req.flush([], { status: 200, statusText: 'OK' });
    });
  });

  describe('getEventById', () => {
    const eventId = 1;

    it('should send a GET request to /Event/{id} endpoint with the provided ID', () => {
      service.getEventById(eventId).subscribe();

      const req = httpMock.expectOne(`/Event/${eventId}`);
      expect(req.request.method).toBe('GET');

      req.flush({}, { status: 200, statusText: 'OK' });
    });

    it('should throw an error if the ID is undefined', () => {
      expect(() => service.getEventById(undefined)).toThrowError('Undefined id');
    });
  });
});
