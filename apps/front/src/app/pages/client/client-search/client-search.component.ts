import { Component, OnInit } from '@angular/core';
import { Client } from '../../../_models/client.module';
import { ClientService } from '../../../_services/client.service';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AddClientComponent } from '../add-client/add-client.component';
import { TableModule } from 'primeng/table';

@Component({
    // standalone:true,
    selector: 'app-client-search',
    templateUrl: './client-search.component.html',
    styleUrls: ['./client-search.component.scss'],
    standalone: true,
    imports: [
        AutoCompleteModule,
        FormsModule,
        PrimeTemplate,
        NgIf,
        TableModule,
        AddClientComponent,
        RouterOutlet,
    ],
})
export class ClientSearchComponent implements OnInit  {
  filterNumber: string = "";
  isSelected: number = 0;
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchName = new FormControl('');
  selectedClient: Client | null = null;
  displayDialog: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true; // Enable Ripple effect globally

    this.searchName.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value !== null) {
        this.filterClientsByNameAndBusinessName(value); // Pass the value directly to filterClients
      }
    });
    this.loadAllClients();
  }

  loadAllClients(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
      this.filteredClients = clients;
    });
  }

  selectClient(event: AutoCompleteSelectEvent): void {
    const client = event.value as Client;
    this.router.navigate(['/clientSearch/clientManagement'], { state: { client } });
  }

  selectClientFromList(client: Client): void {
    this.router.navigate(['/clientSearch/clientManagement'], { state: { client } });
  }

  onSelectionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isSelected = Number(selectedValue.substring(6));
  }

  filterClientsByNameAndBusinessName(value: string): void {
    if (value !== "") {
      const query = value.toLowerCase();
      this.filteredClients = this.clients.filter(client =>
        (client.name && client.name.toLowerCase().includes(query)) ||
        (client.businessName && client.businessName.toLowerCase().includes(query))
      );
    }
    this.selectedClient = null;
  }

  filterClientsByNumber(): void {
    if (this.filterNumber != "")
      this.filteredClients = this.clients.filter(client => client.contactInfo.includes(this.filterNumber));
    else
      this.filteredClients = this.clients;
  }

  openContactFormDialog() {
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }
}