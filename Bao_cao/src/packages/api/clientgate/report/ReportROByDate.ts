import {
  Search_ReportROByDate_Params,
  ReportROByDate,
} from "@/packages/types/report/ReportROByDate";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useReport_ROByDateApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    ReportROByDate_SearchDL: async (
      param: Partial<Search_ReportROByDate_Params>
    ): Promise<ApiResponse<ReportROByDate>> => {
      return await apiBase.post<
        Partial<Search_ReportROByDate_Params>,
        ApiResponse<ReportROByDate>
      >("/ReportROByDate/SearchDL", {
        ...param,
      });
    },
    ReportROByDate_PrintDL: async (
      param: Partial<Search_ReportROByDate_Params>
    ): Promise<ApiResponse<ReportROByDate>> => {
      return await apiBase.post<
        Partial<Search_ReportROByDate_Params>,
        ApiResponse<ReportROByDate>
      >("/ReportROByDate/PrintDL", {
        ...param,
      });
    },
    ReportROByDate_ExportDL: async (
      param: Partial<Search_ReportROByDate_Params>
    ): Promise<ApiResponse<ReportROByDate>> => {
      return await apiBase.post<
        Partial<Search_ReportROByDate_Params>,
        ApiResponse<ReportROByDate>
      >("/ReportROByDate/ExportSearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    ReportROByDate_ExportSearchDL: async (
      param: Partial<Search_ReportROByDate_Params>
    ): Promise<ApiResponse<ReportROByDate>> => {
      return await apiBase.post<
        Partial<Search_ReportROByDate_Params>,
        ApiResponse<ReportROByDate>
      >("/ReportROByDate/ExportSearchDL", {
        ...param,
      });
    },
  };
};
