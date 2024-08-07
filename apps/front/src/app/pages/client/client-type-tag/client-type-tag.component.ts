import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeService } from '../../../_services/clientType.service';
import { Observable } from 'rxjs';
import { ClientType } from '../../../_models/clientType.module';
import { InputGroupModule } from 'primeng/inputgroup';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from '../../../_models/field.module';
import { CarouselModule } from 'primeng/carousel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { Client } from '../../../_models/client.module';
import { ClientService } from '../../../_services/client.service';

@Component({
  selector: 'app-client-type-tag',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputGroupModule,
    ButtonModule,
    CarouselModule,
    ListboxModule
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
  selectedFields: Field[] = [];
  form: FormGroup;
  showClientTypesList: boolean = false
  showClientTypes: boolean = false;
  ClientTypesselected: ClientType[] = [];
  id: string = "";
  thisClient: Client;

  constructor(
    @Inject(ClientTypeService) private clientTypeService: ClientTypeService,
    @Inject(ClientService) private clientService: ClientService,
    @Inject(Router) private router: Router,
    private fb: FormBuilder,
    public ar: ActivatedRoute

  ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.getAllClientTypes();
    this.ar.params.subscribe(
      data => {
        this.id = data['id'];
        this.clientService.searchClient(this.id).subscribe(
          suc => {
            this.thisClient = suc
          })
      }
    )
  }

  getAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe({
      next: (data) => {
        this.clientTypes = data;
        this.createTag();
      },
      error: (err) => {
      },
    });

  }

  clientT(ct: ClientType) {
    this.ClientTypesselected.push(ct);
    this.buttons.push({ text: ct.name, id: ct._id });
    this.showClientTypesList = !this.showClientTypesList;
  }

  createTag(): void {
    this.showClientTypes = !this.showClientTypes;
    this.buttons = this.clientTypes.map((type: ClientType) => ({
      text: type.name,
      id: type._id!,
    }));
  }

  getColor(name: string): string {
    if (!name) {
      return '#000';
    }
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

  removeButton(tag: any) {
    const index = this.ClientTypesselected.indexOf(tag);
    if (index !== -1) {
      this.ClientTypesselected.splice(index, 1);
    }
  }
}



