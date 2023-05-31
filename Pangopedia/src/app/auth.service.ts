import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

//TODO refactoriser le code et triee se qu il y a ici
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl = 'http://localhost:3000'; 
  private loginUrl = '/api/login'; 
  private profilesUrl = '/api/profiles'; 
  private friendsUrl = '/api/friends';
  private FriendUrl = '/api/friend';
  private RoleUrl = '/api/role';

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password
    };
    return this.http.post(this.serverUrl+this.loginUrl, loginData);
  }

  getProfiles(): Observable<any> {
    return this.http.get(`${this.serverUrl}${this.profilesUrl}`);
  }
  getFriends(): Observable<any> {
    const userId = this.cookieService.get('usr-Id');
  console.log(userId)
    return this.http.get(`${this.serverUrl}${this.friendsUrl}/${userId}`);
  }
  getProfile(): Observable<any> {
    const userId = this.cookieService.get('usr-Id');
    return this.http.get(`${this.serverUrl}/api/${userId}`);
  }
  setRole(role:string): Observable<any> { 
    const userId = this.cookieService.get('usr-Id');
    const datas = {
      userId,
      role
    }
    return this.http.request('put', `${this.serverUrl}${this.RoleUrl}`, { body: datas });
  }


/**
 * 
 * @param me id of who asking to be friend
 * @param to id of friend
 * @returns 
 */
  addfriend(me: string, to: string): Observable<any> {
    const datas =  {
     me: me.toString(),
      to: to.toString()
    }
    return this.http.post(`${this.serverUrl}${this.FriendUrl}`,datas );
  }
  deleteFriend(me: string, to: string): Observable<any> { 
    const datas =  {
      me: me.toString(),
       to: to.toString()
     }
     return this.http.request('delete', `${this.serverUrl}${this.FriendUrl}`, { body: datas });
    }

}
