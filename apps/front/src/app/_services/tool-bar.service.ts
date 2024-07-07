import { Injectable } from '@angular/core';
import { routes } from '../app-routing.module';
@Injectable({
  providedIn: 'root'
})
export class ToolBarService {

  toolBarItems:any[] = [];

  getCurrentItems(role: number) {
    routes.forEach(item => {
      if (item.data && item.data!['forToolbar'] == true)
        if (item.data!['authType'] >= role)
          {
            const newItem={ label: item.data!['label'], icon: item.data!['icon'], route: item.path };
            this.toolBarItems.push(newItem);
          }
    });
    return this.toolBarItems;
  }
  constructor() { }
}
