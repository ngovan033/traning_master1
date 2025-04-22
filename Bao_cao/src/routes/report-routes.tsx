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
];
