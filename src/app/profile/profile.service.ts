import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Profile } from './profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getProfileList(id): Observable<Profile[]> {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getProfileDetailsURL, data);
    }
}
