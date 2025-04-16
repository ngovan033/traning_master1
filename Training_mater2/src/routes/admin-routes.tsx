import { CustomerTypePage } from "@/pages/master/CustomerType/CustomerTypePage";
import { Ser_CavityPage } from "@/pages/master/SerCavity/list/Ser_Cavity";
import {  PeopleDemo } from "@/pages/master/People/PeopleDemo";
import { SerCavityPageDemo } from "@/pages/master/SerCavityDemo/SerCavityPageDemo";
import { RouteItem } from "@/types";
import { SerMSTPartGroup } from "@/pages/master/QL_vat_tu/SerMSTPartGroup";

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
    subMenuTitle: "QL_vat_tu",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <SerMSTPartGroup />,
    view: "DL",
  },
];
