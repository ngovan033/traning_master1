import { ApiResponse } from "@/packages/types";
import { Search_ThongKeCongViecTheoTo_Params, ThongKeCongViecTheoTo } from "@/packages/types/report/ThongKeCongViecTheoTo";
import { AxiosInstance } from "axios";

export const useThongKeCongViecTheoToApi = (apiBase: AxiosInstance) => {
  return {
    ThongKeCongViecTheoTo_SearchDL: async (
      param: Partial<Search_ThongKeCongViecTheoTo_Params>
    ): Promise<ApiResponse<ThongKeCongViecTheoTo>> => {
      return await apiBase.post<
        Partial<Search_ThongKeCongViecTheoTo_Params>,
        ApiResponse<ThongKeCongViecTheoTo>
      >("/SerROStatisticServiceByGroup/SearchDL", {
        ...param,
      });
    },
    ThongKeCongViecTheoTo_PrintDL: async (
      param: Partial<Search_ThongKeCongViecTheoTo_Params>
    ): Promise<ApiResponse<ThongKeCongViecTheoTo>> => {
      return await apiBase.post<
        Partial<Search_ThongKeCongViecTheoTo_Params>,
        ApiResponse<ThongKeCongViecTheoTo>
      >("/SerROStatisticServiceByGroup/PrintDL", {
        ...param,
      });
    },
    ThongKeCongViecTheoTo_ExportDL: async (
      param: Partial<Search_ThongKeCongViecTheoTo_Params>
    ): Promise<ApiResponse<ThongKeCongViecTheoTo>> => {
      return await apiBase.post<
        Partial<Search_ThongKeCongViecTheoTo_Params>,
        ApiResponse<ThongKeCongViecTheoTo>
      >("/SerROStatisticServiceByGroup/ExportSearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    ThongKeCongViecTheoTo_ExportSearchDL: async (
      param: Partial<Search_ThongKeCongViecTheoTo_Params>
    ): Promise<ApiResponse<ThongKeCongViecTheoTo>> => {
      return await apiBase.post<
        Partial<Search_ThongKeCongViecTheoTo_Params>,
        ApiResponse<ThongKeCongViecTheoTo>
      >("/SerROStatisticServiceByGroup/ExportSearchDL", {
        ...param,
      });
    },
  };
};
