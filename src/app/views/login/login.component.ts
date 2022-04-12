import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    active = false;
    incorrect = false;
    inputPasswordType = true;

    constructor(private authService: AuthService, private route: Router) { }

    public login() {
        this.active = true;
        this.authService.login(this.email, this.password).subscribe(
            data => {
                this.route.navigate(['/dashboard']);
            },
            error => {
                this.active = false;
                this.incorrect = true;

            }
        )
    }

    togglePassword() {
        this.inputPasswordType = !this.inputPasswordType;
    }

    ngOnInit() {
        if (this.authService.isAuthenticated) {
            this.route.navigate(['/dashboard']);
        }
    }
}
