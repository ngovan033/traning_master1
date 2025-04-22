import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_MST_Model,
  Ser_MST_Model,
} from "@/packages/types/master/Ser_MST_Model";
import { Ser_Mst_TradeMark } from "@/packages/types/master/Ser_Mst_TradeMark";

import { AxiosInstance } from "axios";

export const useSer_ModelApi = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_Model_GetAllActive: async (): Promise<
      ApiResponse<Ser_MST_Model>
    > => {
      return await apiBase.post<
        Partial<Search_Ser_MST_Model>,
        ApiResponse<Ser_MST_Model>
      >("/SerMSTPartType/GetAllActive", {});
    },

    Ser_MST_Model_SearchDL: async (
      params: Partial<Search_Ser_MST_Model>
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_MST_Model_Create: async (
      data: any
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_MST_Model_Update: async (
      data: any
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_MST_Model_Delete: async (
      params: any
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/Delete",
        {
          ...params,
        }
      );
    },
  };
};
