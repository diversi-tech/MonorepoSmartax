import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { customfieldComponent } from '../../custom-field/custom-field.component';
import { Field } from '../../_models/field.module';
import { FieldService } from '../../_services/field.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
interface rField{
  key : string;
  type : string;
}
@Component({
  selector: 'app-field-management',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, customfieldComponent,TableModule,ConfirmDialogModule],
  templateUrl: './fieldManagement.component.html',
  styleUrl: './fieldManagement.component.css',
})
export class FieldManagementComponent implements OnInit {
  

  visible: boolean = false;
  fields: Field[] = [];
  regularF:rField[]=[];
  i:number=0;
  vD:boolean=false;
  s:string
    showDialog() {
        this.visible = true;
        
    }
ngOnInit(): void {
  this.getAllFields();
  this.fields.forEach((item) => {
    this.regularF[this.i].key=item.key;
    this.regularF[this.i].type=(JSON.parse(item.type)).name;
    this.i++;
  });
}

onClosePopup() {
  setTimeout(() => {
    this.getAllFields();
  }, 1000);
  this.visible= false;
 
}
deletepopup(id:string){
  this.vD=true;
  this.s=id
}
constructor(private fieldService: FieldService,) {}
getAllFields(): void {
  this.fieldService.getAllField().subscribe(
    (data: Field[]) => {
      this.fields = data;
    },
    (error) => {
      console.error('There was an error!', error);
    }
  );}
  onDeleteField(id: string): void {
    this.fieldService.deleteField(id).subscribe(
      (result: boolean) => {
        if (result) {
          console.log('Field deleted successfully');
          this.getAllFields();
        } else {
          console.error('Failed to delete field');
        }
      },
      (error) => {
        console.error('Error deleting field:', error);
      }
    );
  }
  cancelDelete(): void {
    this.vD=false;
  }

  confirmDelete(): void {
    this.onDeleteField(this.s);
    this.vD=false
  }
}
