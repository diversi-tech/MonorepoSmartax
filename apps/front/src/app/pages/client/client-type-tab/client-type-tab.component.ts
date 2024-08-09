import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTagComponent } from '../client-type-tag/client-type-tag.component';
import { ClientFieldComponent } from '../client-field/client-field.component';
import { ClientTypeService } from '../../../_services/clientType.service';
import { ClientType } from '../../../_models/clientType.module';
import { Field } from '../../../_models/field.module';
import { FieldService } from '../../../_services/field.service';

@Component({
  selector: 'app-client-type-tab',
  standalone: true,
  imports: [
    CommonModule, 
    ClientTypeTagComponent, 
    ClientFieldComponent
  ],
  templateUrl: './client-type-tab.component.html',
  styleUrl: './client-type-tab.component.css',
})
export class ClientTypeTabComponent {

  constructor(
    @Inject(ClientTypeService) private clientTypeService: ClientTypeService,
    @Inject(FieldService) private fieldService: FieldService
  ) { }

  selectedButton: string;
  clientTypes: ClientType[] = [];
  fields: Field[] = [];

  ngOnInit() {
    this.getAllClientTypes();
    this.getAllFields();
  }

  getAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe(types => {
      this.clientTypes = types;
    });
  }

  getAllFields(): void {
    this.fieldService.getAllField().subscribe(fields => {
      this.fields = fields;
    });
  }

  receiveSelectedButton(buttonId: string) {
    this.selectedButton = buttonId;
  }
}