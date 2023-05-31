import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//peu on injecter dans la db depuis le usr input?? a verfier
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private serverUrl = 'http://localhost:3000'; 
  private registerUrl = '/api/register'; 
  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    const registerData = {
      username: username,
      password: password,
    };
    return this.http.post(`${this.serverUrl}${this.registerUrl}`, registerData);
  }


}
