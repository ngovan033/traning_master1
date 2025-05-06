import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useNPPQLChienDichApi = (apiBase: AxiosInstance) => {
  return {
    NPPQLChienDich_SearchHQ: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerCampaignMarketing/SearchWHHQ"
          : "/SerCampaignMarketing/SearchHQ",
        {
          ...params,
        }
      );
    },
    NPPQLChienDich_SearchDL: async (params: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        params.FlagDataWH
          ? "/SerCampaignMarketing/SearchWHDL"
          : "/SerCampaignMarketing/SearchDL",
        {
          ...params,
        }
      );
    },
    NPPQLChienDich_DeleteHQ: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaignMarketing/DeleteHQ",
        {
          CamMarketingNo: code,
        }
      );
    },
    NPPQLChienDich_CreateHQ: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaignMarketing/CreateHQ",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    NPPQLChienDich_UpdateHQ: async (data: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaignMarketing/UpdateHQ",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    NPPQLChienDich_GetByCamMarketingNoHQ: async (
      code: any,
      flagDataWH: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerCampaignMarketing/GetByCamMarketingNoWHHQ"
          : "/SerCampaignMarketing/GetByCamMarketingNoHQ",
        {
          CamMarketingNo: code,
        }
      );
    },
    NPPQLChienDich_GetByCamMarketingNoDL: async (
      code: any,
      flagDataWH: any
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        flagDataWH
          ? "/SerCampaignMarketing/GetByCamMarketingNoWHDL"
          : "/SerCampaignMarketing/GetByCamMarketingNoDL",
        {
          CamMarketingNo: code,
        }
      );
    },
    NPPQLChienDich_ApproveHQ: async (code: any): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaignMarketing/ApproveHQ",
        {
          CamMarketingNo: code,
        }
      );
    },
    NPPQLChienDich_GetCamMarketingNo: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaignMarketing/GetCamMarketingNo",
        {}
      );
    },
    NPPQLChienDich_ExportVINTemplate: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaignMarketing/ExportVINTemplate",
        {}
      );
    },
    NPPQLChienDich_ExportPartTemplate: async (): Promise<any> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaignMarketing/ExportPartTemplate",
        {}
      );
    },
    NPPQLChienDich_ImportVINHQ: async (file: any): Promise<any> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerCampaignMarketing/ImportVIN",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    NPPQLChienDich_ImportPartHQ: async (file: any): Promise<any> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerCampaignMarketing/ImportPart",
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
