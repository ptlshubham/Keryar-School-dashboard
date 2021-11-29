import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardComponent } from './standard/standard.component';
import { ManageRoutes } from './manage.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './subject/subject.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SyllabusComponent } from './syllabus/syllabus.component';



@NgModule({
  declarations: [StandardComponent, SubjectComponent, SyllabusComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,

    RouterModule.forChild(ManageRoutes),
  ]
})
export class ManageModule { }
