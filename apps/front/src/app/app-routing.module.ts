import { NgModule } from '@angular/core';
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
import { TaskReportComponent } from './reports/task-report/task-report.component';
import { EmployeesTableComponent } from './pages/employees-table/employees-table.component';
// import { CommunicationClientComponent } from './pages/client/communication-client/communication-client.component';
import { EditorComponent } from './editor/editor.component';
import { TaskComponent } from './task/task.component';
import { MeetComponent } from './meet/meet.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ClientAddCommunicationComponent } from './pages/client/client-add-communication/client-add-communication.component';
import { ClientBillingsComponent } from './pages/client/client-billings/client-billings.component';
import { TaskInListComponent } from './task-in-list/task-in-list.component';
import { icons } from './icons';
import { AllCommunicationComponent } from './pages/client/all-communication/all-communication.component';
import { PaymentsReportsComponent } from './reports/payments-reports/payments-reports.component';
import { SensitiveDetailsComponent } from './pages/client/sensitive-details/sensitive-details.component';
import { WorkLogComponent } from './pages/WorkLog/work-log.component';
import { ClientTypeTagComponent } from './pages/client/client-type-tag/client-type-tag.component';
import { ClientTypeTabComponent } from './pages/client/client-type-tab/client-type-tab.component';
import { ClientFieldComponent } from './pages/client/client-field/client-field.component';
import { ClientTypeComponent } from './pages/client/client-type/client-type.component';
import { TaskCheckListComponent } from './task-check-list/task-check-list.component';
import { FavoritesClientsListComponent } from './pages/favorites-clients-list/favorites-clients-list.component';
import { MonthlyReportComponent } from './pages/client/monthly-report/monthly-report.component';
import { TaxRefundsComponent } from './pages/client/tax-refunds/tax-refunds.component';
import { FinancialStatementComponent } from './pages/client/client-financialStatement/financial-statement.component';
import { YearlyReportComponent } from './pages/client/client-yearlyReport/yearly-report.component';
import { CreateYearlyReportComponent } from './pages/client/client-create-yearly-report/create-yearly-report.component';
import { YearlyReportStepsComponent } from './pages/client/client-yearly-report-steps/yearly-report-steps.component';
import { PaymentComponent } from './pages/client/payment/payment.component';
import { TaskRepeatableListComponent } from './task-repeatable-list/task-repeatable-list.component';
import { TypeClientCreateComponent } from './pages/client/type-client-edit-create/type-client-create.component';
import { AddClientComponent } from './pages/client/add-client/add-client.component';

import { TaxRefundsStepsComponent } from './pages/client/tax-refunds-steps/tax-refunds-steps.component';
// import { MeetComponent } from './meet/meet.component';
// import { TaskInListComponent } from './task-in-list/task-in-list.component';
// import { CalendarComponent } from './calendar/calendar.component';
// import { icons } from './icons';
import { customfieldComponent } from './custom-field/custom-field.component';
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
import { EditClientYearlyReportComponent } from './pages/Manager/edit-client-yearly-report/edit-client-yearly-report.component';
import { ManagerNavbarComponent } from './pages/Manager/edit-client-yearly-report/manager-navbar/manager-navbar.component';
import { EditClientTaxRefunedComponent } from './pages/Manager/edit-client-yearly-report/edit-client-tax-refuned/edit-client-tax-refuned.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { TableComponent } from './table/table.component';
import { ReportClientYearlyReportComponent } from './clientReport/report-client-yearly-report/report-client-yearly-report.component';
import { ClientTasksComponent } from './pages/client/client-tasks/client-tasks.component';
import { PopAppComponent } from './pop_up/task-pop-app/pop-app.component';
import { CreatePaymentComponent } from './pages/client/create-payment/createPayment.component';
import { BillingHistoryComponent } from './pages/client/billing-history/billingHistory.component';
import { PaymentDetailsHistoryComponent } from './pages/client/payment-details-history/paymentDetailsHistory.component';
import { AddBillingComponent } from './pages/client/addBilling/addBilling.component';
import { ChangeMainPaymentComponent } from './pages/client/changeMainPayment/changeMainPayment.component';
import { RouterModule, Routes } from '@angular/router';
import { AddMorePaymentDetailsComponent } from './pages/client/addMorePaymentDetails/addMorePaymentDetails.component';
import { ClientCreateFinancialStatementComponent } from './pages/client/client-create-financialStatement/client-create-financial-statement.component';
import { FinancialStatementStepsComponent } from './pages/client/client-financial-statement-steps/financial-statement-steps.component';
import { CreateMonthlyReportComponent } from './pages/client/client-create-monthly-report/create-monthly-report.component';
import { ClientCreateTaxRefunds } from './pages/client/client-create-tax-refunds/client-create-tax-refunds.component';
import { EditMonthlyReportComponent } from './pages/Manager/edit-monthly-report/edit-monthly-report.component';
// import * as path from 'path';
// import * as path from 'path';

