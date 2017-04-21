import {Component, OnInit} from '@angular/core';
import {UtilService} from '../../util/utl.service';
import {CoursesService} from './courses.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  private utilService: UtilService;
  private coursesService: CoursesService;
  private router: Router;

  courses: Array<any>;

  constructor(utilService: UtilService, coursesService: CoursesService, router: Router) {
    this.utilService = utilService;
    this.coursesService = coursesService;
    this.router = router;
  }

  ngOnInit() {
    this.utilService.getAccessData()
      .subscribe(
        data => {
          const discount = this.coursesService.getCourseDiscount(data.country);
          this.getCourses(discount);
        },
        error => {
          console.log('Error!', error);
        }
      );
  }

  buyCourse(course) {
    this.coursesService.setCourse(course);
    this.router.navigateByUrl('sing-up');
  }

  private getCourses(discount) {
    this.coursesService.getCourses()
      .subscribe(
        data => {
          this.courses = data;
          for (const course of this.courses) {
            course.priceDiscount = course.price - discount;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
