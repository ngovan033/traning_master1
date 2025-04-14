import { CustomerTypePage } from "@/pages/master/CustomerType/CustomerTypePage";
import { RouteItem } from "@/types";
import { CustomerTypePageDemo } from "@/pages/master/CustomerTypeDemo/CustomerTypePageDemo";
export const adminRoutes: RouteItem[] = [
  {
    key: "admin",
    path: "admin",
    mainMenuTitle: "admin",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <></>,
  },
  {
    key: "CustomerType",
    path: "admin/CustomerType",
    subMenuTitle: "CustomerType",
    mainMenuKey: "admin",
    permissionCode: "MNU_QT_DL_LOAIKHACHHANG",
    getPageElement: () => <CustomerTypePage />,
    view: "DL",
  },
  {
    key: "CustomerTypeDemo",
    path: "admin/CustomerTypeDemo",
    subMenuTitle: "CustomerTypeDemo",
    mainMenuKey: "admin",
    permissionCode: "MNU_QT_DL_LOAIKHACHHANG",
    getPageElement: () => <CustomerTypePageDemo />,
    view: "DL",
  },
];
