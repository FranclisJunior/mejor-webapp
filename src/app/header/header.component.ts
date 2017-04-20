import {Component, NgZone, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public language: any = 'english';

  public isShrunk = false;

  private translate: TranslateService;
  private zone: NgZone;

  constructor(translate: TranslateService, zone: NgZone) {
    this.translate = translate;
    this.zone = zone;
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.windowListener();
  }

  setLanguage (language, initial) {
    this.language = language;
    this.translate.use(initial);
  }


  windowListener() {
    window.onscroll = () => {
      this.zone.run(() => {
        this.isShrunk = window.pageYOffset > 0;
      });
    };
  }

}
