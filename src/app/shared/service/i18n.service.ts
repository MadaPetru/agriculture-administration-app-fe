import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(private translate: TranslateService) { }


  public value(key:string):string {
    let translation = 'translation-error';
    this.translate.get(key).subscribe(
      {
        next: (value) => {
          translation = value;
        }
      }
    )
    return translation;
  }
}
