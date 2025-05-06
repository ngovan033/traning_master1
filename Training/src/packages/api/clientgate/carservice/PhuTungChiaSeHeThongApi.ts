import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const usePhuTungChiaSeHeThongApi = (apiBase: AxiosInstance) => {
  return {
    PhuTungChiaSeHeThong_Search: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH ? "/SPSharePart/SearchWH" : "/SPSharePart/Search",
        {
          ...params,
        }
      );
    },
    PhuTungChiaSeHeThong_GetDealer: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "SPSharePart/GetDealer",
        {}
      );
    },
    PhuTungChiaSeHeThong_Export: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH ? "/SPSharePart/ExportWH" : "/SPSharePart/Export",
        {
          ...params,
        }
      );
    },
  };
};
