import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import {
  ServiceStatus,
  ServiceStatus_Search,
} from "@/packages/types/carservice/ServiceStatus";

// 43. Tình trạng dịch vụ

export const useServiceStatusApi = (apiBase: AxiosInstance) => {
  return {
    // Tìm kiếm
    ServiceStatus_SearchDL: async (
      param: ServiceStatus_Search
    ): Promise<ApiResponse<ServiceStatus>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };

      return await apiBase.post<
        Partial<ServiceStatus_Search>,
        ApiResponse<ServiceStatus>
      >(
        param.FlagDataWH
          ? "/ServiceStatus/SearchWHDL"
          : "/ServiceStatus/SearchDL",
        {
          ...searchParam,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
  };
};
