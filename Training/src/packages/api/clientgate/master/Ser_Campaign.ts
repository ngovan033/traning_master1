import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_Campaign_Param,
  Ser_Campaign,
} from "@/packages/types/master/Ser_Campaign";
import { AxiosInstance } from "axios";

export const useSer_CampaignApi = (apiBase: AxiosInstance) => {
  return {
    Ser_Campaign_GetAllActive: async (): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/GetAllActive",
        {}
      );
    },
    Ser_Campaign_GetAllActiveHQ: async (): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/GetAllActiveHQ",
        {}
      );
    },
    Ser_Campaign_SearchHQ: async (
      params: Partial<Search_Ser_Campaign_Param>
    ): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/SearchHQ",
        {
          ...params,
        }
      );
    },
    Ser_Campaign_SearchDL: async (
      params: Partial<Search_Ser_Campaign_Param>
    ): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_Campaign_Create: async (
      data: any
    ): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_Campaign_Delete: async (
      code: any
    ): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/Delete",
        {
          CamID: code,
        }
      );
    },
    Ser_Campaign_Export: async (
      CamNo: any,
      CamName: any,
      isHQ: any
    ): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        isHQ ? "/SerCampaign/ExportDL" : "/SerCampaign/ExportDL",
        {
          CamNo: CamNo,
          CamName: CamName,
        }
      );
    },

    Ser_Campaign_Detail: async (code: string): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaign/GetByCamID",
        {
          CamID: code,
        }
      );
    },
    Ser_Campaign_Update: async (
      data: Partial<Ser_Campaign>
    ): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_Campaign_GetByCavityNoDL: async (
      params: Partial<Ser_Campaign>
    ): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/GetByCavityNoDL",
        {
          ...params,
        }
      );
    },
    Ser_Campaign_GetByCavityNoHQ: async (
      params: Partial<Ser_Campaign>
    ): Promise<ApiResponse<Ser_Campaign>> => {
      return await apiBase.post<any, ApiResponse<Ser_Campaign>>(
        "/SerCampaign/GetByCavityNoHQ",
        {
          ...params,
        }
      );
    },
  };
};
