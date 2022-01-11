import { Component, OnInit } from '@angular/core';
import { Chapater } from 'app/primary/chapater.model';
import { ManageService } from 'app/primary/manage.service';
import { Subject } from 'app/primary/subject.model';
import { Syllabus } from 'app/primary/syllabus.model';
import { get } from 'jquery';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  showChapter: boolean = false;
  openSyllabus: boolean = false;
  openPlayer: boolean = false;
  showSyllabus: boolean = false;

  syllabusId: any;
  image: any;
  safeURL: any;
  vTitle: any;
  relatedChapId: any;
  subjectId: any;
  relatedSyllabusVideo: any = [];
  chapId: any;
  public syllabusList: Syllabus[] = [];
  public videoList: Syllabus = {};
  public subjects: Subject[] = [];
  public chapater: Chapater[] = [];
  constructor(
    private manageService: ManageService
  ) {
    this.getSubject();
  }

  ngOnInit(): void {
  }
  getSubject() {
    this.manageService.getSubjectForVideo(localStorage.getItem('standardid')).subscribe((data: any) => {
      this.subjects = data;
      this.subjects.forEach(element => {
        this.manageService.getChapatersList(element.id).subscribe((res: any) => {
          element.chapter = res;
          element.color = '3px 3px 5px 5px #ebf0ec';
        });
      })
    });
  }
  openQuestionList(sub) {
    debugger
    this.subjects.forEach(element => {
      if (element.id == sub.id) {
        element.color = '3px 3px 5px 5px #1c8d91';
      } else {
        element.color = '3px 3px 5px 5px #ebf0ec';
      }
    })
    this.showSyllabus = true;
    this.showChapter = true;
    this.openSyllabus = false;
    this.openPlayer = false;
    this.subjectId = sub.id;
    // this.subID = sub.id;
    this.getChapaters();
  }

  getChapaters() {
    this.manageService.getChapatersList(this.subjectId).subscribe((data: any) => {
      this.chapater = data;
      this.chapater.forEach(element => {
        this.manageService.getSyllabusById(element.id).subscribe((res: any) => {
          debugger
          element.question = res;
          element.color = '3px 3px 5px 5px #ebf0ec';
        })
      })
    });
  }
  openChapterBox(chap) {
    debugger
    this.chapater.forEach(element => {
      if (element.id == chap.id) {
        this.chapId = element.id;
        element.color = '3px 3px 5px 5px #1c8d91';
      } else {
        element.color = '3px 3px 5px 5px #ebf0ec';
      }
    })
    this.openSyllabus = true;
    this.showChapter = true;
    this.showSyllabus = true;
    this.openPlayer = false;
    this.getSyllabusList();
  }
  //--------------------------------------Video Player Fuctionallity Start Here---------------------------------
  getSyllabusList() {
    this.manageService.getSyllabusById(this.chapId).subscribe((data: any) => {
      this.syllabusList = data;
      debugger
    });
  }

  backToVideoList() {
    this.openPlayer = false;
    this.openSyllabus = true;
    this.showSyllabus = true;
    this.showChapter = true;
  }
  backToChapaterList() {
    this.openSyllabus = false;
    this.showSyllabus = false;
    this.openPlayer = false;
    this.showChapter = false;
  }

  openVideo(id) {
    debugger
    this.openSyllabus = false;
    this.openPlayer = true;
    this.showChapter = true;
    this.showSyllabus = false;

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
