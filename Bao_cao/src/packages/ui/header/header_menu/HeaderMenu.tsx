import { useNetworkNavigate } from "@/packages/hooks";
import { useHeaderItems } from "@/packages/hooks/useHeaderItems";
import { useStylingCommon } from "@/packages/hooks/useStylingCommon";
import { sidebarAtom } from "@/packages/store";
import { MenuBarItem } from "@/types";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

const HeaderMenu = () => {
  const { items } = useHeaderItems();
  const navigate = useNetworkNavigate();
  const setSidebarOpen = useSetAtom(sidebarAtom);

  const location = useLocation();

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const navigateItem = useCallback((item: MenuBarItem) => {
    navigate(item.path);
    openSidebar();
    document.title = "DMS Serivce";
  }, []);

  const currentMainPath = useMemo(() => {
    const findCurrentMenu = items
      .filter((item) => {
        const mainKey = location.pathname.split("/")[2];
        return item.path.startsWith(`/${mainKey}`);
      })
      .map((item) => item.path)
      .join();

    return findCurrentMenu;
  }, [items, location]);

  const style = useStylingCommon();

  const handleNavigate = (navItem: any) => {
    navigateItem(navItem);
  };

  return (
    <div className={style.HEADER.HEADER_MENU}>
      {items?.map((item) => {
        return (
          <div
            className={`${style.HEADER.HEADER_MENU_ITEM} ${
              item.path == currentMainPath ? "active" : ""
            } `}
            onClick={() => handleNavigate(item)}
            key={nanoid()}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};

export default HeaderMenu;
