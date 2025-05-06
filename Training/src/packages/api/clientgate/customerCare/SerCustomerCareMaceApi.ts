import { ApiResponse } from "@/packages/types";
import {
  Search_SerCustomerCareMace_Param,
  SerCustomerCareMace,
} from "@/packages/types/customerCare/SerCustomerCareMace";

import { AxiosInstance } from "axios";

export const useSerCustomerCareMaceApi = (apiBase: AxiosInstance) => {
  return {
    SerCustomerCareMace_SearchDL: async (
      params: Partial<Search_SerCustomerCareMace_Param>
    ): Promise<ApiResponse<SerCustomerCareMace>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCareMace/SearchWHDL"
          : "/SerCustomerCareMace/SearchDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCareMace>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerCustomerCareMace_GetByMaceIdDL: async ({
      CareBthId,
      FlagWH,
    }): Promise<ApiResponse<SerCustomerCareMace>> => {
      const linkApi =
        FlagWH == "1"
          ? "/SerCustomerCareMace/GetByMaceIdWHDL"
          : "/SerCustomerCareMace/GetByMaceIdDL";
      return await apiBase.post<any, ApiResponse<SerCustomerCareMace>>(
        linkApi,
        {
          CareBthId: CareBthId,
        }
      );
    },

    SerCustomerCareMace_ExportDL: async (
      params: Partial<Search_SerCustomerCareMace_Param>
    ): Promise<ApiResponse<SerCustomerCareMace>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCareMace/ExportWHDL"
          : "/SerCustomerCareMace/ExportDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCareMace>>(
        linkApi,
        {
          ...params,
        }
      );
    },

    SerCustomerCareMace_UpdateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerCustomerCareMace>>(
        "/SerCustomerCareMace/UpdateDL",
        {
          ...params,
        }
      );
    },
  };
};
