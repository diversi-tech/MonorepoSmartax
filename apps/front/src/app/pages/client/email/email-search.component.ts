// import { Component } from '@angular/core';
// import { EmailService } from '../../../_services/email.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Button, ButtonModule } from 'primeng/button';
// import { Client } from '../../../_models/client.module';

// @Component({
//   selector: 'app-email-search',
//   templateUrl: './email-search.component.html',
//   styleUrls: ['./email-search.component.css'] ,
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     ButtonModule
//   ]
// })
// export class EmailSearchComponent {
//   userEmail: string = 'client@example.com';
//   client: Client | null = null;

//   constructor(private emailService: EmailService) {}
//   ngOnInit(): void {
//     this.client = history.state.client;
//   }
//   openUserEmail() {
//     this.emailService.openEmail(this.client.email);
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { EmailService } from '../../../_services/email.service';
// import { Client } from '../../../_models/client.module';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-email-search',
//   templateUrl: './email-search.component.html',
//   styleUrls: ['./email-search.component.css']
// })
// export class EmailSearchComponent implements OnInit {
//   client: Client | null = null;

//   constructor(
//     private emailService: EmailService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.client = history.state.client;
//   }

//   openClientEmail() {
//     // this.emailService.openEmail(this.client?.email ?? '');
//     this.emailService.openEmail('etti378@gmail.com');

//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EmailService } from '../../../_services/email.service';
@Component({
  selector: 'app-email-search',
  templateUrl: './email-search.component.html',
  styleUrls: ['./email-search.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class EmailSearchComponent {
  searchForm: FormGroup;
  emails: any[] = [];

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.searchForm = this.fb.group({
      fromEmail: [''],
      toEmail: ['']
    });
  }

  onSearch(): void {
    const { fromEmail, toEmail } = this.searchForm.value;
    this.emailService.searchEmails(fromEmail, toEmail).subscribe({
      next: (emails) => {
        this.emails = emails;
      },
      error: (error) => {
        console.error(error);
        alert('No emails found');
      }
    });
  }
}
