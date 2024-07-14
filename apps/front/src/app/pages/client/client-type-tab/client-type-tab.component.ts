import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTagComponent } from '../client-type-tag/client-type-tag.component';
import { ClientFieldComponent} from '../client-field/client-field.component';

@Component({
  selector: 'app-client-type-tab',
  standalone: true,
  imports: [CommonModule, ClientTypeTagComponent, ClientFieldComponent],
  templateUrl: './client-type-tab.component.html',
  styleUrl: './client-type-tab.component.css',
})
export class ClientTypeTabComponent {}
