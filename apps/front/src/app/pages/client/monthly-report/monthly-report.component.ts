
// import { Component, Inject, numberAttribute } from '@angular/core';
// import { Injectable, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DropdownModule } from 'primeng/dropdown';
// import { ButtonModule } from 'primeng/button';
// import { TableModule } from 'primeng/table';
// import { MonthlyReportService } from '../../../_services/monthlyReport.service';
// import { MonthlyReport } from '../../../_models/monthlyReport.module';
// import { Client } from '../../../../../../../server/src/Models/client.model';
// import { TreeTableModule } from 'primeng/treetable';
// import { stepFieldMonth } from '../../../_models/stepFieldMonth.module';
// import { YearService } from '../../../_services/year.service';
// import { Year } from '../../../_models/year.module';
// import { ActivatedRoute } from '@angular/router';
// import { Router, RouterOutlet } from '@angular/router';
// import { DialogModule } from 'primeng/dialog';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { InputOtpModule } from 'primeng/inputotp';
// import { Status } from '../../../_models/status.module';
// import { TokenService } from '../../../_services/token.service';
// import { User } from '../../../../../../../server/src/Models/user.model';
// import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
// import Swal from 'sweetalert2';
// @Component({
//   selector: 'app-monthly-report',
//   standalone: true,
//   imports: [
//     CommonModule,
//     DropdownModule,
//     FormsModule,
//     TableModule,
//     ButtonModule,
//     TreeTableModule,
//     RouterOutlet,
//     DropdownModule,
//     CommonModule,
//     ButtonModule,
//     InputOtpModule,
//     AutoCompleteModule,
//     ReactiveFormsModule,
//     DialogModule,
//     InputNumberModule
//   ],
//   templateUrl: './monthly-report.component.html',
//   styleUrl: './monthly-report.component.css',
// })
// @Injectable({
//   providedIn: 'root',
// })
// export class MonthlyReportComponent implements OnInit {


//   constructor(private monthlyReportService: MonthlyReportService,
//     private yearService: YearService,
//     private tokenService: TokenService,
//     private route: ActivatedRoute, private router: Router,
//   ) {
//     this.currentRoute = this.route.snapshot.url.join('/');
//     console.log('Current route path:', this.currentRoute);
//   }
//   ngOnInit(): void {
//     this.client = history.state.client;
//     this.user = this.tokenService.getCurrentDetail('_id');
//     this.yearService.getAllYear().subscribe({
//       next: (data) => {
//         this.yearList = data;
//         this.yearList2 = data;
//         console.log('Year list:', this.yearList);
//       },
//       error: (error) => {
//         console.log('Error fetching year list:', error);
//       },
//     });
//     if (this.currentRoute === "allClientMonthlyReport") {
//       this.getMonthlyReports();
//     } else {
//       this.getMonthlyReportsForClient();
//     }
//   }

//   user: User;
//   yearList: Year[] = [];
//   selectedYear: Year;
//   yearList2: Year[];
//   selectedyear: Year | null = null;
//   thisSubject2 = "";
//   is: boolean = false;
//   thisSubject = "";
//   Year2: any[] = [{ yearNum: "לא נמצא" }];
//   createdYear: Year;
//   months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
//   selectedMonth: any;
//   createdMonth: any;
//   allMonthlyReportsClient: MonthlyReport[] | undefined;
//   client: Client;
//   clientId: string;
//   allMonthlyReports: MonthlyReport[] | undefined;
//   myReport: MonthlyReport | undefined;
//   y: boolean = false;
//   types: string[] = [];
//   steps: any[];
//   allFields: stepFieldMonth[];
//   fieldByType: { [key: string]: stepFieldMonth[] } = {};
//   currentRoute: string;
//   create: boolean = false;
//   fieldBymonths: stepFieldMonth[];
//   visible: boolean = false;
//   statuses: Status[] = [];
//   newYear: Year = {
//     yearNum: ""
//   }
//   showDialog() {
//     this.visible = true;
//   }
//   filterByyear(value: string): void {
//     console.log(this.yearList2, '2')
//     if (value != "") {
//       this.is = false
//       const query = value.toLowerCase();
//       this.yearList2 = this.yearList.filter(year =>
//         year.yearNum.toLowerCase().includes(query.toLowerCase())
//       );
//       if (this.yearList2.length == 0) {
//         this.yearList2 = this.Year2
//         this.thisSubject2 = value
//         this.is = true;
//       }
//     }
//     else {
//       this.is = false
//       console.log(this.yearList, '1')
//       this.yearList2 = this.yearList;
//     }
//     this.selectedyear = null;

