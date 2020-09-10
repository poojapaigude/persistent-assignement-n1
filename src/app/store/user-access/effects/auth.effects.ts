import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
  SignUp,
  SignUpSuccess,
} from '../actions/user.actions';
import { UserAccessService } from 'src/app/services/user-access.service';

@Injectable()
export class AccessEffects {
  constructor(
    private actions: Actions,
    private userAccessService: UserAccessService,
    private router: Router
  ) { }

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('user', JSON.stringify(user.payload));
      localStorage.setItem('isUserLoggedIn', 'true');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((err) => {
      if (localStorage.getItem('isUserLoggedIn') === 'true') {
        localStorage.removeItem('isUserLoggedIn');
      }
    })
  );

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.userAccessService.login(payload).pipe(
        map((user) => {
          if (user.length > 0) {
            let name = null;
            user.forEach(ele => {
              if (ele.username === payload.username && ele.name) {
                name = ele.name;
              }
            })
            return new LogInSuccess({ username: name });
          } else {
            if (localStorage.getItem('isUserLoggedIn') === 'true') {
              localStorage.removeItem('isUserLoggedIn');
            }
            return new LogInFailure({ error: 'Incorrect credentials' });
          }
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.router.navigateByUrl('login');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    tap((user) => { })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap((payload) => {
      return this.userAccessService.signUp(payload).pipe(
        map((data) => {
          return new SignUpSuccess(data);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  Logout: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      if (localStorage.getItem('isUserLoggedIn') === 'true') {
        localStorage.removeItem('isUserLoggedIn');
      }
      localStorage.removeItem('user');
    })
  );
}
