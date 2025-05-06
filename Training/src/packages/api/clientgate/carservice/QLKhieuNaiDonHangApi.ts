import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useQLKhieuNaiDonHangApi = (apiBase: AxiosInstance) => {
  return {
    QLKhieuNaiDonHang_SearchHQ: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerOrderComplain/SearchWHHQ"
          : "/SerOrderComplain/SearchHQ",
        {
          ...params,
        }
      );
    },
    QLKhieuNaiDonHang_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerOrderComplain/SearchWHDL"
          : "/SerOrderComplain/SearchDL",
        {
          ...params,
        }
      );
    },
    QLKhieuNaiDonHang_ExportHQ: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerOrderComplain/ExportWHHQ"
          : "/SerOrderComplain/ExportHQ",
        {
          ...params,
        }
      );
    },
    QLKhieuNaiDonHang_ExportDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerOrderComplain/ExportWHDL"
          : "SerOrderComplain/ExportDL",
        {
          ...params,
        }
      );
    },
    QLKhieuNaiDonHang_GetByOrderComplainNoHQ: async (
      flagDataWH: any,
      code: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerOrderComplain/GetByOrderComplainNoWHHQ"
          : "/SerOrderComplain/GetByOrderComplainNoHQ",
        {
          OrderComplainNo: code,
        }
      );
    },
    QLKhieuNaiDonHang_GetByOrderComplainNoDL: async (
      flagDataWH: any,
      code: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerOrderComplain/GetByOrderComplainNoWHDL"
          : "/SerOrderComplain/GetByOrderComplainNoDL",
        {
          OrderComplainNo: code,
        }
      );
    },
    QLKhieuNaiDonHang_GetPartCode: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderComplain/GetPartCode",
        {
          PartCode: code,
        }
      );
    },
    QLKhieuNaiDonHang_DeleteDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderComplain/DeleteDL",
        {
          OrderComplainNo: code,
        }
      );
    },
    QLKhieuNaiDonHang_CreateDL: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderComplain/CreateDL",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    QLKhieuNaiDonHang_UpdateDL: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderComplain/UpdateDL",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    QLKhieuNaiDonHang_SendTSTDL: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderComplain/SendTSTDL",
        {
          OrderComplainNo: code,
        }
      );
    },
    QLKhieuNaiDonHang_GetOrderComplainNo: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderComplain/GetOrderComplainNo",
        {}
      );
    },
    QLKhieuNaiDonHang_MstOrderComplainTypeGetAllActive:
      async (): Promise<any> => {
        return await apiBase.post<any, ApiResponse<any>>(
          "/MstOrderComplainType/GetAllActive",
          {}
        );
      },
    // loại ảnh
    QLKhieuNaiDonHang_MstOrderComplainImageType: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/MstOrderComplainImageType/GetAllActive",
        {}
      );
    },
    QLKhieuNaiDonHang_UploadFileOrderComplain: async (
      file: any
    ): Promise<any> => {
      const form = new FormData();
      form.append("file", file);
      return await apiBase.post<any, ApiResponse<any>>(
        "/File/UploadFileOrderComplain",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};
