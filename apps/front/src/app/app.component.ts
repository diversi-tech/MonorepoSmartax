import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { ToolBarService } from './_services/tool-bar.service';
import { TokenService } from './_services/token.service';
import {
  Router,
  RouterLinkActive,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { DialogModule } from 'primeng/dialog';
import { PopupNotificationComponent } from "./popUp-socket/popUp-socket.component";
import { CheckListItemComponent } from './check-list-item/check-list-item.component';
import { AvatarModule } from 'primeng/avatar';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UserService } from './_services/user.service';
import { User } from './_models/user.module';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

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
  imports: [
    LoginComponent,
    RouterLinkActive,
    CheckListItemComponent,
    RouterLink,
    ToolBarComponent,
    RouterOutlet,
    ToolBarComponent,
    DialogModule,
    PopupNotificationComponent,
    AvatarModule,
    MenuModule,
    ButtonModule,
    DividerModule,
    TooltipModule,
  ],
})

export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  eventBusSub?: Subscription;
  toolbarItems: any[] = [];
  //
  items: MenuItem[] | undefined;

  employeeId: string | null = null;

  user?: User;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private toolbarService: ToolBarService,
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router // private webSocketService: WebSocketService, // private cdr: ChangeDetectorRef
  ) {
    this.employeeId = this.tokenService.getCurrentDetail('_id');
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.tokenService.getToken();
      const currentRole = this.tokenService.getCurrentDetail('role');
      this.toolbarItems = this.toolbarService.getCurrentItems(
        currentRole.level
      );
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    //
    this.items = [
      {
        // label: 'Options',
        items: [
          {
            label: 'יציאה',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
          {
            label: 'עריכת פרופיל',
            icon: 'pi pi-user-edit',
            command: () => this.options('Edit'),
          },
        ],
      },
    ];

    this.userService.findOne(this.employeeId).subscribe((data: any) => {
      this.user = data;
      this.username = this.user.userName;
      console.log(data);
      // this.chartPie();
    });

    //
    // console.log('Subscribing to taskCreated events');
    // // this.webSocketService.onTaskCreated(this.showNotification.bind(this));
    // this.webSocketService.onTaskCreated((task: any) => {
    //   this.showNotification(task);
    // });
    // console.log("WebSocketService",this.webSocketService);
  }

  // showNotification(task: any): void {
  //   alert(`New task created: ${task.title}`); // או השתמש בקוד מתאים להצגת הודעה
  //   console.log('showNotification called with:', task);
  //   this.cdr.detectChanges();  // Force change detection
  // }
  logout(): void {
    try {
      this.authService.logout().subscribe(
        (status: number) => { 
          console.log('Logout successful. Status:', status);
          this.storageService.clean();
          this.ngOnInit();
          this.router.navigate(['/home']);    
        },
        (error: any) => {
          console.error('Logout failed. Error:', error);
          alert('ארעה שגיאה בתהליך היציאה, אנא נסה שנית');
        }     
      );
    } catch (err) {
      console.error('Logout failed. Error:', err);
      alert('ארעה שגיאה בתהליך היציאה, אנא נסה שנית');
    }
  }

  options(label: string) {
    console.log(label);
    const user = this.user;
    console.log(user);
    if (this.user)
      this.router.navigate(['/register/edit'], { state: { user } });
  }
}
