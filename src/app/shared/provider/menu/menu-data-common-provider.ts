import {MenuValue} from "../../model/menu/menu-value";

export class MenuDataCommonProvider {

  public static magicBuild = new MenuValue('bx bxs-magic-wand', 'Magic build', null);
  public static filters = new MenuValue('bx bx-loader-circle', 'Filters', null);
  public static filter = new MenuValue('bx bx-filter', 'Filter', null);
  public static uploadNew = new MenuValue('bx bx-cloud-upload', 'Upload new', null);
  public static noticeBoard = new MenuValue('bx bx-flag', 'Notice board', null);
  public static award = new MenuValue('bx bx-medal', 'Award', null);
  public static setting = new MenuValue('bx bx-cog', 'Setting', null);
  public static admin = new MenuValue('bx bx-user', 'Admin', '/admin');
  public static features = new MenuValue('bx bx-layer', 'Features', null);
  public static overView = new MenuValue('bx bx-grid-alt', 'Overview', null);
  public static home = new MenuValue('bx bx-home-alt', 'Home', '/home');
  public static fields = new MenuValue('bx bx-grid-alt', 'Fields', '/fields');
  public static machines = new MenuValue('fa fa-gears', 'Machines', '/machines');

  public static getUploadNew(): MenuValue {
    return new MenuValue('bx bx-cloud-upload', 'Upload new', null);
  }
}
