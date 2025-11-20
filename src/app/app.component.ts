import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Appointment } from './model/appointment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'appointment-app';

  newappointmentTitle : string = "";
  newappointmentDate : string = "";
  selectedIndex : number | null =  null;

  appointments : Appointment[] = [];

  ngOnInit(): void {
      let setappoitment = localStorage.getItem("appoitments");
      this.appointments = setappoitment ? JSON.parse(setappoitment) : []
  }

  Add(){
     let d: Appointment = {
    id: 1,
    title: this.newappointmentTitle,
    date: this.newappointmentDate
  };
    this.appointments.push(d);
    this.newappointmentTitle = "";
    this.newappointmentDate = "";

    localStorage.setItem("appoitments",JSON.stringify(this.appointments));
  }

  Remove(id : number){
     this.appointments.splice(id,1);
     localStorage.setItem("appoitments",JSON.stringify(this.appointments));
  }

  EditAppointment(app : Appointment,index : number){
    this.selectedIndex = index;
this.newappointmentTitle = app.title;
this.newappointmentDate = app.date;
console.log("Editing:", app); // Debug
  }

  update(){
    if(this.selectedIndex !== null){
 this.appointments[this.selectedIndex].title = this.newappointmentTitle;
    this.appointments[this.selectedIndex].date = this.newappointmentDate;
    this.newappointmentTitle = "";
    this.newappointmentDate = "";
    this.selectedIndex = null;
    localStorage.setItem("appoitments",JSON.stringify(this.appointments));
    }
   
  }
   
}
