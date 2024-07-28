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
  showClientTypesList: boolean = false
  showClientTypes: boolean = false;
  ClientTypesselected: ClientType[] = [];
  id: string = "";
  thisClient: Client;
  selectedClients: Client[] = [];
  clients: Client[] = []
  clientIdsParam: string[] = []
  selectedDeleteType: ClientType | null = null;
  displayDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  index: number = 0;
  tasks: Task[] = [];

  constructor(
    @Inject(ClientTypeService) private clientTypeService: ClientTypeService,
    @Inject(ClientService) private clientService: ClientService,
    @Inject(TaskService) private taskService: TaskService,
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
        // this.createTag();
        this.showClientTypes = !this.showClientTypes;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  clientT(ct: ClientType) {
    this.ClientTypesselected.concat(ct);
    console.log(this.ClientTypesselected);
    this.showClientTypesList = !this.showClientTypesList;

    if (!this.thisClient.clientTypes) {
      this.thisClient.clientTypes = [];
    }
    // const exist = this.thisClient.clientTypes.indexOf(ct);
    // if (exist != -1) {
      this.thisClient.clientTypes.concat(ct);
      console.log(this.thisClient.clientTypes);
      this.thisClient.clientTypes.forEach(ct => {
        console.log(ct);
        ct.tasks.forEach(t => {
          this.repeatableTaskService.searchRepeatableTask(t._id).subscribe({
            next: (repeatableTask) => {
              console.log('repeatableTask: ', repeatableTask);
              const newRtask = repeatableTask;
              newRtask.client = this.thisClient;
              this.repeatableTaskService.createRepeatableTask(newRtask).subscribe({
                next: (newRepeatableTask) => {
                  console.log('newRepeatableTask created: ', newRepeatableTask);
                },
                error: (err) => {
                  console.error('Failed:', err);
                }
              });
            },
            error: (err) => {
              console.error('Failed:', err);
            }
          });
        });
      });
      // this.repeatableTaskService.
      // this.getTasks(ct.tasks);
      this.clientService.updateClient(this.thisClient).subscribe({
        next: (updatedClient) => {
          console.log('Client updated with new clientType:', updatedClient.clientTypes);
        },
        error: (err) => {
          console.error('Failed to update client:', err);
        }
      });
    // }
  }

  // async getTasks(taskIds: string[]) : Promise<Task[]>{
  //   taskIds.forEach(taskId =>{
  //     this.taskService.searchTask(taskId).subscribe({
  //       next: (task) => {
  //         // task.client = this.thisClient;
  //         this.repeatableTaskService.createRepeatableTask(task).subscribe({
  //           next: (updatedReptask) => {
  //             console.log('repetable task updated with :', updatedReptask);
  //           },
  //           error: (err) => {
  //             console.error('Failed to update repetable task:', err);
  //           }
  //         });

  //         console.log('Task:', task);
  //       },
  //       error: (err) => {
  //         console.error('Failed', err);
  //       }
  //     });
  //   })
  //   return this.tasks;
  // }

  // createTag(): void {
  //   this.showClientTypes = !this.showClientTypes;
  //   this.buttons = this.clientTypes.map((type: ClientType) => ({
  //     text: type.name,
  //     id: type._id!,
  //   }));
  // }

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
    debugger
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



