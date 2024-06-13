export class MenuValue {
  icon: string;
  text: string;
  link?: string | null;
  onClickFunction: Function | undefined

  constructor(icon: string, text: string, link?: string | null) {
    this.icon = icon;
    this.text = text;
    this.link = link;
  }
}
