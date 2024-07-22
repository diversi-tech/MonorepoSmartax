
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { ToolBarService } from './_services/tool-bar.service';
import { TokenService } from './_services/token.service';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { DialogModule } from 'primeng/dialog';
import { PopupNotificationComponent } from "./popUp-socket/popUp-socket.component";
// import { WebSocketService } from './_services/webSocket.service';

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
  imports: [LoginComponent, RouterLinkActive, RouterLink, ToolBarComponent, RouterOutlet, ToolBarComponent, DialogModule, PopupNotificationComponent]
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  toolbarItems: any[] = [];
  // 
  

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private toolbarService: ToolBarService,
    private tokenServise: TokenService,
    private router: Router,
    // private webSocketService: WebSocketService,
    // private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.tokenServise.getToken();
      const currentRole = this.tokenServise.getCurrentDetail("role")
      this.toolbarItems = this.toolbarService.getCurrentItems(currentRole.level)
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
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
    try{
      this.authService.logout().subscribe(
        (status: number) => {
          console.log('Logout successful. Status:', status);
          this.storageService.clean();
          this.router.navigate(["/login"]);
        },
        (error: any) => {
          console.error('Logout failed. Error:', error);
          alert("ארעה שגיאה בתהליך היציאה, אנא נסה שנית")
        }
      );

    }catch(err){
      console.error('Logout failed. Error:', err);
      alert("ארעה שגיאה בתהליך היציאה, אנא נסה שנית")
    }
  
  }
}