//
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { authType: 10, forToolbar: false, label: 'בית', icon: icons.home },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { authType: 10, forToolbar: false, label: 'התחברות', icon: '' },
  },
  {
    path: 'register/:type',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      authType: 3,
      forToolbar: false,
      label: 'הוספת עובד',
      icon: icons.register,
    },
  },
  // { path: 'user', component: BoardUserComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'עובד', icon: icons.user } },
  {
    path: 'mod',
    component: BoardModeratorComponent,
    canActivate: [AuthGuard],
    data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' },
  },
  // { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: true, label: 'מנהל', icon: icons.admin } },
  {
    path: 'tasks',
    component: TaskManagementComponent,
    children: [{ path: 'task-in-list', component: TaskInListComponent }],
    canActivate: [AuthGuard],
    data: { authType: 6, forToolbar: true, label: 'משימות', icon: icons.tasks },
  },
  { path: 'taskSpe/:id', component: TaskComponent }, //, canActivate: [AuthGuard], data: { authType: 6, forToolbar: false, label: 'TaskSpe', icon: icons.tasks }, children: [ { path: 'create', component: TaskComponent }, { path: ':id', component: TaskComponent } ]
  // { path: 'taskRpe', component: TaskRepeatableListComponent },

  {
    path: 'forget-password',
    component: ForgotPasswordComponent,
    data: { authType: 6, forToolbar: false, label: 'שכחתי סיסמה', icon: '' },
  },
  { path: 'restartPassword/:email', component: RestartPasswordComponent },
  {
    path: 'meet',
    component: MeetComponent,
    canActivate: [AuthGuard],
    data: { authType: 6 },
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
    data: {
      authType: 6,
      forToolbar: true,
      label: 'לוח שנה',
      icon: icons.calendar,
    },
  },
  {
    path: 'table',
    component: TableComponent,
    canActivate: [AuthGuard],
    data: {
      authType: 3,
      forToolbar: true,
      label: 'יצוא לאקסל',
      icon: icons.export,
    },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      authType: 3,
      forToolbar: true,
      label: 'דוחות',
      icon: icons.reports,
      list: true,
    },
    children: [
      // { path: '', redirectTo: 'task-report', pathMatch: 'full' },
      {
        path: 'task-report',
        component: TaskReportComponent,
        data: {
          authType: 10,
          forToolbar: false,
          label: 'דוח משימות',
          icon: icons.reports,
        },
      },
      {
        path: 'payments',
        component: PaymentsReportsComponent,
        data: {
          authType: 10,
          forToolbar: false,
          label: 'דוח תשלומים',
          icon: icons.reports,
        },
      },
      {
        path: 'workLogComponent',
        component: WorkLogComponent,
        canActivate: [AuthGuard],
        data: {
          authType: 6,
          forToolbar: true,
          label: 'דוח שעות',
          icon: icons.clock,
        },
      },
    ],
  },

  {
    path: 'employeesTable',
    component: EmployeesTableComponent,
    canActivate: [AuthGuard],
    data: {
      authType: 3,
      forToolbar: true,
      label: 'עובדים',
      icon: icons.employees,
    },
  },
  // {
  //   path: 'createPayment',
  //   component: CreatePaymentComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     authType: 6,
  //     forToolbar: true,
  //     label: 'יצירת תשלום',
  //     icon: icons.employees,
  //   },
  // },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: { forToolbar: false, label: '#', icon: '' },
  },
  // { path: 'communicationLogs', component: CommunicationLogsComponent, data: { authType: 6, forToolbar: true, label: 'Communication Logs', icon: icons.comment } },
  {
    path: 'clientSearch',
    component: ClientSearchComponent,
    data: {
      authType: 3,
      forToolbar: false,
      label: 'חיפשו לקוח',
      icon: icons.search,
    },
  },
  {
    path: 'clientReport',
    data: {
      authType: 6,
      forToolbar: true,
      label: 'דוחות ללקוח',
      icon: icons.reports,
      list: true,
    },
    children: [
      {
        path: 'allClientYearrlyReport',
        component: ReportClientYearlyReportComponent,
        data: {
          authType: 6,
          forToolbar: false,
          label: 'דוחות שנתיים',
          icon: icons.reports,
        },
      },
      {
        path: 'allClientMonthlyReport',
        component: MonthlyReportComponent,
        data: {
          authType: 6,
          forToolbar: false,
          label: 'דוחות חודשיים',
          icon: icons.reports,
        },
      },
      {
        path: 'allClientTaxRefunds',
        component: TaxRefundsComponent,
        data: {
          authType: 6,
          forToolbar: false,
          label: 'החזרי מס/ שבח',
          icon: icons.reports,
        },
      },
      {
        path: 'allClientFinancialStatement',
        component: FinancialStatementComponent,
        data: {
          authType: 6,
          forToolbar: false,
          label: ' הצהרות הון',
          icon: icons.reports,
        },
      },
    ],
  },
  //{ path: 'clientSearch/clientManagement', component: ClientManagementComponent, data: { authType: 3, forToolbar: true, label: 'Client Management', icon: icons.clients }, children: [ { path: 'clientProfile', component: ClientProfileComponent }, { path: 'clientNavbar', component: ClientNavbarComponent, children: [ { path: 'uploadDoc', component: ClientUploadDocComponent }, { path: 'taskManagement', component: TaskManagementComponent }, { path: 'billings', component: BillingsComponent } ] } ] }
  {
    path: 'clientSearch',
    // component: ClientSearchComponent,
    data: {
      authType: 6,
      forToolbar: true,
      label: 'לקוחות',
      icon: icons.clients,
      list: true,
    },
    children:[
      {
        path: 'fieldMamagement',
        component: FieldManagementComponent,
        data: { authType: 3, forToolbar: true, label: 'ניהול שדות', icon: '' },
      },
      {
        path:'clientSearch',
        component: ClientSearchComponent,
        data: { authType: 3, forToolbar: true, label: ' טבלת לקוחות', icon: '' },
      },
      {
        path: 'createPayment',
        component: CreatePaymentComponent,
        canActivate: [AuthGuard],
        data: {
          authType: 6,
          forToolbar: true,
          label: 'יצירת תשלום',
          icon: icons.employees,
        },
      },
    ]
  },
  {
    path: 'favoritesClientsList',
    component: FavoritesClientsListComponent,
    data: {
      authType: 6,
      forToolbar: false,
      label: 'לקוחות מועדפים',
      icon: icons.favorite,
    },
  },
  {
    path: 'clientSearch/clientManagement',
    component: ClientManagementComponent,
    data: { authType: 6, forToolbar: false, label: 'ניהול לקוחות', icon: '' },
  },

  {
    path: 'clientProfile',
    component: ClientProfileComponent,
    data: { authType: 6, forToolbar: false, label: 'פרופיל לקוח', icon: '' },
  },
  {
    path: 'clientSearch/clientManagement/clientNavbar',
    component: ClientNavbarComponent,
    data: { authType: 6, forToolbar: false, label: 'Mod', icon: '' },
    children: [
      {
        path: 'clientCommunicationLogs',
        component: ClientCommunicationLogsComponent,
      },
      { path: 'clientUploadDoc', component: ClientUploadDocComponent },
      { path: 'clientTasks', component: ClientTasksComponent },
      {
        path: 'payments',
        component: PaymentComponent,
        children: [
          { path: 'billingHistory', component: BillingHistoryComponent },
          {
            path: 'paymentDetailsHistory',
            component: PaymentDetailsHistoryComponent,
          },
          { path: 'addBilling', component: AddBillingComponent },
          { path: 'changeMainPayment', component: ChangeMainPaymentComponent },
          {
            path: 'addMorePaymentDetails',
            component: AddMorePaymentDetailsComponent,
          },
        ],
      },
      { path: 'clientBillings', component: ClientBillingsComponent },
      { path: 'clientTypeTab', component: ClientTypeTabComponent },
      { path: 'clientType', component: ClientTypeComponent },
      { path: 'clientTypeTag', component: ClientTypeTagComponent },
      { path: 'clientField', component: ClientFieldComponent },
      { path: 'createYearlyReport', component: CreateYearlyReportComponent },
      { path: 'createYearlyReport', component: CreateYearlyReportComponent },
      { path: 'createFinancialStatement', component: ClientCreateFinancialStatementComponent },
      { path: 'steps', component: YearlyReportStepsComponent },
      { path: 'stepsFS', component: FinancialStatementStepsComponent },
      {
        path: 'yearlyReport',
        component: YearlyReportComponent,
        children: [
          {
            path: 'steps',
            component: YearlyReportStepsComponent,
            children: [
              {
                path: 'createYearlyReport',
                component: CreateYearlyReportComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'financialStatement',
        component: FinancialStatementComponent,
        children: [
          {
            path: 'stepsFS',
            component: FinancialStatementStepsComponent,
            children: [
              {
                path: 'createFinancialStatement',
                component: ClientCreateFinancialStatementComponent,
              },
            ],
          },
        ],
      },
      { path: 'taxRefunds', component: TaxRefundsComponent },
      { path: 'taxrefundsteps', component: TaxRefundsStepsComponent },
      { path: 'monthlyReport', component: MonthlyReportComponent },
      { path: 'createMonthlyReport', component: CreateMonthlyReportComponent },
      { path: 'createTaxRefunds', component: ClientCreateTaxRefunds },
      { path: 'financialStatement', component: FinancialStatementComponent },
      { path: 'sensitiveDetails', component: SensitiveDetailsComponent },
    ],
  },
  // { path: 'monthlyReport',component: MonthlyReportComponent, data:{ authType: 10, forToolbar: false, label: 'Mod', icon: '' }},
  // { path: 'yearlyReport',component: YearlyReportComponent, data:{ authType: 10, forToolbar: false, label: 'Mod', icon: '' }},
  {
    path: 'allCommunication',
    component: AllCommunicationComponent,
    canActivate: [AuthGuard],
    data: {
      authType: 3,
      forToolbar: true,
      label: 'כלל השיחות',
      icon: icons.communications,
    },
  },
  {
    path: 'clientAddCommunication',
    component: ClientAddCommunicationComponent,
    canActivate: [AuthGuard],
    data: { authType: 6, forToolbar: false, icon: '' },
  },
  {
    path: 'sensitiveDetails',
    component: SensitiveDetailsComponent,
    canActivate: [AuthGuard],
    data: { authType: 6, forToolbar: false, icon: '' },
  },
  // { path: 'workLogComponent', component: WorkLogComponent, canActivate: [AuthGuard], data: { authType: 6, forToolbar: true, label: 'דוח שעות', icon: icons.clock } },
  { path: 'checklist', component: TaskCheckListComponent },
  { path: 're', component: TaskRepeatableListComponent },
  { path: 'da', component: DashboardAdminComponent },
  { path: 'du', component: DashboardUserComponent },

  { path: 'checklist', component: TaskCheckListComponent },
  { path: 'addClient', component: AddClientComponent, data: { authType: 6 } },

  {
    path: 'clientTypes',
    component: ClientTypeComponent,
    canActivate: [AuthGuard],
    data: { authType: 3, forToolbar: false, icon: '' },
  },
  // {
  //   path: 'fieldMamagement',
  //   component: FieldManagementComponent,
  //   data: { authType: 3, forToolbar: true, label: 'ניהול שדות', icon: '' },
  // },
  {
    path: 'manager',
    component: ManagerNavbarComponent,
    data: { authType: 3, forToolbar: true, icon: icons.manager, label: 'מנהל' },
    children: [
      { path: 'editClientYearlyReport', component: EditClientYearlyReportComponent },
      { path: 'editTaxRefuned', component: EditClientTaxRefunedComponent },
      { path: 'editMonthlyReport', component: EditMonthlyReportComponent }

    ]
  },
  { path: 'steps', component: YearlyReportStepsComponent },
  { path: 'stepsFS', component: FinancialStatementStepsComponent },
  { path: 'steps/createYearlyReport', component: CreateYearlyReportComponent },
  {
    path: 'stepsFS/createFinancialStatement',
    component: ClientCreateFinancialStatementComponent,
  },
  { path: 'popup/:id', component: PopAppComponent },

  , { path: 'clientTypes', component: ClientTypeComponent, canActivate: [AuthGuard], data: { authType: 3, forToolbar: false, icon: '' } },
  // { path: 'fieldMamagement', component: FieldManagementComponent, data: { authType: 3, forToolbar: true, label: 'ניהול שדות', icon: '' } },
  // {
  //   path: 'manager', component: ManagerNavbarComponent, data: { authType: 3, forToolbar: true, icon: icons.manager, label: "מנהל" },
  //   children: [
  //     { path: 'editClientYearlyReport', component: EditClientYearlyReportComponent },
  //     { path: 'editTaxRefuned', component: EditClientTaxRefunedComponent }
  //   ]
  // },
  { path: 'createYearlyReport', component: CreateYearlyReportComponent, },
  { path: 'createFinancialStatement', component: ClientCreateFinancialStatementComponent, },
  { path: 'popup/create', component: PopAppComponent },
  {
    path: 'steps',
    component: YearlyReportStepsComponent,
    children: [
      { path: 'createYearlyReport', component: CreateYearlyReportComponent },
    ],
  },
  {
    path: 'stepsFS',
    component: FinancialStatementComponent,
    children: [
      {
        path: 'createFinancialStatement',
        component: ClientCreateFinancialStatementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export class AppRoutingModule {}
