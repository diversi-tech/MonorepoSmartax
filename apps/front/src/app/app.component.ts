
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { ToolBarService } from './_services/tool-bar.service';
import { TokenService } from './_services/token.service';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { LoginComponent } from './pages/login/login.component';

// import { RouterTestingModule } from '@angular/router/testing';
// import { TestBed } from '@angular/core/testing';
// describe('AppComponent', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [RouterTestingModule],
//     declarations: [AppComponent]
//   }));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [LoginComponent,RouterLinkActive, RouterLink, ToolBarComponent, RouterOutlet, ToolBarComponent]
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  toolbarItems: any[] = [];

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private toolbarService: ToolBarService,
    private tokenServise: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.username = this.tokenServise.getCurrentDetail("email")
      const user = this.tokenServise.getToken();
      const currentRole = this.tokenServise.getCurrentDetail("role")
      this.toolbarItems = this.toolbarService.getCurrentItems(currentRole.level)
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}