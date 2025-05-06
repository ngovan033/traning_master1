import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useRpt_PiVotChamTonToiThieuApi = (apiBase: AxiosInstance) => {
  return {
    Rpt_PiVotChamTonToiThieu_Search: async (params: any) => {
      return await apiBase.post<Partial<any>, any>(
        "/RptInventoryBalanceStationInvQtyMin/SearchHQ",
        {
          ...params
        }
      );
    },
    Rpt_PiVotChamTonToiThieu_ExportHQ: async (params: any) => {
      return await apiBase.post<Partial<any>, any>(
        "/RptInventoryBalanceStationInvQtyMin/ExportHQ",
        {
          ...params
        }
      );
    },

  };
};
