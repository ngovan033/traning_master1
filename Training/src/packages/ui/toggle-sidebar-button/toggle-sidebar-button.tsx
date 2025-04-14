import { sidebarAtom } from "@packages/store";
import { useAtomValue, useSetAtom } from "jotai";

import { Icon } from "@packages/ui/icons";
import "./toggle-sidebar-button.scss";
export const ToggleSidebarButton = ({ cssClass }: { cssClass?: string }) => {
  const isOpen = useAtomValue(sidebarAtom);
  const setSidebarOpen = useSetAtom(sidebarAtom);
  const toggleSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div className={cssClass}>
      {isOpen ? (
        <div className="ml-[16px]"></div>
      ) : (
        <Icon
          className={"cursor-pointer toggle__menu mx-[16px]"}
          name={"menu"}
          fill="#5f7d95"
          color="#5f7d95"
          width={12}
          height={12}
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};
