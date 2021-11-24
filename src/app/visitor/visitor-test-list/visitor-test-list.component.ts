import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Subject } from 'app/manage/subject/subject.model';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-visitor-test-list',
  templateUrl: './visitor-test-list.component.html',
  styleUrls: ['./visitor-test-list.component.css']
})
export class VisitorTestListComponent implements OnInit {
  visitorTestList: any = [];
  subjectId: any;
  stdid: any;
  selectedSubject: any;
  stdshow: any;
  public stdlist: Std[];
  public subjects: Subject[];
  constructor(
    private VisitorService: VisitorService,
    private manageService: ManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.subjectId = res.subid;
      this.stdid = res.stdid;
      debugger

      // this.getStandardList();
    })
    if (localStorage.getItem('stdid') == undefined) {
      this.getSubject(this.subjectId);
      this.getVisitorTest();
    }
    else {
      this.getSubject(localStorage.getItem('stdid'));
    }
  }

  ngOnInit(): void {
    this.stdshow = this.getSubject(localStorage.getItem('stdid'));
  }
  getSubject(id) {
    this.manageService.getSubjectList(id).subscribe((data: any) => {
      this.subjects = data;

    });
  }
  selectSubjectList(id) {

    this.subjectId = id;
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSubject = element.subject;
      }
    });
    this.getVisitorTest();
  }
  getVisitorTest() {
    let data = {
      stdid: localStorage.getItem('stdid'),
      subid: this.subjectId
    }
    this.VisitorService.getVisitorTestList(data).subscribe((data: any) => {
      this.visitorTestList = data;
      debugger
    });
  }
  studentTest(data) {
    debugger
    this.router.navigate(['visitor/visitorexam'],{
      queryParams:{
        id:data.id
      }
    });
    // this.testId = data.id
    // // this.testModel.totalque = ;
    // this.testModel.subject = data.subject;
    // this.testModel.testname = data.testname;
    // this.testModel.time = data.totalminute;
    // this.testModel.marks = data.totalmarks;
    // this.testInfoBoxFlag = true;
  }

}
