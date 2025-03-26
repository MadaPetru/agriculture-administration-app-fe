import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CalendarOption} from "@fullcalendar/angular/private-types";
import {FullCalendarComponent, FullCalendarModule} from "@fullcalendar/angular";
import {NgForOf} from "@angular/common";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {BirthModalComponent} from "../../shared/components/birth-modal/birth-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {NavbarSearchComponent} from "../../shared/components/navbar-search/navbar-search.component";
import {MenuValue} from "../../shared/model/menu/menu-value";
import {MenuDataFieldPageProvider} from "../../shared/provider/menu/menu-data-field-page-provider";
import {FormsModule} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {FormSharedService} from "../../shared/components/form/form-shared-service";
import {EntitySelector} from "../../shared/entity-selector";

@Component({
  selector: 'app-future-births-page',
  standalone: true,
  imports: [
    FullCalendarModule,
    NgForOf,
    MenuComponent,
    NavbarSearchComponent,
    FormsModule
  ],
  templateUrl: './future-births-page.component.html',
  styleUrls: ['./future-births-page.component.css', '../../shared/shared.css']
})
export class FutureBirthsPageComponent implements OnDestroy, OnInit {
  @ViewChild(FullCalendarComponent) calendar!: FullCalendarComponent;

  currentDate = new Date();
  unsubscribe = new Subject<void>();

// Get the current year and month
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth(); // Months are 0-based (0 = January, 11 = December)

// Set the first day of the current month
  firstDayOfCurrentMonth = new Date(this.currentYear, this.currentMonth, 1);
  initialDate = this.firstDayOfCurrentMonth.toISOString();
  // Search Data
  searchQuery: string = '';
  searchYear: number | null = null;
  menuValues: MenuValue[] = this.menuDataFieldPageProvider.getMenuValuesForFutureBirthPage();
  futureBirths = [
    {id: 1, date: "2025-04-10", animal: "Cow 23", expectedTime: "10:00 AM"},
    {id: 2, date: "2025-04-15", animal: "Sheep 12", expectedTime: "2:30 PM"},
    {id: 3, date: "2025-04-20", animal: "Goat 5", expectedTime: "4:00 PM"},
    {id: 1, date: "2025-04-10", animal: "Cow 23", expectedTime: "10:00 AM"},
    {id: 2, date: "2025-04-15", animal: "Sheep 12", expectedTime: "2:30 PM"},
    {id: 3, date: "2025-04-20", animal: "Goat 5", expectedTime: "4:00 PM"},
    {id: 1, date: "2025-04-10", animal: "Cow 23", expectedTime: "10:00 AM"},
    {id: 2, date: "2025-04-15", animal: "Sheep 12", expectedTime: "2:30 PM"},
    {id: 3, date: "2025-04-20", animal: "Goat 5", expectedTime: "4:00 PM"},
    {id: 1, date: "2025-04-10", animal: "Cow 23", expectedTime: "10:00 AM"},
    {id: 2, date: "2025-04-15", animal: "Sheep 12", expectedTime: "2:30 PM"},
    {id: 3, date: "2025-04-20", animal: "Goat 5", expectedTime: "4:00 PM"},


  ];
  filteredBirths = [...this.futureBirths];

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.subscribeAddForm();
  }

  // 🔎 Sidebar Search (Filter by Animal Name or Date)
  filterBirths() {
    const query = this.searchQuery.toLowerCase();
    this.filteredBirths = this.futureBirths.filter(b =>
        b.animal.toLowerCase().includes(query) ||
        b.date.includes(query)
      // b.inseminationDate.includes(query)
    );
  }

  // 🔎 Calendar Search (Filter by Year)
  filterCalendarEvents() {
    let date = new Date(this.initialDate);
    if (date.toLocaleDateString() === 'Invalid Date') return;
    this.calendar.getApi().gotoDate(date);
    if (!this.searchYear) {
      this.calendarOptions.events = this.getEvents();
      return;
    }

    const year = this.searchYear.toString();
    // this.calendarOptions.events = this.get().filter(event =>
    //   event.start.startsWith(year)
    // );
  }

  getEvents() {
    let estimatedBirthEvents = this.futureBirths.map(b => ({
      title: b.animal,
      start: b.date,
      color: "#4CAF50"
    }));
    let inseminatedEvents = this.futureBirths.map(b => ({
      title: b.animal,
      start: b.date,
      color: "#af4c63"
    }));
    return estimatedBirthEvents.concat(inseminatedEvents);
  }


  calendarOptions: CalendarOption<any> = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    initialDate: this.initialDate,
    dateClick: this.handleDateClick.bind(this),
    events: this.getEvents()
  };

  constructor(private dialog: MatDialog,
              private formSharedService: FormSharedService,
              private menuDataFieldPageProvider: MenuDataFieldPageProvider) {
  }

  handleDateClick(info: any) {
    const birthsOnDate = this.futureBirths.filter(b => b.date === info.dateStr);
    this.dialog.open(BirthModalComponent, {
      data: {date: info.dateStr, births: birthsOnDate},
      width: '400px'
    });
  }

  editBirth(index: any) {

  }

  deleteBirth(index: any) {

  }

  subscribeAddForm() {
    this.formSharedService.currentFormValue.pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (model: any) => {
          if (model.entity === EntitySelector.FUTURE_BIRTH.valueOf()) {
            console.log(model.object);
          }
          if (model.entity === EntitySelector.IMAGE_FIELD_OPERATION.valueOf()) {
            // let id = <number>this.field?.id;
            // let requestForUpload: UploadFieldImageRequest = {
            //   at: model.object.at,
            //   images: model.object.images
            // };
          }
        },
        error: (response: any) => {
          console.log(response);
        }
      });
  }
}
