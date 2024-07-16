import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TokenService } from '../../_services/token.service';
import { UserService } from '../../_services/user.service';
import {User} from '../../_models/user.module'
import { Client } from '../../_models/client.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-clients-list',
  templateUrl: './favorites-clients-list.component.html',
  styleUrl: './favorites-clients-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
  ],
 
})
export class FavoritesClientsListComponent implements OnInit {

  user: User;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService
      .findOne(this.tokenService.getCurrentDetail('_id'))
      .subscribe({
        next: (response: any) => {
          this.user = response;
        },
        error: (err) => {
          console.error('Error get current user', err);
        },
      });



  }
  
  selectClientFromList(client: Client): void {
    this.router.navigate(['/clientSearch/clientManagement'], {
      state: { client },
    });
  }
  
}
