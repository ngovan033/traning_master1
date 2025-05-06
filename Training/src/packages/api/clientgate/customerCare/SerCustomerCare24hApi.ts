import { ApiResponse } from "@/packages/types";
import {
  Search_SerCustomerCare24h_Param,
  SerCustomerCare24h,
} from "@/packages/types/customerCare/SerCustomerCare24h";
import { AxiosInstance } from "axios";

export const useSerCustomerCare24hApi = (apiBase: AxiosInstance) => {
  return {
    SerCustomerCare24h_SearchDL: async (
      params: Partial<Search_SerCustomerCare24h_Param>
    ): Promise<ApiResponse<SerCustomerCare24h>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCare24h/SearchWHDL"
          : "/SerCustomerCare24h/SearchDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCare24h>>(linkApi, {
        ...params,
      });
    },
    SerCustomerCare24h_GetByCusCareIDDL: async ({
      CusCareID,
      FlagWH,
    }: {
      CusCareID: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerCustomerCare24h>> => {
      const linkApi =
        FlagWH == "1"
          ? "/SerCustomerCare24h/GetByCusCareIDWHDL"
          : "/SerCustomerCare24h/GetByCusCareIDDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCare24h>>(linkApi, {
        CusCareID: CusCareID,
      });
    },

    SerCustomerCare24h_ExportDL: async (
      params: Partial<Search_SerCustomerCare24h_Param>
    ): Promise<ApiResponse<SerCustomerCare24h>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCare24h/ExportWHDL"
          : "/SerCustomerCare24h/ExportDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCare24h>>(linkApi, {
        ...params,
      });
    },

    SerCustomerCare24h_UpdateRejectDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerCustomerCare24h>>(
        "/SerCustomerCare24h/UpdateRejectDL",
        {
          ...params,
        }
      );
    },
    SerCustomerCare24h_UpdateContactedIFNoBDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerCustomerCare24h>>(
        "/SerCustomerCare24h/UpdateContactedIFNoBDL",
        {
          ...params,
        }
      );
    },
    SerCustomerCare24h_UpdateContactedINeedFBDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerCustomerCare24h>>(
        "/SerCustomerCare24h/UpdateContactedINeedFBDL",
        {
          ...params,
        }
      );
    },
  };
};
