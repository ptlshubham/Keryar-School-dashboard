import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'app/api.service';
import { ManageService } from 'app/manage/manage.service';
import { Std } from 'app/manage/standard/standard.model';
import { Chapater } from 'app/manage/subject/chapater.model';
import { Subject } from 'app/manage/subject/subject.model';
import Swal from 'sweetalert2';
import { Syllabus } from './syllabus.model';

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
  openPlayer: boolean = false;
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
  public syllabusModel: Syllabus = new Syllabus;
  public syllabusList: Syllabus[] = [];
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  syllabusId: any;
  image: any;
  safeURL: any;
  vTitle: any;
  relatedChapId: any;
  relatedSyllabusVideo: any = [];


  constructor(
    private manageService: ManageService,
    private apiService: ApiService,
    private _sanitizer: DomSanitizer,

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
    this.openPlayer = false;
    this.getStdList();
  }
  manageSubject() {
    this.openStd = false;
    this.openSubject = true;
    this.openChapater = false;
    this.openSyllabus = false;
    this.openPlayer = false;
  }
  manageChapater() {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = true;
    this.openSyllabus = false;
    this.openPlayer = false;
  }
  manageSyllabus() {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = true;
    this.openPlayer = false;
    this.getSyllabusList();

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
  addSubjectFromTable(id) {
    this.selectSTDList(id);
    this.openStd = false;
    this.openSubject = true;
    this.openChapater = false;
    this.openSyllabus = false;
    this.openPlayer = false;
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
  addChapaterFromTable(id) {

    this.openStd = false;
    this.openSubject = false;
    this.openChapater = true;
    this.openSyllabus = false;
    this.openPlayer = false;
    this.selectSubjectList(id);
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
  addSyllabusFromTable(id) {
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = true;
    this.openPlayer = false;
    this.selectChapaterList(id);
    this.getSyllabusList();
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
  selectedSyllabusImage(event) {

    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];

      max_height = 300;
      max_width = 300;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
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


            this.manageService.uploadSyllabusImage(formdata).subscribe((response) => {
              this.image = response;
              debugger
              console.log(response);
              this.isImageSaved = true;


            })
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }

  }
  addSyllabusList() {
    this.syllabusModel.stdid = this.stdId;
    this.syllabusModel.subid = this.subId;
    this.syllabusModel.chapid = this.chapId;
    this.syllabusModel.isactive = true;
    this.syllabusModel.image = this.image;
    this.manageService.saveSyllabusList(this.syllabusModel).subscribe((response) => {
      this.apiService.showNotification('top', 'right', 'Syllabus Added Successfully.', 'success');
      this.getSyllabusList();
    })
  }
  getSyllabusList() {
    this.manageService.getAllSyllabusList().subscribe((data: any) => {
      this.syllabusList = data;
    });
  }

  //--------------------------------------Syllabus Fuctionallity End Here---------------------------------------
  //--------------------------------------Video Player Fuctionallity Start Here---------------------------------
  openVideo(id) {
    debugger
    this.openStd = false;
    this.openSubject = false;
    this.openChapater = false;
    this.openSyllabus = false;
    this.openPlayer = true;
    this.syllabusList.forEach(element => {
      if (element.id == id) {
        this.syllabusId = id;
        this.relatedChapId = element.chapid;
        this.safeURL = element.videolink;
        this.vTitle = element.videotitle;
        this.relatedVideosList();
      }

    })
  }
  relatedVideosList() {
    this.relatedSyllabusVideo = [];
    this.syllabusList.forEach(element => {
      if (element.chapid = this.relatedChapId) {
        let data = {
          rlink: element.videolink,
          rtitle: element.videotitle,
          rimage: element.image,
          rdescripition: element.descripition,
          rid: element.id,
        }
        this.relatedSyllabusVideo.push(data);
      }
    })
  }



  //--------------------------------------Video Player Fuctionallity End Here-----------------------------------
}
