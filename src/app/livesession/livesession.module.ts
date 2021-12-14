import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivesessionComponent } from './livesession.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LiveSessionRoutes } from './livesession.routing';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [LivesessionComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    NgxPaginationModule,
    RouterModule.forChild(LiveSessionRoutes)
  ]
})
export class LivesessionModule { }
