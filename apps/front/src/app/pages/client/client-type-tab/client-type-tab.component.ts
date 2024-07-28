import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTagComponent } from '../client-type-tag/client-type-tag.component';
import { ClientFieldComponent} from '../client-field/client-field.component';
import { ClientTypeService } from '../../../_services/clientType.service';
import { ClientType } from '../../../_models/clientType.module';
import { Field } from '../../../_models/field.module';
import { FieldService } from '../../../_services/field.service';
import { Client } from '../../../_models/client.module';
import { ClientField } from '../../../_models/clientField.module';

@Component({
  selector: 'app-client-type-tab',
  standalone: true,
  imports: [CommonModule, ClientTypeTagComponent, ClientFieldComponent],
  templateUrl: './client-type-tab.component.html',
  styleUrl: './client-type-tab.component.css',
})
export class ClientTypeTabComponent {

  constructor(@Inject(ClientTypeService) private clientTypeService: ClientTypeService,
         @Inject(FieldService) private fieldService: FieldService
){}

  selectedButton: string;
  clientTypes: ClientType[] = [];
  fields: ClientField[] = [];
  thisClient: Client;
  CFields : ClientField[] =[];

  ngOnInit() {

    this.thisClient = history.state.client;
    console.log('stateData:', this.thisClient);

    if (this.thisClient && this.thisClient.clientTypes) {
    this.getAllClientTypes();
    this.getAllFields();
}
  }

  getAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe(types => {
      this.clientTypes = types;
      console.log(this.clientTypes);

    });
  }

  getAllFields(): void{
    if (this.thisClient) {
      this.fields = this.thisClient.clientFields
      console.log(this.thisClient.clientFields);
      
    // this.fieldService.getAllField().subscribe(fields => {
    //   this.fields = fields;
    //   console.log(this.fields );

    // });
    }
  }

  receiveSelectedButton(buttonId: string) {
    console.log("recived");
    this.selectedButton = buttonId;
  }



}