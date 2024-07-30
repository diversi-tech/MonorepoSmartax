import { Component, OnInit } from '@angular/core';
import { Client } from '../../../_models/client.module';
import { Router, RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-client-management',
    templateUrl: './client-management.component.html',
    styleUrls: ['./client-management.component.css'],
    standalone: true,
    imports: [RouterOutlet]
})
export class ClientManagementComponent implements OnInit {
  client: Client | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.client = history.state.client;
    if (!this.client) {
      this.router.navigate(['/clientSearch']); // Redirect to client search if no client is found in state
    }
    this.router.navigate(['clientSearch/clientManagement/clientNavbar'], { state: { client: this.client } });
  }
}
