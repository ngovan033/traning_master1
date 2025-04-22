import { protectedRoutes } from "@/app-routes";
import { useScreenSize } from "@/utils/media-query";
import { useMenuPatch } from "@/utils/patches";
import { useNetworkNavigate } from "@packages/hooks";
import { useHeaderItems } from "@packages/hooks/useHeaderItems";
import { Sidebar } from "@packages/ui/sidebar";
import Drawer from "devextreme-react/drawer";
import ScrollView from "devextreme-react/scroll-view";
import { ItemClickEvent } from "devextreme/ui/tree_view";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useI18n } from "@/i18n/useI18n";
import { useAuth } from "@/packages/contexts/auth";
import { usePermissions } from "@/packages/contexts/permission";
import { useNewTabNavigate } from "@/packages/hooks/useNewTabNavigate";
import { permissionAtom } from "@/packages/store/permission-store";
import PageNotData from "@/packages/ui/PageError/PageNotData";
import { MenuBarItem, SidebarItem } from "@/types";
import { sidebarAtom } from "@packages/store";
import { Header } from "@packages/ui/header";
import { Icon } from "@packages/ui/icons";
import { useAtomValue, useSetAtom } from "jotai";
import "./admin-page-layout.scss";
import { Ser_MST_ModelPage } from "@/pages/master/Ser_MST_Model";

