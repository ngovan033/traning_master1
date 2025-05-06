import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useNPPTimKiemXeApi = (apiBase: AxiosInstance) => {
  return {
    NPPTimKiemXe_ExportHQ: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/NPPSearchCar/ExportHQ",
        { ...data }
      );
    },
    NPPTimKiemXe_SearchHQ: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/NPPSearchCar/SearchWHHQ"
          : "/NPPSearchCar/SearchHQ",
        {
          ...params,
        }
      );
    },
  };
};
