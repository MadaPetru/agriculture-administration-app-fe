import {MenuGroup} from "../../model/menu/menu-group";
import {MenuDataCommonProvider} from "./menu-data-common-provider";

export class MenuDataHomePageProvider extends MenuDataCommonProvider {

  private static data: MenuGroup[];

  static {
    MenuDataHomePageProvider.data = MenuDataHomePageProvider.initMenuGroups();
  }

  public static getMenuGroups(): MenuGroup[] {
    return MenuDataHomePageProvider.data;
  }

  private static initMenuGroups(): MenuGroup[] {
    let menuGroups: MenuGroup[] = new Array<MenuGroup>();
    let settingGroup = new MenuGroup(Array.of(this.noticeBoard,
      this.award,
      this.setting,
      this.features), 'menu_setting');
    let editorGroup = new MenuGroup(Array.of(this.magicBuild,
      this.filters,
      this.filter,
      this.uploadNew), 'menu_editor');
    let adminGroup = new MenuGroup(Array.of(
      this.fields), 'menu_dashboard');
    menuGroups.push(adminGroup);
    return menuGroups;
  }
}
