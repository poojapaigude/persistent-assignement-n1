import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../shared/models/User';
import { catchError } from 'rxjs/operators';
import { HTTPPORT } from '../shared/shared-constants';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User[]> {
    const loginUrl = encodeURI(
      'users?username=' + user.username + '&password=' + user.password
    );
    return this.http
      .get<User[]>(HTTPPORT + loginUrl)
      .pipe(catchError(this.errorCatcher));
  }

  signUp(user: User): Observable<User> {
    const signUpUrl = encodeURI('users');
    return this.http
      .post<User>(HTTPPORT + signUpUrl, user, this.httpOptions)
      .pipe(catchError(this.errorCatcher));
  }

  errorCatcher(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
