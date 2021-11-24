import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { AdminforgotComponent } from './adminforgot/adminforgot.component';
import { VisitorRegComponent } from './visitor-reg/visitor-reg.component';
import { VisitorLoginComponent } from './visitor-login/visitor-login.component';

export const PagesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminloginComponent
    },
    {
        path: 'forgotpwd',
        component: ForgotpwdComponent
    },
    {
        path: 'adminforgot',
        component: AdminforgotComponent
    },
    {
        path: 'visitor-register',
        component: VisitorRegComponent
    },
    {
        path: 'visitorlogin',
        component: VisitorLoginComponent
    }

    ]
}];
