import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryComponent } from './primary.component';
import { RouterModule } from '@angular/router';
import { PrimaryRoutes } from './primary.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [PrimaryComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(PrimaryRoutes)
  ]
})
export class PrimaryModule { }
