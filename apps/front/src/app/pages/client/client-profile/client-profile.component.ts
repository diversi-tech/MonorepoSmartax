import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { NgIf, DatePipe, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

// import { CommonModule } from '@angular/common';
@Component({
    // standalone:true,
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
    ],

})
export class ClientProfileComponent implements OnInit {
  client: Client | null = null;
  showDetails: boolean = false;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.client = history.state.client;
  }
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}