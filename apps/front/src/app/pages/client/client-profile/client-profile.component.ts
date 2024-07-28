import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { NgIf, DatePipe, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SensitiveDetailsComponent } from '../sensitive-details/sensitive-details.component';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    DropdownModule,
    DatePipe,
    CommonModule,
    SensitiveDetailsComponent
  ],
})
export class ClientProfileComponent implements OnInit {
  client: Client | null = null;
  showDetails: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.client = history.state.client as Client;
    if (!this.client) {
      this.router.navigate(['/clientSearch']); // Redirect to client search if no client is found in state
    }
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  navigateToSensitiveDetails(): void {
    if (this.client) {
      this.router.navigate(['/sensitiveDetails'], { state: { client: this.client } });
    }
  }
}
