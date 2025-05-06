import { ApiResponse } from "@/packages/types";
import {
  Search_SerInvStockOutOrder_Param,
  SerInvStockOutOrder,
} from "@/packages/types/storage/SerInvStockOutOrder";
import { AxiosInstance } from "axios";

export const useSerInvStockOutOrderApi = (apiBase: AxiosInstance) => {
  return {
    SerInvStockOutOrder_SearchDL: async (
      params: Partial<Search_SerInvStockOutOrder_Param>
    ): Promise<ApiResponse<SerInvStockOutOrder>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerInvStockOutOrder/SearchWHDL"
          : "/SerInvStockOutOrder/SearchDL";

      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerInvStockOutOrder_GetByStockOutOrderIDDL: async (
      StockOutOrderID: string
    ): Promise<ApiResponse<SerInvStockOutOrder>> => {
      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        "/SerInvStockOutOrder/GetByStockOutOrderIDDL",
        {
          StockOutOrderID: StockOutOrderID,
        }
      );
    },

    SerInvStockOutOrder_SearchHQ: async (
      params: Partial<Search_SerInvStockOutOrder_Param>
    ): Promise<ApiResponse<SerInvStockOutOrder>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerInvStockOutOrder/SearchWHHQ"
          : "/SerInvStockOutOrder/SearchHQ";

      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerInvStockOutOrder_ExportDL: async (
      params: Partial<Search_SerInvStockOutOrder_Param>
    ): Promise<ApiResponse<SerInvStockOutOrder>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerInvStockOutOrder/ExportWHDL"
          : "/SerInvStockOutOrder/ExportDL";

      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerInvStockOutOrder_ExportHQ: async (
      params: Partial<Search_SerInvStockOutOrder_Param>
    ): Promise<ApiResponse<SerInvStockOutOrder>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerInvStockOutOrder/ExportWHHQ"
          : "/SerInvStockOutOrder/ExportHQ";

      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerInvStockOutOrder_CreateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        "/SerInvStockOutOrder/CreateDL",
        {
          ...params,
        }
      );
    },
    SerInvStockOutOrder_UpdateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        "/SerInvStockOutOrder/UpdateDL",
        {
          ...params,
        }
      );
    },
    SerInvStockOutOrder_DeleteDL: async (StockOutOrderID: string) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        "/SerInvStockOutOrder/DeleteDL",
        {
          StockOutOrderID: StockOutOrderID,
        }
      );
    },
    SerInvStockOutOrder_ConfirmDL: async (AppId: string) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        "/SerInvStockOutOrder/ConfirmDL",
        {
          AppId: AppId,
        }
      );
    },
    SerInvStockOutOrder_RejectDL: async (StockOutOrderID: string) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        "/SerInvStockOutOrder/RejectDL",
        {
          StockOutOrderID: StockOutOrderID,
        }
      );
    },
    SerInvStockOutOrder_GetForCavityDL: async (param: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOutOrder>>(
        "/SerInvStockOutOrder/GetForCavityDL",
        {
          ...param,
        }
      );
    },
  };
};
