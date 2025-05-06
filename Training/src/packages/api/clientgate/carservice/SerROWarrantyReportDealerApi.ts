import { ApiResponse } from "@/packages/types";
import {
  ISer_ROWarrantyReport,
  Search_SerROWarrantyReportDealer_Param,
  SerROWarrantyReportDealer,
} from "@/packages/types/carservice/SerROWarrantyReportDealer";
import { AxiosInstance } from "axios";

export const useSerROWarrantyReportDealerApi = (apiBase: AxiosInstance) => {
  return {
    SerROWarrantyReportDealer_SearchDL: async (
      params: Partial<Search_SerROWarrantyReportDealer_Param>
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerROWarrantyReportDealer/SearchWHDL"
          : "/SerROWarrantyReportDealer/SearchDL";

      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerROWarrantyReportDealer_ExportDL: async (
      params: Partial<Search_SerROWarrantyReportDealer_Param>
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerROWarrantyReportDealer/ExportWHDL"
          : "/SerROWarrantyReportDealer/ExportDL";

      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerROWarrantyReportDealer_GetByROWIDDL: async (
      ROWID: string
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerROWarrantyReportDealer/GetByROWIDDL",
        {
          ROWID: ROWID,
        }
      );
    },
    SerROWarrantyReportDealer_GetByROIDDL: async (
      ROID: string
    ): Promise<ApiResponse<ISer_ROWarrantyReport>> => {
      return await apiBase.post<any, ApiResponse<ISer_ROWarrantyReport>>(
        "/SerROWarrantyReportDealer/GetByROIDDL",
        {
          ROID: ROID,
        }
      );
    },

    SerROWarrantyReportDealer_CreateDL: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerROWarrantyReportDealer/CreateDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },

    SerROWarrantyReportDealer_DeleteDL: async (
      ROWID: string
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerROWarrantyReportDealer/DeleteDL",
        {
          ROWID: ROWID,
        }
      );
    },

    SerROWarrantyReportDealer_UpdateDL: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerROWarrantyReportDealer/UpdateDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },

    SerROWarrantyReportDealer_ApprCheckDL: async (
      ROWID: string
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerROWarrantyReportDealer/ApprCheckDL",
        {
          ROWID: ROWID,
        }
      );
    },

    SerROWarrantyReportDealer_PrintDL: async (
      ROWID: string
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerROWarrantyReportDealer/PrintDL",
        {
          ROWID: ROWID,
        }
      );
    },

    SerROWarrantyReportDealer_SentNPPDL: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerROWarrantyReportDealer/SentNPPDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },

    SerRO_GetAttachmentByROIDDL: async (
      ROID: string,
      FlagWH = "0"
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerRO/GetAttachmentByROIDDL",
        {
          ROID: ROID,
          FlagWH: FlagWH,
        }
      );
    },

    SerRO_GetAttachmentByROIDHQ: async (
      ROID: string,
      FlagWH = "0"
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerRO/GetAttachmentByROIDHQ",
        {
          ROID: ROID,
          FlagWH: FlagWH,
        }
      );
    },

    SerMSTROWarrantyTypePhotoType_GetByROWTID: async (
      ROWTypeCode: string,
      ROWTypeDtlCode: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerMSTROWarrantyTypePhotoType/GetByROWTID",
        {
          ROWTypeCode: ROWTypeCode,
          ROWTypeDtlCode: ROWTypeDtlCode,
        }
      );
    },

    SerROWarrantyReportDealer_UpdateAttachmentTypeDL: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerROWarrantyReportDealer/UpdateAttachmentTypeDL",
        {
          strJson: JSON.stringify(params),
        }
      );
    },

    SerRO_GetForWarrantyDL: async (
      ROID: string
    ): Promise<ApiResponse<SerROWarrantyReportDealer>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportDealer>>(
        "/SerRO/GetForWarrantyDL",
        {
          ROID: ROID,
        }
      );
    },
  };
};
