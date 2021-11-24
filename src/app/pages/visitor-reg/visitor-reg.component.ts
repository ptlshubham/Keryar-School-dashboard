import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { VisitorService } from 'app/visitor/visitor.service';
import { RegisterVisitor } from 'app/visitor/visitorreg/visitorreg.model';

@Component({
  selector: 'app-visitor-reg',
  templateUrl: './visitor-reg.component.html',
  styleUrls: ['./visitor-reg.component.css']
})
export class VisitorRegComponent implements OnInit {
  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public visitorModel: RegisterVisitor = new RegisterVisitor;
  forgotBox: boolean = false;
  changePwd: boolean = false;
  otpBox: boolean = false;
  public visitorDetails: RegisterVisitor[] = [];

  emailResp: any;
  otpResp: any;
  role: any = [];
  selectedRole: string = 'Visitor';
  constructor(
    private element: ElementRef,
    private apiService: ApiService,
    private router: Router,
    private VisitorService: VisitorService
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
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
    body.classList.add('lock-page');

    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700)
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('lock-page');
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
  signup() {
    this.VisitorService.saveVisitorRegister(this.visitorModel).subscribe((data: any) => {
      this.visitorDetails = data;
      localStorage.setItem('role', this.selectedRole);
      localStorage.setItem('UserName', data.username);
      localStorage.setItem('email', data.email);
      localStorage.setItem('vid', data.insertId);
      localStorage.setItem('secret', data.password);
      debugger
      this.apiService.showNotification('top', 'right', 'Otp Sent on Registered Email Address.', 'success');
      this.otpBox = true;
    })
  }
  checkOTP() {
    this.visitorModel.password = localStorage.getItem('secret');
    this.visitorModel.email = localStorage.getItem('email');
    this.visitorModel.visitorId = localStorage.getItem('vid');
    this.VisitorService.getOtp(this.visitorModel).subscribe((data) => {
      localStorage.setItem('authToken', data[0].token);
      debugger
      this.apiService.showNotification('top', 'right', 'OTP is verified Successfully.', 'success');
      this.router.navigate(['visitor/visitorreg']);
      localStorage.removeItem('secret');
    });
  }
}
