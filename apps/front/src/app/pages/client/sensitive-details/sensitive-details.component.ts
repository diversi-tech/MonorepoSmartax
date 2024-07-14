import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-sensitive-details',
  templateUrl: './sensitive-details.component.html',
  styleUrls: ['./sensitive-details.component.css'],
  standalone: true,
  imports: [
  FormsModule,
  DropdownModule,
  ReactiveFormsModule,
  CommonModule,
  ],
})
export class SensitiveDetailsComponent implements OnInit {
  passwordForm: FormGroup;
  sensitiveDataVisible = false;
  sensitiveData: string = 'פרטי אשראי: 1234-5678-9012-3456';
  timer: any;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const password = this.passwordForm.get('password')?.value;
    if (password === '123456') {
      this.sensitiveDataVisible = true;
      this.startTimer();
    } else {
      alert('סיסמא שגויה');
    }
  }

  startTimer(): void {
    this.resetTimer();
    this.timer = setTimeout(() => {
      this.sensitiveDataVisible = false;
      this.passwordForm.reset();
    }, 60000); // 60000 מילישניות = 1 דקה
  }

  resetTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
