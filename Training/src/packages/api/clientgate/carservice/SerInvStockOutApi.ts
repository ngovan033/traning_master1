import { ApiResponse } from "@/packages/types";
import {
  Search_SerInvStockOut_Param,
  SerInvStockOut,
} from "@/packages/types/storage/SerInvStockOut";
import { AxiosInstance } from "axios";

export const useSerInvStockOutApi = (apiBase: AxiosInstance) => {
  return {
    SerInvStockOut_SearchDL: async (
      params: Partial<Search_SerInvStockOut_Param>
    ): Promise<ApiResponse<SerInvStockOut>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerInvStockOut/SearchWHDL"
          : "/SerInvStockOut/SearchDL";

      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(linkApi, {
        ...params,
      });
    },
    SerInvStockOut_GetByAppIdDL: async ({
      AppID,
      FlagWH,
    }: {
      AppID: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerInvStockOut>> => {
      const linkApi =
        FlagWH == "1"
          ? "/SerInvStockOut/GetByAppIdWHDL"
          : "/SerInvStockOut/GetByAppIdDL";

      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(linkApi, {
        AppID: AppID,
      });
    },
    SerInvStockOut_GetByAppIdHQ: async ({
      AppID,
      FlagWH,
    }: {
      AppID: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerInvStockOut>> => {
      const linkApi =
        FlagWH == "1"
          ? "/SerInvStockOut/GetByAppIdWHHQ"
          : "/SerInvStockOut/GetByAppIdHQ";

      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(linkApi, {
        AppID: AppID,
      });
    },
    SerInvStockOut_SearchHQ: async (
      params: Partial<Search_SerInvStockOut_Param>
    ): Promise<ApiResponse<SerInvStockOut>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerInvStockOut/SearchWHHQ"
          : "/SerInvStockOut/SearchHQ";

      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(linkApi, {
        ...params,
      });
    },
    SerInvStockOut_ExportDL: async (
      params: Partial<Search_SerInvStockOut_Param>
    ): Promise<ApiResponse<SerInvStockOut>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerInvStockOut/ExportWHDL"
          : "/SerInvStockOut/ExportDL";

      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(linkApi, {
        ...params,
      });
    },
    SerInvStockOut_CreateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/CreateDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },
    SerInvStockOut_GetByStockOutIDDL: async (StockOutID: string) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/GetByStockOutIDDL",
        {
          StockOutID: StockOutID,
        }
      );
    },
    SerInvStockOutOrderStockOut_GetByROIDDL: async (ROID: string) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOutOrderStockOut/GetByROIDDL",
        {
          ROID: ROID,
        }
      );
    },
    SerInvStockOutOrderStockOut_GetByStockOutOrderIDDL: async (
      StockOutOrderID: string
    ) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOutOrder/GetByStockOutOrderIDDL",
        {
          StockOutOrderID: StockOutOrderID,
        }
      );
    },
    SerInvStockBalance_GetStockBalance: async (PartID: string) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockBalance/GetStockBalance",
        {
          PartID: PartID,
        }
      );
    },
    SerInvStockOut_UpdateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/UpdateDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },
    SerInvStockOut_UpdateServiceDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/UpdateServiceDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },
    SerInvStockOut_PrintDL: async (StockOutID: string, isWH: boolean) => {
      const linkApi = isWH
        ? "/SerInvStockOut/PrintWHDL"
        : "/SerInvStockOut/PrintDL";

      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(linkApi, {
        StockOutID: StockOutID,
      });
    },
    SerInvStockOut_PrintServiceDL: async (
      StockOutID: string,
      isWH: boolean
    ) => {
      const linkApi = isWH
        ? "/SerInvStockOut/PrintServiceWHDL"
        : "/SerInvStockOut/PrintServiceDL";

      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(linkApi, {
        StockOutID: StockOutID,
      });
    },
    SerInvStockOut_PrintInvoiceDL: async (
      StockOutID: string,
      isWH: boolean
    ) => {
      const linkApi = isWH
        ? "/SerInvStockOut/PrintInvoiceWHDL"
        : "/SerInvStockOut/PrintInvoiceDL";

      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(linkApi, {
        StockOutID: StockOutID,
      });
    },
    SerInvStockOut_FinishDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/FinishDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },
    SerInvStockOut_RejectDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/RejectDL",
        {
          ...params,
        }
      );
    },
    SerInvStockOut_DeleteDL: async (StockOutID: string) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/DeleteDL",
        {
          StockOutID: StockOutID,
        }
      );
    },
    SerInvStockOut_ExecutingServiceDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/ExecutingServiceDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },
    SerInvStockOut_RevertServiceDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/RevertServiceDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },
    SerInvStockOut_FinishServiceDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/FinishServiceDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },
    SerInvStockOut_GetMaxStockOutNo: async () => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/GetMaxStockOutNo",
        {}
      );
    },
    SerInvStockOut_GetByStockOutOrderIDForCreateDL: async (
      StockOutOrderID: string
    ) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/GetByStockOutOrderIDForCreateDL",
        {
          StockOutOrderID: StockOutOrderID,
        }
      );
    },
    SerInvStockOut_GetByStockOutOrderIDForCreateServiceDL: async (
      params: any
    ) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/GetByStockOutOrderIDForCreateServiceDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },

    SerInvStockOutOrder_GetByStockOutOrderIDForStockOutCreateDL: async (
      StockOutOrderID: any
    ) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockOutOrder/GetByStockOutOrderIDForStockOutCreateDL",
        {
          StockOutOrderID: StockOutOrderID,
        }
      );
    },
    SerInvStockOut_GetByQuoteIDForCreateDL: async (QuoteID: string) => {
      return await apiBase.post<any, ApiResponse<SerInvStockOut>>(
        "/SerInvStockOut/GetByQuoteIDForCreateDL",
        {
          QuoteID: QuoteID,
        }
      );
    },
  };
};
