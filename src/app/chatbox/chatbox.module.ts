import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox.component';
import { ChatboxRoutes } from './chatbox.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ChatboxRoutes),
  ]
})
export class ChatboxModule { }
