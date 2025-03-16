import {SidebarModeSelector} from "./sidebar-mode-selector";

export class UserConfigUtils {

  private static SIDEBAR_DISPLAY_MODE_KEY: string = 'sidebar-display-mode';

  public static addDynamicDesign() {
    const sideBarMode = UserConfigUtils.currentSideBarMode();
    const sidebar = document.querySelector(".sidebar");
    const mainContainer = document.querySelector(".main-container");
    const sidebarOpen = document.querySelector("#sidebarOpen");
    const sidebarExpand = document.querySelector(".expand_sidebar");
    const sidebarClose = document.querySelector(".collapse_sidebar");
    if (sidebarClose == null) return;
    if (sidebarExpand == null) return;
    if (sidebarOpen == null || sidebar == null || mainContainer == null) return;

    sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

    this.clickOnCollapseButtonInSideBar(sidebarClose, sidebar, mainContainer);
    this.clickOnExpandButtonInSideBar(sidebarExpand, sidebar, mainContainer);
    this.mouseEnterEventOnSideBar(sidebar, mainContainer);
    this.mouseLeaveEventOnSideBar(sidebar, mainContainer);
    if (window.innerWidth < 768) {
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }

    if (sideBarMode == SidebarModeSelector.CLOSED.valueOf()) {
      sidebar.classList.add("close", "hoverable");
      mainContainer.classList.add("sidebar-closed");
    }
  }

  private static mouseLeaveEventOnSideBar(sidebar: Element, mainContainer: Element) {
    sidebar.addEventListener("mouseleave", () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
        mainContainer.classList.add("sidebar-closed");
      }
    });
  }

  private static mouseEnterEventOnSideBar(sidebar: Element, mainContainer: Element) {
    sidebar.addEventListener("mouseenter", () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
        mainContainer.classList.remove("sidebar-closed");
      }
    });
  }

  private static clickOnExpandButtonInSideBar(sidebarExpand: Element, sidebar: Element, mainContainer: Element) {
    sidebarExpand.addEventListener("click", () => {
      sidebar.classList.remove("close", "hoverable");
      mainContainer.classList.remove("sidebar-closed");
      localStorage.setItem(UserConfigUtils.SIDEBAR_DISPLAY_MODE_KEY, SidebarModeSelector.OPEN.toString());
    });
  }

  private static clickOnCollapseButtonInSideBar(sidebarClose: Element, sidebar: Element, mainContainer: Element) {
    sidebarClose.addEventListener("click", () => {
      sidebar.classList.add("close", "hoverable");
      mainContainer.classList.add("sidebar-closed");
      localStorage.setItem(UserConfigUtils.SIDEBAR_DISPLAY_MODE_KEY, SidebarModeSelector.CLOSED.toString());
    });
  }

  private static currentSideBarMode(): SidebarModeSelector {
    let value = localStorage.getItem(UserConfigUtils.SIDEBAR_DISPLAY_MODE_KEY);
    if (value == null) return SidebarModeSelector.OPEN;
    if (value == SidebarModeSelector.OPEN.toString()) return SidebarModeSelector.OPEN;
    return SidebarModeSelector.CLOSED;
  }
}
