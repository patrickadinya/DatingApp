import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodededToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../asserts/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

changeMemberPhoto(photoUrl: string){
  this.photoUrl.next(photoUrl);
}


login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user){
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodededToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          // console.log(this.decodededToken);
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}