//   }

//   select(event: AutoCompleteSelectEvent): void {
//     const year = event.value as Year;
//     this.thisSubject = year.yearNum
//   }

//   add() {
//     alert(this.thisSubject2)
//     this.newYear.yearNum = this.thisSubject2
//     this.yearService.createYear(this.newYear).subscribe(
//       response => {
//         if (response) {
//           this.yearList.push(response);
//           Swal.fire('Success', ' שנה נוספה בהצלחה', 'success');
//         }
//       },
//       error => {
//         console.error('שגיאה ביצירת שנה:', error);
//         alert('לא ניתן להוסיף שנה. שגיאה בקישור לשרת.');
//       }
//     );
//   }
//   getMonthlyReportsForClient(): void {
//     const clientId = String(this.client._id);
//     console.log('Fetching monthly reports for client ID:', clientId); // Log the client ID
//     this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe({
//       next: (reports: any) => {
//         this.allMonthlyReportsClient = reports;
//         console.log('Monthly reports for client:', this.allMonthlyReportsClient); // Log the reports
//       },
//       error: (error) => {
//         console.error('Error fetching monthly reports for client', error);
//       }
//     });
//   }

//   // getMonthlyReportsForClient(): void {
//   //   const clientId = String(this.client._id);
//   //   this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe({
//   //     next: (reports: any) => {
//   //       this.allMonthlyReportsClient = reports;
//   //       console.log(this.allMonthlyReportsClient);

//   //       // console.log(Number(this.selectedYear.yearNum), Number(this.selectedMonth), "year, month");
//   //       // this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear))[0];

//   //     },
//   //     error: (error) => {
//   //       console.error('Error fetching monthly reports for client', error);
//   //     }
//   //   });
//   // }
//   getMonthlyReports(): void {
//     this.monthlyReportService.getAllMonthlyReport().subscribe(
//       (reports) => {
//         this.allMonthlyReports = reports;
//       },
//       (error) => {
//         console.error('Error fetching yearly reports for client', error);
//       }
//     );
//   }

//   getStepByType(type: string): void {
//     this.steps = this.allMonthlyReports.map((r) =>
//       r.monthlyReportFields.filter((r) => r.type === type)
//     );
//     console.log(this.steps, 'steps');
//   }
//   changeDate() {
    
//     if (this.currentRoute === "allClientMonthlyReport") {
//       this.myReport = this.getREportByMonth(this.allMonthlyReports, this.selectedYear, this.selectedMonth);
//     }
//     else {
//       this.myReport = this.getREportByMonth(this.allMonthlyReportsClient, this.selectedYear, this.selectedMonth)[0];

//     }
//     if (this.myReport) {
//       this.fieldBymonths = this.myReport.monthlyReportFields;
//     }
//     else {
//       this.fieldBymonths = [];
//       console.log("gggggg");
      
