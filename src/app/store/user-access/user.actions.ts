import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';
export enum AuthActionTypes {
    LOGIN = '[AUTH] LogIn',
    SIGNUP = '[AUTH] SignUp',
    LOGOUT = '[AUTH] LogOut',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAIL = '[Auth] Login FAIL',
    SIGNUP_SUCCESS = '[Auth] SignUp Success',
    SIGNUP_FAILURE = '[Auth] SignUp Failure'
}
export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: User) {
    }
}
export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}
export class LogInFail implements Action {
    readonly type = AuthActionTypes.LOGIN_FAIL;
    constructor(public payload: any) { }
}
export class SignUp implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: User) { }
}
export class SignUpSuccess implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
    constructor(public payload: User) { }
}
export class SignUpFailure implements Action {
    readonly type = AuthActionTypes.SIGNUP_FAILURE;
}
export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}
export type AuthAction = LogIn
    | LogInSuccess
    | SignUp
    | SignUpSuccess
    | SignUpFailure
    | LogInFail
    | Logout;
