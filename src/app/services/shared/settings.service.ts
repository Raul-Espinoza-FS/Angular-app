import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private _user: any;
    private _permissions: Array<any>;

    constructor (private cookieService: CookieService) {
        try {
            this._user = JSON.parse(this.cookieService.get('user'));
            this._permissions = JSON.parse(this.cookieService.get('permissions'));
        }
        catch (e) {
            this._user = null;
            this._permissions = null;
        }
    }

    public set user(user: object) {
        this._user = user;
        this.cookieService.set('user', JSON.stringify(this.user));
    }
    
    public get user() {
        return this._user;
    }
    
    public set permissions(permissions: Array<any>) {
        this._permissions = permissions;
        this.cookieService.set('permissions', JSON.stringify(this._permissions));
    }

    public can(name: string) : boolean {
        console.log(this._permissions);
        if (this._permissions.some(e => e.name === name)) {
            return true;
        }
        return false;
    }

    public clearSettings() : void {
        this._user = null;
        this.cookieService.delete('user');
        this._permissions = null;
        this.cookieService.delete('permissions');
    }

    public isFilled() : boolean {
        if (this._user && this._permissions) {
            return true;
        }
        return false;
    }
}