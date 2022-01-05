import {
  Component, OnInit, AfterViewInit, AfterViewChecked,
  AfterContentInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { DAYS_OF_WEEK } from "angular-calendar";
import { ApiService } from "app/api.service";
import { LoginService } from "app/pages/login/login.service";
import { RegisterService } from "app/register/register.service";
import { VisitorRoutes } from "app/visitor/visitor.routing";

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  collapse?: string;
  icontype: string;
  roles: string;
  // icon: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-school",
    roles: "Admin",
  },
  {
    path: "/primary",
    title: "Manage",
    type: "link",
    roles: "Admin",
    icontype: "fa fa-tasks",
  },
  // {
  //   path: "/manage",
  //   title: "Manage",
  //   type: "sub",
  //   collapse: "orders",
  //   roles: "Admin",
  //   icontype: "fa fa-tasks",
  //   children: [
  //     { path: "std", title: "Add Stanadard", ab: "AS" },
  //     { path: "subject", title: "Add Subject", ab: "AS" },
  //     { path: "syllabus", title: "Add Syllabus", ab: "AS" },
  //   ],
  // },
  {
    path: "/exam",
    title: "Exam",
    type: "link",
    roles: "Admin",
    icontype: "fa fa-laptop",
  },

  {
    path: "/calendar",
    title: "Event Calendar",
    type: "link",
    roles: "Admin",
    icontype: "fa fa-calendar",
  },

  {
    path: "/banners",
    title: "Banners",
    type: "link",
    roles: "Admin",
    icontype: "fa fa-picture-o",
  },
  {
    path: "/live",
    title: "Live Session",
    type: "link",
    roles: "Admin",
    icontype: "fa fa-television",
  },
  {
    path: "/livechat",
    title: "Chat Box",
    type: "link",
    roles: "Admin",
    icontype: "fas fa-comment",
  },
  {
    path: "/visitor",
    title: "Visitor",
    type: "sub",
    collapse: "visit",
    roles: "Admin",
    icontype: "fa fa-user",
    children: [
      { path: "visitorreg", title: "Registration", ab: "VR" },
      { path: "visitorlist", title: "Vistor List", ab: "VL" },
      { path: "manageque", title: "Manage Question", ab: "MQ" },
      { path: "visitortest", title: "Test List", ab: "TL" },
      { path: "visitorexam", title: "Vistor Test", ab: "VE" },

    ],
  },
];

export const Student: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "nc-icon nc-bank",
    roles: "Student",
  },
  // {
  //   path: "/testportal",
  //   title: "Test Portal",
  //   type: "link",
  //   roles: "Student",
  //   icontype: "fa fa-picture-o",
  // },
  {
    path: "/notification",
    title: "Notifications",
    type: "link",
    roles: "Student",
    icontype: "fa fa-bell",
  },
  {
    path: "/livechat",
    title: "Chat Box",
    type: "link",
    roles: "Student",
    icontype: "fas fa-comment",
  },
];

