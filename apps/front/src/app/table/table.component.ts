import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { TableService } from '../_services/table.service';
import { ButtonModule } from 'primeng/button';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    DividerModule,
    CheckboxModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})

export class TableComponent implements OnInit {

  tables: any = [];
  tablesNames: string[] = [];
  fieldsNames: string[] = [];
  selectedValues: { [key: string]: any } = {};
  tableWithFields: { [key: string]: any } = {};

  isShowTable: boolean = false;
  openFields: string[] = []
  currentTable: string = ''
  currentField: string = ''

  isShowTable2: boolean = false;
  childName: string = ''
  openFields2: string[] = []

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.getAllTables()
  }

  getAllTables() {
    return this.tableService.getAllTables().subscribe(
      data => {
        this.tables = data
        this.getTableNames()
      },
      error => {
        console.log(error)
      }
    )
  }

  getTableNames(): string[] {
    const names = Object.keys(this.tables);
    this.tablesNames = names
    this.initSelectedValues(names);
    return names

  }

  getFieldNames(tableName: string): string[] {
    const props = Object.keys(this.tables[tableName]);
    // Check if the tableName is already in tableWithFields
    if (!this.tableWithFields[tableName]) {
      // If not, add it with the fields and their types
      this.tableWithFields[tableName] = props.map((prop) => ({
        name: prop,
        type: this.tables[tableName][prop],
      }));
    }
    return props;
  }


  initSelectedValues(names: string[]) {
    names.forEach(tableName => {
      this.selectedValues[tableName] = {};

      this.getFieldNames(tableName).forEach(fieldName => {
        const fieldType = this.tables[tableName][fieldName];
        if (this.tablesNames.includes(fieldType)) {
          this.selectedValues[tableName][fieldName] = { children: {} };
        }
      });
    });
  }

  checkType(tableName: string, fieldName: string, event: any) {
    const fieldType = this.tables[tableName][fieldName];
    if (this.tablesNames.includes(fieldType)) {
      if (event.checked) {
        this.selectedValues[tableName][fieldName] = {
          type: fieldType,
          children: {}
        };
        this.isShowTable = true;
        this.openFields = this.getFieldNames(fieldType);
        this.currentTable = tableName;
        this.currentField = fieldName;
      } else {
        delete this.selectedValues[tableName][fieldName];
        if (Object.keys(this.selectedValues[tableName]).length === 0) {
          delete this.selectedValues[tableName];
        }
        this.isShowTable = false;
      }
    } else {
      if (event.checked) {
        this.selectedValues[tableName][fieldName] = {
          type: fieldType,
          selected: true
        };
      } else {
        delete this.selectedValues[tableName][fieldName];
      }
    }
  }

  childType(bigTable: string, bigTableField: string, fieldName: string, event: any) {
    const table2 = this.tableWithFields[bigTable].find(line => line.name === bigTableField).type;

    if (this.tablesNames.includes(table2)) {
      const type = this.tableWithFields[table2].find(line => line.name === fieldName).type;

      if (event.checked) {
        if (!this.selectedValues[bigTable][bigTableField].children) {
          this.selectedValues[bigTable][bigTableField].children = {};
        }

        this.selectedValues[bigTable][bigTableField].children[fieldName] = {
          name: fieldName,
          type: type
        };

        if (this.tablesNames.includes(type)) {
          this.selectedValues[bigTable][bigTableField].children[fieldName].children = {};
          this.isShowTable2 = true;
          this.childName = fieldName;
          this.openFields2 = this.getFieldNames(type);
        } else {
          this.isShowTable2 = false;
        }
      } else {
        delete this.selectedValues[bigTable][bigTableField].children[fieldName];
        if (Object.keys(this.selectedValues[bigTable][bigTableField].children).length === 0) {
          delete this.selectedValues[bigTable][bigTableField].children;
        }
        this.isShowTable2 = false;
      }
    }
  }

  thirdTable(firstTable: string, secondField: string, thirdField: string, currentField: string, event: any) {
    if (!Array.isArray(this.selectedValues[firstTable][secondField].children[thirdField].children)) {
      this.selectedValues[firstTable][secondField].children[thirdField].children = [];
    }
    if (event.checked) {
      this.selectedValues[firstTable][secondField].children[thirdField].children.push(currentField);
    } else {
      const index = this.selectedValues[firstTable][secondField].children[thirdField].children.indexOf(currentField);
      if (index > -1) {
        this.selectedValues[firstTable][secondField].children[thirdField].children.splice(index, 1);
      }
    }
  }

  //xl export
  exportToExcel() {
    this.tableService.getData(this.selectedValues).subscribe(
      data => {
        this.generateExcel(data);
      },
      error => {
        console.log(error)
      }
    )
  }

  generateExcel(data: { [key: string]: any[] }) {
    const workbook = new ExcelJS.Workbook();

    for (const tableName in data) {
      if (data.hasOwnProperty(tableName)) {
        const tableData = data[tableName];
        const worksheet = workbook.addWorksheet(tableName, { views: [{ rightToLeft: true }] });

        if (tableData.length > 0) {
          const columns = Object.keys(tableData[0]).map(key => ({ header: key, key }));
          worksheet.columns = columns;

          tableData.forEach(row => {
            worksheet.addRow(row);
          });

          worksheet.columns.forEach(column => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, cell => {
              const columnLength = cell.value ? cell.value.toString().length : 0;
              if (columnLength > maxLength) {
                maxLength = columnLength;
              }
            });
            column.width = maxLength + 2;
          });
        }
      }
    }
    workbook.xlsx.writeBuffer().then(buffer => {
      this.saveAsExcelFile(buffer, 'נתוני טבלאות');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}.xlsx`);
  }
  // 
// מיפוי של שמות הטבלאות והשדות באנגלית לעברית
translations = {
  "ClientType": "סוגי לקוחות",
  "Timer": "טיימר",
  "BillingStatus": "סטטוס חיוב",
  "CheckList": "רשימות צקליסט",
  "RepeatableTask": "משימות חזרתיות ",
  "PaymentMethod": "תשלומים",
  "YearlyReport": "דוחות שנתיים",
  "StepField": "שדה צעד",
  "Docs": " מסמכים",
  "TaxRefunds": "החזרי מס",
  "CheckListItem": " פריט ברשית צקליסט",
  "Tag": "תגיות ",
  "callTopicSchema": " התקשר לסכמת נושא ",
  "Communication": "שיחות",
  "StepFieldMonth": " שדות צעד חודשי",
  "Task": "משימות ",
  "DocType": " סוגי מסמכים",
  "ClientField": "שדות לקוח",
  "Status": " סטטוס",
  "Client": "לקוחות ",
  "SensitiveData": "נתונים רגישים  ",
  "FinancialStatement": "דוחות כספיים",
  "YearArchive": "ארכיון שנתי ",
  "CommunicationArchive": "ארכיון שיחות ",
  "Field": " שדות",
  "Role": " תפקידים",
  "MonthlyReport": "   דוחות חודשיים",
  "Year": "שנים",
  "Payment": " תשלומים   ",
  "Billing": "חיובים",
  "Frequency": "  תדירות ",
  "User": "עובדים ",
  "PaymentDetails": "פרטי תשלומים",
  "Meet": "   פגישות",
  "Priority": " עדיפות",
  // 
  "name": "שם ",
  "taskId": "מזהה משימה",
  "_id": "מזהה ",
  "fields": "שדות ",
  "hours": " שעות  ",
  "userId": "מזהה עובד",
  "tasks": " משימות",
  "minutes": " דקות",
  "seconds": "רגעים ",
  "items": "פרטים ",
  "client": " לקוח  ",
  "taskName": " שם משימה",
  "status": "  סטטוס  ",
  "priority": "עדיפות",
  "description": "  תיאור ",
  "assignedTo": "משויך ל ",
  "dueDate": " תאריך ביצוע ",
  "tags": "תגיות ",
  "active": " פעיל",
  "virtual": "וירטואלי",
  "frequency": "תדירות ",
  "docs": "מסמכים ",
  "idClient": "מזהה לקוח", 
  "color": "צבע  ",
  "assignee": " משויך",
  "idEmploye": " מזהה עובד",
  "yearReport": "דוח שנתי ",
  "dateTime": "תאריך ושעה",
  "price": " מחיר   ",
  "paymentAmountPaid": "כמות תשלומים",
  "balanceDue": "  איזון יתרה ",
  "entityType": "סוג ישות ",
  "stepsList": "רשימת צעדים ",
  "value": "ערך ",
  "isCompleted": " הושלם",
  // 
  "stepNumber": "מספר שדה ",
  "type": " סוג ",
  "viewLink": "תצוגת קישור ",
  "userUploaded": "העלאת מערכת",
  "date": " תאריך  ",
  "year": " שנה",
  "isDone": " נעשה",
  "text": " כיתוב",
  "Subject": "נושא ",
  "summary": "תקציר ",
  "content": " תוכן  ",
  "field": "שדה  ",
  "number": "מספר ",
  "parent": " הורה",
  "images": "תמונות",
  "subTasks": "תת משימות",
  "checkList": "רשימת בדיקה",
  "googleId": "מזהה גוגל",
  "startDate": "תאריך התחלה",
  "deadline": "תאריך יעד",
  "companyName": "שם החברה",
  "firstName": "שם פרטי",
  "lastName": "שם משפחה",
  "contactPersonName": "שם איש קשר",
  "tz": "תעודת זהות",
  "spouseName": "שם בן/בת הזוג",
  "spouseTZ": "תעודת זהות של בן/בת הזוג",
  "phone": "טלפון",
  "whatsapp": "ווטסאפ",
  "email": "אימייל",
  "isPreferWhatsapp": "העדפה לווטסאפ",
  "address": "כתובת",
  "encryptedPasswords": "סיסמאות מוצפנות",
  "comments": "הערות",
  "lastUserUpdate": "עדכון אחרון על ידי משתמש",
  "assignTo": "הוקצה ל",
  "clientID": "מספר לקוח",
  "dateOfBirth": "תאריך לידה",
  "payment": "תשלום",
  "isEmploysWorkers": "מעסיק עובדים",
  "isWorkData": "נתוני עבודה",
  "incomeTaxFileNumber": "מספר תיק מס הכנסה",
  "incomeTaxDeductions_registerID": "מספר תיק ניכויים למס הכנסה",
  "VATFileNumber": "מספר תיק מע\"מ",
  "reports": "דוחות",
  "isStatisticsData": "נתוני סטטיסטיקה",
  "referrerName": "שם ממליץ",
  "joinDate": "תאריך הצטרפות",
  "isAccounter": "האם הוא רואה חשבון",
  "isOpenAccountWithUs": "האם חשבון פתוח אצלנו",
  "tag": "תג",
  "beginningTime": "זמן התחלה",
  "endTime": "זמן סיום",
  "usersId": "מזהה משתמשים",
  "clientDepartments": "מחלקות לקוח",
  "sumForMonth": "סכום לחודש",
  "maxHours": "שעות מקסימום",
  "dateStart": "תאריך התחלה",
  "dateFinish": "תאריך סיום",
  "userName": "שם משתמש",
  "passwordHash": "סיסמה מוצפנת",
  "role": "תפקיד",
  "favoritesClient": "לקוחות מועדפים",
  "amount": "סכום",
  "paymentMethod": "אמצעי תשלום",
  "ifRreturn": "אם החזר",
  "mainPaymentDetails": "פרטי תשלום עיקריים",
  "morePaymentDetails": "פרטי תשלום נוספים",
  "totalPayment": "סכום כולל",
  "paymentHistory": "היסטוריית תשלומים",
  "billingHistory": "היסטוריית חיובים",
  "yearNum": "מספר שנה",
  "idUser": "מזהה משתמש",
  "reportDate": "תאריך דוח",
  "monthlyReportFields": "שדות דוח חודשי",
  "level": "רמה",
  "key": "מפתח",
  "type_": "סוג",
  "isDeleted": "נמחק",
  "deletedDate": "תאריך מחיקה",
  "tasksData": "נתוני משימות",
  "isInterested": "מתעניין",
  "lastEmployeeWhoTreated": "העובד האחרון שטיפל",
  "followUp": "מעקב",
  "finalSubmissionDate": "תאריך הגשה סופי",
  "clientId": "מזהה לקוח",
  "a": "א",
  "b": "ב",
  "c": "ג",
  "d": "ד",
  "e": "ה",
  "f": "ו",
  "isExist": "קיים"
  
  
  // תוסיף פה את כל השמות שאתה רוצה לתרגם
};

// פונקציה להחזרת השם המתורגם
translate(key: string): string {
  return this.translations[key] || key;  // אם לא נמצא מיפוי, מחזיר את המפתח המקורי
}
}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

