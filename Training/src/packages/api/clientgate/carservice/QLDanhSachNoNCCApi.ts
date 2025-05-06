import { ApiResponse } from "@/packages/types";
import {
  Search_SerSupplierDebitPayment,
  SerSupplierDebitPayment,
} from "@/packages/types/master/DanhSachNoNhaCungCap";
import { AxiosInstance } from "axios";

export const useQLDanhSachNoNCCApi = (apiBase: AxiosInstance) => {
  return {
    QLDanhSachNoNCC_SearchDL: async (
      params: Partial<Search_SerSupplierDebitPayment>
    ): Promise<ApiResponse<SerSupplierDebitPayment>> => {
      try {
        const response = await apiBase.post<any, ApiResponse<SerSupplierDebitPayment>>(
          "/SerSupplierDebitPayment/SearchDL",
          {
            ...params,
          }
        );
        return response;
      } catch (error) {
        console.error("Error calling API:", error);
        throw error;
      }
    },
    
    QLDanhSachNoNCC_GetBySupplierId: async (
      SupplierID: string
    ): Promise<ApiResponse<SerSupplierDebitPayment>> => {
      return await apiBase.post<any, ApiResponse<SerSupplierDebitPayment>>(
        "/SerSupplierDebitPayment/GetBySupplierIdDL",
        {
          SupplierID: SupplierID,
        }
      );
    },

    QLDanhSachNoNCC_PrintDL: async (
      code: any,
      flagDataWH: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerSupplierDebitPayment/PrintWHDL"
          : "/SerSupplierDebitPayment/PrintDL",
        {
          PaymentID: code,
          DealerCode: "",
        }
      );
    },
    QLDanhSachNoNCC_DeleteDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerSupplierDebitPayment/DeleteDL",
        {
          PaymentID: code,
          DealerCode: "",
        }
      );
    },
    QLDanhSachNoNCC_UpdateCreateDL: async (
      data: SerSupplierDebitPayment
    ): Promise<ApiResponse<SerSupplierDebitPayment>> => {
      return await apiBase.post<any, ApiResponse<SerSupplierDebitPayment>>(
        "/SerSupplierDebitPayment/CreateDL",
        data, // gửi object trực tiếp
        {
          headers: {
            "Content-Type": "application/json", // bảo đảm gửi dạng JSON
          },
        }
      );
    },
     

    QLDanhSachNoNCC_DeleteDebitDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerSupplierDebitPayment/DeleteDebitDL",
        {
          CusDebitID: code,
          DealerCode: "",
        }
      );
    },
  };
};
