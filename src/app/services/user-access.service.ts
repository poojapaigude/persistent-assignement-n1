import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../shared/models/User';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {
  readonly BASE_URL = 'http://localhost:3000/';
  private errorStatusMessage: string;
  get errorMessage(): string {
    return this.errorStatusMessage;
  }
  set errorMessage(msg: string) {
    this.errorStatusMessage = msg;
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User[]> {
    const loginUrl = encodeURI(
      'users?email=' + user.email + '&password=' + user.password
    );
    return this.http
      .get<User[]>(this.BASE_URL + loginUrl)
      .pipe(catchError(this.errorCatcher));
  }

  signUp(user: User): Observable<User> {
    const signUpUrl = encodeURI('users');
    return this.http
      .post<User>(this.BASE_URL + signUpUrl, user, this.httpOptions)
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
