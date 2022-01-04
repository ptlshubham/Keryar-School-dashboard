import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ParentsRoutes } from './parents.routing';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(ParentsRoutes),
  ]
})
export class ParentsModule { }
