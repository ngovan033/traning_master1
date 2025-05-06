import { ApiResponse } from "@/packages/types";
import { Ser_RO } from "@/packages/types/carservice/Ser_RO";
import {
  Search_SerReceptionF_Param,
  SerReceptionF,
} from "@/packages/types/carservice/SerReceptionF";

import { AxiosInstance } from "axios";

export const useSerReceptionFApi = (apiBase: AxiosInstance) => {
  return {
    SerReceptionF_SearchDL: async (
      params: Partial<Search_SerReceptionF_Param>
    ): Promise<ApiResponse<SerReceptionF>> => {
      return await apiBase.post<any, ApiResponse<SerReceptionF>>(
        "/SerReceptionF/SearchDL",
        {
          ...params,
        }
      );
    },
    SerReceptionF_SearchHQ: async (
      params: Partial<Search_SerReceptionF_Param>
    ): Promise<ApiResponse<SerReceptionF>> => {
      return await apiBase.post<any, ApiResponse<SerReceptionF>>(
        "/SerReceptionF/SearchHQ",
        {
          ...params,
        }
      );
    },
    SerReceptionF_ExportDL: async (
      params: Partial<Search_SerReceptionF_Param>
    ): Promise<ApiResponse<SerReceptionF>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerReceptionF/ExportWHDL"
          : "/SerReceptionF/ExportDL";

      return await apiBase.post<any, ApiResponse<SerReceptionF>>(linkApi, {
        ...params,
      });
    },
    SerReceptionF_ExportHQ: async (
      params: Partial<Search_SerReceptionF_Param>
    ): Promise<ApiResponse<SerReceptionF>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerReceptionF/ExportWHHQ"
          : "/SerReceptionF/ExportHQ";

      return await apiBase.post<any, ApiResponse<SerReceptionF>>(linkApi, {
        ...params,
      });
    },
    SerReceptionF_CreateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerReceptionF>>(
        "/SerReceptionF/CreateDL",
        {
          ...params,
        }
      );
    },
    SerReceptionF_PrintDL: async (ReceptionFNo: string) => {
      return await apiBase.post<any, ApiResponse<SerReceptionF>>(
        "/SerReceptionF/PrintDL",
        {
          ReceptionFNo: ReceptionFNo,
        }
      );
    },
    SerReceptionF_PrintHQ: async (ReceptionFNo: string) => {
      return await apiBase.post<any, ApiResponse<SerReceptionF>>(
        "/SerReceptionF/PrintHQ",
        {
          ReceptionFNo: ReceptionFNo,
        }
      );
    },

    SerReceptionF_DeleteDL: async (ReceptionFNo: string) => {
      return await apiBase.post<any, ApiResponse<SerReceptionF>>(
        "/SerReceptionF/DeleteDL",
        {
          ReceptionFNo: ReceptionFNo,
        }
      );
    },
    // Lấy thông tin phiếu tiếp nhận cho báo giá
    SerReceptionF_GetROForCreateDL: async (
      ReceptionFNo: string,
    ): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "/SerReceptionF/GetROForCreateDL",
        {
          ReceptionFNo: ReceptionFNo,
        }
      );
    },
  };
};
