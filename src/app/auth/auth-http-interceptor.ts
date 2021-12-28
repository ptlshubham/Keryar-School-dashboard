import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Injectable, Inject } from '@angular/core';
// import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ApiService } from '../api.service';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        // @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
        private router: Router,
        // private toastr: ToastrManager
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



        // this.router.navigate(['home']);
        // const token: string = localStorage.getItem('authenticationToken');
        // const visitorToken: string = localStorage.getItem('authenticationToken');
        const token: string = localStorage.getItem('authenticationToken');
        request.clone({
            headers: request.headers.set('rejectUnauthorized', 'false').set('requestCert', 'false')
                .set('insecure', 'true')
        })
        if (localStorage.getItem('role') == 'Admin') {
            if (request.url != ApiService.getUserLoginURL) {

                if (token == null || token == undefined) {
                    console.log("token is null");
                    this.router.navigate(['pages/login']);
                }
                request = request.clone({ headers: request.headers.set('x-access-token', token) });
            }
        }
        else if (localStorage.getItem('role') == 'Visitor') {
            if (request.url != ApiService.getOtpVisitorURL || request.url != ApiService.saveVisitorDetailsURL || request.url != ApiService.getUserLoginURL) {

                if (token == null || token == undefined) {
                    console.log("token is null");
                    return next.handle(request);
                    // this.router.navigate(['pages/login']);
                }
                request = request.clone({ headers: request.headers.set('x-access-token', token) });
            }
        }
        else {
            if (token == null || token == undefined) {
                return next.handle(request);
            }
            else {
                if (request.url != ApiService.getUserLoginURL) {
                    request = request.clone({ headers: request.headers.set('x-access-token', token) });
                }
                else {
                    return next.handle(request);
                }
            }
        }




        return next.handle(request);
    }
}