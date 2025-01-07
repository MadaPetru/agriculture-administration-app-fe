import {Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {FieldsPageComponent} from "./components/fields-page/fields-page.component";
import {FieldPageComponent} from "./components/field-page/field-page.component";
import {LoginPageComponent} from "./shared/components/login-page/login-page.component";
import {authGuard} from "./shared/guard/auth.guard";

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'fields', component: FieldsPageComponent, canActivate: [authGuard]},
  {path: 'fields/:title', component: FieldPageComponent, canActivate: [authGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [authGuard]},
  {path: '**', component: HomePageComponent, canActivate: [authGuard]},
];
