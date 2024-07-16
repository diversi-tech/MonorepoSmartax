import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTagComponent } from '../client-type-tag/client-type-tag.component';
import { ClientFieldComponent} from '../client-field/client-field.component';
import { ClientTypeService } from '../../../_services/clientType.service';
import { ClientType } from '../../../_models/clientType.module';
import { Field } from '../../../_models/field.module';

@Component({
  selector: 'app-client-type-tab',
  standalone: true,
  imports: [CommonModule, ClientTypeTagComponent, ClientFieldComponent],
  templateUrl: './client-type-tab.component.html',
  styleUrl: './client-type-tab.component.css',
})
export class ClientTypeTabComponent {

  constructor(@Inject(ClientTypeService) private clientTypeService: ClientTypeService){}

  selectedButton: string;
  clientTypes: ClientType[] = [];
  selectedFields: Field[] = [];

  ngOnInit() {
    this.getAllClientTypes();
  }

  getAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe(types => {
      this.clientTypes = types;
      // this.createTag();
      console.log(this.clientTypes);

    });
  }

  receiveSelectedButton(buttonId: string) {
    // debugger
    console.log("recived");
    this.selectedButton = buttonId;
    this.getFields(this.selectedButton);
  }


getFields(buttonId: string) {
  const clientType = this.clientTypes.find(ct => ct._id === buttonId);
  if (clientType) {
    this.selectedFields = clientType.fields.map(field => ({
      // id: field._id,
      key: field.key,
      type: field.type
    }));
    console.log(this.selectedFields);
    
  }
}

}