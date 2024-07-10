import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

interface typeName {
  name: string;
  code: string;
}


@Component({
  selector: 'app-custom-field',
  standalone: true,
  imports: [CommonModule, ButtonModule,InputTextModule,DropdownModule,FormsModule,],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.css',
})

export class customfieldComponent {
  
  whatType: typeName[] | undefined;
  
  ngOnInit() {
    this.whatType = [{name:'טקסט',code:'1'},
                     {name:'מספר',code:'2'},
                     {name:'V/X',code:'3'},
                     {name:'שעה',code:'4'},
                     {name:'תאריך',code:'5'} ];
}
 
  selectedType: typeName;
  
}