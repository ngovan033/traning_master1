import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRptDMSSerWarrantyMainPartApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_DMSSerWarrantyMainPart_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      console.log(14, param)
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerWarrantyMainPart/SearchHQ", {
        ...param,
      },
      );
    },

    //Export-SearchDL
    Rpt_DMSSerWarrantyMainPart_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerWarrantyMainPart/ExportSearchHQ", {
        ...param,
      });
    },
  };
};
