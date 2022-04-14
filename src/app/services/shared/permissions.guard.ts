import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionsGuard implements CanActivateChild {

    constructor(public settingsService: SettingsService, public router: Router) { }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let clear = true;
        if(route.data.permissions) {
            // Review that the user has all the permissions needed to load the view
            route.data.permissions.forEach(permission => {
                if (!this.settingsService.can(permission)) {
                    clear = false;
                }
            });
        }

        if (!clear) {
            this.router.navigate(['/401']);
        }

        return clear;
    }

}
