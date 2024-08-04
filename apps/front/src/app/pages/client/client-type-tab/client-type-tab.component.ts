import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTagComponent } from '../client-type-tag/client-type-tag.component';
import { ClientFieldComponent } from '../client-field/client-field.component';
import { ClientTypeService } from '../../../_services/clientType.service';
import { ClientType } from '../../../_models/clientType.module';
import { Field } from '../../../_models/field.module';
import { FieldService } from '../../../_services/field.service';
import { Client } from '../../../_models/client.module';
import { ClientField } from '../../../_models/clientField.module';
import { ClientFieldService } from '../../../_services/clientField.service';

@Component({
  selector: 'app-client-type-tab',
  standalone: true,
  imports: [CommonModule, ClientTypeTagComponent, ClientFieldComponent],
  templateUrl: './client-type-tab.component.html',
  styleUrl: './client-type-tab.component.css',
})
export class ClientTypeTabComponent {

  constructor(private clientFieldService: ClientFieldService, @Inject(ClientTypeService) private clientTypeService: ClientTypeService,
    @Inject(FieldService) private fieldService: FieldService
  ) { }

  selectedButton: string;
  clientTypes: ClientType[] = [];
  thisClient: Client;
  clientFieldId: string[] = []
  CFields: ClientField[] = [];

  ngOnInit() {

    this.thisClient = history.state.client;
    console.log('stateData:', this.thisClient);

    this.getAllCFields()

    if (this.thisClient && this.thisClient.clientTypes) {
      this.getAllClientTypes();
    }
  }

  getAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe(types => {
      this.clientTypes = types;
      console.log(this.clientTypes);
    });
  }



  onClientSelected(client: Client): void {
    console.log('Selected Client:', client);
    this.getAllCFields();

  }

  getAllCFields(): void {
    console.log(this.thisClient);
    
    this.clientFieldId = this.thisClient.clientFields

    this.clientFieldId.forEach(cf => {
      console.log("in foreach");
      console.log(cf);
      this.clientFieldService.searchClientField(cf).subscribe(
        {
          next: (data) => {
            let x: ClientField
            if (typeof (data) == typeof (x)&&data!=undefined) {
              this.CFields.push(data)

            }
            else{
            }
          }
        }
      )
    });
  }


  receiveSelectedButton(buttonId: string) {
    console.log("recived");
    this.selectedButton = buttonId;
  }



}