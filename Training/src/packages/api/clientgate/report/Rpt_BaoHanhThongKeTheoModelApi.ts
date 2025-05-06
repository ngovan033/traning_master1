import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_BaoHanhThongKeTheoModelApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_BaoHanhThongKeTheoModel_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerChartThongKeBaoHanhByModelB/SearchHQ", {
        ...param,
      },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
    },

    //Export-SearchDL
    Rpt_BaoHanhThongKeTheoModel_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerChartThongKeBaoHanhByModelB/ExportHQ", {
        ...param,
      });
    },
  };
};
