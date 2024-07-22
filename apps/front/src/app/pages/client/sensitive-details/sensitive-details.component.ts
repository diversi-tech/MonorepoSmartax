import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SensitiveDataService } from '../../../_services/sensitive-data.service';
import { ClientService } from '../../../_services/client.service'; // Make sure this path is correct
import { CreateSensitiveDataDto } from '../../../../../../../server/src/Models/dto/sensitiveData.dto';
import { Client } from '../../../../../../../server/src/Models/client.model'; // Make sure this path is correct
import { log } from 'console';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sensitive-details',
  templateUrl: './sensitive-details.component.html',
  styleUrls: ['./sensitive-details.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule
  ],
})
export class SensitiveDetailsComponent implements OnInit {
  passwordForm: FormGroup;
  sensitiveDataVisible = false;
  sensitiveDataList: CreateSensitiveDataDto[] = [];
  timer: any;
  client: Client | null = null;
  clientId: string | null = null; 
   showSensitiveDetails: boolean = false;
  formShow: boolean = true;



  constructor(
    private fb: FormBuilder, 
    private clientService: ClientService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.client = history.state.client;
    if (!this.client) {
      console.log("client not fouund"); // Redirect to client search if no client is found in state
    }
    else
    {
      this.clientId = (this.client._id as unknown) as string;
      console.log(this.client);
      console.log(this.clientId);
      
    }
       
    // this.clientId=this.client._id;
    
  }

  onSubmit(): void {
    const password = this.passwordForm.get('password')?.value;
    if (password === '456789') {
      this.fetchClientSensitiveData();
      this.formShow=false;
      this.showSensitiveDetails=true;
    } else {
      alert('סיסמא שגויה');
    }
  }

  fetchClientSensitiveData(): void {
    this.clientService.fetchSensitiveDataForClient(this.clientId).subscribe(
      (data: CreateSensitiveDataDto[]) => {
        this.sensitiveDataList = data;
        this.sensitiveDataVisible = true;
        this.startTimer();
      },
      (error) => {
        console.error('Error fetching sensitive data:', error);
      }
    );
  }

  startTimer(): void {
    this.resetTimer();
    this.timer = setTimeout(() => {
      this.sensitiveDataVisible = false;
      this.passwordForm.reset();
    }, 60000); // 60000 milliseconds = 1 minute
  }

  resetTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  sensitiveDataShow() {
    this.showSensitiveDetails = !this.showSensitiveDetails;
  }
}
