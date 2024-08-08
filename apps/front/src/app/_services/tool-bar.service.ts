import { Injectable } from '@angular/core';
import { routes } from '../app-routing.module';
@Injectable({
  providedIn: 'root',
})
export class ToolBarService {
  toolBarItems: any[] = [];

  getCurrentItems(role: number) {
    routes.forEach((item) => {
      if (
        item.data &&
        item.data!['forToolbar'] &&
        item.data!['forToolbar']! == true
      )
        if (item.data!['authType'] && item.data!['authType'] >= role) {
          const newItem = {
            label: item.data!['label'],
            icon: item.data!['icon'],
            route: item.path,
            list: item.data!.list!,
            items: [],
            isActive: false,
          };
          if (item.children) {
            item.children!.forEach((child) => {
              if (child.data!)
                newItem.items.push({
                  label: child.data!['label']!,
                  route: item.path! + '/' + child.path,
                  data: child.data!,
                });
            });

            if (!newItem.items) newItem.route = null;
          }
          this.toolBarItems.push(newItem);
        }
    });
    return this.toolBarItems;
  }
  constructor() {}
}
