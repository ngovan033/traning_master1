import { useVisibilityControl, VisibilityControl } from "@packages/hooks";
import Drawer from "devextreme-react/drawer";
import { PropsWithChildren, ReactNode } from "react";
import "src/packages/components/layout/layout-with-search-panel.scss";
interface WithSearchPanelLayoutProps {
  searchPanelRender: (control: VisibilityControl) => ReactNode;
  contentPanelRender: (control: VisibilityControl) => ReactNode;
}

export const WithSearchPanelLayout = ({
  searchPanelRender,
  contentPanelRender,
}: PropsWithChildren<WithSearchPanelLayoutProps>) => {
  const searchPanelVisible = useVisibilityControl({ defaultVisible: true });

  return (
    <div
      className={`h-[98%] layout-with-search-panel drawer-${
        searchPanelVisible.visible == true ? "open" : "close"
      }`}
    >
      <Drawer
        opened={searchPanelVisible.visible}
        openedStateMode={"shrink"}
        position="left"
        revealMode={"slide"}
        height={"100%"}
        render={() => <>{searchPanelRender(searchPanelVisible)}</>}
      >
        <div className="h-full">{contentPanelRender(searchPanelVisible)}</div>
      </Drawer>
    </div>
  );
};
