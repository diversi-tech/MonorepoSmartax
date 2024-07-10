import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.css',
})
export class customfieldComponent {
  selectedValue: string;
  options: string[] = ['טקסט', 'מספר', 'V/X','שעה','תאריך'];

  onSelect(value: string) {
    this.selectedValue = value;
}}