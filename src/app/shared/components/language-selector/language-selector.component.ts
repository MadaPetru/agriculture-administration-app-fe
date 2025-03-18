import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {

  languages = [
    {code: 'en', label: 'English'},
    {code: 'ro', label: 'Română'}
  ];

  selectedLanguage: string;

  constructor(protected translate: TranslateService) {
    const savedLang = localStorage.getItem('language') || 'en';
    this.selectedLanguage = savedLang;
    this.translate.use(savedLang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
