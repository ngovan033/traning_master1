import { ReportROByDatePage } from "@/pages/report/ReportROByDate/ReportROByDate";
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
];
