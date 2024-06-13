import {Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {FieldsPageComponent} from "./components/fields-page/fields-page.component";
import {FieldPageComponent} from "./components/field-page/field-page.component";

export const routes: Routes = [
  {path: 'fields',component: FieldsPageComponent},
  {path: 'fields/:title',component: FieldPageComponent},
  {path: 'home',component: HomePageComponent},
  {path: '**',component: HomePageComponent},
];
