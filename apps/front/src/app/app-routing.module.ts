import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import { BoardModeratorComponent } from './pages/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { ClientNavbarComponent } from './pages/client/client-navbar/client-navbar.component';
import { ClientCommunicationLogsComponent } from './pages/client/client-communication-logs/client-communication-logs.component';
//import { ClientTaskManagementComponent } from './pages/client/task-management/task-management.component';
import { TaskManagementComponent } from './pages/task-management/task-management.component';
// import { BillingsComponent } from './pages/client/billings/billings.component';
import { ClientManagementComponent } from './pages/client/client-management/client-management.component';
import { ClientUploadDocComponent } from './pages/client/client-upload-doc/client-upload-doc.component';
import { ForgotPasswordComponent } from './pages/forget-password/forget-password.component';
import { RestartPasswordComponent } from './pages/restart-password/restart-password.component';
import { AuthGuard } from './auth.guard';
import { ClientSearchComponent } from './pages/client/client-search/client-search.component';
import { ClientProfileComponent } from './pages/client/client-profile/client-profile.component';
import { ReportsComponent } from './reports/reports.component';
import { TaskReportComponent } from './task-report/task-report.component';
import { EmployeesTableComponent } from './pages/employees-table/employees-table.component';
// import { CommunicationClientComponent } from './pages/client/communication-client/communication-client.component';
import { EditorComponent } from './editor/editor.component';
import { TaskComponent } from './task/task.component';
import { MeetComponent } from './meet/meet.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ClientAddCommunicationComponent } from './pages/client/client-add-communication/client-add-communication.component';
import { ClientTaskManagementComponent } from './pages/client/client-task-management/client-task-management.component';
import { ClientBillingsComponent } from './pages/client/client-billings/client-billings.component';
import { TaskInListComponent } from './task-in-list/task-in-list.component';
import { icons } from './icons';
import { customfieldComponent } from './custom-field/custom-field.component';
// import { MeetComponent } from './meet/meet.component';
// import { TaskInListComponent } from './task-in-list/task-in-list.component';
// import { CalendarComponent } from './calendar/calendar.component';
// import { icons } from './icons';

// Example of navigation in the application
// Parameters:
// - path: The navigation path in the application
// - component: The component that will be displayed when navigating to this path
// - data: Additional information for the navigation, including the type of authorization, whether it should be displayed in the toolbar, the label name, and icon
// {
//   path: 'home',
//   component: HomeComponent,
//   data: {
//     authType: 10, // Authorization type: 10
//     forToolbar: false, // Display in the toolbar: No
//     label: 'Home', // Label name: 'Home'
//     icon: 'home' // Icon: 'home'
//   }
//for toolBar
//dashboard, clients, tasks, payments, sessions, reports, users, schedule


//
 export const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { authType: 10, forToolbar: false, label: 'Home', icon: icons.home } }, 
  { path: 'login', component: LoginComponent, data: { authType: 10, forToolbar: false, label: 'Login', icon: '' } }, 
  { path: 'register/:type', component: RegisterComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: false, label: 'Add Emplyee', icon: icons.register } },
  { path: 'user', component: BoardUserComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'User', icon: icons.user } }, 
  { path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard], data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' } },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'Admin', icon: icons.admin } },
  { path: 'tasks', component: TaskManagementComponent, children: [{ path: 'task-in-list', component: TaskInListComponent }], canActivate: [AuthGuard], data: { authType: 6, forToolbar: true, label: 'Tasks', icon: icons.tasks } },
  { path: 'taskSpe/:id', component: TaskComponent },//, canActivate: [AuthGuard], data: { authType: 6, forToolbar: false, label: 'TaskSpe', icon: icons.tasks }, children: [ { path: 'create', component: TaskComponent }, { path: ':id', component: TaskComponent } ]
  { path: 'forget-password', component: ForgotPasswordComponent, data: { authType: 6, forToolbar: false, label: 'Forget-Password', icon: '' } },
  { path: 'restartPassword', component: RestartPasswordComponent, data: { forToolbar: false, label: 'Restart-Password', icon: '' } },
  { path: 'meet', component: MeetComponent, canActivate: [AuthGuard], data: { authType: 6 } },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard], data: { authType: 6 } },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'Reports', icon: icons.reports }, children: [ { path: 'task-report', component: TaskReportComponent } ] },
  { path: 'employeesTable', component: EmployeesTableComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'Employees', icon: icons.employees } },
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { forToolbar: false, label: '#', icon: '' } },
 // { path: 'communicationLogs', component: CommunicationLogsComponent, data: { authType: 6, forToolbar: true, label: 'Communication Logs', icon: icons.comment } },
  { path: 'clientSearch', component: ClientSearchComponent, data: { authType: 3, forToolbar: false, label: 'Client Search', icon: icons.search } },
  //{ path: 'clientSearch/clientManagement', component: ClientManagementComponent, data: { authType: 3, forToolbar: true, label: 'Client Management', icon: icons.clients }, children: [ { path: 'clientProfile', component: ClientProfileComponent }, { path: 'clientNavbar', component: ClientNavbarComponent, children: [ { path: 'uploadDoc', component: ClientUploadDocComponent }, { path: 'taskManagement', component: TaskManagementComponent }, { path: 'billings', component: BillingsComponent } ] } ] }
  { path: 'clientSearch', component: ClientSearchComponent , data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' }},
  { path: 'clientSearch/clientManagement', component: ClientManagementComponent , data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' }},
  {path:'custom-field',component:customfieldComponent,data:{authType:3,forToolbar:true,label:'fields',icon:''}},
  { path: 'clientProfile', component: ClientProfileComponent, data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' } },
  {
    path: 'clientSearch/clientManagement/clientNavbar', component: ClientNavbarComponent,
    data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' },
    children: [
      {
        path: 'clientCommunicationLogs', component: ClientCommunicationLogsComponent,
        children: [{ path: 'clientAddCommunication', component: ClientAddCommunicationComponent }
        ]
      },
      { path: 'clientAddCommunicationComponent', component: ClientAddCommunicationComponent },
      { path: 'clientUploadDoc', component: ClientUploadDocComponent },
      { path: 'clientTaskManagement', component: ClientTaskManagementComponent },
      { path: 'clientBillings', component: ClientBillingsComponent },
    ]
  },
];


  
  @NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  