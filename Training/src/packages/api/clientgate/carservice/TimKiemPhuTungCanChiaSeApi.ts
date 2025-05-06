import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useTimKiemPhuTungCanChiaSeApi = (apiBase: AxiosInstance) => {
  return {
    TimKiemPhuTungCanChiaSe_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerMstPartSP/SearchWHDL"
          : "/SerMstPartSP/SearchDL",
        {
          ...params,
        }
      );
    },
    TimKiemPhuTungCanChiaSe_ExportDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerMstPartSP/ExportWHDL"
          : "/SerMstPartSP/ExportDL",
        {
          ...params,
        }
      );
    },
    TimKiemPhuTungCanChiaSe_CreateDL: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstPartSP/CreateDL",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
  };
};
