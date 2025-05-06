import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useQLDatHangTonKhoToiUuApi = (apiBase: AxiosInstance) => {
  return {
    QLDatHangTonKhoToiUu_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvReportPart/SearchDL",
        {
          ...params,
        }
      );
    },

    QLDatHangTonKhoToiUu_ExportDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvReportPart/ExportDL",
        {
          ...params,
        }
      );
    },
  };
};
