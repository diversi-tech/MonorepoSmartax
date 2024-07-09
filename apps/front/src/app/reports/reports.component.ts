import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css',
    standalone: true,
    imports : [ChartModule]
})
export class ReportsComponent {

}
