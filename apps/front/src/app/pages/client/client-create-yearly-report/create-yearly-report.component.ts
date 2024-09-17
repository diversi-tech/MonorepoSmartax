// import { Component, Injectable, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CheckboxModule } from 'primeng/checkbox';
// import { StepperModule } from 'primeng/stepper';
// import { YearlyReportService } from '../../../_services/yearlyReport.service';
// import { YearlyReport } from '../../../_models/yearlyReport.module';
// import { stepFieldService } from '../../../_services/step_field.service';
// import { Year } from '../../../_models/year.module';
// import { DropdownModule } from 'primeng/dropdown';
// import { YearService } from '../../../_services/year.service';
// import { ButtonModule } from 'primeng/button';
// import { InputOtpModule } from 'primeng/inputotp';
// import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// import { TokenService } from '../../../_services/token.service';
// import { DialogModule } from 'primeng/dialog';
// import { Location } from '@angular/common';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { Status } from '../../../_models/status.module';
// import { StatusService } from '../../../_services/status.service';
// import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
// import { PrimeTemplate } from 'primeng/api';
// import { TableModule } from 'primeng/table';
// import Swal from 'sweetalert2';


// @Component({
//   selector: 'app-create-yearly-report',
//   standalone: true,
//   imports: [
//     FormsModule,
//     DropdownModule,
//     CommonModule,
//     StepperModule,
//     CheckboxModule,
//     ButtonModule,
//     InputOtpModule,
//     ReactiveFormsModule,
//     DialogModule,
//     InputNumberModule,
//     AutoCompleteModule,
//     PrimeTemplate,
//     TableModule,
//     RouterOutlet
//   ],
//   templateUrl: './create-yearly-report.component.html',
//   styleUrl: './create-yearly-report.component.css',
// })
// @Injectable({
//   providedIn: 'root', // Ensure it's provided in root or a specific module
// })

// export class CreateYearlyReportComponent implements OnInit {

//   displayModal: boolean = false;
//   yearlyReportForm: FormGroup;
//   userId: string; // Assuming the client ID is passed via the state
//   client: any | undefined = undefined;
//   formSubmitted = false;
//   newYear: Year = {
//     yearNum: ""
//   }
//   typeOptions: any[] = [
//     { label: 'פיצול לעצמאי', value: 'עצמאי' },
//     { label: 'עמותה', value: 'עמותה' },
//     { label: 'חברה', value: 'חברה' },
//   ];
//   Year2: any[] = [{ yearNum: "לא נמצא" }];
//   employeName: string;
//   reportToUpdate: YearlyReport | null = null;
//   yearList: Year[];
//   yearList2: Year[];
//   statusList: Status[] = [];
//   selectedyear: Year | null = null;
//   thisSubject2 = "";
//   is: boolean = false;
//   thisSubject = "";
//   balanceDue: number = 0; // Initialize balance due


//   constructor(
//     private fb: FormBuilder,
//     private stepFieldsService: stepFieldService,
//     private yearlyReportService: YearlyReportService,
//     private yearService: YearService,
//     private tokenService: TokenService,
//     private router: Router,
//     private location: Location,
//     private statusService: StatusService,

//   ) {
//     this.loadData();
//   }

//   loadData() {
//     this.yearService.getAllYear().subscribe({
//       next: (data) => {
//         this.yearList = data;
//         this.filterUniqueYears(); // הוסף כאן קריאה לפונקציה לסינון שנים כפולות
//       },
//       error: (error) => {
//         console.log(error);
//       },
//     });
//     this.statusService.getAllStatuses().subscribe({
//       next: (data) => {
//         this.statusList = data;
//       },
//       error: (error) => {
//         console.log(error);
//       },

//     })
//     this.userId = this.tokenService.getCurrentDetail('_id');
//     this.client = history.state.client;
//     this.reportToUpdate = history.state.report || null;
//   }
//   filterUniqueYears() {
//     const uniqueYears = Array.from(new Set(this.yearList.map(year => year.yearNum)))
//       .map(yearNum => this.yearList.find(year => year.yearNum === yearNum));
    
//     this.yearList2 = uniqueYears.filter(year => year !== undefined); // מסנן את השנים ומוודא שאין כפולות
//   }

//   showModalDialog() {
//     this.displayModal = true;
//   }

//   hideModalDialog() {
//     this.displayModal = false;
//   }


//   ngOnInit(): void {
//     this.yearlyReportForm = this.fb.group({
//       type: ['', Validators.required],
//       price: ['', Validators.required],
//       paymentAmountPaid: ['', Validators.required],
//       balanceDue: [{ value: 0, disabled: true }] // Make this read-only in the form
//     });

