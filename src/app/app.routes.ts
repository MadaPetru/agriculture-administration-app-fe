import {Routes} from '@angular/router';
import {LoginPageComponent} from "./shared/components/login-page/login-page.component";
import {authGuard} from "./shared/guard/auth.guard";
import {RegisterPageComponent} from "./shared/components/register-page/register-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {FieldsPageComponent} from "./pages/fields-page/fields-page.component";
import {FieldPageComponent} from "./pages/field-page/field-page.component";

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'fields', component: FieldsPageComponent, canActivate: [authGuard]},
  {path: 'fields/:title', component: FieldPageComponent, canActivate: [authGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [authGuard]},
  {path: '**', component: HomePageComponent, canActivate: [authGuard]},
];
