import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from "./shared/components/menu/menu.component";
import {CommonModule} from "@angular/common";
import {Chart, registerables} from "chart.js";
import {HomePageComponent} from "./pages/home-page/home-page.component";

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
