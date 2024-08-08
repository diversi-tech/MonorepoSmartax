import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SafePipe } from '../../_pipes/SafePipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css'],
  standalone: true,
  imports: [
    NgClass,
    ChipModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    MenuModule,
    InputTextareaModule,
    CardModule,
    SafePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(
  ) {
    this.items = [
      {
        label: 'Account Settings',
        icon: 'pi pi-user',
        items: [
          { label: 'My Account', icon: 'pi pi-user', routerLink: '/Login' },
          {
            label: 'Add another account',
            icon: 'pi pi-plus',
            routerLink: '/Register',
          },
          { label: 'Settings', icon: 'pi pi-cog' },
        ],
      },
    ];
  }

  ngOnInit(): void {
  }

  items: MenuItem[];

  cards = [
    { title: 'נקודות עניין', description: 'תיאור של נקודות עניין' },
    { title: 'אטרקציות', description: 'תיאור של אטרקציות' },
    { title: 'צימרים', description: 'תיאור של צימרים' },
  ];


  // constructor() {
  //   this.items = [
  //     {
  //       label: 'Account Settings',
  //       icon: 'pi pi-user',
  //       items: [
  //         { label: 'My Account', icon: 'pi pi-user', routerLink: '/Login' },
  //         { label: 'Add another account', icon: 'pi pi-plus', routerLink: '/Register' },
  //         { label: 'Settings', icon: 'pi pi-cog' }
  //       ]
  //     }
  //   ];
  // }
}
