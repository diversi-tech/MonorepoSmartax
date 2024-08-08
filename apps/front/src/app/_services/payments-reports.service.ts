import { Injectable } from "@angular/core";
import { Routes } from "@angular/router";
import { routes } from "../app-routing.module";
import { ReportsComponent } from "../reports/reports/reports.component";

@Injectable({
    providedIn: 'root'
  })
  export class PaymentsReportsService {
    allRoutes:Routes = routes;
    getReportslist(){
        let items: {"icon":string|undefined, "route":string|undefined, "label":string|undefined}[] = []; //{"icon":(element.data!.icon!), "route":element.path, "label":(element.data!.data!)}[] = [];

        this.allRoutes.forEach(item => {
            if (item.component==ReportsComponent&&item.children)
            {
                item.children.forEach(element => {
                    if(element.data!)
                        items.push({icon:(element.data!["icon"]!), route:element.path, label:(element.data!["label"]!)})
                    
                })
            }
        })

        return items
    }

  }