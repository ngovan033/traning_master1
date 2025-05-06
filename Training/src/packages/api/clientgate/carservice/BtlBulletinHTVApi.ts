import { ApiResponse } from "@/packages/types";
import {
  BtlBulletinHTV,
  Search_BtlBulletinHTV_Param,
} from "@/packages/types/carservice/BtlBulletinHTV";

import { AxiosInstance } from "axios";

export const useBtlBulletinHTVApi = (apiBase: AxiosInstance) => {
  return {
    BtlBulletinHTV_SearchHQ: async (
      params: Partial<Search_BtlBulletinHTV_Param>
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/SearchHQ",
        {
          ...params,
        }
      );
    },

    BtlBulletinHTV_DeleteHQ: async (
      BulletID: string
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/DeleteHQ",
        {
          BulletID: BulletID,
        }
      );
    },

    BtlBulletinHTV_ExportHQ: async (
      params: Partial<Search_BtlBulletinHTV_Param>
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/ExportHQ",
        {
          ...params,
        }
      );
    },

    BtlBulletinHTV_GetFileAttachmentHQ: async (
      params: Partial<any>
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/GetFileAttachmentHQ",
        {
          ...params,
        }
      );
    },

    BtlBulletinHTV_GetByBulletinIDHQ: async (
      BulletinID: string
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/GetByBulletinIDHQ",
        {
          BulletinID: BulletinID,
        }
      );
    },

    BtlBulletinHTV_ExportTplVINHQ: async (): Promise<
      ApiResponse<BtlBulletinHTV>
    > => {
      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/ExportTplVINHQ",
        {}
      );
    },

    BtlBulletinHTV_ExportTplServiceHQ: async (): Promise<
      ApiResponse<BtlBulletinHTV>
    > => {
      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/ExportTplServiceHQ",
        {}
      );
    },

    BtlBulletinHTV_ImportExVINHQ: async (
      file: File
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/BtlBulletin/ImportExVINHQ",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    BtlBulletinHTV_ImportExServiceHQ: async (
      file: File
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      const form = new FormData();
      form.append("file", file);
      return await apiBase.post<File, ApiResponse<any>>(
        "/BtlBulletin/ImportExServiceHQ",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    BtlBulletinHTV_UpdateHQ: async (
      params: Partial<any>
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      const form = new FormData();
      form.append("file", params.file);
      form.append("strJson", JSON.stringify(params.strJson));

      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/UpdateHQ",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    BtlBulletinHTV_CreateHQ: async (
      params: Partial<any>
    ): Promise<ApiResponse<BtlBulletinHTV>> => {
      const form = new FormData();
      form.append("file", params.file);
      form.append("strJson", JSON.stringify(params.strJson));

      return await apiBase.post<any, ApiResponse<BtlBulletinHTV>>(
        "/BtlBulletin/CreateHQ",
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
