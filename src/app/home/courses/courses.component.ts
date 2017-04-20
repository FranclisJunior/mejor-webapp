import {Component, OnInit} from '@angular/core';
import {UtilService} from '../../util/utl.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  private COUNTRIES_DISCOUNT: Array<string> = ['UY', 'SV', 'PY', 'CL', 'MX', 'CO', 'PE', 'AR', 'CR', 'EC', 'PA', 'BR'];

  private utilService: UtilService;

  courses: Array<any>;

  constructor(utilService: UtilService) {
    this.utilService = utilService;
  }

  ngOnInit() {
    this.utilService.getActualCountry()
      .subscribe(
        data => {
          const hasDiscount = this.hasDiscount(data);
          this.generateCoursesMock(hasDiscount);
        },
        error => {
          console.log('Error!', error);
        }
      );
  }

  private generateCoursesMock(hasDiscount) {
    this.courses = [
      {
        id: 1,
        title: 'COURSE_BASIC',
        advantages: ['COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE'],
        price: hasDiscount ? 5.90 : 6.90
      },
      {
        id: 1,
        title: 'COURSE_PREMIUM',
        advantages: ['COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE',
          'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE', 'COURSE_ADVANTAGE'],
        price: hasDiscount ? 9.90 : 10.90
      }
    ];
  }

  private hasDiscount(countryCode) {
    return this.COUNTRIES_DISCOUNT.indexOf(countryCode) > 0;
  }

}
