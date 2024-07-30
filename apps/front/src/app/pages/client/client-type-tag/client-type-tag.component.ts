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
import Swal from 'sweetalert2';
import { DialogModule } from 'primeng/dialog';
import { TaskService } from '../../../_services/task.service';
import { Task } from '../../../_models/task.module'
import { RepeatableTaskService } from '../../../_services/repeatable.service';
import { ClientFieldService } from '../../../_services/clientField.service';

@Component({
  selector: 'app-client-type-tag',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputGroupModule,
    ButtonModule,
    CarouselModule,
    ListboxModule,
    DialogModule
  ],
  templateUrl: './client-type-tag.component.html',
  styleUrls: ['./client-type-tag.component.css'],
})
export class ClientTypeTagComponent implements OnInit {

  showTags: boolean = false;
  clientTypes: ClientType[] = [];
  buttons: { text: string; id: string }[] = [];
  selectedClientType: ClientType | null = null;
  selectedFields: Field[] = [];
  form: FormGroup;
  showClientTypesList: boolean = false;
  showClientTypes: boolean = false;
  ClientTypesselected: ClientType[] = [];
  id: string = "";
  thisClient: Client;
  selectedClients: Client[] = [];
  clients: Client[] = [];
  clientIdsParam: string[] = [];
  selectedDeleteType: ClientType | null = null;
  displayDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  index: number = 0;
  tasks: Task[] = [];
  @Output() clientSelected: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(
    @Inject(ClientTypeService) private clientTypeService: ClientTypeService,
    @Inject(ClientService) private clientService: ClientService,
    @Inject(ClientFieldService) private clientFieldService: ClientFieldService,
    @Inject(RepeatableTaskService) private repeatableTaskService: RepeatableTaskService,
    @Inject(Router) private router: Router,
    private fb: FormBuilder,
    public ar: ActivatedRoute
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.getAllClientTypes();
    this.thisClient = history.state.client;
    console.log('stateData:', this.thisClient);
    console.log(this.thisClient.clientTypes);
  }

  getAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe({
      next: (data) => {
        console.log(data);
        this.clientTypes = data;
        this.showClientTypes = !this.showClientTypes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clientT(ct: ClientType) {
    this.ClientTypesselected.push(ct);
    console.log(this.ClientTypesselected);
    this.showClientTypesList = !this.showClientTypesList;

    if (!this.thisClient.clientTypes) {
      this.thisClient.clientTypes = [];
    }

    this.thisClient.clientTypes.push(ct);
    console.log(this.thisClient.clientTypes);

    // קריאה לפונקציה שיוצרת ClientFields לפי ClientType בשרת
    this.clientFieldService.createClientFieldsByClientType(ct._id, this.thisClient._id).subscribe({
      next: (response) => {
        console.log( this.thisClient);
        console.log( this.thisClient._id);
        console.log('ClientFields created by ClientType:', response);
        //this.thisClient.clientFields = response;
        

        const taskPromises = ct.tasks.map((tId) => {
          return new Promise<void>((resolve, reject) => {
            console.log(String(tId));
            this.repeatableTaskService.searchRepeatableTask(String(tId)).subscribe({
              next: (repeatableTask) => {
                console.log('repeatableTask: ', repeatableTask);
                const newRtask = repeatableTask;
                newRtask.client = this.thisClient;
                this.repeatableTaskService.createRepeatableTask(newRtask).subscribe({
                  next: (newRepeatableTask) => {
                    console.log('newRepeatableTask created: ', newRepeatableTask);
                    resolve();
                  },
                  error: (err) => {
                    console.error('Failed:', err);
                    reject(err);
                  }
                });
              },
              error: (err) => {
                console.error('Failed:', err);
                reject(err);
              }
            });
          });
        });

        Promise.all(taskPromises)
          .then(() => {
            this.clientService.updateClient(this.thisClient).subscribe({
              next: (updatedClient) => {
                console.log('Client updated:', updatedClient);
                this.clientSelected.emit(updatedClient);
              },
              error: (err) => {
                console.error('Failed to update client:', err);
              }
            });
          })
          .catch((err) => {
            console.error('Failed to process tasks:', err);
          });
      },
      error: (err) => {
        console.error('Failed to create ClientFields by ClientType:', err);
      }
    });
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

  confirmDelete(type: ClientType) {
    this.selectedDeleteType = type;
    this.displayDeleteDialog = true;
  }

  deleteType() {
    console.log(this.selectedDeleteType);
    if (this.selectedDeleteType) {
      console.log(this.selectedDeleteType);
      this.index = this.thisClient.clientTypes.findIndex(ct => ct._id === this.selectedDeleteType._id);
      if (this.index !== -1) {
        this.thisClient.clientTypes.splice(this.index, 1);
        this.clientService.updateClient(this.thisClient).subscribe({
          next: (updatedClient) => {
            console.log('Client updated with new clientType:', updatedClient.clientTypes);
          },
          error: (err) => {
            console.error('Failed to update client:', err);
          }
        });
      }
    }
    this.cancelDelete();
  }

  cancelDelete() {
    this.displayDeleteDialog = false;
    this.selectedDeleteType = null;
  }
}
