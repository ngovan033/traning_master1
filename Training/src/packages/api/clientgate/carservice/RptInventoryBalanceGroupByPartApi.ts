import { ApiResponse, SearchParam, Mst_District } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useRptInventoryBalanceGroupByPart = (apiBase: AxiosInstance) => {
  return {
    RptInventoryBalanceGroupByPart_SearchHQ: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/RptInventoryBalanceGroupByPart/SearchHQ",
        {
          ...params,
        }
      );
    },

    RptInventoryBalanceGroupByPart_SearchDL: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/RptInventoryBalanceGroupByPart/SearchDL",
        {
          ...params,
        }
      );
    },
    RptInventoryBalanceGroupByPart_ExportExcelHQ: async (
      code: any
    ): Promise<ApiResponse<Mst_District>> => {
      return await apiBase.post<any, ApiResponse<Mst_District>>(
        "/RptInventoryBalanceGroupByPart/ExportExcelHQ",
        {
          PartCode: code,
        }
      );
    },
  };
};
