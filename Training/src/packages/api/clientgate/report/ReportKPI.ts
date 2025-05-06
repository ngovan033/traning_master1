import { ApiResponse } from "@packages/types";
import { AxiosInstance } from "axios";

export const useReportKPIApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    ReportKPI_SearchDL: async (
      param: Partial<any>,
      isHQ: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        isHQ() ?
          "/ReportKPI/SearchHQ" :
          "/ReportKPI/SearchDL",
        {
          ...param,
        }
      );
    },

    ReportKPI_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/ReportKPI/SearchHQ",
        {
          ...param,
        }
      );
    },
    ReportKPI_ExportYear: async (
      params: Partial<any>,
      isHQ: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        isHQ() ?
          "ReportKPI/ExportYearHQ" :
          "/ReportKPI/ExportYearDL",
        {
          ...params,
        }
      );
    },
  };
};
