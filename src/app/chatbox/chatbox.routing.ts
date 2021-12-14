import { Routes } from '@angular/router';
import { ChatboxComponent } from './chatbox.component';


export const ChatboxRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: ChatboxComponent
    }]
}];
