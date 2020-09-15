import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/models/User';
import { SignUp } from '../store/user-access/user.actions';
import { Observable } from 'rxjs';
import { accesState, AppState } from '../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;
  getState: Observable<any> = this.store.select(accesState);
  displayLoginUser = false;
  errorMessage: string;
  isDarkTheme = false;

  @Input() email: string;
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const user = {
      name: this.registerForm.get('name').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value
    };
    this.store.dispatch(new SignUp(user));
  }

  changedTheme(theme): void {
    this.isDarkTheme = theme;
  }
}
