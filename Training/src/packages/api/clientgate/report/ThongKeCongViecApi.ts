import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_ThongKeCongViecApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_ThongKeCongViec_SearchDL: async (
      param: Partial<Search_SerPayment_Params>
    ): Promise<ApiResponse<SerPayment>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<SerPayment>
      >("/SerROStatisticService/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    Rpt_ThongKeCongViec_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerThongKeBaoHanhTheoModel/ExportSearchHQ", {
        ...param,
      });
    },
    Rpt_ThongKeCongViec_PrintDL: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/SerROStatisticService/PrintDL", {
        ...param,
      });
    },
    Rpt_ThongKeCongViec_ExportDL: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/SerROStatisticService/ExportSearchDL", {
        ...param,
      });
    },
  };
};
