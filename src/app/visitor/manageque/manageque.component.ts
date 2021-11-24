import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Chapater } from 'app/manage/subject/chapater.model';
import { Subject } from 'app/manage/subject/subject.model';
import { Question } from 'app/question/question.model';
import { QuestionService } from 'app/question/question.service';
import Swal from 'sweetalert2';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-manageque',
  templateUrl: './manageque.component.html',
  styleUrls: ['./manageque.component.css']
})
export class ManagequeComponent implements OnInit {
  public questionModel: Question = {};
  public stdlist: Std[];
  public subjects: Subject[];
  public que: Question[];
  public quelist: Question[] = [];
  public stdId: any;
  selectedSubjectId: any;
  selectedstd: any;
  questionList: boolean = false;
  addQuestion: boolean = false;
  openQuestionnaire: boolean = false;
  viewTestFlag: boolean = false;
  addOptions: any = [];
  addAnswers: any = [];
  visitorTestList: any = [];
  selectedStd: any;
  selectedSubject: any;
  ansVal = 0;
  val = 0;
  issubjectlist: boolean = false;
  subjectId: any;
  submitButton: boolean = false;
  // Test Create Modal Variables
  isMasterSel: boolean = false;
  checkedQuestionList: any;
  showChapter: boolean = false;
  totalQuestions: number = 0;
  totalMarks: number = 0;
  duration: number = 0;
  testName: string = '';
  standardId: number;
  standardName: string = '';
  subjetId: number;
  subjectName: string = '';
  totalRecords: string;
  page: Number = 1;
  testpage: Number = 1;
  quePage:Number=1;
  subID: any;
  std: any[];
  queList:any=[];
  public chapater: Chapater[] = [];
  istestcr: boolean = false;
  chapId: any;
  items = [];
  selectedCha: any;
  constructor(
    private manageService: ManageService,
    private questionService: QuestionService,
    private apiService: ApiService,
    private VisitorService: VisitorService,
  ) {
    this.getStandardList();
  }

  ngOnInit(): void {
    this.addOptions = [{ id: 0, name: '' }, { id: 1, name: '' }, { id: 2, name: '' }, { id: 3, name: '' }];
    this.val++;
    this.addAnswers = [{ name: this.ansVal }];
    this.ansVal++;

  }
  createChapTest() {
    this.istestcr = true;
    this.questionList = false;
    this.addQuestion = false;
    this.checkedQuestionList = [];
  }
  // addOptionsList() {
  //   this.val++;
  //   this.addOptions.push({ id: this.val, name: '', image: '' });
  // }

  // removeOptionsList(val) {
  //   this.addOptions.splice(val, 1);
  // }

  addAnswersList() {
    this.ansVal++;
    this.addAnswers.push({ name: this.ansVal });
  }

  removeAnswersList(val) {
    this.addAnswers.splice(val, 1);
  }

