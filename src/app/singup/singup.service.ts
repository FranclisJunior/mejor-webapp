import {Injectable} from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {AppConstants} from '../app.constant';
import {Observable} from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SingupService {

  private http: Http;
  private jsonp: Jsonp;

  constructor(http: Http, jsonp: Jsonp) {
    this.http = http;
    this.jsonp = jsonp;
  }

  createUser(user) {
    return this.http.post(AppConstants.API_ADDRESS + 'users', user)
      .map(res => JSON.parse(res.text()))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
