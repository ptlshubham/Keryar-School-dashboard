import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Chapater } from 'app/manage/subject/chapater.model';
import { Subject } from 'app/manage/subject/subject.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-primary',
  templateUrl: './primary.component.html',
  styleUrls: ['./primary.component.css']
})
export class PrimaryComponent implements OnInit {
  openStd: boolean = false;
  openSubject: boolean = false;
  openChapater: boolean = false;
  openSyllabus: boolean = false;
  //-----------------------------------Stanadard Module---------------------------------------------------------
  public StdModel: Std = new Std;
  public STD: Std[] = [];
  public editStd: Std[] = [];

  public SubjectModel: Subject = new Subject;
  public std: Std[] = [];
  public subjects: Subject[] = [];
  val = 0;
  selectedStd: any;
  selectedSub: any;
  stdId: any;
  subId: any;
  Ref_id: any;
  editSub: Subject[] = [];
  addSubjects: any = [];
  addChapt: any = [];
  chaptList: any = [];

  public chapModel: Chapater = new Chapater;
  public chapater: Chapater[] = [];
  valu = 0;

  chapId: any;
  selectedChap: any;

  constructor(
    private manageService: ManageService,
    private apiService: ApiService
  ) {
    this.getStdList();
    this.openStd = true;
  }

  ngOnInit(): void {
    this.addSubjects = [{ name: this.val }];
    this.val++;
    this.addChapt = [{ name1: this.valu }]
    this.valu++;
  }
  manageStd() {
    this.openStd = true;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = false;
    this.getStdList();
  }
  manageSubject() {
    this.openStd = false;
    this.openSubject = true;
    this.openChapater = false;
    this.openSyllabus = false;
  }
  manageChapater() {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = true;
    this.openSyllabus = false;
  }
  manageSyllabus() {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = true;

  }
  //--------------------------------------Standard Fuctionallity Start Here-------------------------------------

  addStdList() {
    this.StdModel.isactive = true;
    this.manageService.saveStdList(this.StdModel).subscribe((response) => {
      this.apiService.showNotification('top', 'right', 'Standard Added Successfully.', 'success');
      this.getStdList();
    })
  }
  getStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.STD = data;
      for (let i = 0; i < this.STD.length; i++) {
        this.STD[i].index = i + 1;
      }
    });
  }
  removeStandard(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Standard than all the subjects and questions will be deleted",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Yes',
      buttonsStyling: false
    }).then((result) => {
      if (result.value == true) {
        this.manageService.removeStdList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Standard removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your standard has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getStdList();
      }
    })

  }
  editStandard(data) {
    this.editStd = data;
  }
  updateStandardList(data) {

    this.manageService.updateStdList(data).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Standard updated Successfully.', 'success');
    })

  }

  //--------------------------------------Standard Fuctionallity End Here---------------------------------------

  //--------------------------------------Subject Fuctionallity Start Here--------------------------------------
  addSubjectList() {
    this.val++;
    this.addSubjects.push({ name: this.val });
  }
  removeSubjectList(val) {
    this.addSubjects.splice(val, 1);
  }
  getSubject(id) {
    this.manageService.getSubjectList(id).subscribe((data: any) => {
      this.subjects = data;
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjects[i].index = i + 1;
      }
    });
  }
  selectSTDList(id) {
    this.stdId = id;
    this.getSubject(this.stdId);
    this.STD.forEach(element => {
      if (element.id == id) {
        this.selectedStd = element.stdname;
      }
    })
  }
  saveSubject(data) {
    this.addSubjects.forEach(element => {
      element.id = this.stdId
    });
    this.manageService.addSubject(this.addSubjects).subscribe((data: any) => {
      if (data == 'success') {
        this.addSubjects = [{ name: this.val }];
        this.apiService.showNotification('top', 'right', 'Subject added Successfully.', 'success');
        this.getSubject(this.stdId);
      }
      else {
        this.apiService.showNotification('top', 'center', 'Subject Already Added.', 'danger');
      }

    })
  }
  editSubject(data) {
    this.editSub = data;
  }
  updateSubject(data) {
    this.manageService.updateSubjectList(data).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Subject updated Successfully.', 'success');
      this.getSubject(this.stdId);
    })
  }
  removeSubject(id) {
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
      if (result.value == true) {
        this.manageService.removeSubjectList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Subject removed Successfully.', 'success');
        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your standard has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getSubject(this.stdId);
      }
    })


  }

  //--------------------------------------Subject Fuctionallity End Here-----------------------------------------

  //--------------------------------------Chapaters Fuctionallity Start Here-------------------------------------
  addChapList() {
    this.valu++;
    this.addChapt.push({ name1: this.valu });
  }
  removeChapList(valu) {
    this.addChapt.splice(valu, 1);
  }
  selectSubjectList(id) {
    this.subId = id;
    this.getSubject(this.stdId);
    this.subjects.forEach(element => {
      if (element.id == id) {
        this.selectedSub = element.subject;
      }
    })
    this.getChapaters();
  }
  saveChapatersList() {
    this.chaptList = [];
    this.addChapt.forEach(element => {
      let data = {
        chapName: element.chap,
      }
      this.chaptList.push(data)
    });
    this.chapModel.chapList = this.chaptList;
    this.chapModel.stdid = this.stdId;
    this.chapModel.subid = this.subId;
    this.chapModel.isactive = true;

    this.manageService.addChapaters(this.chapModel).subscribe((data: any) => {
      if (data == 'success') {
        this.apiService.showNotification('top', 'right', 'Chapter added Successfully.', 'success');

        this.getChapaters();
      }
      else {
        this.apiService.showNotification('top', 'center', 'Chapter added Already.', 'danger');
      }

    })
  }
  getChapaters() {
    this.manageService.getChapatersList(this.subId).subscribe((data: any) => {
      this.chapater = data;
      for (let i = 0; i < this.chapater.length; i++) {
        this.chapater[i].index = i + 1;
      }
    });
  }
  editChapater(data) {
    this.chapModel = data;
  }
  updateChapaterList() {
    this.manageService.updateChapaterList(this.chapModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Chapater updated Successfully.', 'success');
      this.getChapaters();
    })
  }
  removeChapater(id) {
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
      if (result.value == true) {
        this.manageService.removeChapaterList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Subject removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your standard has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getChapaters();
      }
    })

  }
  //--------------------------------------Chapaters Fuctionallity End Here--------------------------------------

  //--------------------------------------Syllabus Fuctionallity Start Here-------------------------------------
  selectChapaterList(id) {
    this.chapId = id;
    this.getChapaters();
    this.chapater.forEach(element => {
      if (element.id == id) {
        this.selectedChap = element.chapname;
      }
    })
  }



  //--------------------------------------Syllabus Fuctionallity End Here---------------------------------------
}
