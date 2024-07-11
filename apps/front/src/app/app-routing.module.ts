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
import { ReportsComponent } from './reports/reports/reports.component';
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
import { YearlyReportComponent } from './pages/client/yearlyReport/yearly-report.component';
import { AllCommunicationComponent } from './pages/client/all-communication/all-communication.component';
import { PaymentsReportsComponent } from './reports/payments-reports/payments-reports.component';
import { TaskRepeatableListComponent } from './task-repeatable-list/task-repeatable-list.component';

import { ClientTypeTagComponent } from './pages/client/client-type-tag/client-type-tag.component';
import { ClientTypeTabComponent } from './pages/client/client-type-tab/client-type-tab.component';
import { ClientFieldComponent } from './pages/client/client-field/client-field.component';
import { ClientTypeComponent } from './pages/client/client-type/client-type.component';
import { TaskCheckListComponent } from './task-check-list/task-check-list.component';
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
import { FieldManagementComponent } from './pages/fieldManagement/fieldManagement.component';
// import * as path from 'path';

//
 export const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { authType: 10, forToolbar: false, label: 'בית', icon: icons.home } }, 
  { path: 'login', component: LoginComponent, data: { authType: 10, forToolbar: false, label: 'התחברות', icon: '' } }, 
  { path: 'register/:type', component: RegisterComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: false, label: 'הוספת עובד', icon: icons.register } },
  { path: 'user', component: BoardUserComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'עובד', icon: icons.user } }, 
  { path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard], data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' } },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'מנהל', icon: icons.admin } },
  { path: 'tasks', component: TaskManagementComponent, children: [{ path: 'task-in-list', component: TaskInListComponent }], canActivate: [AuthGuard], data: { authType: 6, forToolbar: true, label: 'משימות', icon: icons.tasks } },
  { path: 'taskSpe/:id', component: TaskComponent },//, canActivate: [AuthGuard], data: { authType: 6, forToolbar: false, label: 'TaskSpe', icon: icons.tasks }, children: [ { path: 'create', component: TaskComponent }, { path: ':id', component: TaskComponent } ]
  { path: 'taskRpe', component: TaskRepeatableListComponent },
  { path: 'forget-password', component: ForgotPasswordComponent, data: { authType: 6, forToolbar: false, label: 'שכחתי סיסמה', icon: '' } },
  { path: 'restartPassword/:email', component: RestartPasswordComponent, data: { forToolbar: false, label: 'איפוס סיסמה', icon: '' } },
  { path: 'meet', component: MeetComponent, canActivate: [AuthGuard], data: { authType: 6 } },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard], data: { authType: 6 } },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: { authType: 3, forToolbar: true, label: 'דוחות', icon: icons.reports },
    children: [
      // { path: '', redirectTo: 'task-report', pathMatch: 'full' },
      { path: 'task-report', component: TaskReportComponent,data: { authType: 10, forToolbar: false, label: 'דוח משימות', icon: icons.reports } },
      { path: 'payments', component: PaymentsReportsComponent, data: { authType: 10, forToolbar: false, label: 'דוח תשלומים', icon: icons.reports } }
    ]
  },
  { path: 'employeesTable', component: EmployeesTableComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'עובדים', icon: icons.employees } },
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { forToolbar: false, label: '#', icon: '' } },
 // { path: 'communicationLogs', component: CommunicationLogsComponent, data: { authType: 6, forToolbar: true, label: 'Communication Logs', icon: icons.comment } },
  { path: 'clientSearch', component: ClientSearchComponent, data: { authType: 3, forToolbar: false, label: 'חיפשו לקוח', icon: icons.search } },
  //{ path: 'clientSearch/clientManagement', component: ClientManagementComponent, data: { authType: 3, forToolbar: true, label: 'Client Management', icon: icons.clients }, children: [ { path: 'clientProfile', component: ClientProfileComponent }, { path: 'clientNavbar', component: ClientNavbarComponent, children: [ { path: 'uploadDoc', component: ClientUploadDocComponent }, { path: 'taskManagement', component: TaskManagementComponent }, { path: 'billings', component: BillingsComponent } ] } ] }
  { path: 'clientSearch', component: ClientSearchComponent , data: { authType: 6, forToolbar: true, label: 'לקוחות', icon: icons.clients }},
  { path: 'clientSearch/clientManagement', component: ClientManagementComponent , data: { authType: 6, forToolbar: false, label: 'ניהול לקוחות', icon: '' }},
  
  { path: 'clientProfile', component: ClientProfileComponent, data: { authType: 6, forToolbar: false, label: 'פרופיל לקוח', icon: '' } },
  {
    path: 'clientSearch/clientManagement/clientNavbar', component: ClientNavbarComponent,
    data: { authType: 6, forToolbar: false, label: 'ניווט לקוח', icon: '' },
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
      { path: 'clientTypeTab' , component:ClientTypeTabComponent},
      { path: 'clientType' , component:ClientTypeComponent},
      { path: 'clientTypeTag' , component:ClientTypeTagComponent},
      { path: 'yearlyReport', component: YearlyReportComponent },

    ]
  },
  {path: 'yearlyReport',component: YearlyReportComponent, data:{ authType: 10, forToolbar: false, label: 'Mod', icon: '' }},
  { path: 'a', component: AllCommunicationComponent },
  { path: 'ae', component: ClientAddCommunicationComponent },
  { path: 'clientTypes', component: ClientTypeComponent,canActivate: [AuthGuard], data:{ authType: 3, forToolbar:false, icon: '' } },
  {path:'checklist', component:TaskCheckListComponent},
  

];


  
  @NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  