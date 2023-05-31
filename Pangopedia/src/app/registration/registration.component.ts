import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


//TODO show when pseudo is already taken
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private registerService: RegisterService, private router: Router, private cookieService: CookieService) { }

  username = '';
  password = '';

  register(): void {
    this.registerService.register(this.username, this.password)
      .subscribe({
        next: (response) => {
          //succes 
          console.log('Inscription réussie', response);
          this.cookieService.set('usr-Id', response._id);
          this.router.navigate(['/']);
        },
        error: (error) => {
          // error  
          console.error('Erreur lors de l\'inscription', error);
        }
      });
  }
}