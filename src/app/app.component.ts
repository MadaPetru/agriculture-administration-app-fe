import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from "./shared/components/menu/menu.component";
import {CommonModule} from "@angular/common";
import {Chart, registerables} from "chart.js";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {TranslateService} from "@ngx-translate/core";

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    MenuComponent,
    HomePageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agriculture-administration-app-fe';

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLang);
  }
}
