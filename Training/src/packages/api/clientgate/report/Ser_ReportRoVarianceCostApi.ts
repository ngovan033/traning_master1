import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { Search_Ser_ReportRoVarianceCost_Params } from "@/packages/types/report/Ser_ReportRoVarianceCost";
import { AxiosInstance } from "axios";
export interface Ser_Customer_Care_RptParam {
  FromDate: any;
  ToDate: any;
  DateFromTo: any[];
  FlagDataWH: 1 | 0;
}

export interface Ser_Customer_Care_RptRecord {
  CareType: string;
  Total: number;
  Pending: number;
  IsContact: number;
  IsNotContact: number;
}

interface Ser_Customer_Care_RptRecordParamData {
  Lst_Ser_CustomerCareRpt: Ser_Customer_Care_RptRecord[];
}
export const useSer_ReportRoVarianceCostApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_ReportRoVarianceCostSearchDL: async (
      params: Search_Ser_ReportRoVarianceCost_Params
    ): Promise<ApiResponse<Ser_Customer_Care_RptRecordParamData>> => {
      return await apiBase.post<
        Search_Ser_ReportRoVarianceCost_Params,
        ApiResponse<Ser_Customer_Care_RptRecordParamData>
      >("/Ser_ReportRoVarianceCost/SearchDL", {
        ...params,
        ToDate: params.ToDate
      });
    },
    Ser_ReportRoVarianceCostSearchHQ: async (
      params: Search_Ser_ReportRoVarianceCost_Params
    ): Promise<ApiResponse<Ser_Customer_Care_RptRecordParamData>> => {
      return await apiBase.post<
        Search_Ser_ReportRoVarianceCost_Params,
        ApiResponse<Ser_Customer_Care_RptRecordParamData>
      >("/Ser_ReportRoVarianceCost/SearchHQ", {
        ...params,

      });
    },

    Ser_ReportRoVarianceCostExportSearch: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_Ser_ReportRoVarianceCost_Params>,
        ApiResponse<any>
      >("/Ser_ReportRoVarianceCost/ExportSearchDL", {
        ...param,
      });
    },
  };
};
