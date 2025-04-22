import { ApiResponse } from "@/packages/types";
import { Search_Ser_Mst_TradeMark, Ser_Mst_TradeMark } from "@/packages/types/master/Ser_Mst_TradeMark";
import { AxiosInstance } from "axios"

export const useSer_Mst_TradeMarkApi = (apiBase: AxiosInstance) => {
  return {
    Ser_Mst_TradeMark_GetAllActive: async (): Promise<
          ApiResponse<Ser_Mst_TradeMark>
        > => {
          return await apiBase.post<
            Partial<Search_Ser_Mst_TradeMark>,
            ApiResponse<Ser_Mst_TradeMark>
          >("/SerMstTradeMark/GetAllActive", {});
        },
    
     Ser_Mst_TradeMark_SearchDL: async (
          params: Partial<Search_Ser_Mst_TradeMark>
        ): Promise<ApiResponse<Ser_Mst_TradeMark>> => {
          return await apiBase.post<any, ApiResponse<Ser_Mst_TradeMark>>(
            "/SerMstTradeMark/SearchDL",
            {
              ...params,
            }
          );
        },
        Ser_Mst_TradeMark_Create: async (data: any): Promise<ApiResponse<Ser_Mst_TradeMark>> => {
          return await apiBase.post<any, ApiResponse<Ser_Mst_TradeMark>>(
            "/SerMstTradeMark/Create",
            {
              strJson: JSON.stringify(data),
            }
          );
        },
        Ser_Mst_TradeMark_Update: async (data: any): Promise<ApiResponse<Ser_Mst_TradeMark>> => {
          return await apiBase.post<any, ApiResponse<Ser_Mst_TradeMark>>(
            "/SerMstTradeMark/Update",
            {
              strJson: JSON.stringify(data),
            }
          );
        },
  }
}