//     if (this.reportToUpdate) {
//       this.yearlyReportForm.patchValue({
//         type: this.reportToUpdate.entityType,
//         price: this.reportToUpdate.price,
//         paymentAmountPaid: this.reportToUpdate.paymentAmountPaid,
//         balanceDue: this.reportToUpdate.balanceDue,
//       });
//     }

//     this.yearlyReportForm.get('price')?.valueChanges.subscribe(() => this.calculateBalanceDue());
//     this.yearlyReportForm.get('paymentAmountPaid')?.valueChanges.subscribe(() => this.calculateBalanceDue());
//     this.showModalDialog();
//   }




//   calculateBalanceDue() {
//     const price = this.yearlyReportForm.get('price')?.value || 0;
//     const paymentAmountPaid = this.yearlyReportForm.get('paymentAmountPaid')?.value || 0;
//     this.balanceDue = price - paymentAmountPaid;
//   }

//   onSubmit() {
//     this.formSubmitted = true;
//     if (this.yearlyReportForm.valid) {
//       const yearlyReport = this.yearlyReportForm.value;

//       // Calculate balance due based on price and paymentAmountPaid
//       const price = yearlyReport.price;
//       const paymentAmountPaid = yearlyReport.paymentAmountPaid;
//       const balanceDue = price - paymentAmountPaid; // Calculate the balance due

//       // Create the report object
//       const reportToSave: YearlyReport = {
//         idClient: this.client._id,
//         idEmploye: this.userId,
//         yearReport: this.thisSubject,
//         dateTime: new Date(),
//         price: price,
//         paymentAmountPaid: paymentAmountPaid,
//         balanceDue: balanceDue, // Set the calculated balance due
//         stepsList: null,
//         entityType: yearlyReport.type,
//         status: this.statusList.find(s => s.name == 'TO DO') || null,
//         assignee: [this.userId],
//       };

//       if (this.reportToUpdate) {
//         const status = this.determineStatus();
//         this.updateYearlyReport(reportToSave, status);
//       } else {
//         this.createYearlyReport(reportToSave);
//       }
//     }
//     this.hideModalDialog();
//   }


//   determineStatus(): Status {
//     const stepsList = this.reportToUpdate ? this.reportToUpdate.stepsList : [];
//     const allCompleted = stepsList.every(step => step.isCompleted);
//     const someCompleted = stepsList.some(step => step.isCompleted);

//     if (allCompleted) {
//       return this.statusList.find(s => s.name == 'COMPLETE') || null;
//     } else if (someCompleted) {
//       return this.statusList.find(s => s.name == 'IN PROGRESS') || null;
//     } else {
//       return this.statusList.find(s => s.name == 'TO DO') || null;
//     }
//   }

//   createYearlyReport(yearlyReport: any) {
//     yearlyReport.status = this.statusList.find(s => s.name == 'TO DO') || null;
//     const yearly: YearlyReport = {
//       idClient: this.client._id,
//       idEmploye: this.userId,
//       yearReport: yearlyReport.yearReport,
//       dateTime: new Date(),
//       price: yearlyReport.price,
//       paymentAmountPaid: yearlyReport.paymentAmountPaid,
//       balanceDue: yearlyReport.balanceDue,
//       stepsList: null,
//       entityType: yearlyReport.type,
//       status: yearlyReport.status,
//       assignee: [this.userId],

//     };
//     this.yearlyReportService.createYearlyReport(yearly).subscribe(
//       (response) => {
//         if (response) {
//           Swal.fire('Success', "הדוח נוסף בהצלחה", "success");
//           this.router.navigate(
//             ['/clientSearch/clientManagement/clientNavbar/yearlyReport'],
//             {
//               state: { data: response, client: this.client },
//             }
//           );
//         }
//       },
//       (error) => {
//         console.error('Error occurred:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: error || 'Something went wrong!',
//         });
//       }
//     );
//   }

//   updateYearlyReport(yearlyReport: any, status: any) {
//     console.log("updateYearlyReport", yearlyReport)
//     const updatedReport: YearlyReport = {
//       ...this.reportToUpdate,
//       yearReport: yearlyReport.yearReport,
//       price: yearlyReport.price,
//       paymentAmountPaid: yearlyReport.paymentAmountPaid,
//       balanceDue: yearlyReport.balanceDue,
//       entityType: yearlyReport.type,
//       status: status,

//     };
//     updatedReport.assignee.push(this.userId);
//     updatedReport.idEmploye = this.userId;
//     this.yearlyReportService
//       .updateYearlyReport(this.reportToUpdate._id, updatedReport)
//       .subscribe(
//         (response) => {
//           if (response) {
//             Swal.fire('Success', "הדוח עודכן בהצלחה", "success");
//             this.router.navigate(
//               ['/clientSearch/clientManagement/clientNavbar/yearlyReport'],
//               {
//                 state: { data: response, client: this.client },
//               }
//             );
//           }
//         },
//         (error) => {
//           console.error('Error occurred:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: error || 'Something went wrong!',
//           });
//         }
//       );
//   }

