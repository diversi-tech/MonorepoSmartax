import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Client } from '../../../_models/client.module';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Router } from '@angular/router';
import { ClientProfileComponent } from '../client-profile/client-profile.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.css'],
  standalone: true,
  imports: [
    ClientProfileComponent,
    Button,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    RouterModule
  ]
})
export class ClientNavbarComponent implements OnInit {

  client: Client | null = null;
  // clientName: Client;


  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.client = history.state.client;
  }

  navigateTo(route: string): void {
    if (this.client) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar', route], { state: { client: this.client } });
      this.cdr.detectChanges();
    }
  }
  // 
  // onClientNameReceived(name: Client) {
  //   this.clientName = name; // שומר את שם הלקוח
  //   console.log('Client name received:', this.clientName);
  // }

  // navigateTo2(route: string) : void{
  //   this.router.navigate([`/taskSpe/create`], { queryParams: { clientName: this.clientName } });
  //   if (this.client) {
  //     this.router.navigate(['/clientSearch/clientManagement/clientNavbar', route], { state: { client: this.client } });
  //     this.cdr.detectChanges();
  //   }
  // }
}
