import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { VisitorRegComponent } from './visitor-reg/visitor-reg.component';

export const PagesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgotpwd',
        component: ForgotpwdComponent
    },
    {
        path: 'visitor-register',
        component: VisitorRegComponent
    },
    ]
}];
