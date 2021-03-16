import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/user/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


export interface TokenPayload {
  userEmailID: string;
  username: string;
  password: string;
  name?: string;
  phone: string;
}

//Return a TokenResponse object
interface TokenResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private token: string;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  
  // saving token
  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  //getting the token
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  

}
