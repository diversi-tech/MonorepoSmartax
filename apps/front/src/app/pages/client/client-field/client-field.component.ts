import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ClientField } from '../../../_models/clientField.module';
import { Field } from '../../../_models/field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientFieldService } from '../../../_services/clientField.service';

@Component({
  selector: 'app-client-field',
  template: '',
  standalone: true,
  imports: [CommonModule,InputTextModule,FormsModule,ReactiveFormsModule,CardModule,ButtonModule],
  templateUrl: './client-field.component.html',
  styleUrl: './client-field.component.css',
})
export class ClientFieldComponent {

  @Input() Cfield: ClientField;

  form: FormGroup;

  constructor(private fb: FormBuilder, private clientFieldService: ClientFieldService) {}

  ngOnInit(): void {
    console.log(this.Cfield);
    this.form = this.fb.group({
      [this.Cfield.field.key]: ['', Validators.required] // Dynamic form control based on key
    });
  }

  onSubmit(): void {
    const clientField: ClientField = {
      field: this.Cfield.field,
      value: this.form.get(this.Cfield.value)?.value || ''
    };
    console.log(clientField);
    
    this.clientFieldService.createClientField(clientField).subscribe(
      response => {
        console.log('Client field saved:', response);
      },
      error => {
        console.error('Error saving client field:', error);
      }
    );
  }
}
