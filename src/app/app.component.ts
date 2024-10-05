import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from "./shared/components/menu/menu.component";
import {CommonModule} from "@angular/common";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agriculture-administration-app-fe';
}
