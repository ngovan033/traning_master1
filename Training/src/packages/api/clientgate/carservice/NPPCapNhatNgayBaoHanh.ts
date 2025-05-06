import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useNPPCapNhatBaoHanhApi = (apiBase: AxiosInstance) => {
  return {
    NPPCapNhatBaoHanh_ExportTpl: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCarUpdateWarrantyDate/ExportTpl",
        {}
      );
    },
    NPPCapNhatBaoHanh_UpdateHQ: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCarUpdateWarrantyDate/UpdateHQ",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    NPPCapNhatBaoHanh_ImportExcelHQ: async (file: any): Promise<any> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerCarUpdateWarrantyDate/ImportExcelHQ",
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
