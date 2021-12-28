import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginService } from './login.service';
import { ApiService } from 'app/api.service';
import { FormGroup } from '@angular/forms';
import { Loginuser } from './login.model';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    focus;
    focus1;
    focus2;
    test: Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    role: any = [];
    selectedRole: string = '';
    public loginModel: Loginuser[] = [];
    loginForm: FormGroup;
    account_validation_messages = {
        'email': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid email' }
        ],
    }

    constructor(
        private element: ElementRef,
        private loginService: LoginService,
        private apiService: ApiService,
        private router: Router) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.role = [
            {
                name: 'Teacher'
            },
            {
                name: 'Student',
            },

        ];
        localStorage.clear();
    }
    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.checkFullPageBackgroundImage();
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    selectRole(name) {
        this.role.forEach(element => {
            if (element.name == name) {
                this.selectedRole = element.name;
            }
        })

    }
    login(credentials) {
        credentials.role = this.selectedRole;
        console.log("......data...." + credentials.email);

        this.loginService.userLogin(credentials).subscribe(data => {
            debugger
            if (data == 1) {
                this.apiService.showNotification('top', 'right', 'Wrong Email!', 'danger');
            }
            else if (data == 2) {

                this.apiService.showNotification('top', 'right', 'Wrong Password!', 'danger');

            }
            else {
                if (data[0].role == 'Admin') {
                    debugger
                    this.apiService.showNotification('top', 'right', 'Admin successfully Login.', 'success');
                    localStorage.setItem('authenticationToken', data[0].token);
                    localStorage.setItem('UserId', data[0].id);
                    localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
                    localStorage.setItem('role', data[0].role);
                    this.router.navigate(['dashboard']);
                }
                else if (data[0].role == 'Teacher') {
                    debugger
                    this.apiService.showNotification('top', 'right', 'Teacher successfully Login.', 'success');
                    localStorage.setItem('authenticationToken', data[0].token);
                    localStorage.setItem('UserId', data[0].id);
                    localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
                    localStorage.setItem('standardid', data[0].standard);
                    localStorage.setItem('gender', data[0].gender);
                    localStorage.setItem('role', data[0].role);
                    this.router.navigate(['dashboard']);
                }
                else if (data[0].role == 'Student') {
                    debugger
                    this.apiService.showNotification('top', 'right', 'Student successfully Login.', 'success');
                    localStorage.setItem('authenticationToken', data[0].token);
                    localStorage.setItem('UserId', data[0].id);
                    localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
                    localStorage.setItem('standardid', data[0].standard);
                    localStorage.setItem('gender', data[0].gender);
                    localStorage.setItem('role', data[0].role);
                    this.router.navigate(['dashboard']);
                }
                else if (data[0].role == 'Visitor') {
                    debugger
                    if (data[0].detailsupdated == false) {
                        localStorage.setItem('authenticationToken', data[0].token);
                        localStorage.setItem('UserId', data[0].id);
                        localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
                        localStorage.setItem('role', data[0].role);
                        localStorage.setItem('standardid', data[0].standard);
                        this.router.navigate(['visitor/visitorreg']);
                    }
                    else {
                        debugger
                        localStorage.setItem('authenticationToken', data[0].token);
                        localStorage.setItem('UserId', data[0].id);
                        localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
                        localStorage.setItem('role', data[0].role);
                        localStorage.setItem('standardid', data[0].standard);
                        localStorage.setItem('gender', data[0].gender);
                        this.router.navigate(['visitor/visitortest']);
                    }
                }
                else if (data[0].role == 'Parents') {
                    debugger
                    this.apiService.showNotification('top', 'right', 'Parent successfully Login.', 'success');
                    localStorage.setItem('authenticationToken', data[0].token);
                    localStorage.setItem('UserId', data[0].id);
                    localStorage.setItem('UserName', data[0].fname );
                    localStorage.setItem('stuid', data[0].stuid);
                    localStorage.setItem('role', data[0].role);
                    this.router.navigate(['dashboard']);
                }
                // else {
                //     this.router.navigate(['dashboard']);
                // }
            }
        });
    }
}
