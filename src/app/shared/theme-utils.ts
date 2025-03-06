import {ThemeSelector} from "./theme-selector";

export class ThemeUtils {

  private static KEY_THEME_MODE: string = 'theme';

  public static toggleTheme() {
    const html = document.documentElement;
    const body = document.querySelector("body");
    const darkLight = document.querySelector("#darkLight");
    if (darkLight == null || body == null) return;
    body.classList.toggle("dark");
    html.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      localStorage.setItem(ThemeUtils.KEY_THEME_MODE, ThemeSelector.DARK.toString());
      darkLight.classList.replace("bx-sun", "bx-moon");
    } else {
      localStorage.setItem(ThemeUtils.KEY_THEME_MODE, ThemeSelector.LIGHT.toString());
      darkLight.classList.replace("bx-moon", "bx-sun");
    }
  }

  public static currentTheme(): ThemeSelector {
    let value = localStorage.getItem(ThemeUtils.KEY_THEME_MODE);
    if (value == null) return ThemeSelector.LIGHT;
    if (value == ThemeSelector.DARK.toString()) return ThemeSelector.DARK;
    return ThemeSelector.LIGHT;
  }
}
