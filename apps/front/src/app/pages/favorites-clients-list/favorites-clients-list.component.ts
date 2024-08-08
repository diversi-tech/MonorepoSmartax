import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TokenService } from '../../_services/token.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.module'
import { Client } from '../../_models/client.module';
import { Router } from '@angular/router';
import { ClientService } from '../../_services/client.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Role } from '../../_models/role.module';

@Component({
  selector: 'app-favorites-clients-list',
  templateUrl: './favorites-clients-list.component.html',
  styleUrl: './favorites-clients-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    NgClass,
    NgIf,
    ConfirmDialogModule
  ],

})
export class FavoritesClientsListComponent implements OnInit {

  user: User;
  favoriteClients: Client[] = [];
  currentClient: Client | null = null;


  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    private clientService: ClientService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.userService
      .findOne(this.tokenService.getCurrentDetail('_id'))
      .subscribe({
        next: (response: any) => {
          this.user = response;
          this.user.favoritesClient.forEach(c => {
            this.clientService.searchClient(c).subscribe
              ({
                next: (favoriteClients) => {
                  this.favoriteClients.push(favoriteClients);
                }
              })
          })
        },
        error: (err) => {
          console.error('Error get current user', err);
        },
      });
  }

  updateFavorite() {
    // const r= new Role('','','',)
    // this.userService
    //   .update(
    //     this.user._id,
    //     this.user.userName,
    //     this.user.email,
    //     this.user.passwordHash,
    //     this.user.role,
    //     []
    //     // this.user.favoritesClient
    //   )
    //   .subscribe({
    //     next: (response: any) => {
    //       console.log(response);
    //     },
    //     error: (err) => {
    //       console.error('Error add to favorite', err);
    //     },
    //   });
  }

  removeFromFavorite(client: Client) {
    this.user.favoritesClient = this.user.favoritesClient.filter(c => c != client._id);
    this.favoriteClients = this.favoriteClients.filter(c => c._id != client._id);
    this.updateFavorite();
  }

  selectClientFromList(client: Client): void {
    this.router.navigate(['/clientSearch/clientManagement'], {
      state: { client },
    });
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
    this.clientService.deleteClient(this.currentClient._id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => console.error('Error deleting client: ', err),
    });
  }

  cancelDelete(): void {
    this.confirmationService.close();
  }

  editClient() {
    this.router.navigate(['/addClient'], { state: { client: this.currentClient } });
  }
  selectCurrentClient(client: Client) {
    this.currentClient = client;
  }
}