//     }
//   }
//   getREportByMonth(data: any, year: Year, month: string) {
//     return data.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(month) && new Date(m.reportDate).getFullYear() === Number(year.yearNum));
//   }
//   onSubmit() {
//     if (!this.getREportByMonth(this.allMonthlyReports, this.createdYear, this.createdMonth)) {
//       this.monthlyReportService.createMonthlyReport({ reportDate: new Date(`${this.createdYear.yearNum}-${this.createdMonth}-01`), idUser: this.client._id, idEmploye: this.user, monthlyReportFields: [], status: [] })
//         .subscribe({
//           next: (data) => {
//             console.log('Monthly report created successfully', data);
//             this.allMonthlyReportsClient.push(data);
//             this.selectedYear = this.createdYear;
//             this.selectedMonth = this.createdMonth;
//             this.changeDate();
//           },
//           error: (error) => {
//             console.log(error);
//           },
//         },
//         );;
//     }
//     else {
//       alert("Monthly report already exist");
//     }
//   }
//   update() {
//     this.myReport.monthlyReportFields = this.fieldBymonths
//     this.monthlyReportService.updateMonthlyReport(this.myReport._id, this.myReport)
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MonthlyReportService } from '../../../_services/monthlyReport.service';
import { MonthlyReport } from '../../../_models/monthlyReport.module';
import { Client } from '../../../../../../../server/src/Models/client.model';
import { TreeTableModule } from 'primeng/treetable';
import { stepFieldMonth } from '../../../_models/stepFieldMonth.module';
import { YearService } from '../../../_services/year.service';
import { Year } from '../../../_models/year.module';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputOtpModule } from 'primeng/inputotp';
import { Status } from '../../../_models/status.module';
import { TokenService } from '../../../_services/token.service';
import { User } from '../../../../../../../server/src/Models/user.model';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TreeTableModule,
    ReactiveFormsModule,
    DialogModule,
    InputNumberModule,
    InputOtpModule,
    AutoCompleteModule
  ],
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css'],
})
export class MonthlyReportComponent implements OnInit {

  user: User;
  yearList: Year[] = [];
  selectedYear: Year;
  yearList2: Year[];
  selectedyear: Year | null = null;
  thisSubject2 = "";
  is: boolean = false;
  thisSubject = "";
  Year2: any[] = [{ yearNum: "לא נמצא" }];
  createdYear: Year;
  months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  selectedMonth: any;
  createdMonth: any;
  allMonthlyReportsClient: MonthlyReport[] | undefined;
  client: Client;
  clientId: string;
  allMonthlyReports: MonthlyReport[] | undefined;
  myReport: MonthlyReport | undefined;
  y: boolean = false;
  types: string[] = [];
  steps: any[];
  allFields: stepFieldMonth[];
  fieldByType: { [key: string]: stepFieldMonth[] } = {};
  currentRoute: string;
  create: boolean = false;
  fieldBymonths: stepFieldMonth[];
  visible: boolean = false;
  statuses: Status[] = [];
  newYear: Year = { yearNum: "" }

  constructor(private monthlyReportService: MonthlyReportService,
    private yearService: YearService,
    private tokenService: TokenService,
    private route: ActivatedRoute, private router: Router,
  ) {
    this.currentRoute = this.route.snapshot.url.join('/');
    console.log('Current route path:', this.currentRoute);
  }

  ngOnInit(): void {
    this.client = history.state.client;
    this.user = this.tokenService.getCurrentDetail('_id');
    this.yearService.getAllYear().subscribe({
      next: (data) => {
        this.yearList = data;
        this.yearList2 = data;
        console.log('Year list:', this.yearList);
      },
      error: (error) => {
        console.log('Error fetching year list:', error);
      },
    });
    if (this.currentRoute === "allClientMonthlyReport") {
      this.getMonthlyReports();
    } else {
      this.getMonthlyReportsForClient();
    }
  }

  showDialog() {
    this.visible = true;
  }

  filterByyear(value: string): void {
    if (value != "") {
      this.is = false;
      const query = value.toLowerCase();
      this.yearList2 = this.yearList.filter(year =>
        year.yearNum.toLowerCase().includes(query)
      );
      if (this.yearList2.length == 0) {
        this.yearList2 = this.Year2;
        this.thisSubject2 = value;
        this.is = true;
      }
    } else {
      this.is = false;
      this.yearList2 = this.yearList;
    }
    this.selectedyear = null;
  }

