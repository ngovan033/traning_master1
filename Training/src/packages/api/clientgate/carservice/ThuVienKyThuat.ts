import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useThuVienKyThuatApi = (apiBase: AxiosInstance) => {
  return {
    ThuVienKyThuat_SearchHQ: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerTechnicalLibrary/SearchWHHQ"
          : "/SerTechnicalLibrary/SearchHQ",
        {
          ...params,
        }
      );
    },
    ThuVienKyThuat_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerTechnicalLibrary/SearchWHDL"
          : "/SerTechnicalLibrary/SearchDL",
        {
          ...params,
        }
      );
    },
    ThuVienKyThuat_ExportHQ: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerTechnicalLibrary/ExportWHHQ"
          : "/SerTechnicalLibrary/ExportHQ",
        {
          ...params,
        }
      );
    },
    ThuVienKyThuat_ExportDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerTechnicalLibrary/ExportWHDL"
          : "SerTechnicalLibrary/ExportDL",
        {
          ...params,
        }
      );
    },
    ThuVienKyThuat_DeleteHQ: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerTechnicalLibrary/DeleteHQ",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    ThuVienKyThuat_DeleteDL: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerTechnicalLibrary/DeleteDL",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    ThuVienKyThuat_ApproveHQ: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerTechnicalLibrary/ApproveHQ",
        {
          ...data,
        }
      );
    },
    ThuVienKyThuat_ExportTplExReRepair: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerTechnicalLibrary/ExportTplExReRepair",
        {
          IsActive: "",
        }
      );
    },
    ThuVienKyThuat_ExportTplExNormal: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerTechnicalLibrary/ExportTplExNormal",
        {
          IsActive: "",
        }
      );
    },
    ThuVienKyThuat_ImportExNormalHQ: async (file: any): Promise<any> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerTechnicalLibrary/ImportExNormalHQ",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    ThuVienKyThuat_ImportExNormalDL: async (file: any): Promise<any> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerTechnicalLibrary/ImportExNormalDL",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    ThuVienKyThuat_ImportExReRepairDL: async (file: any): Promise<any> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerTechnicalLibrary/ImportExReRepairDL",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    ThuVienKyThuat_ImportExReRepairHQ: async (file: any): Promise<any> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerTechnicalLibrary/ImportExReRepairHQ",
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
