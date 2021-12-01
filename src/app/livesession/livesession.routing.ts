import { Routes } from '@angular/router';
import { LivesessionComponent } from './livesession.component';


export const LiveSessionRoutes: Routes = [{

    path: '',
    children: [{
        path: 'live',
        component: LivesessionComponent
    }]
}];