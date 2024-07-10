import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

interface City {
  name: string;
  code: string;
}


@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule, ButtonModule,InputTextModule,DropdownModule,FormsModule,],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.css',
})

export class customfieldComponent {
  selectedValue: City;
  whatType: City[] | undefined;
  
  ngOnInit() {
    this.whatType = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
}
  // constructor() {
  //   this.whatType = [
  //     { name: 'New York', code: 'NY' },
  //     { name: 'Rome', code: 'RM' },
  //     { name: 'London', code: 'LDN' },
  //     { name: 'Istanbul', code: 'IST' },
  //     { name: 'Paris', code: 'PRS' }
  //   ];
  selectedCity: any;
  // onSelect(value: string) {
  //   this.selectedValue = value;
}