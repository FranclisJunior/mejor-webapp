import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {UtilService} from '../util/util.service';
import {CoursesService} from '../home/courses/courses.service';
import {SingupService} from './singup.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  private translate: TranslateService;
  private router: Router;
  private utilService: UtilService;
  private coursesService: CoursesService;
  private singupService: SingupService;

  user: any = {};
  allCountries: Array<any>;
  allCourses: Array<any>;

  singUpForm: FormGroup;

  constructor(fb: FormBuilder, vcr: ViewContainerRef, translate: TranslateService, utilService: UtilService,
              coursesService: CoursesService, singupService: SingupService, router: Router,
              public toastr: ToastsManager) {

    this.translate = translate;
    this.utilService = utilService;
    this.coursesService = coursesService;
    this.singupService = singupService;
    this.router = router;

    this.singUpForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': '',
      'date_birth': ['', Validators.required],
    });
    this.toastr.setRootViewContainerRef(vcr);
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
          this.translate.get('THANK_YOU', {client: this.user.name}).subscribe((res: string) => {
            this.toastr.success(res, 'Success');
            this.backToHome();
          });
        },
        error => {
          this.toastr.error(error, 'Error');
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
          this.toastr.error(error, 'Error');
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
          this.toastr.error(error, 'Error');
        }
      );
  }

  private backToHome() {
    setInterval(() => {
      this.router.navigateByUrl('');
    }, 1500);
  }

}
