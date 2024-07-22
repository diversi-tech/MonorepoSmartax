import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ImportClientsService } from '../../../_services/importClients.service';

@Component({
  selector: 'app-import-client',
  standalone: true,
  imports: [CommonModule,DialogModule, ButtonModule, InputTextModule,FileUploadModule],
  templateUrl: './import-client.component.html',
  styleUrl: './import-client.component.css',
})
export class ImportClientComponent {
  data: any;
  file: File | null = null;
  visible: boolean = false;
  constructor(private importClientService:ImportClientsService) {}

  showDialog() {
      this.visible = true;
  }
  onUpload(event:any) {
    this.file = event.files[0];
    if (this.file) {
      const formData: FormData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.importClientService.upload(formData).subscribe((response) => {
        console.log(response);
      });
   }
  }

  downloadTemplate() {
    this.importClientService.download().subscribe((response) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}


