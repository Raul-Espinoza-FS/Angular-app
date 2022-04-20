import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError} from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router : Router, private toastService: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.auth.isAuthenticated) {
            request = request.clone({
                setHeaders: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + this.auth.getToken()
                }
            });
            return next.handle(request).pipe(
                catchError((err: HttpErrorResponse) => {
                    if(err.status === 401 || err.status === 0) {
                        this.auth.tokenExpired();
                        this.router.navigateByUrl('/login');
                    }
                    this.toastService.error( err.error.message, '', { timeOut: 8000} );
                    return throwError(() => err);
                })
            );
        }

        return next.handle(request);
    }
}
