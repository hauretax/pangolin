import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  profiles: any[] = [];
  constructor(private cookieService: CookieService,private authService: AuthService) { }

  ngOnInit(): void {
    this.loadFriend();
  }

  loadFriend(): void { 
    this.authService.getFriends()
      .subscribe({
        next: (response) => {
          this.profiles = response;
        },
        error: (error) => {
          console.error(error);
        }
    })
  }

  deleteFriend(toId: string): void { 
    const myId = this.cookieService.get('usr-Id');
    console.log(myId)
    this.authService.deleteFriend(myId, toId)
      .subscribe({
        next: (response: Response) => {
          // TODO ajouter une interaction
          console.log('Friend supres successfully', response);
          this.profiles = this.profiles.filter(p => p._id !== toId);
   
        },
        error: (error:Error) => {
          console.error('Error adding friend', error);
        }
      });
  }
}
