import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagService } from 'src/app/_services/tag.service';
import { Tag } from 'src/app/_models/tag.module';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-type',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputGroupModule
  ],
  templateUrl: './client-type.component.html',
  styleUrls: ['./client-type.component.css'], // styleUrls במקום styleUrl
})
export class ClientTypeComponent {

  constructor() {}

  // findAllClientTags : Observable<Tag[]> {
  //   return
  // }

}
