import {
  ApiResponse,
  DeleteDealerParam,
  FlagActiveEnum,
  Mst_BankAccount,
  SearchDealerParam,
  SearchParam,
  Search_Mst_BankAccount,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_ROMaintanceSetting = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_ROMaintanceSetting_Search: async (
      param: Partial<any>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/SerMSTROMaintanceSetting/Search", {
        ...param,
        Ft_PageSize: param.Ft_PageSize === 0 ? 100 : param.Ft_PageSize,
      });
    },
    Ser_MST_ROMaintanceSetting_ExportHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerMSTROMaintanceSetting/ExportHQ",
        {
          ...param,
        }
      );
    },
    Ser_MST_ROMaintanceSetting_GetByROMSID: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerMSTROMaintanceSetting/GetByROMSID ",
        {
          ...param,
        }
      );
    },
    Ser_MST_ROMaintanceSetting_Save: async (
      data: any
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/SerMSTROMaintanceSetting/Save", {
        strJson: JSON.stringify(data),
      });
    },
  };
};
