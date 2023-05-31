import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name: string;
  role: string;

  constructor(private cookieService: CookieService,private authService: AuthService) {
    this.name = 'AAAAAAAAAAAA';
    this.role = 'Guerrier';
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() { 
    this.authService.getProfile()
    .subscribe({
      next: (response) => {
        console.log(response)
        this.name = response.username;
        this.role = response.role;
      },
      error: (error) => {
        console.error(error);
      }
  })
  }

  sauvegarder() {
    console.log('launch')
    this.authService.setRole(this.role)
    .subscribe({
      next: (response: Response) => {
        console.log('Rolechanged', response);
      },
      error: (error:Error) => {
        console.error('Error:', error);
      }
    });
  }
}
