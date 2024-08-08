import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { stepFieldService } from '../../../_services/step_field.service';
import { CheckboxModule } from 'primeng/checkbox';
import { YearlyReport } from '../../../_models/yearlyReport.module';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Client } from '../../../_models/client.module';
import { TokenService } from '../../../_services/token.service';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../_models/user.module';
import { NgZone } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { IconProfileComponent } from '../../../share/icon-profile/icon-profile.component';
import Swal from 'sweetalert2';
import { ClientService } from '../../../_services/client.service';

@Component({
  selector: 'app-yearly-report',
  standalone: true,
  imports: [
    CommonModule, 
    StepperModule, 
    CheckboxModule, 
    Button, 
    RouterOutlet, 
    TableModule, 
    ButtonModule,
    FormsModule,
    TooltipModule, 
    IconProfileComponent
  ],
  templateUrl: './yearly-report.component.html',
  styleUrl: './yearly-report.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})
export class YearlyReportComponent implements OnInit {
  steps: any[];
  allYearlyReport: YearlyReport[] | null;
  filterallYearlyReport: YearlyReport[];
  client: Client;
  employeName: any | undefined;
  allEmploye: User[]
  currentYearlyReport: YearlyReport;
  curentRoute: string = "";
  isSelected: number = 5;
  selectedStatus: string = "";
  filterstatus: string = "";
  is:number =2
  allClient: Client[] | null;

  constructor(
    private stepFieldsService: stepFieldService,
    private yearlyReportService: YearlyReportService,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private route: ActivatedRoute,// Inject ActivatedRoute
    private clientService: ClientService,


  ) { }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(
      (Employes) => {
        this.allEmploye = Employes;
      },
      (error) => {
        console.error('Error ', error);
      }
    )
    this.curentRoute = this.route.snapshot.url.join('/');
    console.log(this.curentRoute)
    this.getYearlyReportsForClient();
    

  }
  
  onSelectionChange(a : any) {
    this.isSelected = Number(a);
    this.filterallYearlyReport = this.allYearlyReport

  }
  filterToDoWithBalanceDue(): void {
    this.is = 4
    this.filterallYearlyReport = this.allYearlyReport.filter(report =>
      (report.status.name === "TO DO" && report.paymentAmountPaid > 0)
    );
  }
  filterToDoWithBalanceDue2(): void {
    this.is = 2
    this.filterallYearlyReport = this.allYearlyReport
  }
  filterByStatus(event: Event): void {
    this.filterallYearlyReport = this.allYearlyReport;
    this.filterstatus = (event.target as HTMLSelectElement).value;
    if (this.filterstatus === "TO DO" || this.filterstatus === "IN PROGRESS") {
      this.filterallYearlyReport = this.allYearlyReport.filter(report =>
        report.status.name === this.filterstatus
      );
    } else {
      this.filterallYearlyReport = this.allYearlyReport;
    }
}
  //get or getAllYearlyReports() or getYearlyReportsForClient acording to the router
 
  

  //get all yearly reports for the specific client
  getYearlyReportsForClient(): void {
    this.client = history.state.client;
    const clientId =this.client._id // Assuming the client ID is passed via the state
    this.yearlyReportService.getYearlyReportsForClient(clientId).subscribe(
      (reports) => {
        this.allYearlyReport = reports;
        this.filterallYearlyReport = reports
      },
      (error) => {
        console.error('Error fetching yearly reports for client', error);
      }
    );
  }

 

  createReprtTag(): void {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/createYearlyReport'], { state: { client: this.client } });
  }

  goToSteps(task: any) {
    this.router.navigate(['clientSearch/clientManagement/clientNavbar/steps', this.router], { state: { data: task, client: this.client } });
  }

  getEmployeName(idEmploye: string): any {
    return this.allEmploye.find(x => x._id == idEmploye)
  }

  goToUpdate(report: YearlyReport) {
    if (report) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/yearlyReport/createYearlyReport'], { state: { client: this.client, report: report } });
    }
  }

  selectYearlyReport(yearlyReport: YearlyReport) {
    this.currentYearlyReport = yearlyReport;
  }

  getClientName(id: string): string {
    return this.client?.firstName + " " + this.client?.lastName;
  }

  showDeleteConfirmation(id:string): void {
    Swal.fire({
      title: '?האם אתה בטוח',
      text: '.לא ניתן לבטל את הפעולה לאחר שהיא התבצעה',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!כן, מחק זאת',
      cancelButtonText: 'ביטול',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id);
      }
    });
  }

  delete(id: string){
    this.yearlyReportService.deleteYearlyReport(id).subscribe((response) => {
      console.log('Yearly report deleted successfully',response);
      this.allYearlyReport = this.allYearlyReport.filter(c => c._id !== id);
    });
  this.selectYearlyReport = null;
  
  }
}
