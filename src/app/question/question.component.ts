import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { Chapater } from 'app/primary/chapater.model';
import { ManageService } from 'app/primary/manage.service';
import { Std } from 'app/primary/standard.model';
import { Subject } from 'app/primary/subject.model';
import Swal from 'sweetalert2';
import { Optionvalue } from './options.model';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { Quetype } from './quetype.model';

declare var require: any
declare var $: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})


export class QuestionComponent implements OnInit {


  randomColor: any = 'none';
  public subjects: Subject[] = [];
  public stdlist: Std[] = [];
  public questionModel: Question = {};
  public que: Question[] = [];
  public quelist: Question[] = [];
  public editQue: Question[] = [];
  public quetypeModel: Quetype[] = [];
  public type: Quetype[] = [];
  public optionvalueModel: Optionvalue[] = [];
  public options: Optionvalue[] = [];
  optionimage: any = [];
  Ref_id: any;
  std: any[];
  selectedSubject: any;
  questionList: boolean = false;
  addQuestion: boolean = false;
  updateButton: boolean = false;
  submitButton: boolean = false;
  showChapter: boolean = false;
  addOptions: any = [];
  val = 0;
  selectedQue: any;
  addAnswers: any = [];
  ansVal = 0;
  subID: any;
  chapId: any;
  search: string = '';
  timeslots: any;
  testdate: any;
  istestcr: boolean = false;

