export interface Ticket {
  TicketId: number;
  EventId: number;
  Price: number
  IsBooked: boolean;
  IsPaid: boolean;
  EventName: string;
  Time:string;
  Location: string;
}
