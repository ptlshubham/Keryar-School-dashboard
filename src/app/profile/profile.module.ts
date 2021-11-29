import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile.routing';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ProfileRoutes),
  ]
})
export class ProfileModule { }
