import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useQLPhieuXuatTraHangNCCApi = (apiBase: AxiosInstance) => {
  return {
    QLPhieuXuatTraHangNCC_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerSupplierPayment/SearchWHDL"
          : "/SerSupplierPayment/SearchDL",
        {
          ...params,
        }
      );
    },
    QLPhieuXuatTraHangNCC_ExportDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerSupplierPayment/ExportWHDL"
          : "/SerSupplierPayment/ExportDL",
        {
          ...params,
        }
      );
    },
    QLPhieuXuatTraHangNCC_SearchForSupplierPaymentDL: async (
      params: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstPart/SearchForSupplierPaymentDL",
        {
          ...params,
        }
      );
    },
    QLPhieuXuatTraHangNCC_GetSeqForSupplierPayment: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerSupplierPayment/GetSeqForSupplierPayment",
        {}
      );
    },
    QLPhieuXuatTraHangNCC_GetByDealerCodeDL: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstSupplier/GetByDealerCodeDL",
        {}
      );
    },
    QLPhieuXuatTraHangNCC_GetAllActiveDL: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstSupplier/GetAllActiveDL",
        {}
      );
    },
    QLPhieuXuatTraHangNCC_GetByPartID: async (PartID: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockBalance/GetByPartID",
        { PartID: PartID }
      );
    },
    QLPhieuXuatTraHangNCC_GetMoreInforPartDL: async (
      data: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerSupplierPayment/GetMoreInforPartDL",
        { strJson: JSON.stringify(data) }
      );
    },
    QLPhieuXuatTraHangNCC_CreateDL: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerSupplierPayment/CreateDL",
        { strJson: JSON.stringify(data) }
      );
    },
    QLPhieuXuatTraHangNCC_UpdateDL: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerSupplierPayment/UpdateDL",
        { strJson: JSON.stringify(data) }
      );
    },
    QLPhieuXuatTraHangNCC_DeleteDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerSupplierPayment/DeleteDL",
        { SupplierPaymentNo: code }
      );
    },
    QLPhieuXuatTraHangNCC_ApproveDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerSupplierPayment/ApproveDL",
        { SupplierPaymentNo: code }
      );
    },
    QLPhieuXuatTraHangNCC_GetBySupplierPaymentNoDL: async (
      flagDataWH: any,
      code: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerSupplierPayment/GetBySupplierPaymentNoWHDL"
          : "/SerSupplierPayment/GetBySupplierPaymentNoDL",
        { SupplierPaymentNo: code }
      );
    },
  };
};
