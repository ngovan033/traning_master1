import { CustomerTypePage } from "@/pages/master/CustomerType/CustomerTypePage";
import { Ser_CavityPage } from "@/pages/master/SerCavity/list/Ser_Cavity";
import { Ser_CustomerCar } from "@/pages/master/SerCustomer/list/Ser_CustomerCar";
import { RouteItem } from "@/types";

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
    permissionCode: "",
    getPageElement: () => <CustomerTypePage />,
    view: "DL",
  },
  {
    key: "SerCavity",
    path: "admin/SerCavity",
    subMenuTitle: "SerCavity",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <Ser_CavityPage />,
    view: "DL",
  },
  {
    key: "Ser_CustomerCar", //  Danh sách khách hàng
    path: "admin/Ser_CustomerCar",
    subMenuTitle: "Danh sách khách hàng",
    mainMenuKey: "admin",
    permissionCode: "MNU_QT_DL_DANHSACHKHACHHANG",
    getPageElement: () => <Ser_CustomerCar />,
    view: "DL",
  },
];
