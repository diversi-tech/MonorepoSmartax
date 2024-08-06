  import { Component, Inject, numberAttribute } from '@angular/core';
  import { Injectable, OnInit, inject } from '@angular/core';
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
  import { ActivatedRoute } from '@angular/router';
  import { Router,RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputOtpModule } from 'primeng/inputotp';
import { Status } from '../../../_models/status.module';
import { TokenService } from '../../../_services/token.service';
import { User } from '../../../../../../../server/src/Models/user.model';
import { Component, Inject, numberAttribute } from '@angular/core';
import { Injectable, OnInit, inject } from '@angular/core';
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
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { StepperModule } from 'primeng/stepper';
import { CheckboxModule } from 'primeng/checkbox';
import { InputOtpModule } from 'primeng/inputotp';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { PrimeTemplate } from 'primeng/api';

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
      RouterOutlet,
      DropdownModule,
      CommonModule,
      ButtonModule,
      InputOtpModule,
      ReactiveFormsModule,
      DialogModule,
      InputNumberModule
    ],
    templateUrl: './monthly-report.component.html',
    styleUrl: './monthly-report.component.css',
  })
  @Injectable({
    providedIn: 'root',
  })
  export class MonthlyReportComponent implements OnInit {
  
  
    constructor(private monthlyReportService: MonthlyReportService,
      private yearService: YearService,
      private tokenService:TokenService,
      private route: ActivatedRoute,private router: Router,
    ) {
      this.currentRoute = this.route.snapshot.url.join('/');
      console.log('Current route path:', this.currentRoute);
    }
    ngOnInit(): void {
      this.client = history.state.client;
      this.user=this.tokenService.getCurrentDetail('_id');
      this.yearService.getAllYear().subscribe({
        next: (data) => {
          this.years = data;
          
        },
        error: (error) => {
          console.log(error);
        },
      },
      );
      if (this.currentRoute === "allClientMonthlyReport") {
        this.getMonthlyReports();
      }
      else{
        this.getMonthlyReportsForClient();
      }
    }
    user:User;
    years: Year[] = [];
    selectedYear: Year;
    createdYear: Year;
    months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    selectedMonth: any;
    createdMonth: any;
    allMonthlyReportsClient: MonthlyReport[] | undefined;
    client: Client;
    clientId: string;
    allMonthlyReports: MonthlyReport[] | undefined;
    myReport: MonthlyReport| undefined;
    y: boolean = false;
    types: string[] = [];
    steps: any[];
    allFields: stepFieldMonth[];
    fieldByType: { [key: string]: stepFieldMonth[] } = {};
    currentRoute: string;
    create:boolean=false;
    fieldBymonths: stepFieldMonth[];
    visible: boolean = false;
    statuses: Status[] = [];
    
    showDialog() {
      this.visible = true;
    }
    
    getMonthlyReportsForClient(): void {
      const clientId = String(this.client._id);
      this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe({
        next: (reports: any) => {
          this.allMonthlyReportsClient = reports;
          console.log(this.allMonthlyReportsClient);
          
          // console.log(Number(this.selectedYear.yearNum), Number(this.selectedMonth), "year, month");
          // this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear))[0];
          
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
        },
        (error) => {
          console.error('Error fetching yearly reports for client', error);
        }
      );
    }
  
    getStepByType(type: string): void {
      this.steps = this.allMonthlyReports.map((r) =>
        r.monthlyReportFields.filter((r) => r.type === type)
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
    RouterOutlet,
    StepperModule,
    CheckboxModule,
    InputOtpModule,
    ReactiveFormsModule,
    InputNumberModule,
    AutoCompleteModule,
  ],
  templateUrl: './monthly-report.component.html',
  styleUrl: './monthly-report.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class MonthlyReportComponent implements OnInit {
  newYear: Year = {
    yearNum: ""
  }
  Year2: any[] = [{ yearNum: "לא נמצא" }];
  selectedyear: Year | null = null;
  thisSubject2 = "";
  is: boolean = false;
  thisSubject = "";
  yearList2: Year[];
  years: Year[] = [];
  selectedYear: Year;
  months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  selectedMonth: any;
  allMonthlyReportsClient: MonthlyReport[] | undefined;
  client: Client;
  clientId: string;
  allMonthlyReports: MonthlyReport[] | undefined;
  myReport: MonthlyReport[] | undefined;
  y: boolean = false;
  types: string[] = [];
  steps: any[];
  allFields: stepFieldMonth[];
  fieldByType: { [key: string]: stepFieldMonth[] } = {};
  currentRoute: string;

  fieldBymonths: stepFieldMonth[] = [];
  constructor(private monthlyReportService: MonthlyReportService,
    private yearService: YearService,
    private route: ActivatedRoute, private router: Router
  ) {
    this.currentRoute = this.route.snapshot.url.join('/');
    console.log('Current route path:', this.currentRoute);
  }
  ngOnInit(): void {
    this.client = history.state.client;
    this.yearService.getAllYear().subscribe({
      next: (data) => {
        this.years = data;
        this.yearList2=data;
      },
      error: (error) => {
        console.log(error);
      },
    },
    );
    if (this.currentRoute === "allClientMonthlyReport") {
      this.getMonthlyReports();
    }
    else{
    this.getMonthlyReportsForClient();
    }
    // this.getStepByType('מעם');
  }
  


  getMonthlyReportsForClient(): void {
    const clientId = String(this.client._id);
    this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe({
      next: (reports: any) => {
        this.allMonthlyReportsClient = reports;

      },
      error: (error) => {
        console.error('Error fetching monthly reports for client', error);
      }
    });
  }
  getMonthlyReports(): void {
    debugger
    this.monthlyReportService.getAllMonthlyReport().subscribe({
      next: (reports: any) => {
        this.allMonthlyReports = reports;
        console.log(this.allMonthlyReports, "allmyReport");

      },
      error: (error) => {
        console.error('Error fetching monthly reports', error);
      }
    }

    );
  }

  getStepByType(type: string): void {
    this.steps = this.allMonthlyReports.map((r) =>
      r.monthlyReportFields.filter((r) => r.type === type)
    );
    console.log(this.steps, 'steps');
    }
    changeDate() {
      if (this.currentRoute === "allClientMonthlyReport") {
        this.myReport = this.getREportByMonth(this.allMonthlyReports,this.selectedYear,this.selectedMonth);
      }
      else {
        this.myReport = this.getREportByMonth(this.allMonthlyReportsClient,this.selectedYear,this.selectedMonth)[0];
    
  }
  if (this.myReport) {
    this.fieldBymonths = this.myReport.monthlyReportFields;
      }
      else {
        this.fieldBymonths = [];
      }
    }
    getREportByMonth(data: any,year:Year,month:string){
return data.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(month) && new Date(m.reportDate).getFullYear() === Number(year.yearNum));
    }
    onSubmit(){
      if(!this.getREportByMonth(this.allMonthlyReports,this.createdYear,this.createdMonth)){
        this.monthlyReportService.createMonthlyReport({reportDate:new Date(`${this.createdYear.yearNum}-${this.createdMonth}-01`), idUser:this.client._id,idEmploye:this.user, monthlyReportFields:[],status:[]})
          .subscribe({
            next: (data) => {
              console.log('Monthly report created successfully', data);
              this.allMonthlyReportsClient.push(data);
              this.selectedYear=this.createdYear;
              this.selectedMonth=this.createdMonth;
              this.changeDate();
            },
            error: (error) => {
              console.log(error);
            },
          },
          );;
      }
      else{
        alert("Monthly report already exist");
      }
      }
      update(){
        this.myReport.monthlyReportFields=this.fieldBymonths
        this.monthlyReportService.updateMonthlyReport(this.myReport._id, this.myReport)
      }
    }
  }
  changeDate() {
    debugger
    console.log(this.selectedMonth, this.thisSubject);
    if (this.currentRoute === "allClientMonthlyReport") {
      this.myReport = this.allMonthlyReports.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear.yearNum));
    }
    else {
      this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear.yearNum));
    }
    if (this.myReport) {
console.log(this.myReport, "myReport");
    // this.fieldBymonths = this.myReport.map( m => m.monthlyReportFields);
    }

  }
  createReprtTag(): void {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/createMonthlyReport'], { state: { client: this.client } });

  }
  filterByyear(value: string): void {
    console.log(this.yearList2, '2')
    if (value != "") {
      this.is = false
      const query = value.toLowerCase();
      this.yearList2 = this.years.filter(year =>
        year.yearNum.toLowerCase().includes(query.toLowerCase())
      );
      if (this.yearList2.length == 0) {
        this.yearList2 = this.Year2
        this.thisSubject2 = value
        this.is = true;
      }
    }
    else {
      this.is = false
      console.log(this.years, '1')
      this.yearList2 = this.years;
    }
    this.selectedyear = null;

  }

  select(event: AutoCompleteSelectEvent): void {
    const year = event.value as Year;
    this.thisSubject = year.yearNum
  }

  add() {
    alert(this.thisSubject2)
    this.newYear.yearNum = this.thisSubject2
    this.yearService.createYear(this.newYear).subscribe(
      response => {
        if (response) {
          this.years.push(response);
          alert(response.yearNum + " נוסף בהצלחה");
        }
      },
      error => {
        console.error('שגיאה ביצירת שנה:', error);
        alert('לא ניתן להוסיף שנה. שגיאה בקישור לשרת.');
      }
    );
  }
}