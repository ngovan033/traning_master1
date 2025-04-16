import { ApiResponse } from "@/packages/types";
import { Search_Ser_MST_PartGroup, Ser_MST_PartGroup } from "@/packages/types/master/Ser_MST_PartGroup";
import { AxiosInstance } from "axios";

export const useSer_MST_PartGroup = (apiBase: AxiosInstance) => {
  return {
    SerMSTPartGroup_SearchDL: async (
      param: Partial<Search_Ser_MST_PartGroup>
    ): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_PartGroup>,
        ApiResponse<Ser_MST_PartGroup>
        >("/SerMSTPartGroup/SearchDL", {
        ...param,
      });
    },
    SerMSTPartGroup_Create: async (data: any): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    SerMSTPartGroup_Update: async (data: any): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    SerMSTPartGroup_Delete: async (
      key : string
    ): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/Delete",
        {
          PartGroupID : key,

        }
      );
    },
  }
}