//   goBack(): void {
//     this.location.back();
//   }

//   filterByyear(value: string): void {
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
//       this.yearList2 = this.yearList;
//     }
//     this.selectedyear = null;
//   }

//   select(event: AutoCompleteSelectEvent): void {
//     const year = event.value as Year;
//     this.thisSubject = year.yearNum
//   }

//   add() {
//     this.newYear.yearNum = this.thisSubject2
//     this.yearService.createYear(this.newYear).subscribe(response => {
//       this.yearList.push(response);
//       Swal.fire('Success', ' שנה נוספה בהצלחה', 'success');

//     });
//   }
// }



import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperModule } from 'primeng/stepper';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { YearlyReport } from '../../../_models/yearlyReport.module';
import { stepFieldService } from '../../../_services/step_field.service';
import { Year } from '../../../_models/year.module';
import { DropdownModule } from 'primeng/dropdown';
import { YearService } from '../../../_services/year.service';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TokenService } from '../../../_services/token.service';
import { DialogModule } from 'primeng/dialog';
import { Location } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Status } from '../../../_models/status.module';
import { StatusService } from '../../../_services/status.service';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-yearly-report',
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
    PrimeTemplate,
    TableModule,
    RouterOutlet
  ],
  templateUrl: './create-yearly-report.component.html',
  styleUrls: ['./create-yearly-report.component.css'],
})
@Injectable({
  providedIn: 'root',
})

export class CreateYearlyReportComponent implements OnInit {

  displayModal: boolean = false;
  yearlyReportForm: FormGroup;
  userId: string;
  client: any | undefined = undefined;
  formSubmitted = false;
  newYear: Year = {
    yearNum: ""
  }
  typeOptions: any[] = [
    { label: 'פיצול לעצמאי', value: 'עצמאי' },
    { label: 'עמותה', value: 'עמותה' },
    { label: 'חברה', value: 'חברה' },
  ];
  Year2: any[] = [{ yearNum: "לא נמצא" }];
  employeName: string;
  reportToUpdate: YearlyReport | null = null;
  yearList: Year[] = [];
  yearList2: Year[] = [];
  statusList: Status[] = [];
  selectedyear: Year | null = null;
  thisSubject2 = "";
  is: boolean = false;
  thisSubject = "";
  balanceDue: number = 0;

  constructor(
    private fb: FormBuilder,
    private stepFieldsService: stepFieldService,
    private yearlyReportService: YearlyReportService,
    private yearService: YearService,
    private tokenService: TokenService,
    private router: Router,
    private location: Location,
    private statusService: StatusService,
  ) {
    this.loadData();
  }

