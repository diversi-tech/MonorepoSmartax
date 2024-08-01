import { Component, HostListener, OnInit } from '@angular/core';
import { Client } from '../../../_models/client.module';
import { ClientService } from '../../../_services/client.service';
import { debounceTime } from 'rxjs/operators';
import { ConfirmationService, PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { AutoCompleteModule, AutoCompleteSelectEvent, } from 'primeng/autocomplete';
import { NgClass, NgIf } from '@angular/common';
import { AddClientComponent } from '../add-client/add-client.component';
import { TableModule } from 'primeng/table';
import { User } from '../../../_models/user.module';
import { UserService } from '../../../_services/user.service';
import { TokenService } from '../../../_services/token.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImportClientComponent } from '../import-clients/import-client.component';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css'],
  standalone: true,
  imports: [
    ConfirmDialogModule,
    InputTextModule,
    TooltipModule,
    AutoCompleteModule,
    FormsModule,
    PrimeTemplate,
    NgIf,
    TableModule,
    AddClientComponent,
    RouterOutlet,
    Button,
    RouterLink,
    ImportClientComponent,
    NgClass,
  ],
})
export class ClientSearchComponent implements OnInit {
  filterNumber: string = '';
  filterTZ: string = '';
  isSelected: number = 0;
  currentClient: Client | null = null;
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchName = new FormControl('');
  selectedClient: Client | null = null;
  // displayDialog: boolean = false;
  choosedClients: Client[] = [];
  user: User;
  isChoosedAllClient: boolean = false;
  displayDialog: boolean;
  filternamecom: string = '';

  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userService
      .findOne(this.tokenService.getCurrentDetail('_id'))
      .subscribe({
        next: (response: any) => {
          this.user = response;
          this.loadAllClients();
        },
        error: (err) => {
          console.error('Error get current user', err);
        },
      });
    this.searchName.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if (value !== null) {
        this.filterClientsByNameAndBusinessName(value); // Pass the value directly to filterClients
      }
    });
  }
  sortClientsByNameAsc(): void {
    this.filteredClients.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`;
      const nameB = `${b.firstName} ${b.lastName}`;
      return nameA.localeCompare(nameB, 'he'); // מיון לפי א' עד ת'
    });
  }

  sortClientsByNameDesc(): void {
    this.filteredClients.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`;
      const nameB = `${b.firstName} ${b.lastName}`;
      return nameB.localeCompare(nameA, 'he'); // מיון לפי ת' עד א'
    });
  }
  loadAllClients(): void {
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
      this.filteredClients = clients;

    });
  }


  selectClient(event: AutoCompleteSelectEvent): void {
    const client = event.value as Client;
    this.router.navigate(['/clientSearch/clientManagement'], { state: { client } });

  }

  selectClientFromList(client: Client): void {
    this.router.navigate(['/clientSearch/clientManagement'], {
      state: { client },
    });
  }

  onSelectionChange(a: any) {
    // const selectedValue = (event.target as HTMLSelectElement).value;
    this.isSelected = Number(a);
    this.filteredClients = this.clients;
  }

  filterClientsByNameAndBusinessName(value: string): void {
    if (value !== '') {
      const query = value.toLowerCase();
      this.filteredClients = this.clients.filter(client =>
        (client.firstName && client.firstName.toLowerCase().includes(query)) ||
        (client.lastName && client.lastName.toLowerCase().includes(query))
      );
    }
    // this.selectedClient = null;
  }

  filterClientsBynamecom(): void {
    this.filteredClients = this.clients;
    if (this.filternamecom != "") {
      this.filteredClients = this.clients.filter(client => client.companyName.includes(this.filternamecom));
    }
    else
      this.filteredClients = this.clients;
  }

  filterClientsByNumber(): void {
    this.filteredClients = this.clients;
    if (this.filterNumber != "")
      this.filteredClients = this.clients.filter(client => client.phone.includes(this.filterNumber));
    else
      this.filteredClients = this.clients;
  }

  filterClientsByTZ(): void {
    this.filteredClients = this.clients;
    if (this.filterTZ != "")
      this.filteredClients = this.clients.filter(client => client.tz.includes(this.filterTZ));
    else
      this.filteredClients = this.clients;
  }

  openContactFormDialog() {
    this.displayDialog = true;
  }

  addNewClient() {
    console.log("in")
    // this.displayDialog = true;
    this.router.navigate(['addClient'])
  }

  // closeDialog() {
  //   this.displayDialog = false;
  // }

  updateChoosedClients(client: Client, isChecked: boolean) {
    if (isChecked && !this.choosedClients.includes(client)) {
      this.choosedClients.push(client);
    } else if (!isChecked) {
      const index = this.choosedClients.indexOf(client);
      if (index !== -1) {
        this.choosedClients.splice(index, 1);
      }
    }
    console.log(this.choosedClients, 'after update');
  }

  chooseAllClients(): void {
    this.filteredClients.forEach((client) =>
      this.updateChoosedClients(client, true)
    );
    this.isChoosedAllClient = true;
  }

  removeAllClients(): void {
    this.filteredClients.forEach((client) =>
      this.updateChoosedClients(client, false)
    );
    this.isChoosedAllClient = false;
  }

  isClientChoosed(client: Client): boolean {
    return this.choosedClients.includes(client);
  }

  isFavoriteClient(client: Client) {
    return this.user.favoritesClient.find(c => c._id === client._id) != undefined;
  }

  addFavoritesClient() {
    this.user.favoritesClient.push(...this.choosedClients.filter(c => !this.isFavoriteClient(c)))
    this.updateFavorite();
    console.log(this.user.favoritesClient, 'after add favorite');
  }

  updateFavorite() {
    this.userService
      .update(this.user._id, this.user.userName, this.user.email, this.user.passwordHash,
        this.user.role, this.user.favoritesClient
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (err) => {
          console.error('Error add to favorite', err);
        },
      });
  }

  removeFromFavorite(client: Client) {
    this.user.favoritesClient = this.user.favoritesClient.filter(c => c._id != client._id);
    this.updateFavorite();
  }

  addToFavorite(client: Client) {
    this.user.favoritesClient.push(client);
    this.updateFavorite();
  }

  showConfirmationDelete(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this clients?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      key: "delete"
    });
  }

  confirmDelete(): void {
    this.deleteClient();
  }

  deleteClient(): void {
    if (this.choosedClients.length > 0) {
      this.choosedClients.forEach((c) => {
        this.clientService.deleteClient(c._id).subscribe({
          next: () => {
            window.location.reload();
          },
          error: (err) => console.error('Error deleting client: ', err),
        });
      });
    }
    else {
      this.clientService.deleteClient(this.currentClient._id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => console.error('Error deleting client: ', err),
      });
    }

  }

  cancelDelete(): void {
    this.confirmationService.close();
  }

  editClient() {
    this.router.navigate(['/addClient'], { state: { client: this.currentClient } });
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.choosedClients = [];
    this.isChoosedAllClient = false;
  }

  selectCurrentClient(client: Client) {
    this.currentClient = client;
  }

}