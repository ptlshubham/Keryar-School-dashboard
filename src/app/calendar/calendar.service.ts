import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ApiService } from "app/api.service";
import { Observable } from "rxjs";

import { CalendarEvents } from "./calendar.model";
import { Attandance } from "app/attendance/attendance.model";

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  constructor(private http: Http, private httpClient: HttpClient) { }

  saveEventsList(admin: CalendarEvents): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveCalendarEventsURL, admin);
  }

  geteventList(): Observable<CalendarEvents[]> {
    let data = {
      role: localStorage.getItem('role'),
      userid: localStorage.getItem('UserId'),
    }
    return this.httpClient.post<any>(ApiService.getCalendarEventsURL, data);
  }
  removeEventData(id) {
    let bnr = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.removeEventListURL, bnr);
  }
  saveAttandanceList(admin): Observable<any> {
    return this.httpClient.post<any>(ApiService.saveStudentAttandanceURL, admin);
  }
  getAttandanceList(id): Observable<any> {
    let data = {
      id: id
    }
    return this.httpClient.post<any>(ApiService.getStudentAttandanceURL, data);
  }


}
