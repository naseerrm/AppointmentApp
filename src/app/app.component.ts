import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from './model/appointment';
import { SocialPostRequest } from './model/social-post-request';
import { SocialPostResponse } from './model/social-post-response';
import { SocialPostService } from './services/social-post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'appointment-app';

  newappointmentTitle = '';
  newappointmentDate = '';
  selectedIndex: number | null = null;

  appointments: Appointment[] = [];

  socialRequest: SocialPostRequest = {
    businessName: '',
    targetAudience: '',
    platform: 'LinkedIn',
    offerDetails: '',
    tone: 'Professional',
    callToAction: ''
  };

  generatedPost: SocialPostResponse | null = null;
  socialLoading = false;
  socialError = '';

  constructor(private readonly socialPostService: SocialPostService) {}

  ngOnInit(): void {
    const setappoitment = localStorage.getItem('appoitments');
    this.appointments = setappoitment ? JSON.parse(setappoitment) : [];
  }

  Add(): void {
    const d: Appointment = {
      id: 1,
      title: this.newappointmentTitle,
      date: this.newappointmentDate
    };

    this.appointments.push(d);
    this.newappointmentTitle = '';
    this.newappointmentDate = '';

    localStorage.setItem('appoitments', JSON.stringify(this.appointments));
  }

  Remove(id: number): void {
    this.appointments.splice(id, 1);
    localStorage.setItem('appoitments', JSON.stringify(this.appointments));
  }

  EditAppointment(app: Appointment, index: number): void {
    this.selectedIndex = index;
    this.newappointmentTitle = app.title;
    this.newappointmentDate = app.date;
  }

  update(): void {
    if (this.selectedIndex !== null) {
      this.appointments[this.selectedIndex].title = this.newappointmentTitle;
      this.appointments[this.selectedIndex].date = this.newappointmentDate;
      this.newappointmentTitle = '';
      this.newappointmentDate = '';
      this.selectedIndex = null;
      localStorage.setItem('appoitments', JSON.stringify(this.appointments));
    }
  }

  generateSocialPost(): void {
    this.socialLoading = true;
    this.socialError = '';
    this.generatedPost = null;

    this.socialPostService.generatePost(this.socialRequest).subscribe({
      next: (result) => {
        this.generatedPost = result;
        this.socialLoading = false;
      },
      error: () => {
        this.socialError =
          'Unable to generate post. Check your .NET API and Azure OpenAI settings.';
        this.socialLoading = false;
      }
    });
  }
}
