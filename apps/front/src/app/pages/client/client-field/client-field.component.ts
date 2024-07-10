import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-field.component.html',
  styleUrl: './client-field.component.css',
})
export class ClientFieldComponent {

  @Input() fieldIds: string[] = [];
  // fields: Field[] = [];
  // form: FormGroup;

  // constructor(private fb: FormBuilder, private fieldService: FieldService) {}

  // ngOnInit(): void {
  //   this.form = this.fb.group({});
  //   this.fieldService.getFieldsByIds(this.fieldIds).subscribe(fields => {
  //     this.fields = fields;
  //     this.fields.forEach(field => {
  //       this.form.addControl(field.key, this.fb.control('', Validators.required));
  //     });
  //   });
  // }

  // onSubmit(): void {
  //   const clientFields: ClientField[] = this.fields.map(field => ({
  //     _id: '',  // תוסיפי כאן את ה-ID אם יש לך דרך להשיג אותו
  //     fieldId: field.id,
  //     value: this.form.get(field.key)?.value || ''
  //   }));

  //   console.log(clientFields);
  // }

}
