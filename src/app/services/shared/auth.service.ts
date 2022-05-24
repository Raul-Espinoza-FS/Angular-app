import { Injectable } from '@angular/core';
import { APIBase } from '../APIBase';

import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends APIBase {

    constructor(
        private cookieService: CookieService,
        private settingsService: SettingsService,
        http: HttpClient
    ) { super(http); }

    /**
     * login
     */
    public login(username, password): Observable<boolean> {
        const credentials = {
            'email': username,
            'password': password,
            'app_name': environment.app_name
        };

        return new Observable((observable) => {
            this.post('login', credentials).subscribe(
                response => {
                    const token = response.token;
                    this.cookieService.set('token', token, 1, '/');
                    this.settingsService.user = {
                        name: response.name
                    };
                    this.settingsService.permissions = response.roles;
                    observable.next(true);
                    observable.complete();
                },
                error => {
                    observable.error(error);
                }
            );
        })

    }

    /**
     * getToken
     */
    public getToken() {
        return this.cookieService.get('token');
    }

    /**
     * isAuthenticated
     */
    public get isAuthenticated(): boolean {
        if (this.getToken() && this.settingsService.isFilled()) {
            return true;
        }

        return false;
    }

    /**
     * Logout
     */
    public logout(): Observable<boolean> {

        return new Observable((observable) => {

            if (!this.getToken()) {
                //Limpiamos cookies y settings
                this.cookieService.deleteAll('/');
                this.settingsService.clearSettings();
                observable.next(true);
                observable.complete();
            }

            const params = {
                'app_name': environment.app_name
            }

            this.post('logout', params).subscribe(
                {
                    error: (error) => {
                        observable.error(error);
                    },
                    complete: () => {
                        //Limpiamos cookies y settings
                        this.cookieService.deleteAll('/');
                        this.settingsService.clearSettings();
                        observable.next(true);
                        observable.complete();
                    }
                }
            );
        })
    }

    /**
     * deleteToken
     */
    public deleteToken() {
        return this.cookieService.delete('token', '/');
    }

    /**
     * Token Expired
     */
    public tokenExpired() {
        this.cookieService.deleteAll('/');
        this.settingsService.clearSettings();

        return true;
    }
}
