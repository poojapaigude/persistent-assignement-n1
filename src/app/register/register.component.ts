import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/models/User';
import { SignUp } from '../store/user-access/actions/user.actions';
import { Observable } from 'rxjs';
import { accesState, AppState } from '../store/user-access/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  user: User;
  getState: Observable<any> = this.store.select(accesState);
  displayLoginUser: boolean = false;
  errorMessage: string;
  constructor(private store: Store<AppState>) { }
  registerForm = new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
  });
  ngOnInit(): void {
  }

  register(): void {
    const user = {
      name: this.registerForm.get('name').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value
    };
    this.store.dispatch(new SignUp(user));
  }
}
