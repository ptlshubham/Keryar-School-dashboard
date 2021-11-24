import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { ManageService } from '../manage.service';
import { Std } from '../standard/standard.model';
import { Chapater } from './chapater.model';
import { Subject } from './subject.model';
declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  public StdModel: Std = new Std;
  public chapModel: Chapater = new Chapater;
  public chapater: Chapater[] = [];
  public STD: Std[] = [];
  public SubjectModel: Subject = new Subject;
  public subjects: Subject[] = [];
  val = 0;
  valu = 0;
  public dataTable: DataTable;
  selectedStd: any;
  selectedSub: any;
  stdId: any;
  subId: any;
  Ref_id: any;
  editSub: Subject[] = [];
  addSubjects: any = [];
  addChapt: any = [];
  chaptList: any = [];
  openChapaters: Boolean = false;
  constructor(
    private manageService: ManageService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.Ref_id = res.val;
    })
    this.getStdList();
    // this.getSubject();
  }

  ngOnInit(): void {
    this.addSubjects = [{ name: this.val }];
    this.val++;
    this.addChapt = [{ name1: this.valu }]
    this.valu++;
  }
  addChapList() {
    this.valu++;
    this.addChapt.push({ name1: this.valu });
  }
  removeChapList(valu) {
    this.addChapt.splice(valu, 1);
  }
  addSubjectList() {
    this.val++;
    this.addSubjects.push({ name: this.val });
  }
  removeSubjectList(val) {
    this.addSubjects.splice(val, 1);
  }
  getStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.STD = data;

      if (this.Ref_id != undefined) {
        this.selectSTDList(this.Ref_id);
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
      if(data == 'success'){
        this.addSubjects = [{ name: this.val }];
        this.apiService.showNotification('top', 'right', 'Subject added Successfully.', 'success');
        this.getSubject(this.stdId);
      }
      else{
        this.apiService.showNotification('top', 'center', 'Subject Already Added.', 'danger');
      }
     
    })
  }
  getSubject(id) {
    this.manageService.getSubjectList(id).subscribe((data: any) => {
      this.subjects = data;
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjects[i].index = i + 1;
      }
    });
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
  addSubjectsList() {
    this.openChapaters = false;
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
  addChapaters() {
    this.openChapaters = true;
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
      if(data == 'success'){
        this.apiService.showNotification('top', 'right', 'Chapter added Successfully.', 'success');
       
        this.getChapaters();
      }
      else{
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
}
