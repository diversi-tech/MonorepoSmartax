import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientService } from '../../../_services/client.service';
import { Client } from '../../../_models/client.module';
import { NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrl: './add-client.component.css',
    providers: [ClientService],
    animations: [
        trigger('dialog', [
            state('void', style({
                transform: 'scale(0.7)',
                opacity: 0
            })),
            transition('void => *', [
                animate('0.3s cubic-bezier(0.25, 0.8, 0.25, 1)')
            ]),
            transition('* => void', [
                animate('0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', style({
                    transform: 'scale(0.7)',
                    opacity: 0
                }))
            ])
        ])
    ],
    standalone: true,
    imports: [DialogModule, FormsModule, ReactiveFormsModule, NgIf]
})
export class AddClientComponent {

  contactForm!: FormGroup;
  displayDialog: boolean = true;
  @Output() close = new EventEmitter<void>();
  savedData: any; 
  newClient : Client ={
    name: "",
    contactInfo: "",
  businessName: "",
  source: "",
  status: null,
  createdDate: new Date,
  tag:{color:"",text:""}
  }
  
  constructor(private formBuilder: FormBuilder, private ClientServic: ClientService 
  ) {}
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern('[ a-zA-Zא-ת]{2,}')]],
      // contactDetails: ['', Validators.required],
      businessName: ['',Validators.required],
      source:[''],
      status: ['active'],
      date: ['', Validators.required] ,
      phoneNumber: ['', [Validators.required, Validators.pattern('(0)[0-9]{8,10}')]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      alert("נשמר בהצלחה");
      this.savedData = this.contactForm.value;
      this.newClient.businessName=this.savedData.businessName
      this.newClient.createdDate=this.savedData.date      
      this.newClient.name=this.savedData.name
      this.newClient.contactInfo=this.savedData.phoneNumber
      this.newClient.source=this.savedData.source
      this.newClient.status=this.savedData.status
      this.ClientServic.createClient(this.newClient).subscribe(
        response => {
          console.log('Client created successfully:', response);})
         
      this.close.emit();
    }
  }
  onClose() {
    this.close.emit();
  }
}