export const AdminPageLayout = () => {
  const { t } = useI18n("Common");
  const { items, extraItems } = useHeaderItems();
  const contextMenuRef = useRef<any>(null);
  const [contextMenu, setContextMenu] = useState<any>(null);
  const navigate = useNetworkNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const scrollViewRef = useRef<ScrollView>(null);
  const location = useLocation();
  const isSidebarOpen = useAtomValue(sidebarAtom);
  const setSidebarOpen = useSetAtom(sidebarAtom);
  const [nameTab, setNameTab] = useState("");
  const { isHQ } = usePermissions();

  const {
    auth: { networkId },
  } = useAuth();
  // const setTabPanel = useSetAtom(tabsPanelAtom);

  // // nhúng igosss
  // const { auth } = useAuth();
  // const igoss = useIgoss();
  // const { signOut } = useAuthService();
  // useEffect(() => {
  //   let options = {
  //     networkId: auth.networkId,
  //     token: auth.token,
  //     viewNotification: (item: any) => {
  //       //console.log("notification", item);
  //       navigate(`/eticket/detail/${item.ObjectId}`);
  //     },
  //     logout: () => {
  //       signOut();
  //     },
  //   };
  //   igoss.init(options);
  // }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const { hasMenuPermission } = usePermissions();
  const mainKey = location.pathname.split("/")[2];
  const permissionStore = useAtomValue(permissionAtom);
  // const checkPhanQuyen = hasMenuPermission("MENU_MST_VIN_MODEL_ORIGINAL")
  // console.log(78, checkPhanQuyen)
  const sidebarItems = useMemo(() => {
    const currentView = isHQ() == true ? "HQ" : "DL";

    return protectedRoutes
      .filter(
        (route) =>
          route.key !== route.mainMenuKey &&
          route.mainMenuKey === mainKey &&
          !!route.subMenuTitle
      )
      .filter(
        (route) =>
          route.permissionCode === "" ||
          (route.permissionCode && hasMenuPermission(route.permissionCode))
      )
      .filter((route) => !route.view || route.view == currentView)
      .map(
        (route) =>
          ({
            subMenuTitle: route.subMenuTitle,
            path: route.path,
            key: route.key,
            items: route.items
              ?.filter((route) => !!route.subMenuTitle)
              .filter((r) =>
                r.isHQ ? r.isHQ === permissionStore.sysUser?.BizUserType : true
              )
              .filter(
                (route) =>
                  route.permissionCode === "" ||
                  (route.permissionCode &&
                    hasMenuPermission(route.permissionCode))
              )
              .map((item) => ({
                ...item,
                text: item.subMenuTitle,
              })),
            hasBreak:
              route.hasBreak == true
                ? true
                : route.hasBreak == currentView
                ? true
                : false,
          } as SidebarItem)
      );
  }, [location.pathname, mainKey]);

  const redirectUri: string = `${import.meta.env.VITE_DOMAIN}/`;

  const onNavigationChanged = useCallback(
    ({ itemData, event, node }: ItemClickEvent) => {
      if (!itemData?.path || node?.selected) {
        event?.preventDefault();
        return;
      }

      navigate(itemData.path);
      scrollViewRef.current?.instance.scrollTo(0);
    },
    [navigate, isLarge]
  );

  const temporaryOpenMenu = useCallback(() => {}, []);
  const navigateItem = useCallback((item: MenuBarItem) => {
    navigate(item.path);
    openSidebar();
    document.title = "DMS Serivce";
  }, []);

  const handleContextMenu = useCallback(
    (event: any, item: any) => {
      event.preventDefault();
      if (item.path !== "") {
        setContextMenu(
          contextMenu === null
            ? { mouseX: event.clientX + 5, mouseY: event.clientY - 4, item }
            : {
                ...contextMenu,
                mouseX: event.clientX + 5,
                mouseY: event.clientY - 4,
                item,
              }
        );
        setNameTab(item.text);
      } else {
        setContextMenu(null);
      }
    },
    [contextMenu]
  );

  const sidebarElement = useMemo(() => {
    return (
      <Sidebar
        //compactMode={!isSidebarOpen}
        compactMode={false}
        selectedItemChanged={onNavigationChanged}
        openMenu={temporaryOpenMenu}
        handleContextMenu={handleContextMenu}
        onMenuReady={onMenuReady}
        items={sidebarItems}
      >
        <div className={"dms-sidebar__toolbar"}>
          <div className="py-[10px]">
            <Icon
              className={"cursor-pointer"}
              name={"menu"}
              width={12}
              height={12}
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </Sidebar>
    );
  }, [mainKey]);

  const handleClose = () => {
    setContextMenu(null);
  };
  const handleClickOutside = (event: any) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    if (contextMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);

  const openTab = useNewTabNavigate();

  const handleOpenLinkInNewTab = () => {
    openTab(contextMenu.item.path);
    handleClose();
  };

  return (
    <>
      <div className={"dms w-full h-full bg-white relative"}>
        <Header></Header>
        {sidebarItems.length === 0 ? (
          <>{mainKey !== undefined ? <PageNotData /> : null}</>
        ) : (
          <Drawer
            className={[
              "main-sidebar",
              "drawer",
              patchCssClass,
              sidebarItems.length === 0 ? "no-sidebar" : "",
            ].join(" ")}
            position={"before"}
            openedStateMode={isLarge ? "shrink" : "overlap"}
            revealMode={isXSmall ? "slide" : "expand"}
            minSize={0}
            maxSize={sidebarItems.length > 0 ? 250 : 0}
            shading={false}
            opened={sidebarItems.length > 0 ? isSidebarOpen : false}
            // template={"menu"}
            render={() => {
              return sidebarItems.length > 0 ? sidebarElement : null;
            }}
          >
            <div id="content-wrapper" className={"w-full h-full"}>
              <Outlet />
            </div>
            {/* <Template name={"menu"}>{sidebarElement}</Template> */}
          </Drawer>
        )}
        {contextMenu && (
          <div
            ref={contextMenuRef}
            style={{
              position: "absolute",
              top: contextMenu.mouseY,
              left: contextMenu.mouseX,
              backgroundColor: "white",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
              zIndex: 99999,
              borderRadius: "5px",
            }}
          >
            <div
              onClick={handleOpenLinkInNewTab}
              className="hover:underline flex items-center gap-[10px] p-[10px] cursor-pointer"
            >
              <img
                src="/src/packages/layouts/admin-page-layout/opentab.png"
                alt=""
                className="w-[12px] h-[12px]"
              />
              <span className="">
                Mở<span className="font-bold">{` ${nameTab} `}</span>trong tab
                mới
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
