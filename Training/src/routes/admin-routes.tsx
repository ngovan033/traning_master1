import { BaoGiaPage } from "@/pages/master/BaoGia/BaoGia";
import { CustomerTypePage } from "@/pages/master/CustomerType/CustomerTypePage";
import { DanhSachCuocHenPage } from "@/pages/master/DanhSachCuocHen/DanhSachCuocHenPage";
import TaoMoiCuocHenPage from "@/pages/master/DanhSachCuocHen/TaoMoiCuocHen/TaoMoiCuocHen";
import TinhTrangKhoangHenPage from "@/pages/master/DanhSachCuocHen/TinhTrangKhoangHen/TinhTrangKhoangHen";
import { DanhSachNoNhaCungCapPage } from "@/pages/master/DanhSachNoNhaCungCap/DanhSachNoNhaCungCapPage";
import ChitietnoPage from "@/pages/master/DanhSachNoNhaCungCap/TaoMoiCuocHen/ChiTIetNoNhaCC";
import { QuyetToanPage } from "@/pages/master/QuyetToan/QuyetToan";
import { Ser_CavityPage } from "@/pages/master/SerCavity/list/Ser_Cavity";
import { Ser_CustomerCar_CreateNew } from "@/pages/master/SerCustomer/create-new/create-new";
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
  {
    key: "Ser_CustomerCar", // Danh sách khách hàng
    path: "admin/Ser_CustomerCar/manageSer_CustomerCar/:type?/:CusID?",
    subMenuTitle: "",
    mainMenuKey: "admin",
    permissionCode: "MNU_QT_DL_DANHSACHKHACHHANG",
    getPageElement: () => <Ser_CustomerCar_CreateNew />,
  },
  {
    key: "DanhSachCuocHenDL", //Quản lý cuộc hẹn DL
    path: "admin/DanhSachCuocHenDL",
    subMenuTitle: "Danh sách cuộc hẹn",
    mainMenuKey: "admin",
    permissionCode: "", //
    getPageElement: () => <DanhSachCuocHenPage />,
    view: "DL",
  },

  {
    key: "DanhSachCuocHen", // Tạo mới cuộc hẹn DL
    path: "admin/ThongTinCuocHenDL/:Type/:AppId?/:From?/:FromId?",
    subMenuTitle: "",
    subMenuKey: "DanhSachCuocHen",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <TaoMoiCuocHenPage />,
    view: "DL",
  },
  {
    key: "TinhTrangKhoangHen", // Tạo mới cuộc hẹn
    path: "admin/TinhTrangKhoangHen",
    subMenuTitle: "",
    subMenuKey: "TinhTrangKhoangHen",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <TinhTrangKhoangHenPage />,
    view: "DL",
  },
  {
    key: "DanhSachNoNhaCungCap", 
    path: "admin/DanhSachNoNhaCungCap",
    subMenuTitle: "Danh sách nợ nhà cung cấp",
    mainMenuKey: "admin",
    permissionCode: "", //
    getPageElement: () => <DanhSachNoNhaCungCapPage />,
    view: "DL",
  },
  {
    key: "DanhSachNoNhaCungCap", // Tạo mới cuộc hẹn DL
    path: "admin/Danhsachnonhacc/:Type/:SupplierID?",
    subMenuTitle: "",
    subMenuKey: "DanhSachNoNhaCungCap",
    mainMenuKey: "admin",
    permissionCode: "",
    getPageElement: () => <ChitietnoPage />,
    view: "DL",
  },
  {
    key: "BaoGia", //Quản lý cuộc hẹn DL
    path: "admin/BaoGia",
    subMenuTitle: "Báo giá",
    mainMenuKey: "admin",
    permissionCode: "", //
    getPageElement: () => <BaoGiaPage />,
    view: "DL",
  },
  // {
  //   key: "QuyetToan", //Quản lý cuộc hẹn DL
  //   path: "admin/QuyetToan",
  //   subMenuTitle: "Quyết toán",
  //   mainMenuKey: "admin",
  //   permissionCode: "", //
  //   getPageElement: () => <QuyetToanPage />,
  //   view: "DL",
  // },
];
