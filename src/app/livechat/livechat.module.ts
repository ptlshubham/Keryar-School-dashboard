import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivechatComponent } from './livechat.component';
import { LiveChatRoutes } from './livechat.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LivechatComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LiveChatRoutes)
  ]
})
export class LivechatModule { }
