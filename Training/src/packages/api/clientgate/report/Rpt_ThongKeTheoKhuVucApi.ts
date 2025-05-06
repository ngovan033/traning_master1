import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_ThongKeTheoKhuVucApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_DMSSerChartThongKeBaoHanhByArea_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      console.log(14, param)
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerChartThongKeBaoHanhByArea/SearchHQ", {
        ...param,
      },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
    },

    //Export-SearchDL
    Rpt_DMSSerChartThongKeBaoHanhByArea_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerChartThongKeBaoHanhByArea/ExportHQ", {
        ...param,
      });
    },
  };
};
