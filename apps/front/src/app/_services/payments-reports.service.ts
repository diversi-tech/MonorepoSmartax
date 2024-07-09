import { Injectable } from "@angular/core";
import { Routes } from "@angular/router";
import { routes } from "../app-routing.module";
import { ReportsComponent } from "../reports/reports/reports.component";

@Injectable({
    providedIn: 'root'
  })
  export class PaymentsReportsService {
    allRoutes:Routes = routes;
    items: {"icon":string|undefined, "route":string|undefined, "label":string|undefined}[] = []; //{"icon":(element.data!.icon!), "route":element.path, "label":(element.data!.data!)}[] = [];
    getReportslist(){
        this.allRoutes.forEach(item => {
            if (item.component==ReportsComponent&&item.children)
            {
                item.children.forEach(element => {
                    if(element.data!)
                        this.items.push({icon:(element.data!["icon"]!), route:element.path, label:(element.data!["label"]!)})
                    
                })
            }
        })

        return this.items
    }

  }