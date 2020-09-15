import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserAccessService } from './user-access.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/User';
const data: User[] = [
  {
    username: 'test@user.com',
    name: 'testuser',
    password: 'test@123'
  },
  {
    name: 'Pooja',
    username: 'test@user.com',
    password: 'test@123',
  },
  {
    name: 'Pooja Paigude',
    username: 'test123@gmail.com',
    password: 'test@123',
  }
];

describe('UserAccessService', () => {
  let service: UserAccessService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserAccessService],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(UserAccessService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(inject(
    [UserAccessService, HttpTestingController],
    (serviceInstance, httpMockInstance) => {
      service = serviceInstance;
      httpMock = httpMockInstance;
    }
  ));

  it('should be created', () => {
    const uservice = TestBed.inject(UserAccessService);
    expect(uservice).toBeTruthy();
  });

  it('login: should return an array containing the valid user', () => {
    const user = {
      id: '1',
      username: 'test123@users.com',
      password: 'test@123'
    };
    service
      .login({
        username: 'test123@users.com',
        password: 'test@123'
      })
      .subscribe((userdata) => {
        expect(userdata).toBeDefined();
        expect(userdata.length).toBe(2);
      });
    const req = httpMock.expectOne(
      'http://localhost:3000/users?username=' +
      user.username +
      '&password=' +
      user.password
    );
    req.flush(data);
    httpMock.verify();
  });

  it('sign up: should able to register', () => {
    const user = {
      username: 'test1234@users.com',
      password: 'test@1234'
    };
    service.signUp
      (user)
      .subscribe((users) => {
        expect(users).toBeDefined();
      });
    const req = httpMock.expectOne(
      'http://localhost:3000/users');
    req.flush(data);
    httpMock.verify();
  });


});
