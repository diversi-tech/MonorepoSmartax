import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TabMenu, TabMenuModule } from 'primeng/tabmenu';
import { ToolBarService } from '../_services/tool-bar.service';
import { NgFor, NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
  standalone: true,
  imports: [TabMenuModule, PrimeTemplate, NgIf, RouterLink, NgFor]
})
export class ToolBarComponent implements OnInit {
  @ViewChild
    (TabMenu) tabMenu: TabMenu | undefined;

  @Input()
  items: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("items", this.items);
    this.items.forEach(element => {
      try {
        if (element.label! == 'דוחות')
          console.log(element.children![0].data!['label']!);
        else
          console.log("no!!!");
      } catch (e) {
        console.log("error: " + e);

      }

    })
  }

  onTabChange(event: any) {
    alert('test');
    const selectedItem = event.value;
    this.navigateTo(selectedItem.route);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  toggleList(item: any) {
    item.expanded = !item.expanded;
  }
}

