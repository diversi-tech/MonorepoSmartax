import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { DocumentService } from '../../../_services/document.service';
import { Client } from '../../../_models/client.module';
import { Doc } from '../../../_models/doc.module';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DocType } from '../../../_models/docType.module';
import { UploadDocTaskComponent } from '../../../upload-doc-task/upload-doc-task.component';

@Component({
  selector: 'app-client-upload-doc',
  templateUrl: './client-upload-doc.component.html',
  styleUrl: './client-upload-doc.component.css',
  standalone: true,
  imports: [
    FileUploadModule,
    TableModule,
    PrimeTemplate,
    DropdownModule,
    FormsModule,
    UploadDocTaskComponent
  ],
})
export class ClientUploadDocComponent implements OnInit {

  uploadedFiles: Doc[] = [];
  fileUrl: SafeUrl | null = null;
  fileType: string | null = null;
  client: Client | undefined = undefined;
  DocTypes: DocType[] = [];
  selectedType: DocType | undefined;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.documentService.getAllFiles(this.client?._id!).subscribe(
      {
        next: (response: any) => {
          this.uploadedFiles = response;
        },
        error: (err) => {
          console.error('Error get all files', err);
        }
      }
    )
    this.documentService.getAllDocTypes().subscribe({
      next: (response: any) => {
        this.DocTypes = response;
      },
      error: (err) => {
        console.error('Error get all docs', err);
      }
    }
    )
  }

  async upload(event: any) {
    const formData: FormData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    formData.append('clientId', this.client!._id!);
    (await this.documentService.uploadFile(formData)).subscribe({
      next: (response: any) => {
      },
      error: (err) => {
        console.error('Error uploading file', err);
      },
      complete: () => {
        console.log('Upload complete');
      }
    });
  }
  async showUploadedFiles() {
  }

  loadUploadedFiles() {
    // קריאה ל-API לטעינת רשימת הקבצים
    this.documentService.getAllFiles(this.client?._id!).subscribe(files => {
      this.uploadedFiles = files;
    });
  }

  onUploadCompleted() {
    // רענון רשימת הקבצים אחרי העלאת מסמך
    this.loadUploadedFiles();
  }
}