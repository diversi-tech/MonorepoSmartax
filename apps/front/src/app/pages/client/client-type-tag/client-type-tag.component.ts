import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeService } from '../../../_services/clientType.service';
import { Observable } from 'rxjs';
import { ClientType } from '../../../_models/clientType.module';
import { InputGroupModule } from 'primeng/inputgroup';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-type-tag',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputGroupModule,
    ButtonModule
  ],
  templateUrl: './client-type-tag.component.html',
  styleUrls: ['./client-type-tag.component.css'],
})
export class ClientTypeTagComponent implements OnInit {
  @Input() tagName: string | undefined;

  showTags: boolean = false;
  clientTypes: ClientType[] = [];
  buttons: { text: string; id: string }[] = [];
  selectedClientType: ClientType | null = null;


  constructor(
    @Inject(ClientTypeService) private clientTypeTagService: ClientTypeService,
    @Inject(Router) private router: Router,

  ) {}
  
  ngOnInit() {
    this.getAllClientTypes();
  }

  getAllClientTypes(): void {
    this.clientTypeTagService.getAllClientTypes().subscribe(types => {
      this.clientTypes = types;
      this.createTag();
      console.log(this.clientTypes);
    });
  }

  createTag(): void {
    this.buttons = this.clientTypes.map((type: ClientType) => ({
      text: type.name,
      id: type._id!,
    }));
  }

  getColor(name: string): string {
    const hash = name
      .split('')
      .reduce((acc, char) => char.codePointAt(0)! + ((acc << 5) - acc), 0);
    const colorValues = Array(3)
      .fill(0)
      .map((_, i) => (hash >> (i * 8)) & 0xff);
    const color = `#${colorValues
      .map((value) => ('00' + value.toString(16)).substr(-2))
      .join('')}`;
    return color;
  }

  removeButton(button: any) {
    const index = this.buttons.indexOf(button);
    if (index !== -1) {
      this.buttons.splice(index, 1);
    }
  }


 

}
