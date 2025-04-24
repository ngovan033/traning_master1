import { CustomerTypePage } from "@/pages/master/CustomerType/CustomerTypePage";
import { Ser_CavityPage } from "@/pages/master/SerCavity/list/Ser_Cavity";
import {  PeopleDemo } from "@/pages/master/People/PeopleDemo";
import { SerCavityPageDemo } from "@/pages/master/SerCavityDemo/SerCavityPageDemo";
import { RouteItem } from "@/types";
import { SerMSTPartGroup } from "@/pages/master/QL_vat_tu/SerMSTPartGroup";
import { Ser_MST_ServicePage } from "@/pages/master/SerMstService/list/Ser_MST_Service";
import { Ser_CustomerCarPage } from "@/pages/master/SerCustomerCar/list/SerCustomerCar";
import { Ser_Mst_PartPage } from "@/pages/master/Ser_MST_Part/list/Ser_Mst_Part";
import { Quan_ly_loai_hang } from "@/pages/master/QuanLyLoaiHang/Quan_Li_Loai_Hang";
import { Ser_Mst_TradeMarkPage } from "@/pages/master/QuanLyHieuXe/Ser_Mst_TradeMark";
import { Quan_ly_Model } from "@/pages/master/Model/Model";
import { Ser_CustomerCarUpdate } from "@/pages/master/SerCustomerCar/list/Ser_updateCar";

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
    key: "SerCavityDemo",
    path: "admin/SerCavityDemo",
    subMenuTitle: "SerCavityDemo",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <SerCavityPageDemo />,
    view: "DL",
  },
  {
    key: "People",
    path: "admin/People",
    subMenuTitle: "People",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <PeopleDemo />,
    view: "DL",
  },
  {
    key: "QL_vat_tu",
    path: "admin/QL_vat_tu",
    subMenuTitle: "Quản lý vật tư",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <SerMSTPartGroup />,
    view: "DL",
  },
  {
    key: "SerMstService",
    path: "admin/SerMstService",
    subMenuTitle: "Quản lý công việc",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <Ser_MST_ServicePage />,
    view: "DL",
  },
  {
    key: "SerCustomerCar",
    path: "admin/SerCustomerCar",
    subMenuTitle: "Quản lý khách hàng",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <Ser_CustomerCarPage />,
    view: "DL",
  },
  {
    key: "SerCustomerCar",
    path: "admin/Ser_CustomerCar/manageSer_CustomerCar/:type?/:CusID?",
    subMenuTitle: "",
    mainMenuKey: "admin",
    permissionCode: "MNU_QT_DL_DANHSACHKHACHHANG",
    getPageElement: () => <Ser_CustomerCarUpdate />,
    
  },
  {
    key: "Ser_MST_Part",
    path: "admin/Ser_MST_Part",
    subMenuTitle: "Quản lý danh sách phụ tùng",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <Ser_Mst_PartPage />,
    view: "DL",
  },
  {
    key: "QuanLyLoaiHang",
    path: "admin/QuanLyLoaiHang",
    subMenuTitle: "Quản lý loại hàng",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <Quan_ly_loai_hang />,
    view: "DL",
  },
  {
    key: "QuanLyHieuXe",
    path: "admin/QuanLyHieuXe",
    subMenuTitle: "Quản lý hiệu xe",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <Ser_Mst_TradeMarkPage />,
    view: "DL",
  },
  {
    key: "Model",
    path: "admin/Model",
    subMenuTitle: "Quản lý Model",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <Quan_ly_Model />,
    view: "DL",
  },
];
