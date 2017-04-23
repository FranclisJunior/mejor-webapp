import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: any = {};
  contactForm: FormGroup;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, fb: FormBuilder) {
    this.contactForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': '',
      'message': ['', Validators.required]
    });

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  sendEmail() {
    // TODO
    this.toastr.info('Not Implemented');
  }

}