  select(event: AutoCompleteSelectEvent): void {
    const year = event.value as Year;
    this.thisSubject = year.yearNum;
    console.log('Selected year:', year);
  }

  add() {
    this.newYear.yearNum = this.thisSubject2;
    this.yearService.createYear(this.newYear).subscribe(
      response => {
        if (response) {
          this.yearList.push(response);
          Swal.fire('Success', 'שנה נוספה בהצלחה', 'success');
        }
      },
      error => {
        console.error('Error adding year:', error);
        alert('לא ניתן להוסיף שנה. שגיאה בקישור לשרת.');
      }
    );
  }

  getMonthlyReportsForClient(): void {
    const clientId = String(this.client._id);
    console.log('Fetching monthly reports for client ID:', clientId);
    this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe({
      next: (reports: any) => {
        this.allMonthlyReportsClient = reports;
        console.log('Monthly reports for client:', this.allMonthlyReportsClient);
      },
      error: (error) => {
        console.error('Error fetching monthly reports for client', error);
      }
    });
  }

  getMonthlyReports(): void {
    this.monthlyReportService.getAllMonthlyReport().subscribe(
      (reports) => {
        this.allMonthlyReports = reports;
        console.log('All monthly reports:', this.allMonthlyReports);
      },
      (error) => {
        console.error('Error fetching all monthly reports:', error);
      }
    );
  }

  getStepByType(type: string): void {
    this.steps = this.allMonthlyReports?.map((r) =>
      r.monthlyReportFields.filter((r) => r.type === type)
    ) || [];
    console.log('Steps:', this.steps);
  }

  changeDate() {
    if (this.currentRoute === "allClientMonthlyReport") {
      this.myReport = this.getREportByMonth(this.allMonthlyReports, this.selectedYear, this.selectedMonth);
    } else {
      this.myReport = this.getREportByMonth(this.allMonthlyReportsClient, this.selectedYear, this.selectedMonth)[0];
    }
    if (this.myReport) {
      this.fieldBymonths = this.myReport.monthlyReportFields;
    } else {
      this.fieldBymonths = [];
      console.log("No report found for the selected month and year.");
    }
  }

  getREportByMonth(data: any, year: Year, month: string) {
    return data?.filter(m =>
      new Date(m.reportDate).getMonth() + 1 === Number(month) &&
      new Date(m.reportDate).getFullYear() === Number(year.yearNum)
    ) || [];
  }

  onSubmit() {
    if (!this.getREportByMonth(this.allMonthlyReports, this.createdYear, this.createdMonth).length) {
      this.monthlyReportService.createMonthlyReport({
        reportDate: new Date(`${this.createdYear.yearNum}-${this.createdMonth}-01`),
        idUser: this.client._id,
        idEmploye: this.user,
        monthlyReportFields: [],
        status: []
      }).subscribe({
        next: (data) => {
          console.log('Monthly report created successfully', data);
          this.allMonthlyReportsClient?.push(data);
          this.selectedYear = this.createdYear;
          this.selectedMonth = this.createdMonth;
          this.changeDate();
        },
        error: (error) => {
          console.log('Error creating monthly report:', error);
        },
      });
    } else {
      alert("Monthly report already exists");
    }
  }

  update() {
    if (this.myReport) {
      this.myReport.monthlyReportFields = this.fieldBymonths;
      this.monthlyReportService.updateMonthlyReport(this.myReport._id, this.myReport)
        .then((data) => {
          console.log('Monthly report updated successfully', data);
        })
        .catch((error) => {
          console.error('Error updating monthly report:', error);
        });
    } else {
      console.warn('No report to update');
    }
  }
  
}
