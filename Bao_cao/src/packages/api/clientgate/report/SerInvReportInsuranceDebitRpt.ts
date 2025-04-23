import { ApiResponse } from "@/packages/types";
import { Search_SerInvReportInsuranceDebitRpt_Params, SerInvReportInsuranceDebitRpt } from "@/packages/types/report/SerInvReportInsuranceDebitRpt";
import { AxiosInstance } from "axios";

export const useSerInvReportInsuranceDebitRpttApi = (
  apiBase: AxiosInstance
) => {
  return {
    SerInvReportInsuranceDebitRpt_SearchDL: async (
      param: Partial<Search_SerInvReportInsuranceDebitRpt_Params>
    ): Promise<ApiResponse<SerInvReportInsuranceDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportInsuranceDebitRpt_Params>,
        ApiResponse<SerInvReportInsuranceDebitRpt>
      >("/SerInvReportInsuranceDebitRpt/SearchDL", {
        ...param,
      });
    },
    SerInvReportInsuranceDebitRpt_PrintDL: async (
      param: Partial<Search_SerInvReportInsuranceDebitRpt_Params>
    ): Promise<ApiResponse<SerInvReportInsuranceDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportInsuranceDebitRpt_Params>,
        ApiResponse<SerInvReportInsuranceDebitRpt>
      >("/SerInvReportInsuranceDebitRpt/Print", {
        ...param,
      });
    },
    SerInvReportInsuranceDebitRpt_ExportDL: async (
      param: Partial<Search_SerInvReportInsuranceDebitRpt_Params>
    ): Promise<ApiResponse<SerInvReportInsuranceDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportInsuranceDebitRpt_Params>,
        ApiResponse<SerInvReportInsuranceDebitRpt>
      >("/SerInvReportInsuranceDebitRpt/ExportExcelDL", {
        ...param,
      });
    },

    //Export-SearchDL
    SerInvReportInsuranceDebitRpt_ExportSearchDL: async (
      param: Partial<Search_SerInvReportInsuranceDebitRpt_Params>
    ): Promise<ApiResponse<SerInvReportInsuranceDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportInsuranceDebitRpt_Params>,
        ApiResponse<SerInvReportInsuranceDebitRpt>
      >("/SerInvReportInsuranceDebitRpt/ExportSearchDL", {
        ...param,
      });
    },
  };
};
