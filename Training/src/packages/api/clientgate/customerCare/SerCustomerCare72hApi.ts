import { ApiResponse } from "@/packages/types";
import {
  Search_SerCustomerCare72h_Param,
  SerCustomerCare72h,
} from "@/packages/types/customerCare/SerCustomerCare72h";
import { AxiosInstance } from "axios";

export const useSerCustomerCare72hApi = (apiBase: AxiosInstance) => {
  return {
    SerCustomerCare72h_SearchDL: async (
      params: Partial<Search_SerCustomerCare72h_Param>
    ): Promise<ApiResponse<SerCustomerCare72h>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCare72h/SearchWHDL"
          : "/SerCustomerCare72h/SearchDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCare72h>>(linkApi, {
        ...params,
      });
    },
    SerCustomerCare72h_GetByCusCareIDDL: async ({
      CusCareID,
      FlagWH,
    }: {
      CusCareID: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerCustomerCare72h>> => {
      const linkApi =
        FlagWH == "1"
          ? "/SerCustomerCare72h/GetByCusCareIDWHDL"
          : "/SerCustomerCare72h/GetByCusCareIDDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCare72h>>(linkApi, {
        CusCareID: CusCareID,
      });
    },

    SerCustomerCare72h_SearchHQ: async (
      params: Partial<Search_SerCustomerCare72h_Param>
    ): Promise<ApiResponse<SerCustomerCare72h>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCare72h/SearchWHHQ"
          : "/SerCustomerCare72h/SearchHQ";

      return await apiBase.post<any, ApiResponse<SerCustomerCare72h>>(linkApi, {
        ...params,
      });
    },
    SerCustomerCare72h_ExportDL: async (
      params: Partial<Search_SerCustomerCare72h_Param>
    ): Promise<ApiResponse<SerCustomerCare72h>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCare72h/ExportWHDL"
          : "/SerCustomerCare72h/ExportDL";

      return await apiBase.post<any, ApiResponse<SerCustomerCare72h>>(linkApi, {
        ...params,
      });
    },
    SerCustomerCare72h_ExportHQ: async (
      params: Partial<Search_SerCustomerCare72h_Param>
    ): Promise<ApiResponse<SerCustomerCare72h>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerCustomerCare72h/ExportWHHQ"
          : "/SerCustomerCare72h/ExportHQ";

      return await apiBase.post<any, ApiResponse<SerCustomerCare72h>>(linkApi, {
        ...params,
      });
    },
    SerCustomerCare72h_UpdateRejectDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerCustomerCare72h>>(
        "/SerCustomerCare72h/UpdateRejectDL",
        {
          ...params,
        }
      );
    },
    SerCustomerCare72h_UpdateContactedIFNoBDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerCustomerCare72h>>(
        "/SerCustomerCare72h/UpdateContactedIFNoBDL",
        {
          ...params,
        }
      );
    },
    SerCustomerCare72h_UpdateContactedINeedFBDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerCustomerCare72h>>(
        "/SerCustomerCare72h/UpdateContactedINeedFBDL",
        {
          ...params,
        }
      );
    },
  };
};
