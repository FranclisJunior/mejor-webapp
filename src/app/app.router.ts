import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingupComponent } from './singup/singup.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sing-up', component: SingupComponent }
];

