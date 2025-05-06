import { ApiResponse } from "@/packages/types";
import {
  Search_SerCustomerCareBth_Param,
  SerCustomerCareBth,
} from "@/packages/types/customerCare/SerCustomerCareBth";

import { AxiosInstance } from "axios";

export const useSerCustomerCareBthApi = (apiBase: AxiosInstance) => {
  return {
    SerCustomerCareBth_SearchDL: async (
      params: Partial<Search_SerCustomerCareBth_Param>
    ): Promise<ApiResponse<SerCustomerCareBth>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCareBth/SearchWHDL"
          : "/SerCustomerCareBth/SearchDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCareBth>>(linkApi, {
        ...params,
      });
    },
    SerCustomerCareBth_GetByCareBthIdDL: async ({
      CareBthId,
      FlagWH,
    }: {
      CareBthId: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerCustomerCareBth>> => {
      const linkApi =
        FlagWH == "1"
          ? "/SerCustomerCareBth/GetByCareBthIdWHDL"
          : "/SerCustomerCareBth/GetByCareBthIdDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCareBth>>(linkApi, {
        CareBthId: CareBthId,
      });
    },

    SerCustomerCareBth_ExportDL: async (
      params: Partial<Search_SerCustomerCareBth_Param>
    ): Promise<ApiResponse<SerCustomerCareBth>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCareBth/ExportWHDL"
          : "/SerCustomerCareBth/ExportDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCareBth>>(linkApi, {
        ...params,
      });
    },

    SerCustomerCareBth_UpdateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerCustomerCareBth>>(
        "/SerCustomerCareBth/UpdateDL",
        {
          ...params,
        }
      );
    },
  };
};
