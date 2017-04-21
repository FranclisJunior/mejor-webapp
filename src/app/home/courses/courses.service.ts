import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AppConstants} from '../../app.constant';

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
      .map(res => JSON.parse(res.text()));
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
