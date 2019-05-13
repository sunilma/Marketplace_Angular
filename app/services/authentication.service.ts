import { Injectable } from '@angular/core'; 
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  authToken: any;
  user: any;
  server = "";

  constructor(private http: Http) { }

  //registering new user
  registerUser(user){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post(this.server+'/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  //user authentication
  authenticateUser(user){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post(this.server+'/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  //get user profile
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('content-type', 'application/json');
    return this.http.get(this.server+'/users/profile', {headers: headers})
      .map(res => res.json());
  }

  //send password reset email
  resetEmail(email){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.get(this.server+'/users/resetemail/' + email, {headers: headers})
    .map(res => res.json());
  }

  //check validity of reset token
  reset(token){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.get(this.server+'/users/reset/' + token, {headers: headers})
      .map(res => res.json());
  }

  //change user password
  changePassword(user){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.put(this.server+'/users/register/' + user.id, user, {headers: headers})
      .map(res => res.json());
  }

  //reset user password
  resetPassword(user){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.post(this.server+'/users/reset', user, {headers: headers})
      .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
