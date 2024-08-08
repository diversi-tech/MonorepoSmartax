import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Year } from '../../../_models/year.module';
import { FinancialStatement } from '../../../_models/financialStatement.module';
import { Status } from '../../../_models/status.module';
import { stepFieldService } from '../../../_services/step_field.service';
import { YearService } from '../../../_services/year.service';
import { FinancialStatementService } from '../../../_services/financialStatement.service';
import { TokenService } from '../../../_services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from '../../../_services/status.service';
import { User } from '../../../../../../../server/src/Models/user.model';
import { DropdownModule } from 'primeng/dropdown';
import { StepperModule } from 'primeng/stepper';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserService } from '../../../_services/user.service';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-client-create-financial-statement',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    CommonModule,
    StepperModule,
    CheckboxModule,
    ButtonModule,
    InputOtpModule,
    ReactiveFormsModule,
    DialogModule,
    InputNumberModule,
    AutoCompleteModule,
  ],
  templateUrl: './client-create-financial-statement.component.html',
  styleUrl: './client-create-financial-statement.component.css',
})
export class ClientCreateFinancialStatementComponent implements OnInit {
  displayModal: boolean = false;
  financialStatementForm: FormGroup;
  userId: string; // Assuming the client ID is passed via the state
  client: any | undefined = undefined;
  allEmploye: User[];
  formSubmitted = false;
  yearList: Year[];
  yearList2: Year[];
  selectedyear: Year | null = null;
  thisSubject2 = "";
  is: boolean = false;
  thisSubject = "";
  Year2: any[] = [{ yearNum: "לא נמצא" }];
  typeOptions: any[] = [
    { label: 'פיצול לעצמאי', value: 'עצמאי' },
    { label: 'עמותה', value: 'עמותה' },
    { label: 'חברה', value: 'חברה' },
  ];
  employeName: string;
  statementToUpdate: FinancialStatement | null = null;
  statusList: Status[] = [];
  newYear: Year = {
    yearNum: ""
  }
  constructor(
    private fb: FormBuilder,
    private stepFieldsService: stepFieldService,
    private financialStatementService: FinancialStatementService,
    private yearService: YearService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,// Inject ActivatedRoute
    private location: Location,
    private statusService: StatusService,
    private userService: UserService,

  ) {
    this.loadData();
  }

  loadData() {
    this.yearService.getAllYear().subscribe({
      next: (data) => {
        console.log(data);
        this.yearList = data;
        this.yearList2=data
      },
      error: (error) => {
        console.log(error);
      },
    },
    );
    this.statusService.getAllStatuses().subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error) => {
        console.log(error);
      },

    })
    this.userId = this.tokenService.getCurrentDetail('_id');
    this.client = history.state.client;
    this.statementToUpdate = history.state.report || null;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  hideModalDialog() {
    this.displayModal = false;
  }

  ngOnInit(): void {
    this.financialStatementForm = this.fb.group({
      year: ['', Validators.required],
      price: ['', Validators.required],
      paymentAmountPaid: ['', Validators.required],
      balanceDue: ['', Validators.required],
    });
    if (this.statementToUpdate) {
      this.financialStatementForm.patchValue({
        type: this.statementToUpdate.entityType,
        year: this.statementToUpdate.year,
        price: this.statementToUpdate.price,
        paymentAmountPaid: this.statementToUpdate.paymentAmountPaid,
        balanceDue: this.statementToUpdate.balanceDue,
        status: this.statementToUpdate.status,
      });
    }
    this.showModalDialog(); // Open the modal dialog when component initializes
    this.userService.getAllUsers().subscribe(
      (Employes) => {
        this.allEmploye = Employes;
      },
      (error) => {
        console.error('Error ', error);
      }
    )
  }

  getUser(idEmploye: any): any {
    return this.allEmploye.find(x => x._id === idEmploye);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.financialStatementForm.valid) {
      const financialStatement = this.financialStatementForm.value; 
      if (this.statementToUpdate) {
        const status = this.determineStatus();
        this.updatefinancialStatement(financialStatement, status);
      } else {
        this.createfinancialStatement(financialStatement);
      }
    }
    this.hideModalDialog(); 
  }

  determineStatus(): Status {
    const stepsList = this.statementToUpdate ? this.statementToUpdate.stepsList : [];
    const allCompleted = stepsList.every(step => step.isCompleted);
    const someCompleted = stepsList.some(step => step.isCompleted);

    if (allCompleted) {
      return this.statusList.find(s => s.name == 'COMPLETE') || null;
    } else if (someCompleted) {
      return this.statusList.find(s => s.name == 'IN PROGRESS') || null;
    } else {
      return this.statusList.find(s => s.name == 'TO DO') || null;
    }
  }

  createfinancialStatement(financialStatement: any) {
    financialStatement.status = this.statusList.find(s => s.name == 'TO DO') || null;
    const user = this.getUser(this.userId);
    const statement: FinancialStatement = {
      isInterested: financialStatement.isInterested,
      assignee: [user],
      lastEmployeeWhoTreated: user,
      followUp: financialStatement.followUp,
      finalSubmissionDate: financialStatement.finalSubmissionDate,
      client: this.client._id,
      year: financialStatement.year.yearNum,
      date: new Date(),
      price: financialStatement.price,
      paymentAmountPaid: financialStatement.paymentAmountPaid,
      balanceDue: financialStatement.balanceDue,
      stepsList: null,
      entityType: financialStatement.type,
      status: financialStatement.status,
    };

    this.financialStatementService.createFinancialStatement(statement).subscribe(
      (response) => {
        console.log("response", response);
        this.router.navigate(
          ['/clientSearch/clientManagement/clientNavbar/financialStatement'],
          {
            state: { data: response, client: this.client },

          });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatefinancialStatement(financialStatement: any, status: any) {
    const updatedReport: FinancialStatement = {
      ...this.statementToUpdate,
      year: financialStatement.year.yearNUm,
      price: financialStatement.price,
      paymentAmountPaid: financialStatement.paymentAmountPaid,
      balanceDue: financialStatement.balanceDue,
      entityType: financialStatement.type,
      status: status,
    };

    this.financialStatementService
      .updateFinancialStatement(this.statementToUpdate._id, updatedReport)
      .then(
        (response) => {
          console.log(response);
          if (response)
            this.location.back();

        },
        (error) => {
          console.log(error);
        }
      );
  }
  goBack(): void {
    this.location.back();
  }
  filterByyear(value: string): void {
    console.log(this.yearList2, '2')
    if (value != "") {
      this.is = false
      const query = value.toLowerCase();
      this.yearList2 = this.yearList.filter(year =>
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
      console.log(this.yearList, '1')
      this.yearList2 = this.yearList;
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
          this.yearList.push(response);
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
