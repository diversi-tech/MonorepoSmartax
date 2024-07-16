import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,DataViewModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit{

  id:string=""
  

  constructor(
    public ar: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.ar.params.subscribe(
      data => {
        this.id = data['id'];
       
      }
    );
    
  }
}
