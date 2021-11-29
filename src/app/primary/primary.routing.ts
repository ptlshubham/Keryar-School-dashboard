import { Routes } from '@angular/router';
import { PrimaryComponent } from './primary.component';


export const PrimaryRoutes: Routes = [{

    path: '',
    children: [{
        path: 'primary',
        component: PrimaryComponent
    }]
}];