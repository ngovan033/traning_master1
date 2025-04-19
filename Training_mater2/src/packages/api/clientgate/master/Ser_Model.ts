import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_MST_Model,
  Ser_MST_Model,
} from "@/packages/types/master/Ser_MST_Model";

import { AxiosInstance } from "axios";

export const useSer_ModelApi = (apiBase: AxiosInstance) => {
  return {

    Ser_MST_Model_SearchDL: async (
      params: Partial<Search_Ser_MST_Model>
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerModel/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_MST_Model_Create: async (data: any): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerModel/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_MST_Model_Update: async (data: any): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerModel/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_MST_Model_Delete: async (
      params: any
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerModel/Delete",
        {
          ...params,
        }
      );
    },
  };
};
