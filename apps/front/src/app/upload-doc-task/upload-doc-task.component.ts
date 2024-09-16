import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { DocumentService } from '../_services/document.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DocType } from '../_models/docType.module';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-upload-doc-task',
  standalone: true,
  imports: [FileUploadModule, FormsModule, CommonModule, DropdownModule],
  providers: [DocumentService],
  templateUrl: './upload-doc-task.component.html',
  styleUrl: './upload-doc-task.component.css',
})
export class UploadDocTaskComponent implements OnInit {
  constructor(private documentService: DocumentService) {}

  @Input() idClient: string | undefined;
  @Output() responseReceived = new EventEmitter<any>();
  //
  @Output() uploadCompleted = new EventEmitter<void>();

  DocTypes: DocType[] = [];
  selectedType: DocType | undefined;
  newTypeName: string = '';
  showDrop: boolean = false;

  ngOnInit(): void {
    this.documentService.getAllDocTypes().subscribe({
      next: (response: any) => {
        this.DocTypes = response;
      },
      error: (err) => {
        console.error('Error get all docs', err);
      },
    });
  }

  async upload(event: any) {
    const formData: FormData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    formData.append('clientId', this.idClient!);
    formData.append('docType', this.selectedType.name);
    (await this.documentService.uploadFile(formData)).subscribe({
      next: (response: any) => {
        console.log('File uploaded successfully', response);
      },
      error: (err) => {
        console.error('Error uploading file', err);
      },
      complete: () => {
        console.log('Upload complete');
        // לאחר סיום ההעלאה, נפעיל את האירוע:
        this.uploadCompleted.emit();
      },
    });
    this.selectedType=undefined
    this.showDrop = false;
  }

  addItem(event: Event) {
    event.stopPropagation();
    if (this.newTypeName.trim()) {
      const newType: DocType = { name: this.newTypeName };
      this.documentService.addDocTypes(newType).subscribe({
        next: (response: any) => {
          this.DocTypes.push(newType);
          this.newTypeName = '';
        },
        error: (err) => {
          console.error('Error adding new type', err);
        },
        complete: () => {
          console.log('add type complete');
        },
      });
    }
  }
}
