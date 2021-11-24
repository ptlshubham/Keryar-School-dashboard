import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';
import { ExamService } from 'app/exam/exam.service';
import { Question } from 'app/question/question.model';
import { SubmittedTest } from 'app/testportal/submittest.model';
import { TestportalService } from 'app/testportal/testportal.service';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-visitorexam',
  templateUrl: './visitorexam.component.html',
  styleUrls: ['./visitorexam.component.css']
})
export class VisitorexamComponent implements OnInit {
  public submitTestModel: SubmittedTest = new SubmittedTest;
  public studentTestList: Question[] = [];
  ruleBoxFlag: boolean = false;
  questionBoxFlag: boolean = false;
  testInfoBoxFlag: boolean = false;
  selectedTestData: any;
  queList: any;
  testId: any;
  subjectId: any;
  stdid: any;
  uid:any;
  public testModel: Question = new Question;
  constructor(
    private testportalService: TestportalService,
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private VisitorService: VisitorService,
  ) {
    // this.getStudentTest();
    this.activatedRoute.queryParams.subscribe((res: any) => {
      // this.subjectId = res.subid;
      // this.stdid = res.stdid;
      // this.uid = res.uid;
      // this.startStuentExam();
      this.testId = res.id;
      this.getStudentTest()
      

    })
  }

  ngOnInit(): void {
  }
  getStudentTest() {
    let data={
      id:this.testId
    }
    this.VisitorService.getTestDetails(data).subscribe((data: any) => {
      this.studentTestList = data;
      
      // this.testModel.subject = data.subject;
    this.testModel.testname = data[0].testname;
    this.testModel.time = data[0].totalminute;
    this.testModel.marks = data[0].totalmarks;
    this.testInfoBoxFlag = true;
    this.gettestquestion();
    debugger

    });
  }
  studentTest(data) {

    this.testId = data.id
    // this.testModel.totalque = ;
    this.testModel.subject = data.subject;
    this.testModel.testname = data.testname;
    this.testModel.time = data.totalminute;
    this.testModel.marks = data.totalmarks;
    this.testInfoBoxFlag = true;
  }
  gettestquestion(){
    debugger
    let data1 = {
      id: this.testId,
    }
    this.examService.getViewVisitorTest(data1).subscribe((data: any) => {
      this.queList = data;
      
       
      this.queList.forEach(element => {
        element.uid = this.uid;
        if(element.quetype == 'MCQ'){
          this.examService.getOptionValueVisitor(element.id).subscribe((res: any) => {
            element.options = res;
            
             
          })
        }
       
      });
      // this.testportalService.updatePendingTest(this.testId).subscribe((req) => {
      // })
    });
  }
  startStuentExam() {

    this.testInfoBoxFlag = false;
    this.ruleBoxFlag = false;
    this.questionBoxFlag = true;
  
  }
  showRulesBox() {
    this.questionBoxFlag = false;
    this.testInfoBoxFlag = false;
    this.ruleBoxFlag = true;
  }
  cancelExam() {
    this.testInfoBoxFlag = true;
    this.ruleBoxFlag = false;
    this.questionBoxFlag = false;
  }
  backPendingTest() {
    this.testInfoBoxFlag = false;
    this.ruleBoxFlag = false;
    this.questionBoxFlag = false;
  }
  onItemChange(mcq, que) {
    que.answer = mcq.optionlist;
  }
  studentTestSubmit() {
    this.testportalService.saveVisitorStudentTest(this.queList).subscribe((response) => {
      let data={
          subid: this.subjectId,
          stdid: this.stdid,
          uid:this.uid
      }
        this.testportalService.GetTotalResultVisitor(data).subscribe((response)=>{
          let data1={
            uid:this.uid,
            marks:response
          }
          this.testportalService.UpdateVisitorResult(data1).subscribe((res)=>{
            if (response == 'success') {
              this.apiService.showNotification('top', 'right', 'Test Successfully Completed.', 'success');
            }
      
          });
          
        })
     
    })
  }
}
