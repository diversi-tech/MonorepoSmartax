import { Component, HostListener, OnInit } from '@angular/core';
import { Client } from '../../../_models/client.module';
import { ClientService } from '../../../_services/client.service';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ConfirmationService, PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { AutoCompleteModule, AutoCompleteSelectEvent,} from 'primeng/autocomplete';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet, RouterLink, } from '@angular/router';
import { AddClientComponent } from '../add-client/add-client.component';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { User } from '../../../_models/user.module';
import { UserService } from '../../../_services/user.service';
import { TokenService } from '../../../_services/token.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss'],
  standalone: true,
  imports: [
    ConfirmDialogModule,
    AutoCompleteModule,
    FormsModule,
    PrimeTemplate,
    NgIf,
    TableModule,
    AddClientComponent,
    RouterOutlet,
    Button,
    RouterLink
  ],
})
export class ClientSearchComponent implements OnInit {
  filterNumber: string = '';
  filterTZ: string = '';
  isSelected: number = 0;
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchName = new FormControl('');
  selectedClient: Client | null = null;
  // displayDialog: boolean = false;
  choosedClients: Client[] = [];
  user: User;
  isChoosedAllClient: boolean = false;

  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService
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

  onSelectionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isSelected = Number(selectedValue.substring(6));
  }

  filterClientsByNameAndBusinessName(value: string): void {
    
    if (value !== '') {
      const query = value.toLowerCase();
      this.filteredClients = this.clients.filter(client =>
        (client.firstName && client.firstName.toLowerCase().includes(query)) ||
        (client.lastName && client.lastName.toLowerCase().includes(query))||
        (client.companyName && client.companyName.toLowerCase().includes(query))
      );
    }
    this.selectedClient = null;
  }

  filterClientsByNumber(): void {
    if (this.filterNumber != "")
      this.filteredClients = this.clients.filter(client => client.phone.includes(this.filterNumber));
    else
      this.filteredClients = this.clients;
  }
  filterClientsByTZ(): void {
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
    this.router.navigate(['add-new-client'])
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
    console.log(this.choosedClients);
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
  
isFavoriteClient(client:Client){
  return this.user.favoritesClient.find(c=>c._id===client._id)!=undefined;
}
  addFavoritesClient() {
    this.user.favoritesClient.push(...this.choosedClients.filter(c=>!this.isFavoriteClient(c)))
    this.updateFavorite();
  }
  updateFavorite() {
    this.userService
      .update(
        this.user._id,
        this.user.userName,
        this.user.email,
        this.user.passwordHash,
        this.user.role,
        this.user.favoritesClient
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
removeFromFavorite(client:Client){
  this.user.favoritesClient=this.user.favoritesClient.filter(c=>c._id!=client._id);
  this.updateFavorite();
}
addToFavorite(client:Client){
  this.user.favoritesClient.push(client);
  this.updateFavorite();
}
  showConfirmation(): void {
    debugger
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this clients?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
    });
  }

  confirmDelete(): void {
    this.deleteTask();
  }

  deleteTask(): void {
    this.choosedClients.forEach((c) => {
      this.clientService.deleteClient(c._id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => console.error('Error deleting client: ', err),
      });
    });
  }

  cancelDelete(): void {
    this.confirmationService.close();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.choosedClients = [];
  }
}
