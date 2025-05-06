import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useTongHopXuatTheoLenhApi = (apiBase: AxiosInstance) => {
  return {
    TongHopXuatTheoLenh_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/TotalStockRepairOrder/SearchWHDL"
          : "/TotalStockRepairOrder/SearchDL",
        {
          ...params,
        }
      );
    },
    TongHopXuatTheoLenh_PrintDL: async (
      code: any,
      params: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/TotalStockRepairOrder/PrintWHDL"
          : "/TotalStockRepairOrder/PrintDL",
        {
          ROID: code,
        }
      );
    },
  };
};
