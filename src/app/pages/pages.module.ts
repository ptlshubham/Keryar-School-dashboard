import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutes } from './pages.routing';
import { LoginComponent } from './login/login.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { VisitorRegComponent } from './visitor-reg/visitor-reg.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        FormsModule
    ],
    declarations: [
        LoginComponent,
        ForgotpwdComponent,
        VisitorRegComponent,
    ]
})

export class PagesModule { }
