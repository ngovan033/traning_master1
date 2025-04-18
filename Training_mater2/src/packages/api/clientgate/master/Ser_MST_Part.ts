import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_MST_Part,
  Ser_MST_Part,
} from "@/packages/types/master/Ser_MST_Part";
import { Ser_MST_PartGroup } from "@/packages/types/master/Ser_MST_PartGroup";
import { Ser_MST_PartType } from "@/packages/types/master/Ser_MST_PartType";
import { AxiosInstance } from "axios";

export const useSer_MST_PartApi = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_PartType_GetAllActive: async (): Promise<ApiResponse<Ser_MST_PartType>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartType>>(
        "/SerMSTPartType/GetAllActive",
        {}
      );
    },
    Ser_MST_PartGroup_GetAllActive: async (): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/GetAllActive",
        {}
      );
    },
    Ser_MST_Part_SearchDL: async (
      params: Partial<Search_Ser_MST_Part>
    ): Promise<ApiResponse<Ser_MST_Part>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Part>>(
        "/SerMstPart/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_MST_Part_Create: async (data: any): Promise<ApiResponse<Ser_MST_Part>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Part>>(
        "/SerMstPart/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_MST_Part_Update: async (data: any): Promise<ApiResponse<Ser_MST_Part>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Part>>(
        "/SerMstPart/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_MST_Part_Delete: async (
      params: any
    ): Promise<ApiResponse<Ser_MST_Part>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Part>>(
        "/SerMSTPart/Delete",
        {
          ...params,
        }
      );
    },
  };
};