  // Test Create Modal Variables
  isMasterSel: boolean = false;
  checkedQuestionList: any = [];
  totalQuestions: number = 0;
  totalMarks: number = 0;
  duration: number = 0;
  testName: string = '';
  standardId: number;
  standardName: string = '';
  subjectId: number;
  subjectName: string = '';
  public Roles = localStorage.getItem('role');
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  image: any;
  questionRegForm: FormGroup;
  selctedDate: any;
  model: Date;
  public selectedMoment = new Date();
  public chapater: Chapater[] = [];
  model2: Date;
  selectedCha: any;
  constructor(
    private manageService: ManageService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private fm: FormBuilder,

  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.Ref_id = res.val;
      this.getSubject();

    })
    this.getQueType();
    this.getDashboardStdList();
    this.questionList = false;
    this.isMasterSel = false;
  }
  test(data) {

    this.selctedDate = data.next

  }

  ngOnInit(): void {

    this.getStandard();
    this.addOptions = [{ id: 0, name: '', imageoption: null }, { id: 1, name: '', imageoption: null }, { id: 2, name: '', imageoption: null }, { id: 3, name: '', imageoption: null }];
    this.val++;
    this.ansVal++;
    this.questionRegForm = this.fm.group({
      marks: ['', Validators.required, Validators.name,],
      duration: ['', Validators.required, Validators.name,],
    });
    this.questionModel.imageque = null;

  }

  toggleDateTimeState($event) {
    $event.stopPropagation();
  }

  addOptionsList() {
    this.val++;
    this.addOptions.push({ id: this.val, name: '', image: '' });
  }

  removeOptionsList(val) {
    this.addOptions.splice(val, 1);
  }

  addAnswersList() {
    this.ansVal++;
    this.addAnswers.push({ name: this.ansVal });
  }

  removeAnswersList(val) {
    this.addAnswers.splice(val, 1);
  }

  getStandard() {
    this.questionService.getStdItem(this.Ref_id).subscribe((data: any) => {
      this.std = data;
    });

  }

  getSubject() {
    this.manageService.getSubjectList(this.Ref_id).subscribe((data: any) => {
      this.subjects = data;
      this.subjects.forEach(element => {
        this.manageService.getChapatersList(element.id).subscribe((res: any) => {
          element.chapter = res;
          debugger
          element.color = '3px 3px 5px 5px #ebf0ec';
        });
        // this.questionService.getAllQuestion(element.id).subscribe((res: any) => {
        //   element.question = res;
        //   element.color = '3px 3px 5px 5px #ebf0ec';

        // })
      })
    });
  }
  getChapaters() {
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
  selectBankList(id) {
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSubject = element.subject;
      }
    })
  }

  getDashboardStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.stdlist = data;
    });
  }

  closeQue() {
    this.addQuestion = false;
    this.questionList = true;
  }

  openQuestionBox() {
    this.questionModel = {};
    this.selectedQue = '';
    this.addQuestion = true;
    this.questionList = false;
    this.updateButton = false;
    this.submitButton = true;
  }

  openQuestionList(sub) {
    this.subjects.forEach(element => {
      if (element.id == sub.id) {
        element.color = '3px 3px 5px 5px #1c8d91';
      } else {
        element.color = '3px 3px 5px 5px #ebf0ec';
      }
    })
    this.showChapter = true;
    this.questionList = false;
    this.addQuestion = false;
    this.istestcr = false;
    this.standardName = this.std[0].stdname;
    this.standardId = this.std[0].id;
    this.subjectName = sub.subject;
    this.subjectId = sub.id;
    this.subID = sub.id;
    this.getChapaters();

  }
  createChapTest() {
    this.istestcr = true;
    this.questionList = false;
    this.addQuestion = false;
    this.checkedQuestionList = [];
  }

  openChapterBox(chap) {

    if (chap.id == undefined) {

      this.chapater.forEach(element => {
        if (element.id == chap.chapid) {
          element.color = '3px 3px 5px 5px #1c8d91';
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
          element.color = '3px 3px 5px 5px #1c8d91';
        } else {
          element.color = '3px 3px 5px 5px #ebf0ec';
        }
      })
      this.chapId = chap.id;

      this.questionList = true;
      this.addQuestion = false;
      this.istestcr = false;
      this.getQueList(chap.id);
      // this.getChapaters();
      this.resetModalData();
    }



  }
  addSubject() {
    this.router.navigate(['/primary'], {
      queryParams: {
        val: this.Ref_id
      }
    })
  }

  saveNewQuestion(data) {

    if (this.image == undefined) {
      this.questionModel.imageque = null;
    }
    else {
      data.imageque = this.image;
    }
    this.addOptions.forEach(element => {
      if (element.image == '') {
        element.image == null
      }
    });
    data.options = this.addOptions;
    // data.answer = this.addAnswers;

    data.stdid = this.Ref_id;
    data.subid = this.subID;
    data.chapid = this.chapId;
    data.quetype = this.selectedQue;

    this.questionService.saveQueList(data).subscribe((data1: any) => {
      this.apiService.showNotification('top', 'right', 'New Question Added Successfully.', 'success');
      this.questionList = true;
      this.addQuestion = false;
      this.showChapter = true;
      this.openChapterBox(data);
      this.getQueList(this.chapId);
      this.getChapaters();
    })
  }

  updateQuestion(data) {
    data.quetype = this.selectedQue;
    this.questionService.updateQueList(data).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Updated Question List Successfully.', 'success');
      this.questionList = true;
      this.addQuestion = false;
    })
  }

  getQueType() {
    this.questionService.getQueList().subscribe((data: any) => {
      this.type = data;
    });
  }

  selectQue(id) {
    this.type.forEach(element => {
      if (element.id == id) {
        this.selectedQue = element.name;
      }
    })
  }

  getQueList(id) {
    this.questionService.getAllQuestion(id).subscribe((data: any) => {
      this.que = data;
      this.quelist = data;
      // for (let i = 0; i < this.que.length; i++) {
      //   this.que[i].index = i + 1;
      // }

    });
  }
  searchQuestion(val) {
    if (this.search == '') {
      this.que = this.quelist;
    } else {
      this.transform(this.quelist, val);
    }

  }
  transform(test: Question[], searchValue: string) {
    this.que = [];
    this.quelist.forEach(element => {
      if (element.quetype.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        element.question.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.que.push(element);
      }
    })
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

  editQuestion(data) {

    // this.selectQue = data.quetype;
    this.questionList = false;
    this.addQuestion = true;
    this.questionModel = data;
    this.questionService.getOptionvalue(this.questionModel.id).subscribe((res: any) => {
      this.questionModel.addOptions = res;
      this.addOptions = res;

    });
    this.questionService.getAnswervalue(this.questionModel.id).subscribe((res: any) => {
      this.questionModel.answer = res[0].answer;

    })
    this.selectedQue = data.quetype;
    this.updateButton = true;
    this.submitButton = false;
  }

  resetModalData() {
    for (var i = 0; i < this.que.length; i++) {
      this.que[i].isactive = false;
    }
    // this.checkedQuestionList = [];
    this.totalMarks = 0;
    this.totalQuestions = 0;
    this.duration = 0;
    this.isMasterSel = false;
    this.testName = '';
  }

  checkUncheckAll() {

    if (this.isMasterSel) {
      for (var i = 0; i < this.que.length; i++) {
        this.que[i].isactive = this.isMasterSel;

      }
      this.getCheckedItemList();

    } else {
      for (var i = 0; i < this.que.length; i++) {
        this.que[i].isactive = this.isMasterSel;

      }
      if (this.checkedQuestionList.length > 0) {

        this.que.forEach(element => {
          for (let i = 0; i < this.checkedQuestionList.length; i++) {
            if (element.id == this.checkedQuestionList[i].id) {
              this.checkedQuestionList.splice(i, 1);
            }
          }
        })
      }
      else {

        this.checkedQuestionList = [];
      }
    }


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
    debugger
    // this.isMasterSel = this.que.every(function (item: any) {
    //   return item.isSelected == true;
    // })
    // this.isMasterSel = true;
    this.getCheckedItemList();
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
  back() {
    if (this.showChapter) {
      this.showChapter = false;
      this.istestcr = false;
      this.questionList = false;
      this.subjects.forEach(element => {
        element.color = '3px 3px 5px 5px #ebf0ec';
      })

    }
    else {
      this.router.navigate(['dashboard']);
    }
  }
  canceltest() {
    this.checkedQuestionList = [];
    this.isMasterSel = false;
    for (var i = 0; i < this.que.length; i++) {
      this.que[i].isactive = this.isMasterSel;

    }

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
    for (let i = 0; i < (this.checkedQuestionList.length - 1); i++) {
      if (this.checkedQuestionList[i].id == this.checkedQuestionList[i + 1].id) {
        this.checkedQuestionList.splice(i, 1);
      }
      this.totalMarks = this.totalMarks + this.checkedQuestionList[i].marks;
      this.duration = this.duration + this.checkedQuestionList[i].time;
    }
    data.questionlist = this.checkedQuestionList;


    this.questionService.saveTest(data).subscribe((res: any) => {
      this.apiService.showNotification('top', 'right', 'Test created Successfully.', 'success');

    })
    this.resetModalData();
  }
  select(event) {

    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      max_height = 400;
      max_width = 400;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, event.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';


            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);


            this.questionService.uploadImage(formdata).subscribe((response) => {
              this.image = response;
              console.log(response);
              this.isImageSaved = true;


            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }

  }
  removeTempPic() {
    this.image = '';
  }

  imageOption(event, ind) {

    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      max_height = 400;
      max_width = 400;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, event.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';


            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);


            this.questionService.uploadImage(formdata).subscribe((response) => {
              this.optionimage.push(response);
              this.addOptions[ind].image = response;

              console.log(response);
              this.isImageSaved = true;


            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }

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
  removeOptionTempImg(ind) {
    this.addOptions[ind].image = ''
  }

}
