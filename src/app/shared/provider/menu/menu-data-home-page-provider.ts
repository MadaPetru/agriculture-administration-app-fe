import {MenuGroup} from "../../model/menu/menu-group";
import {MenuDataCommonProvider} from "./menu-data-common-provider";
import {MenuValue} from "../../model/menu/menu-value";

export class MenuDataHomePageProvider extends MenuDataCommonProvider {

  private static data: MenuValue[];

  static {
    MenuDataHomePageProvider.data = MenuDataHomePageProvider.initMenuValues();
  }

  public static getMenuGroups(): MenuValue[] {
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

  private static initMenuValues(): MenuValue[] {
    return Array.of(this.fields);
  }
}
