import { ApiResponse } from "@/packages/types";
import { Search_ThongKeCongViec_Params, ThongKeCongViec } from "@/packages/types/report/ThongKeCongViec";
import { AxiosInstance } from "axios";

export const useThongKeCongViecApi = (apiBase: AxiosInstance) => {
  return {
    ThongKeCongViec_SearchDL: async (
      param: Partial<Search_ThongKeCongViec_Params>
    ): Promise<ApiResponse<ThongKeCongViec>> => {
      return await apiBase.post<
        Partial<Search_ThongKeCongViec_Params>,
        ApiResponse<ThongKeCongViec>
      >("/SerROStatisticService/SearchDL", {
        ...param,
      });
    },
    ThongKeCongViec_PrintDL: async (
      param: Partial<Search_ThongKeCongViec_Params>
    ): Promise<ApiResponse<ThongKeCongViec>> => {
      return await apiBase.post<
        Partial<Search_ThongKeCongViec_Params>,
        ApiResponse<ThongKeCongViec>
      >("/SerROStatisticService/PrintDL", {
        ...param,
      });
    },
    ThongKeCongViec_ExportDL: async (
      param: Partial<Search_ThongKeCongViec_Params>
    ): Promise<ApiResponse<ThongKeCongViec>> => {
      return await apiBase.post<
        Partial<Search_ThongKeCongViec_Params>,
        ApiResponse<ThongKeCongViec>
      >("/SerROStatisticService/ExportSearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    ThongKeCongViec_ExportSearchDL: async (
      param: Partial<Search_ThongKeCongViec_Params>
    ): Promise<ApiResponse<ThongKeCongViec>> => {
      return await apiBase.post<
        Partial<Search_ThongKeCongViec_Params>,
        ApiResponse<ThongKeCongViec>
      >("/SerROStatisticService/ExportSearchDL", {
        ...param,
      });
    },
  };
};
