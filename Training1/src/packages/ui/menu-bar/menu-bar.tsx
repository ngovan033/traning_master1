import { MenuBarItem, MenuBarProps } from "@/types";
import { Tabs } from "devextreme-react/tabs";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./menu-bar.scss";

export const MenuBar = ({ items, onClick, extraItems }: MenuBarProps) => {
  const location = useLocation();
  const navigateItem = (e: any, item: MenuBarItem) => {
    if (item.path === "/") {
      e.cancel = true;
    } else {
      onClick?.(item);
    }
  };

  const filterSelectedItem = useMemo(
    () =>
      items
        .filter((item) => {
          const mainKey = location.pathname.split("/")[2];
          return item.path.startsWith(`/${mainKey}`);
        })
        .map((item) => item.path),
    [items, location]
  );
  return (
    <div className="flex justify-center menu-bar-container">
      <Tabs
        selectionMode="single"
        items={items}
        keyExpr={"path"}
        selectedItemKeys={filterSelectedItem}
        onItemClick={(e) => navigateItem(e, e.itemData as MenuBarItem)}
      ></Tabs>
    </div>
  );
};
