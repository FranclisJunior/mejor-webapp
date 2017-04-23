import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule, JsonpModule} from '@angular/http';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ToastModule, ToastOptions} from 'ng2-toastr';

import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './home/about/about.component';
import {ContactComponent} from './home/contact/contact.component';
import {CoursesComponent} from './home/courses/courses.component';
import {SingupComponent} from './singup/singup.component';

import {UtilService} from './util/util.service';
import {CustomToastOption} from './util/toast.config';
import {CoursesService} from 'app/home/courses/courses.service';
import {SingupService} from './singup/singup.service';

import {appRoutes} from './app.router';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CoursesComponent,
    SingupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    Ng2PageScrollModule.forRoot(),
    ToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UtilService, CoursesService, SingupService, {provide: ToastOptions, useClass: CustomToastOption}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
