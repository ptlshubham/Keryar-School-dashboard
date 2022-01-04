import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'app/register/register.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public subject: any = [];
  TestReport: boolean = false;
  constructor(
    private registerService: RegisterService
  ) {
    this.getSubjectById();
  }

  ngOnInit(): void {
  }
  getSubjectById() {
    this.registerService.getSubjectByID(localStorage.getItem("stdId")).subscribe((data: any) => {
      this.subject = data;
      debugger
    });
  }
  openTestReport(sub) {
    this.subject.forEach(element => {
      if (element.id == sub.id) {
        element.color = '3px 3px 5px 5px #1c8d91';
      } else {
        element.color = '3px 3px 5px 5px #ebf0ec';
      }
    })
    this.TestReport = true;
  }

}
