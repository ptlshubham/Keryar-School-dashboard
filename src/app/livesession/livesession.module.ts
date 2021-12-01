import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivesessionComponent } from './livesession.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LiveSessionRoutes } from './livesession.routing';



@NgModule({
  declarations: [LivesessionComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LiveSessionRoutes)
  ]
})
export class LivesessionModule { }
