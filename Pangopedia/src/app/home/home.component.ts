import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profiles: any[] = [];

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.authService.getProfiles()
      .subscribe({
        next: (response) => {
          this.profiles = response;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des profils', error);
        }
      });
  }

  addFriend(toId: any): void {
    const myId = this.cookieService.get('usr-Id');
    console.log(myId)
    this.authService.addfriend(myId, toId)
      .subscribe({
        next: (response: Response) => {
          // TODO ajouter une interaction
          console.log('Friend added successfully', response);
        },
        error: (error:Error) => {
          console.error('Error adding friend', error);
        }
      });
  }

}