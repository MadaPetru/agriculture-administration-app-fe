import {MenuGroup} from "../../model/menu/menu-group";
import {MenuDataCommonProvider} from "./menu-data-common-provider";
import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {FormComponent} from "../../components/form/form.component";
import {FormAttributeProvider} from "../form/form-attribute-provider";

@Injectable()
export class MenuDataFieldPageProvider {

  private static dataFieldsPage: MenuGroup[];
  private static dataFieldPage: MenuGroup[];

  constructor(private dialog: MatDialog) {

  }

  public getMenuGroupsForFieldsPage(): MenuGroup[] {
    if (MenuDataFieldPageProvider.dataFieldsPage != null && MenuDataFieldPageProvider.dataFieldsPage.length > 0) {
      return MenuDataFieldPageProvider.dataFieldsPage;
    }
    let menuGroups: MenuGroup[] = new Array<MenuGroup>();
    let uploadNew = MenuDataCommonProvider.getUploadNew();
    uploadNew.onClickFunction = () => this.onOpenAddNewField();
    let editorGroup = new MenuGroup(Array.of(
      uploadNew), 'menu_editor');
    let adminGroup = new MenuGroup(Array.of(MenuDataCommonProvider.home), 'menu_dashboard');
    menuGroups.push(adminGroup);
    menuGroups.push(editorGroup);
    MenuDataFieldPageProvider.dataFieldsPage = menuGroups;
    return MenuDataFieldPageProvider.dataFieldsPage;
  }

  public getMenuGroupsForFieldPage(): MenuGroup[] {
    if (MenuDataFieldPageProvider.dataFieldPage != null && MenuDataFieldPageProvider.dataFieldPage.length > 0) {
      return MenuDataFieldPageProvider.dataFieldPage;
    }
    let menuGroups: MenuGroup[] = new Array<MenuGroup>();
    let uploadNew = MenuDataCommonProvider.getUploadNew();
    uploadNew.onClickFunction = () => this.onOpenAddNewOperation();
    uploadNew.text = 'Add operation';
    let editorGroup = new MenuGroup(Array.of(
      uploadNew), 'menu_editor');
    let adminGroup = new MenuGroup(Array.of(MenuDataCommonProvider.home,
      MenuDataCommonProvider.fields), 'menu_dashboard');
    menuGroups.push(adminGroup);
    menuGroups.push(editorGroup);
    MenuDataFieldPageProvider.dataFieldPage = menuGroups;
    return MenuDataFieldPageProvider.dataFieldPage;
  }

  onOpenAddNewField() {
    this.dialog.open(FormComponent, {
      data: {title: 'Add new field', attributes: FormAttributeProvider.getAttributesForFieldAddForm(), type: 'field'}
    });
  }

  onOpenAddNewOperation() {
    this.dialog.open(FormComponent, {
      data: {
        title: 'Add new operation',
        attributes: FormAttributeProvider.getAttributesForOperationForm(),
        type: 'operation'
      }
    });
  }
}
