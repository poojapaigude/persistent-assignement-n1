import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserAccessService } from 'src/app/services/user-access.service';
import {
  AuthActionTypes,
  LogIn,
  LogInFail,
  LogInSuccess,
  SignUp,
  SignUpSuccess,
} from './user.actions';

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
  LogInFail: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAIL),
    tap((user) => {
      return;
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
            const idx = user.findIndex(el => el.username === payload.username);
            if (idx !== -1) {
              name = user[idx].name;
              return new LogInSuccess({ username: name });
            }
          } else {
            if (localStorage.getItem('isUserLoggedIn') === 'true') {
              localStorage.removeItem('isUserLoggedIn');
            }
            return new LogInFail('Login Fail');
          }
        })
      );
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
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.router.navigateByUrl('login');
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
