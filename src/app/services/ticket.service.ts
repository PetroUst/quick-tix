import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../models/ticket";
import {Event} from "../models/event";
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  saveTicket(ticket: any) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`
    );
    return this.http.post('/Ticket', ticket, { responseType: 'text', headers: header });
  }

  getUserTickets() {
    const header = new HttpHeaders().set(
      'Authorization',
      `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`
    );
    return this.http.get<Ticket[]>('/Ticket/get-by-userid', { headers: header });
  }

  getTicketById(id: number|undefined) {
    if (id === undefined)
      throw new Error('Undefined id');
    const header = new HttpHeaders().set(
      'Authorization',
      `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`
    );

    return this.http.get<Ticket>(`/Ticket/${id}`,{ headers: header });
  }

  cancelBooking(id: number|undefined) {
    if (id === undefined)
      throw new Error('Undefined id');
    const header = new HttpHeaders().set(
      'Authorization',
      `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`
    );
    return this.http.delete(`/User/cancel/${id}`,{ responseType: 'text',headers: header });
  }

  buyTicket(id: number|undefined) {
    if (id === undefined)
      throw new Error('Undefined id');
    const header = new HttpHeaders().set(
      'Authorization',
      `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`
    );
    return this.http.put(`/User/buying/${id}`,null,{ responseType: 'text',headers: header });
  }
}
