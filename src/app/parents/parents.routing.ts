import { Routes } from "@angular/router";
import { ReportsComponent } from "./reports/reports.component";

export const ParentsRoutes: Routes = [{
    path: '',
    children: [{
        path: 'reports',
        component: ReportsComponent
    }]
},

];
