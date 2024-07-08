import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/fileupload';
// import { TableModule } from 'primeng/table';
// import { CommonModule } from '@angular/common';
// import { PrimeTemplate } from 'primeng/api';
import { DocumentService } from '../_services/document.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DocType } from '../_models/docType.module';
@Component({
  selector: 'app-upload-doc-task',
  standalone:true,
  imports:[
    FileUploadModule,
    FormsModule,
    CommonModule,
    DropdownModule
  ],
  providers:[
    DocumentService
  ],
  templateUrl: './upload-doc-task.component.html',
  styleUrl: './upload-doc-task.component.css'
})
export class UploadDocTaskComponent implements OnInit{

  constructor(private documentService:DocumentService, private sanitizer: DomSanitizer) {}

  @Input() idClient: string | undefined ;
  @Output() responseReceived = new EventEmitter<any>();
  DocTypes:DocType[]= [];
  selectedType: DocType | undefined;

  ngOnInit(): void {
    this.documentService.getAllDocTypes().subscribe(
      {
        next:(response: any) => {
          this.DocTypes=response;
        },
        error: (err) => {
          console.error('Error get all docs', err);
        }
      }
    )
  }

  async upload(event:any) {  
    console.log(this.idClient);
          
    const formData: FormData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    formData.append('clientId', this.idClient!);
    formData.append('docType', this.selectedType.name);
    console.log(formData);
    console.log(event.files[0]);
    
    
    (await this.documentService.uploadFile(formData)).subscribe({
      next: (response: any) => {
        console.log('File uploaded successfully', response);
        // const fileId = response.fileId;
        // this.documentService.getviewLink(fileId);
      },
      error: (err) => {
        console.error('Error uploading file', err);
      },
      complete: () => {
        console.log('Upload complete');
      }
    });
  }

}
