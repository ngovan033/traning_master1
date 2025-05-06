import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useDanhSachHangBaoHiemNoApi = (apiBase: AxiosInstance) => {
  return {
    DanhSachHangBaoHiemNo_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerInsuranceDebitPayment/SearchWHDL"
          : "/SerInsuranceDebitPayment/SearchDL",
        {
          ...params,
        }
      );
    },
    DanhSachHangBaoHiemNo_GetByCusID: async (
      code: any,
      flagDataWH: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerInsuranceDebitPayment/GetByInsNoWHDL"
          : "/SerInsuranceDebitPayment/GetByInsNoDL",
        {
          InsNo: code,
          DealerCode: "",
        }
      );
    },
    DanhSachHangBaoHiemNo_PrintDL: async (
      code: any,
      flagDataWH: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerInsuranceDebitPayment/PrintWHDL"
          : "/SerInsuranceDebitPayment/PrintDL",
        {
          PaymentID: code,
          DealerCode: "",
        }
      );
    },
    DanhSachHangBaoHiemNo_DeleteDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInsuranceDebitPayment/DeleteDL",
        {
          PaymentID: code,
          DealerCode: "",
        }
      );
    },
    DanhSachHangBaoHiemNo_UpdateCreateDL: async (
      type: any,
      data: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        type
          ? "/SerInsuranceDebitPayment/UpdateDL"
          : "/SerInsuranceDebitPayment/CreateDL",
        {
          ...data,
        }
      );
    },
    DanhSachHangBaoHiemNo_DeleteDebitDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInsuranceDebitPayment/DeleteDebitDL",
        {
          CusDebitID: code,
          DealerCode: "",
        }
      );
    },
  };
};
