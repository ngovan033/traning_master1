import {
  Search_SerReportReceivableDebitRpt_Params,
  SerReportReceivableDebitRpt,
} from "@/packages/types/report/SerReportReceivableDebitRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSerReportReceivableDebitRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    BaoCaoCongNoThu_SearchDL: async (
      param: Partial<Search_SerReportReceivableDebitRpt_Params>
    ): Promise<ApiResponse<SerReportReceivableDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerReportReceivableDebitRpt_Params>,
        ApiResponse<SerReportReceivableDebitRpt>
      >("/SerReportReceivableDebitRpt/SearchDL", {
        ...param,
      });
    },
    BaoCaoCongNoThu_PrintDL: async (
      param: Partial<Search_SerReportReceivableDebitRpt_Params>
    ): Promise<ApiResponse<SerReportReceivableDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerReportReceivableDebitRpt_Params>,
        ApiResponse<SerReportReceivableDebitRpt>
      >("/SerReportReceivableDebitRpt/Print", {
        ...param,
      });
    },
    BaoCaoCongNoThu_ExportDL: async (
      param: Partial<Search_SerReportReceivableDebitRpt_Params>
    ): Promise<ApiResponse<SerReportReceivableDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerReportReceivableDebitRpt_Params>,
        ApiResponse<SerReportReceivableDebitRpt>
      >("/SerReportReceivableDebitRpt/ExportExcelDL", {
        ...param,
      });
    },

    //Export-SearchDL
    SerReportReceivableDebitRpt_ExportSearchDL: async (
      param: Partial<Search_SerReportReceivableDebitRpt_Params>
    ): Promise<ApiResponse<SerReportReceivableDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerReportReceivableDebitRpt_Params>,
        ApiResponse<SerReportReceivableDebitRpt>
      >("/SerReportReceivableDebitRpt/ExportSearchDL", {
        ...param,
      });
    },
  };
};
