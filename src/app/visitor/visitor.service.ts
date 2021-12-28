
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { RegisterVisitor } from './visitorreg/visitorreg.model';
import { Subject } from 'app/primary/subject.model';

@Injectable({
    providedIn: 'root'
})
export class VisitorService {

    constructor(
        private http: Http,
        private httpClient: HttpClient
    ) { }

    saveVisitorRegister(admin: RegisterVisitor): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveVisitorDetailsURL, admin);
    }
    updateVisitorReg(admin: RegisterVisitor): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateVisitorRegURL, admin);
    }
    saveVisitorQue(data): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.saveVisitorQueURL, data);
    }
    getVisitorQue(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getVisitorQueURL, data);
    }
    removeVisitorQue(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeVisitorQueURL, data);
    }

    saveVisitorTest(data) {
        return this.httpClient.post<any>(ApiService.saveVisitorTestURL, data);
    }
    getAllVisitorList(): Observable<Subject[]> {
        return this.httpClient.get<any>(ApiService.getAllVisitorURL);
    }

    updateVisitorInform(data: RegisterVisitor): Observable<any> {

        return this.httpClient.post<any>(ApiService.updateVisitorInformURL, data);
    }
    getVisitorTestList(data) {

        return this.httpClient.post<any>(ApiService.getVisitorTestListURL, data)
    }

    removeVisitor(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeVisitorListURL, data);
    }
    getTestDetails(data){
        return this.httpClient.post(ApiService.GetTestDetailsURL,data);
    }
    getOtp(admin: RegisterVisitor): Observable<any> {
        return this.httpClient.post<any>(ApiService.getOtpVisitorURL, admin)
    }
    getVisitorTestQue(data){
        return this.httpClient.post(ApiService.GetViewVisitorTestListURL,data);
    }

}
