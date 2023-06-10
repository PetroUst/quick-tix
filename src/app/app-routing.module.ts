import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {UserpageComponent} from "./userpage/userpage.component";
import {HomeComponent} from "./home/home.component";
import {FindEventComponent} from "./find-event/find-event.component";
import {AddEventComponent} from "./add-event/add-event.component";
import {TicketComponent} from "./ticket/ticket.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user', component: UserpageComponent},
  {path: '', component: HomeComponent},
  {path: 'events', component: FindEventComponent},
  {path: 'add-event', component: AddEventComponent},
  {path: 'buy-ticket/:eventId', component: TicketComponent},
  {path: 'your-ticket/:ticketId', component: TicketComponent},
  {path: 'events-find/:query', component: FindEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true}),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
