import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @Input() isUserAuthenticated: boolean;
  @Input() displayLoginUser?: boolean;
  isUserAuthenticated: Boolean = false;
  username: string = null;
  action: string = 'Login';
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('isUserLoggedIn') === 'true') {
      this.isUserAuthenticated = true;
      this.action = 'Logout';
      if (JSON.parse(localStorage.getItem('user')).username && this.displayLoginUser) {
        this.username = JSON.parse(localStorage.getItem('user')).username;
      }
    } else {
      this.action = 'Login';
    }
  }

  clearStorage() {
    if (localStorage.getItem('isUserLoggedIn')) {
      localStorage.removeItem('isUserLoggedIn');
    }
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  }

}
