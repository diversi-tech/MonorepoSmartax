import { Component ,Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FieldService } from '../_services/field.service';
import { Field } from '../_models/field.module';


interface typeName {
  name: string;

}


@Component({
  selector: 'app-custom-field',
  standalone: true,
  imports: [CommonModule, ButtonModule,InputTextModule,DropdownModule,FormsModule,],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.css',
})

export class customfieldComponent {
  fieldName: string = '';
  selectedType: typeName;
  id:string='1';
  typeo:string='eee'
  whatType: typeName[] =[{name:'טקסט'},
  {name:'מספר'},
  {name:'V/X'},
  {name:'שעה'},
  {name:'תאריך'} ];
  newField:Field |undefined
  @Output() closePopup = new EventEmitter<void>();

  

  constructor(private fieldService: FieldService,) {};
 

  createField() {
     this.newField = {
     
     key:this.fieldName,
     type:JSON.stringify(this.selectedType)
     
    };
    
    

  this.fieldService.createField(this.newField).subscribe({
    next: () => {
      console.log("good!!!");
    },
    error: () => {
      console.log("error field");
      this.closePopup.emit();
    },
  });
  this.closePopup.emit();
}
  
}
