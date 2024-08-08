import { Component, OnInit } from '@angular/core';
import { PaymentsReportsComponent } from '../payments-reports/payments-reports.component';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PaymentsReportsService } from '../../_services/payments-reports.service';
import { NgIf } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  standalone: true,
  imports: [
    SidebarModule,
    SplitterModule,
    TabMenuModule,
    SplitButtonModule,
    PaymentsReportsComponent,
    PanelModule,
    RouterOutlet,
    TieredMenuModule,
    NgIf
  ],
})
export class ReportsComponent implements OnInit{

    constructor(private paymentsReportsService:PaymentsReportsService) { }
  
    items=[
    ]
    ngOnInit(): void {
       this.items = this.paymentsReportsService.getReportslist()        
    }
}