import { ApiResponse } from "@/packages/types";
import { Search_Ser_MST_PartType, Ser_MST_PartType } from "@/packages/types/master/Ser_MST_PartType";
import { AxiosInstance } from "axios";

export const useSer_MST_PartTypeApi = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_PartType_SearchDL: async (
          params: Partial<Search_Ser_MST_PartType>
        ): Promise<ApiResponse<Ser_MST_PartType>> => {
          return await apiBase.post<any, ApiResponse<Ser_MST_PartType>>(
            "/SerMSTPartType/SearchDL",
            {
              ...params,
            }
          );
        },
  }
}