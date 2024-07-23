import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { TableService } from '../_services/table.service';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PanelModule, DividerModule, CheckboxModule],
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
        debugger
        this.tables=data
        console.log(this.tables)
        this.getTableNames()

      },
      error=>{
        debugger
        console.log(error)
      }
    )
  }

  getTableNames(): string[] {
    const names= Object.keys(this.tables);
    this.tablesNames=names
    this.initSelectedValues(names);
    return names
    
  }
  
  getFieldNames(tableName: string): string[] {
    const props= Object.keys(this.tables[tableName]);
    return props
  }

  initSelectedValues(names: string[]) {
    names.forEach(name => {
      this.selectedValues[name] = {};
    });
  }
}
