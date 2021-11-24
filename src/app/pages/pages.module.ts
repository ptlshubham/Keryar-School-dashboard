import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutes } from './pages.routing';
import { LoginComponent } from './login/login.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { AdminforgotComponent } from './adminforgot/adminforgot.component';
import { VisitorRegComponent } from './visitor-reg/visitor-reg.component';
import { VisitorLoginComponent } from './visitor-login/visitor-login.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        AdminloginComponent,
        ForgotpwdComponent,
        AdminforgotComponent,
        VisitorRegComponent,
        VisitorLoginComponent,
    ]
})

export class PagesModule { }