  loadData() {
    this.yearService.getAllYear().subscribe({
      next: (data) => {
        this.yearList = data;
        this.sortAndFilterUniqueYears(); // Call to sort and filter unique years
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.statusService.getAllStatuses().subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.userId = this.tokenService.getCurrentDetail('_id');
    this.client = history.state.client;
    this.reportToUpdate = history.state.report || null;
  }

  // Function to sort and filter unique years
  sortAndFilterUniqueYears() {
    const uniqueYears = this.yearList.filter((year, index, self) =>
      index === self.findIndex((y) => (
        y.yearNum === year.yearNum
      ))
    );

    // Sort the unique years in ascending order
    this.yearList2 = uniqueYears.sort((a, b) => parseInt(a.yearNum) - parseInt(b.yearNum));
  }

  showModalDialog() {
    this.displayModal = true;
  }

  hideModalDialog() {
    this.displayModal = false;
  }


  ngOnInit(): void {
    this.yearlyReportForm = this.fb.group({
        type: ['', Validators.required],
        price: ['', Validators.required],
        paymentAmountPaid: ['', Validators.required],
        balanceDue: [{ value: 0, disabled: true }]
    });

    if (this.reportToUpdate) {
        this.yearlyReportForm.patchValue({
            type: this.reportToUpdate.entityType,
            price: this.reportToUpdate.price,
            paymentAmountPaid: this.reportToUpdate.paymentAmountPaid,
            balanceDue: this.reportToUpdate.balanceDue, // לא חובה, מאחר שמחושב אוטומטית
        });
        
        // חישוב היתרה מיד אחרי טעינת הערכים
        this.calculateBalanceDue();
    }

    this.yearlyReportForm.get('price')?.valueChanges.subscribe(() => this.calculateBalanceDue());
    this.yearlyReportForm.get('paymentAmountPaid')?.valueChanges.subscribe(() => this.calculateBalanceDue());

    this.showModalDialog();
}

  calculateBalanceDue() {
    const price = this.yearlyReportForm.get('price')?.value || 0;
    const paymentAmountPaid = this.yearlyReportForm.get('paymentAmountPaid')?.value || 0;
    this.balanceDue = price - paymentAmountPaid;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.yearlyReportForm.valid) {
      const yearlyReport = this.yearlyReportForm.value;

      const price = yearlyReport.price;
      const paymentAmountPaid = yearlyReport.paymentAmountPaid;
      const balanceDue = price - paymentAmountPaid;

      const reportToSave: YearlyReport = {
        idClient: this.client._id,
        idEmploye: this.userId,
        yearReport: this.thisSubject,
        dateTime: new Date(),
        price: price,
        paymentAmountPaid: paymentAmountPaid,
        balanceDue: balanceDue,
        stepsList: null,
        entityType: yearlyReport.type,
        status: this.statusList.find(s => s.name == 'TO DO') || null,
        assignee: [this.userId],
      };

      if (this.reportToUpdate) {
        const status = this.determineStatus();
        this.updateYearlyReport(reportToSave, status);
      } else {
        this.createYearlyReport(reportToSave);
      }
    }
    this.hideModalDialog();
  }

  determineStatus(): Status {
    const stepsList = this.reportToUpdate ? this.reportToUpdate.stepsList : [];
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

  createYearlyReport(yearlyReport: any) {
    yearlyReport.status = this.statusList.find(s => s.name == 'TO DO') || null;
    const yearly: YearlyReport = {
      idClient: this.client._id,
      idEmploye: this.userId,
      yearReport: yearlyReport.yearReport,
      dateTime: new Date(),
      price: yearlyReport.price,
      paymentAmountPaid: yearlyReport.paymentAmountPaid,
      balanceDue: yearlyReport.balanceDue,
      stepsList: null,
      entityType: yearlyReport.type,
      status: yearlyReport.status,
      assignee: [this.userId],
    };
    this.yearlyReportService.createYearlyReport(yearly).subscribe(
      (response) => {
        if (response) {
          Swal.fire('Success', "הדוח נוסף בהצלחה", "success");
          this.router.navigate(
            ['/clientSearch/clientManagement/clientNavbar/yearlyReport'],
            {
              state: { data: response, client: this.client },
            }
          );
        }
      },
      (error) => {
        console.error('Error occurred:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error || 'Something went wrong!',
        });
      }
    );
  }

  updateYearlyReport(yearlyReport: any, status: any) {
    console.log("updateYearlyReport", yearlyReport);
    const updatedReport: YearlyReport = {
      ...this.reportToUpdate,
      yearReport: yearlyReport.yearReport,
      price: yearlyReport.price,
      paymentAmountPaid: yearlyReport.paymentAmountPaid,
      balanceDue: yearlyReport.balanceDue,
      entityType: yearlyReport.type,
      status: status,
    };
    updatedReport.assignee.push(this.userId);
    updatedReport.idEmploye = this.userId;
    this.yearlyReportService
      .updateYearlyReport(this.reportToUpdate._id, updatedReport)
      .subscribe(
        (response) => {
          if (response) {
            Swal.fire('Success', "הדוח עודכן בהצלחה", "success");
            this.router.navigate(
              ['/clientSearch/clientManagement/clientNavbar/yearlyReport'],
              {
                state: { data: response, client: this.client },
              }
            );
          }
        },
        (error) => {
          console.error('Error occurred:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error || 'Something went wrong!',
          });
        }
      );
  }

  goBack(): void {
    this.location.back();
  }

  filterByyear(value: string): void {
    if (value != "") {
      this.is = false;
      const query = value.toLowerCase();
      // Filter unique years based on user input
      this.yearList2 = this.yearList
        .filter(year => year.yearNum.toLowerCase().includes(query))
        .filter((year, index, self) =>
          index === self.findIndex((y) => y.yearNum === year.yearNum)
        )
        .sort((a, b) => parseInt(a.yearNum) - parseInt(b.yearNum)); // Sort the filtered years
      if (this.yearList2.length == 0) {
        this.yearList2 = this.Year2;
        this.thisSubject2 = value;
        this.is = true;
      }
    } else {
      this.is = false;
      this.yearList2 = this.yearList; // Reset to full list if no input
    }
    this.selectedyear = null;
  }

  select(event: AutoCompleteSelectEvent): void {
    const year = event.value as Year;
    this.thisSubject = year.yearNum;
  }

  add() {
    this.newYear.yearNum = this.thisSubject2;
    this.yearService.createYear(this.newYear).subscribe(response => {
      this.yearList.push(response);
      this.sortAndFilterUniqueYears(); // Re-sort and filter unique years after adding a new year
      Swal.fire('Success', ' שנה נוספה בהצלחה', 'success');
    });
  }
}
