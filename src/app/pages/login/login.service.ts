import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { ForgotPwd } from '../forgotpwd/forgotpwd.model';
import { Loginuser } from './login.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(
        private http: Http,
        private httpClient: HttpClient
    ) { }
    login(credentials: Loginuser): Observable<any> {

        if (credentials.role == 'admin') {
            const data = {
                email: credentials.email,
                password: credentials.password,
            };

            return this.httpClient.post<any>(ApiService.saveAdminLoginURL, data);
        }
        else if (credentials.role == 'Visitor') {
            const data = {
                email: credentials.email,
                password: credentials.password,
            };

            return this.httpClient.post<any>(ApiService.saveVisitorLoginURL, data);
        }
        else {
            const data = {
                email: credentials.email,
                password: credentials.password,
                role: credentials.role
            };
            return this.httpClient.post<any>(ApiService.saveLoginUserURL, data);
        }


    }
    userLogin(credentials: Loginuser): Observable<any> {
        const data = {
            email: credentials.email,
            password: credentials.password,
        };

        return this.httpClient.post<any>(ApiService.getUserLoginURL, data);
    }

    forgotPwd(admin: ForgotPwd): Observable<any> {

        return this.httpClient.post<any>(ApiService.forgetPasswordURL, admin);
    }
    getOneTimePwd(admin: ForgotPwd): Observable<any> {
        return this.httpClient.post<any>(ApiService.getOneTimePasswordURL, admin)
    }
    // changePassword(admin: ForgotPwd): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.getOneTimePasswordURL, admin)
    // }
    updatePassword(admin: ForgotPwd): Observable<any> {

        return this.httpClient.post<any>(ApiService.updatePasswordURL, admin);
    }
    changePassword(admin) {
        return this.httpClient.post<any>(ApiService.updatePasswordURL, admin);
    }
    UpdateLogout() {
        let data = {
            userid: localStorage.getItem("UserId"),
          };
        return this.httpClient.post(ApiService.updateLogoutDetailsURL, data);
      }

}
