import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router,private cookieService: CookieService) { }
   username = ''
   password = ''
   login(): void {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.cookieService.set('usr-Id', response._id);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log('error:', error)
        }
      });
  }
}