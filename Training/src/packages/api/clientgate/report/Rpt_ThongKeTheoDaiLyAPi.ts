import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_ThongKeTheoDaiLyApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_ThongKeTheoDaiLy_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
        >("/RptDMSSerChartThongKeBaoHanhByDealer/SearchHQ", {
        ...param,
      },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
    },

    //Export-SearchDL
    Rpt_ThongKeTheoDaiLy_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerChartThongKeBaoHanhByDealer/ExportHQ", {
        ...param,
      });
    },
  };
};
