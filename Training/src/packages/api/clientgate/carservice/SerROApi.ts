import { ApiResponse } from "@/packages/types";
import { Search_SerRO_Param, SerRO } from "@/packages/types/carservice/SerRO";
import { AxiosInstance } from "axios";

export const useSerROApi = (apiBase: AxiosInstance) => {
  return {
    SerRO_SearchForStockOutOrderDL: async (
      params: Partial<Search_SerRO_Param>
    ): Promise<ApiResponse<SerRO>> => {
      return await apiBase.post<any, ApiResponse<SerRO>>(
        "/SerRo/SearchForStockOutOrderDL",
        {
          ...params,
        }
      );
    },
    SerRO_GetOrCreateStockOutOrderDL: async (ROID: string) => {
      return await apiBase.post<any, ApiResponse<SerRO>>(
        "/SerRO/GetOrCreateStockOutOrderDL",
        {
          ROID: ROID,
        }
      );
    },
  };
};
