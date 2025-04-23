import { BaoCaoCongNoBaoHiem } from "@/pages/report/BaoCaoCongNoBaoHiem/BaoCaoCongNoBaoHiem";
import { BaoCaoCongNoPhaiThu } from "@/pages/report/BaoCaoCongNoPhaiThu/BaoCaoCongNoPhaiThu";
import { ReportROByDatePage } from "@/pages/report/ReportROByDate/ReportROByDate";
import { ThongKeCongViec } from "@/pages/report/ThongKeCongViec/ThongKeCongViec";
import { ThongKeCongViecTheoTo } from "@/pages/report/ThongKeCongViecTheoTo/ThongKeCongViecTheoTo";
import { RouteItem } from "@/types";

export const reportRoutes: RouteItem[] = [
  {
    key: "report",
    path: "report",
    permissionCode: "MNU_BC",
    mainMenuTitle: "report",
    mainMenuKey: "report",
    getPageElement: () => <></>,
  },

  {
    key: "ReportROByDatePage",
    path: "report/ReportROByDatePage",
    subMenuTitle: "ReportROByDatePage",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <ReportROByDatePage />,
    view: "DL",
  },

  {
    key: "ThongKeCongViec",
    path: "report/ThongKeCongViec",
    subMenuTitle: "Thống kê công việc",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <ThongKeCongViec />,
    view: "DL",
  },
  {
    key: "ThongKeCongViecTheoTo",
    path: "report/ThongKeCongViecTheoTo",
    subMenuTitle: "Thống kê công việc theo tổ",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <ThongKeCongViecTheoTo />,
    view: "DL",
  },
  {
    key: "BaoCaoCongNoBaoHiem",
    path: "report/BaoCaoCongNoBaoHiem",
    subMenuTitle: "Báo cáo công nợ bảo hiểm",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <BaoCaoCongNoBaoHiem />,
    view: "DL",
  },
  {
    key: "BaoCaoCongNoPhaiThu",
    path: "report/BaoCaoCongNoPhaiThu",
    subMenuTitle: "Báo cáo công nợ phải thu",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <BaoCaoCongNoPhaiThu />,
    view: "DL",
  },
];
