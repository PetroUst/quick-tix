import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { Ticket } from '../models/ticket';

describe('TicketService', () => {
  let service: TicketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });
    service = TestBed.inject(TicketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveTicket', () => {
    const ticket = { event: 'Test Event' };

    it('should send a POST request to /Ticket endpoint with proper authorization header', () => {
      spyOn(localStorage, 'getItem').and.returnValues('testuser', 'testpassword');
      service.saveTicket(ticket).subscribe();

      const req = httpMock.expectOne('/Ticket');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(ticket);
      expect(req.request.headers.get('Authorization')).toBe('Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk');

      req.flush('', { status: 200, statusText: 'OK' });
    });
  });

  describe('getUserTickets', () => {
    it('should send a GET request to /Ticket/get-by-userid endpoint with proper authorization header', () => {
      spyOn(localStorage, 'getItem').and.returnValues('testuser', 'testpassword');
      service.getUserTickets().subscribe();

      const req = httpMock.expectOne('/Ticket/get-by-userid');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk');

      req.flush([], { status: 200, statusText: 'OK' });
    });
  });

  describe('getTicketById', () => {
    const ticketId = 1;

    it('should send a GET request to /Ticket/{id} endpoint with the provided ID', () => {
      service.getTicketById(ticketId).subscribe();

      const req = httpMock.expectOne(`/Ticket/${ticketId}`);
      expect(req.request.method).toBe('GET');

      req.flush({}, { status: 200, statusText: 'OK' });
    });

    it('should throw an error if the ID is undefined', () => {
      expect(() => service.getTicketById(undefined)).toThrowError('Undefined id');
    });
  });

  describe('cancelBooking', () => {
    const ticketId = 1;

    it('should send a DELETE request to /User/cancel/{id} endpoint with the provided ID and proper authorization header', () => {
      spyOn(localStorage, 'getItem').and.returnValues('testuser', 'testpassword');
      service.cancelBooking(ticketId).subscribe();

      const req = httpMock.expectOne(`/User/cancel/${ticketId}`);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Authorization')).toBe('Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk');

      req.flush('', { status: 200, statusText: 'OK' });
    });

    it('should throw an error if the ID is undefined', () => {
      expect(() => service.cancelBooking(undefined)).toThrowError('Undefined id');
    });
  });

  describe('buyTicket', () => {
    const ticketId = 1;

    it('should send a PUT request to /User/buying/{id} endpoint with the provided ID and proper authorization header', () => {
      spyOn(localStorage, 'getItem').and.returnValues('testuser', 'testpassword');
      service.buyTicket(ticketId).subscribe();

      const req = httpMock.expectOne(`/User/buying/${ticketId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('Authorization')).toBe('Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk');

      req.flush('', { status: 200, statusText: 'OK' });
    });

    it('should throw an error if the ID is undefined', () => {
      expect(() => service.buyTicket(undefined)).toThrowError('Undefined id');
    });
  });
});
