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
  imports: [CommonModule, PanelModule, DividerModule, CheckboxModule, ButtonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {

  tables: any = [];
  tablesNames: string[] = [];
  fieldsNames: string[] = [];
  selectedValues: { [key: string]: any } = {};

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
      error=>{
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
    return props
  }

  initSelectedValues(names: string[]) {
    names.forEach(name => {
      this.selectedValues[name] = {};
    });
  }

  //xl export
  exportToExcel() {
    this.tableService.getData(this.selectedValues).subscribe(
      data => {
        this.generateExcel(data);
      },
      error => {
        debugger
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

        // הוספת נתונים לגיליון
        if (tableData.length > 0) {
          const columns = Object.keys(tableData[0]).map(key => ({ header: key, key }));
          worksheet.columns = columns;

          tableData.forEach(row => {
            worksheet.addRow(row);
          });

          // הרחבת העמודות באופן אוטומטי לפי התוכן
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


}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
