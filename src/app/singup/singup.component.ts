import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../util/utl.service';
import {CoursesService} from '../home/courses/courses.service';
import {SingupService} from './singup.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  private utilService: UtilService;
  private coursesService: CoursesService;
  private singupService: SingupService;

  user: any = {};
  allCountries: Array<any>;
  allCourses: Array<any>;

  singUpForm: FormGroup;

  constructor(fb: FormBuilder, utilService: UtilService, coursesService: CoursesService, singupService: SingupService) {
    this.utilService = utilService;
    this.coursesService = coursesService;
    this.singupService = singupService;

    this.singUpForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': '',
      'date_birth': ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAccessData();
    this.allCountries = this.utilService.getCountries();
    this.user.course = this.coursesService.getSelectedCourse();
    window.scrollTo(0, 0);
  }

  setCourse(course) {
    this.user.course = course;
  }

  updateCountry(countryCody) {
    this.user.country_code = countryCody;
    const discount = this.coursesService.getCourseDiscount(countryCody);
    for (const course of this.allCourses) {
      course.priceDiscount = course.price - discount;
    }

    if (this.user.course) {
      this.user.course.priceDiscount = this.user.course.price - discount;
    }
  }

  buyCourse() {
    this.singupService.createUser(this.user)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log('Error!', error);
        }
      );
  }

  private getAccessData() {
    this.utilService.getAccessData()
      .subscribe(
        data => {
          this.user.access_ip = data.ip;
          this.user.country_code = data.country;

          const discount = this.coursesService.getCourseDiscount(data.country);
          this.getCourses(discount);
        },
        error => {
          console.log('Error!', error);
        }
      );
  }

  private getCourses(discount) {
    this.coursesService.getCourses()
      .subscribe(
        data => {
          this.allCourses = data;
          for (const course of this.allCourses) {
            course.priceDiscount = course.price - discount;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
