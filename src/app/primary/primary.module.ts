import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryComponent } from './primary.component';
import { RouterModule } from '@angular/router';
import { PrimaryRoutes } from './primary.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SafePipe } from 'app/pipes/safe.pipe';
import { PipesModule } from 'app/pipes/pipes.module';



@NgModule({
  declarations: [PrimaryComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    PipesModule,
    RouterModule.forChild(PrimaryRoutes)
  ]
})
export class PrimaryModule { }
