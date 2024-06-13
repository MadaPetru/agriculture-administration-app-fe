import {MenuValue} from "./menu-value";

export class MenuGroup{
  group:Array<MenuValue>;
  title:string;

  constructor(group:Array<MenuValue>,title:string) {
    this.group = group;
    this.title = title;
  }
}
