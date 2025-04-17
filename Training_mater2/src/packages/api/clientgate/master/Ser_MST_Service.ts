import { ApiResponse } from "@/packages/types";
import { Search_Ser_MST_Service, Ser_MST_Service } from "@/packages/types/master/Ser_MST_Service";
import { AxiosInstance } from "axios";

export const useSer_MST_ServiceApi = (apiBase: AxiosInstance) => {
  return {

    Ser_MST_Service_SearchDL: async (
      params: Partial<Search_Ser_MST_Service>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_MST_Service_Create: async (data: any): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_MST_Service_Update: async (data: any): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_MST_Service_Delete: async (
      params: any
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/Delete",
        {
          ...params,
        }
      );
    },
  }
}