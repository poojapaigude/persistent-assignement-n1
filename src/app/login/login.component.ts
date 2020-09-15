import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppState, accesState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogIn } from '../store/user-access/user.actions';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  getState: Observable<any> = this.store.select(accesState);
  errorMessage: string;
  displayLoginUser = false;
  invalid;
  isDarkTheme = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
  }

  login(): void {
    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    this.store.dispatch(new LogIn(user));
    this.store.subscribe(data => {
      const d: any = data;
      if (!d.auth.user) {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    });
  }

  changedTheme(theme): void {
    this.isDarkTheme = theme;
  }

}
