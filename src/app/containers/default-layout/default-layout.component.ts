import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/auth.service';
import { SettingsService } from 'src/app/services/shared/settings.service';
import { navItems } from '../../_nav';

@Component({
	selector: 'app-dashboard',
	templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
	public sidebarMinimized = false;
	public navItems = navItems;
	public user;

	constructor(private authService: AuthService, private route: Router, private settings: SettingsService) { }

	public logout() {
		this.authService.logout().subscribe(
			data => {
				this.route.navigate(['/login']);
			}
		)
	}

	public toggleMinimize(e) {
		this.sidebarMinimized = e;
	}

	ngOnInit() {
		this.user = this.settings.user;
	}

}
