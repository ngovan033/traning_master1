import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_BaoHanhThongKeTheoThangApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_BaoHanhThongKeTheoThang_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerChartThongKeBaoHanhByMonth/SearchHQ", {
        ...param,
      },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
    },

    //Export-SearchDL
    Rpt_BaoHanhThongKeTheoThang_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
        >("/RptDMSSerChartThongKeBaoHanhByMonth/ExportHQ", {
        ...param,
      });
    },
  };
};
