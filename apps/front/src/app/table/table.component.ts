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
  //
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

    if (!this.tableWithFields[tableName]) {
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
  
        const allKeys = new Set<string>();
        tableData.forEach(row => {
          Object.keys(row).forEach(key => allKeys.add(key));
        });
  
        const columns = Array.from(allKeys).map(key => ({ header: key, key }));
        worksheet.columns = columns;
  
        tableData.forEach(row => {
          const newRow = {};
          columns.forEach(column => {
            newRow[column.key] = row[column.key] !== undefined ? row[column.key] : '';
          });
          worksheet.addRow(newRow);
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
