import {Component} from '@angular/core';
import {CalendarOption} from "@fullcalendar/angular/private-types";

@Component({
  selector: 'app-future-births-page',
  standalone: true,
  imports: [],
  templateUrl: './future-births-page.component.html',
  styleUrl: './future-births-page.component.css'
})
export class FutureBirthsPageComponent {
  futureBirths = [
    { id: 1, date: "2025-04-10", animal: "Cow 23", expectedTime: "10:00 AM" },
    { id: 2, date: "2025-04-15", animal: "Sheep 12", expectedTime: "2:30 PM" },
    { id: 3, date: "2025-04-20", animal: "Goat 5", expectedTime: "4:00 PM" },
  ];

  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin, interactionPlugin],
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this),
  //   events: this.futureBirths.map(b => ({
  //     title: b.animal,
  //     start: b.date,
  //     color: "#4CAF50"
  //   }))
  // };

}