export const Teacher: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "nc-icon nc-bank",
    roles: "Teacher",
  },
  {
    path: "/manage",
    title: "Manage",
    type: "sub",
    collapse: "orders",
    roles: "Admin",
    icontype: "fa fa-tasks",
    children: [
      { path: "std", title: "Add Stanadard", ab: "AS" },
      { path: "subject", title: "Add Subject", ab: "AS" },
    ],
  },
  {
    path: "/exam",
    title: "Exam",
    type: "link",
    roles: "Teacher",
    icontype: "fa fa-laptop",
  },
  {
    path: "/calendar",
    title: "Event Calendar",
    type: "link",
    roles: "Teacher",
    icontype: "fa fa-calendar",
  },
  {
    path: "/notification",
    title: "Notifications",
    type: "link",
    roles: "Teacher",
    icontype: "fa fa-bell",
  },
  {
    path: "/livechat",
    title: "Chat Box",
    type: "link",
    roles: "Admin",
    icontype: "fas fa-comment",
  },
];
export const Visitor: RouteInfo[] = [
  {
    path: "/visitor",
    title: "Visitor",
    type: "sub",
    collapse: "visit",
    roles: "Visitor",
    icontype: "fa fa-user",
    children: [
      { path: "visitorreg", title: "Registration", ab: "VR" },
      // { path: "visitorlist", title: "Vistor List", ab: "VL" },
      { path: "visitortest", title: "Test List", ab: "TL" },
      { path: "visitorexam", title: "Vistor Test", ab: "VE" },

    ],
  },
];
export const Parents: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "nc-icon nc-bank",
    roles: "Parents",
  },
  {
    path: "/notification",
    title: "Notifications",
    type: "link",
    roles: "Parents",
    icontype: "fa fa-bell",
  },
  {
    path: "/livechat",
    title: "Chat Box",
    type: "link",
    roles: "Parents",
    icontype: "fas fa-comment",
  },
  {
    path: "/parents",
    title: "Parents",
    type: "sub",
    collapse: "parent",
    roles: "Parents",
    icontype: "fa fa-user",
    children: [
      { path: "reports", title: "Student Reports", ab: "SR" },
      // { path: "visitorlist", title: "Vistor List", ab: "VL" },
      // { path: "visitortest", title: "Test List", ab: "TL" },
      // { path: "visitorexam", title: "Vistor Test", ab: "VE" },

    ],
  },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any;
  public studentMenuItems: any;
  public parentsMenuItems: any;
  public teacherMenuItems: any;
  public visitorMenuItems: any;
  public students: any[];
  public Rolees = localStorage.getItem("role");
  public userName = localStorage.getItem("UserName");

  public userId = localStorage.getItem("UserId");
  datetime: any;
  in_time: any;
  out_time: any;
  Roles: any;
  visit: '';
  loginTotalTime: number;
  isNotMobileMenu() {
    if (window.outerWidth > 991) {
      return false;
    }
    return true;
  }
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private apiService: ApiService,
    private loginService: LoginService

  ) {
    var $sidebar = $('.sidebar');
    $('.fixed-plugin .background-color span').click(function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      // var new_color = $(this).data('color');
      var new_color = 'white';


      $sidebar.attr('data-color', new_color);



    });

    if (localStorage.getItem("role") == 'Student') {
      this.getProfilePic();
    }
  }
  ngOnInit() {
    this.userName
    debugger
    this.in_time = localStorage.getItem("lastInTime");
    this.out_time = localStorage.getItem("lastInTime");
    this.Roles = localStorage.getItem("role");
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.studentMenuItems = Student.filter((menuItem) => menuItem);
    this.teacherMenuItems = Teacher.filter((menuItem) => menuItem);
    this.visitorMenuItems = Visitor.filter((menuItem) => menuItem);
    this.parentsMenuItems = Parents.filter((menuItem) => menuItem)
    // this.loginTimeCalculation();

  }
  ngAfterViewInit() { }

  getProfilePic() {
    this.registerService.getStudentPicture(this.userId).subscribe((data: any) => {
      this.students = data;

    });
  }
  logout() {
    this.loginTimeCalculation();
    let data = {
      userid: localStorage.getItem("UserId"),
      loginMinute: this.loginTotalTime
    };
    this.loginService.UpdateLogout(data).subscribe((res) => {
      this.apiService.showNotification('top', 'right', 'Logout Successfully.', 'success');
      localStorage.clear();
      this.router.navigate(['pages/login']);
    });

  }

  loginTimeCalculation() {
    var intime = typeof datetime !== 'undefined' ? datetime : this.in_time;
    var datetime: any = new Date(intime).getTime();
    var now = new Date().getTime();
    if (isNaN(datetime)) {
      return "";
    }
    var milisec_diff: number = 0;
    if (datetime < now) {
      milisec_diff = now - datetime;
    } else {
      milisec_diff = datetime - now;
    }
    var minutes: number = 0;
    minutes = (milisec_diff / 60000);
    alert('minutes======='+minutes);
    var minutesRound = Math.round(minutes);
    this.loginTotalTime = minutesRound;
    console.log('Miutes====' + minutesRound);

  }
}
