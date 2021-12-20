import { Routes } from '@angular/router';
import { LivechatComponent } from './livechat.component';


export const LiveChatRoutes: Routes = [{

    path: '',
    children: [{
        path: 'livechat',
        component: LivechatComponent
    }]
}];