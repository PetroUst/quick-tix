import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  addEvent(event: any) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`
    );
    return this.http.post('/Event', event, { responseType: 'text', headers: header });
  }

  getUserEvents() {
    const header = new HttpHeaders().set(
      'Authorization',
      `Basic ${btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`)}`
    );
    return this.http.get<Event[]>('/Event/get-by-userid', { headers: header });
  }
  getAllEvents() {
    return this.http.get<Event[]>('/Event/get-all-events');
  }
  getEventById(id: number|undefined) {
    if (id === undefined)
      throw new Error('Undefined id');

    return this.http.get<Event>(`/Event/${id}`);
  }
}
