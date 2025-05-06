import { ApiResponse } from "@/packages/types";
import {
  Search_SerPartOO_Param,
  SerPartOO,
} from "@/packages/types/storage/SerPartOO";
import { AxiosInstance } from "axios";

export const useSerPartOOApi = (apiBase: AxiosInstance) => {
  return {
    SerPartOO_SearchDL: async (
      params: Partial<Search_SerPartOO_Param>
    ): Promise<ApiResponse<SerPartOO>> => {
      // const linkApi =
      //   params.FlagWH == "1" ? "/SerPartOO/SearchWHDL" : "/SerPartOO/SearchDL";

      return await apiBase.post<any, ApiResponse<SerPartOO>>(
        "/SerPartOO/SearchDL",
        {
          ...params,
        }
      );
    },
    SerPartOO_GetByAppIdDL: async ({
      AppID,
      FlagWH,
    }: {
      AppID: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerPartOO>> => {
      const linkApi =
        FlagWH == "1" ? "/SerPartOO/GetByAppIdWHDL" : "/SerPartOO/GetByAppIdDL";

      return await apiBase.post<any, ApiResponse<SerPartOO>>(linkApi, {
        AppID: AppID,
      });
    },
    SerPartOO_GetByAppIdHQ: async ({
      AppID,
      FlagWH,
    }: {
      AppID: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerPartOO>> => {
      const linkApi =
        FlagWH == "1" ? "/SerPartOO/GetByAppIdWHHQ" : "/SerPartOO/GetByAppIdHQ";

      return await apiBase.post<any, ApiResponse<SerPartOO>>(linkApi, {
        AppID: AppID,
      });
    },

    SerPartOO_ExportDL: async (
      params: Partial<Search_SerPartOO_Param>
    ): Promise<ApiResponse<SerPartOO>> => {
      // const linkApi =
      //   params.FlagWH == "1" ? "/SerPartOO/ExportWHDL" : "/SerPartOO/ExportDL";

      return await apiBase.post<any, ApiResponse<SerPartOO>>(
        "/SerPartOO/ExportDL",
        {
          ...params,
        }
      );
    },

    SerPartOO_CreateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerPartOO>>(
        "/SerPartOO/CreateDL",
        {
          ...params,
        }
      );
    },

    SerPartOO_ExportTemplate: async () => {
      return await apiBase.post<any, ApiResponse<SerPartOO>>(
        "/SerPartOO/ExportTpl",
        {}
      );
    },

    SerPartOO_UpdateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerPartOO>>(
        "/SerPartOO/UpdateDL",
        {
          ...params,
        }
      );
    },
    SerPartOO_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerPartOO/ImportDL",
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