  getStandardList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.stdlist = data;
    });
  }
  selectStdList(id) {
    this.issubjectlist = true;
    this.viewTestFlag = false;
    this.stdId = id;
    this.getSubject();
    this.stdlist.forEach(element => {
      if (element.id == id) {
        this.selectedstd = element.stdname;
      }
      this.getSubject();
    })
  }
  selectStdVisitor(id) {
    this.stdId = id;
    this.getSubject();
    this.stdlist.forEach(element => {
      if (element.id == id) {
        this.selectedStd = element.stdname;
      }
    })
  }
  getSubject() {
    this.manageService.getSubjectList(this.stdId).subscribe((data: any) => {
      this.subjects = data;
      this.subjects.forEach(element => {
        this.manageService.getChapatersList(element.id).subscribe((res: any) => {
          element.chapter = res;
          element.color = '3px 3px 5px 5px #ebf0ec';
        });
      })
    });
  }
  selectSubjectList(id) {
    this.selectedSubjectId = id;
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSubject = element.subject;
      }
      this.getVisitorTest();
    });
  }
  getVisitorTest() {
    this.selectedSubjectId;
    let data = {
      subid: this.selectedSubjectId,
      stdid: this.stdId
    };
    
    this.VisitorService.getVisitorTestList(data).subscribe((data: any) => {
      this.visitorTestList = data;
      
    });
  }
  ViewVisitorTestQue(data) {
    this.subjects.forEach(element => {
      if (element.id == data.subjectId) {
        this.selectedSubject = element.subject;
        
      }
      // this.getVisitorTest();
    });
    this.stdlist.forEach(element => {
      if (element.id == data.stdid) {
        this.selectedstd = element.stdname;
      }
      // this.getSubject();
    })
    this.questionModel = data;
    this.VisitorService.getVisitorTestQue(data).subscribe((res:any)=>{
      this.queList = res;
      debugger
    })
   


  }

  openQuestionList(sub) {
    debugger
    this.subjects.forEach(element => {
      if (element.id == sub.id) {
        element.color = '3px 3px 5px 5px #ef8157';
      } else {
        element.color = '3px 3px 5px 5px #ebf0ec';
      }
    })
    this.subjectId = sub.id;
    this.subjectName = sub.subject;
    this.showChapter = true;
    this.questionList = false;
    this.addQuestion = false;
    this.istestcr = false;
    // this.standardName = this.std[0].stdname;
    // this.standardId = this.std[0].id;


    // this.subID = sub.id;
    this.getChapaters();

  }
  getChapaters() {
    debugger
    this.manageService.getChapatersList(this.subjectId).subscribe((data: any) => {
      this.chapater = data;
      this.chapater.forEach(element => {
        this.questionService.getAllQuestion(element.id).subscribe((res: any) => {
          element.question = res;
          element.color = '3px 3px 5px 5px #ebf0ec';
        })
      })
    });
  }
  openChapterBox(chap) {

    if (chap.id == undefined) {

      this.chapater.forEach(element => {
        if (element.id == chap.chapid) {
          element.color = '3px 3px 5px 5px #ef8157';
        } else {
          element.color = '3px 3px 5px 5px #ebf0ec';
        }
      })
      this.chapId = chap.chapid;

      this.questionList = true;
      this.addQuestion = false;
      this.istestcr = false;

      this.getQueList(chap.chapid);
      // this.getChapaters();
      this.resetModalData();
    }
    else {

      this.chapater.forEach(element => {
        if (element.id == chap.id) {
          element.color = '3px 3px 5px 5px #ef8157';
        } else {
          element.color = '3px 3px 5px 5px #ebf0ec';
        }
      })
      this.chapId = chap.id;

      this.questionList = true;
      this.addQuestion = false;
      this.istestcr = false;
      this.getQueList(this.chapId);
      // this.getChapaters();
      this.resetModalData();
    }



  }
  openQuestionnaireBox() {
    this.openQuestionnaire = true;
    this.viewTestFlag = false;
  }
  closeQuestion() {
    this.issubjectlist = false
    this.openQuestionnaire = false;
    this.addQuestion = false;
    this.questionList = false;
    this.submitButton = false;
    this.viewTestFlag = false;
  }
  openTestBox() {
    this.viewTestFlag = true;
    this.openQuestionnaire = false;
    this.addQuestion = false;
    this.questionList = false;
    this.submitButton = false;
    this.issubjectlist = false;
    this.istestcr = false;
    this.showChapter = false;
  }
  backToHome() {
    this.viewTestFlag = false;
    this.openQuestionnaire = false;
    this.addQuestion = false;
    this.questionList = false;
    this.submitButton = false;
    this.issubjectlist = false;
  }
  openQuestionBox() {
    this.istestcr = false;
    this.addQuestion = true;
    this.questionList = false;
    this.submitButton = true;
    this.viewTestFlag = false;
  }
  closeQue() {
    this.addQuestion = false;
    this.questionList = true;
    this.viewTestFlag = false;
  }



  saveNewQuestion(data) {
    debugger
    this.addOptions.forEach(element => {
      if (element.image == '') {
        element.image == null
      }
    });
    data.options = this.addOptions;
    // data.answer = this.addAnswers;

    data.stdid = this.stdId;
    data.subid = this.subjectId;
    data.chapid = this.chapId;
    // data.quetype = this.selectedQue;
    debugger

    this.VisitorService.saveVisitorQue(data).subscribe((data1: any) => {
      this.apiService.showNotification('top', 'right', 'New Question Added Successfully.', 'success');
      this.questionList = true;
      this.addQuestion = false;
      this.showChapter = true;
      this.openChapterBox(data);
      this.getQueList(this.chapId);
      this.getChapaters();
    })
  }

  getQueList(id) {
    this.questionService.getAllQuestion(id).subscribe((data: any) => {
      this.que = data;
      debugger
      this.quelist = data;

      // for (let i = 0; i < this.que.length; i++) {
      //   this.que[i].index = i + 1;x
      // }

    });
  }
  removeQuestion(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete!",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Yes',
      buttonsStyling: false
    }).then((result) => {
      this.questionService.removeQueList(id).subscribe((data: any) => {
        this.apiService.showNotification('top', 'right', 'Remove Question Successfully.', 'success');

      });
      if (result.value == true) {

        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Question has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getQueList(this.chapId);
        this.getChapaters();
      }
    })


  }

  resetModalData() {
    for (var i = 0; i < this.que.length; i++) {
      this.que[i].isactive = false;
    }
    this.checkedQuestionList = [];
    this.totalMarks = 0;
    this.totalQuestions = 0;
    this.duration = 0;
    this.isMasterSel = false;
    this.testName = '';
  }
  checkUncheckAll() {
    for (var i = 0; i < this.que.length; i++) {
      this.que[i].isactive = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected(val) {
    debugger
    this.que.forEach(element => {
      if ((element.id == val.id) && val.isactive) {
        element.isSelected = val.isactive;
      }
      else {
        element.isSelected = false;
      }
    })
    this.getCheckedItemList();
  }
  getCheckedItemList() {
    debugger
    // this.checkedQuestionList = [];
    // for (let i = 0; i < this.checkedQuestionList.length; i++) {
    //   this.checkedQuestionList[i].index = i + 1;
    // }
    // this.duration = 0;
    // this.totalMarks = 0;
    // this.totalQuestions = 0;
    for (var i = 0; i < this.que.length; i++) {
      if (this.que[i].isSelected) {
        this.checkedQuestionList.push(this.que[i]);
      }
    }
    for (let i = 0; i < (this.checkedQuestionList.length - 1); i++) {
      if (this.checkedQuestionList[i].id == this.checkedQuestionList[i + 1].id) {
        this.checkedQuestionList.splice(i, 1);
      }
    }
    this.totalQuestions = this.checkedQuestionList.length;
    //this.checkedQuestionList = JSON.stringify(this.checkedQuestionList);
  }
  viewtestlist() {
    this.totalMarks = 0;
    this.duration = 0;
    for (let i = 0; i < this.checkedQuestionList.length; i++) {
      this.checkedQuestionList[i].index = i + 1;
    }
    this.checkedQuestionList.forEach(element => {
      this.totalMarks = this.totalMarks + element.marks;
      this.duration = this.duration + element.time;

    });
    this.totalMarks;
    this.duration;

  }
  selectChapater(id) {
    this.chapater.forEach(element => {
      if (element.id == id) {
        this.selectedCha = element.chapname;
      }
      this.chapId = id;
      this.getQueList(this.chapId);
    })
  }
  updateTotals() {
    this.totalMarks = 0;
    this.duration = 0;
    for (var i = 0; i < this.checkedQuestionList.length; i++) {
      this.totalMarks = this.totalMarks + this.checkedQuestionList[i].marks;
      this.duration = this.duration + this.checkedQuestionList[i].time;
    }
  }

  setMarks(_marks, sd) {
    sd.marks = Number(_marks);
    this.updateTotals();
  }

  setDuration(_duration, sd) {
    sd.time = Number(_duration);
    this.updateTotals();
  }
  createTest(data: any) {

    console.log('Create Test');

    data.stdId = this.stdId;
    data.subjectId = this.subjectId;
    data.questionlist = this.checkedQuestionList;

    this.VisitorService.saveVisitorTest(data).subscribe((res: any) => {
      this.apiService.showNotification('top', 'right', 'Visitor Test added Successfully.', 'success');
    })
    this.resetModalData();
  }
}
