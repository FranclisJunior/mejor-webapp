import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConstants } from '../../app.constant';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class CoursesService {

  private COUNTRIES_DISCOUNT: Array<string> = ['UY', 'SV', 'PY', 'CL', 'MX', 'CO', 'PE', 'AR', 'CR', 'EC', 'PA', 'BR'];

  private http: Http;

  private selectedCourse: any;

  constructor(http: Http) {
    this.http = http;
  }

  getCourses() {
    return this.http.get(AppConstants.API_ADDRESS + 'courses')
      .map(res => JSON.parse(res.text()))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCourseDiscount(countryCode) {
    return this.COUNTRIES_DISCOUNT.indexOf(countryCode) > 0 ? 1 : 0;
  }

  setCourse(course) {
    this.selectedCourse = course;
  }

  getSelectedCourse() {
    return this.selectedCourse;
  }

}
