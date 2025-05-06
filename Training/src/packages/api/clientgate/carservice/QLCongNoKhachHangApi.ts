import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useQLCongNoKhachHangApi = (apiBase: AxiosInstance) => {
  return {
    QLCongNoKhachHang_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerCusDebitPayment/SearchWHDL"
          : "/SerCusDebitPayment/SearchDL",
        {
          ...params,
        }
      );
    },
    QLCongNoKhachHang_GetByCusID: async (
      code: any,
      flagDataWH: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerCusDebitPayment/GetByCusIDWHDL"
          : "/SerCusDebitPayment/GetByCusIDDL",
        {
          CusID: code,
          DealerCode: "",
        }
      );
    },
    QLCongNoKhachHang_PrintDL: async (
      code: any,
      flagDataWH: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerCusDebitPayment/PrintWHDL"
          : "/SerCusDebitPayment/PrintDL",
        {
          PaymentID: code,
          DealerCode: "",
        }
      );
    },
    QLCongNoKhachHang_DeleteDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCusDebitPayment/DeleteDL",
        {
          PaymentID: code,
          DealerCode: "",
        }
      );
    },
    QLCongNoKhachHang_UpdateCreateDL: async (
      type: any,
      data: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        type ? "/SerCusDebitPayment/UpdateDL" : "/SerCusDebitPayment/CreateDL",
        {
          ...data,
        }
      );
    },
    QLCongNoKhachHang_DeleteDebitDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCusDebitPayment/DeleteDebitDL",
        {
          CusDebitID: code,
          DealerCode: "",
        }
      );
    },
  };
};
