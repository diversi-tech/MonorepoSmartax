import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { customfieldComponent } from '../../custom-field/custom-field.component';
@Component({
  selector: 'app-field-management',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, customfieldComponent],
  templateUrl: './fieldManagement.component.html',
  styleUrl: './fieldManagement.component.css',
})
export class FieldManagementComponent {
  visible: boolean = false;

    showDialog() {
        this.visible = true;
}
}