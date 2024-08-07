import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FieldService } from '../_services/field.service';
import { Field } from '../_models/field.module';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api/message';


interface typeName {
  name: string;
}

@Component({
  selector: 'app-custom-field',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule, 
    InputTextModule, 
    DropdownModule, 
    FormsModule, 
    MessagesModule
  ],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.css',
})

export class customfieldComponent {
  fieldName: string = '';
  selectedType: typeName;
  messages: Message = { severity: 'error', detail: 'Error Message' };

  v: boolean = false;
  whatType: typeName[] = [{ name: 'טקסט' },
  { name: 'מספר' },
  { name: 'V/X' },
  { name: 'שעה' },
  { name: 'תאריך' }];

  newField: Field | undefined
  @Output() closePopup = new EventEmitter<void>();

  constructor(private fieldService: FieldService,) { };

  createField() {
    if (this.fieldName != "" && this.selectedType != null) {
      this.newField = {
        key: this.fieldName,
        type: this.selectedType.name
      };

      this.fieldService.createField(this.newField).subscribe({
        next: () => {
          console.log("good!!!");
        },
        error: () => {
          this.closePopup.emit();
        },
      });
      this.closePopup.emit();
      this.fieldName = "";
      this.selectedType = null;
      this.v = false;
    }
    else {
      this.v = true;
    }
  }
}
