import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Std } from './standard.model';
import { Subject } from './subject.model';
import { Syllabus } from 'app/primary/syllabus.model';
import { Chapater } from './chapater.model';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }
  saveStdList(admin: Std): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveStdListURL, admin);
  }
  getStdList(): Observable<any> {

    let teachid = localStorage.getItem('UserId');
    let data = {
      teachid: teachid,
      role: localStorage.getItem('role'),

    }
    return this.httpClient.post<any>(ApiService.getStdListURL, data);  
  }
  getStdListNew(data){
    return this.httpClient.post<any>(ApiService.getStdListURL, data);
  }
  addChapaters(admin: Chapater) {

    return this.httpClient.post<any>(ApiService.saveChapatersURL, admin);
  }
  getChapatersList(id): Observable<Chapater[]> {
    let data = {
      id: id,
      // role: localStorage.getItem('role'),
      // teachid: localStorage.getItem('UserId')
    }
    return this.httpClient.post<any>(ApiService.getChapaterListURL, data);
  }

  updateChapaterList(admin: Chapater): Observable<any> {

    return this.httpClient.post<any>(ApiService.updateChapaterListURL, admin);
  }

  removeChapaterList(id) {
    return this.httpClient.get<any>(ApiService.removeChapaterURL + id);

  }


  CheckPassword(data) {
    return this.httpClient.post(ApiService.ChackForPasswordURL, data);
  }


  removeStdList(id) {
    return this.httpClient.get<any>(ApiService.removeStdURL + id);
  }
  addSubject(data) {

    return this.httpClient.post<any>(ApiService.saveSubjectURL, data);
  }
  getSubjectList(id): Observable<Subject[]> {
    let data = {
      id: id,
      role: localStorage.getItem('role'),
      teachid: localStorage.getItem('UserId')
    }
    return this.httpClient.post<any>(ApiService.getSubjectListURL, data);
  }
  getSubjectForVideo(id): Observable<Subject[]> {
    let data = {
      id: id,
      role: localStorage.getItem('role'),
    }
    return this.httpClient.post<any>(ApiService.getSubjectForVideoURL, data);
  }
  

  updateSubjectList(admin: Subject): Observable<any> {

    return this.httpClient.post<any>(ApiService.updateSubjectURL, admin);
  }

  removeSubjectList(id) {
    return this.httpClient.get<any>(ApiService.removeSubjectURL + id);

  }
  updateStdList(admin): Observable<any> {
    return this.httpClient.post<any>(ApiService.updateStandardURL, admin);
  }
  saveSyllabusList(admin: Syllabus): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveSyllabusListURL, admin);
  }
  getAllSyllabusList(): Observable<Syllabus[]> {
    return this.httpClient.get<any>(ApiService.getAllSyllabusListURL);
  }
  getSyllabusById(id) {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.getSyllabusByIdURL, data);
  }
  uploadSyllabusImage(img): Observable<any> {

    return this.httpClient.post<any>(ApiService.uploadSyllabusImageURL, img);

  }
  getAttendaceCount(data){
    return this.httpClient.post(ApiService.GetAttendanceCountURL,data);
  }
  removeSyllabusList(id) {
    return this.httpClient.get<any>(ApiService.removeSyllabusURL + id);

  }
}
