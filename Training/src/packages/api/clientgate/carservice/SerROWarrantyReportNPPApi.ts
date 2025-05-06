import { ApiResponse } from "@/packages/types";
import {
  Search_SerROWarrantyReportNPP_Param,
  SerROWarrantyReportNPP,
} from "@/packages/types/carservice/SerROWarrantyReportDealer";
import { AxiosInstance } from "axios";

export const useSerROWarrantyReportNPPApi = (apiBase: AxiosInstance) => {
  return {
    SerROWarrantyReportNPP_SearchHQ: async (
      params: Partial<Search_SerROWarrantyReportNPP_Param>
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerROWarrantyReportNPP/SearchWHHQ"
          : "/SerROWarrantyReportNPP/SearchHQ";

      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerROWarrantyReportNPP_ExportHQ: async (
      params: Partial<Search_SerROWarrantyReportNPP_Param>
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      const linkApi =
        params.FlagWH == "1"
          ? "/SerROWarrantyReportNPP/ExportWHHQ"
          : "/SerROWarrantyReportNPP/ExportHQ";

      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        linkApi,
        {
          ...params,
        }
      );
    },
    SerROWarrantyReportNPP_GetByROWIDHQ: async (
      ROWID: string
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/GetByROWIDHQ",
        {
          ROWID: ROWID,
        }
      );
    },
    SerROWarrantyReportNPP_ApprAutoHQ: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/ApprAutoHQ",
        {
          strJson: JSON.stringify(params),
        }
      );
    },

    SerROWarrantyReportNPP_UpdStatusSentHQ: async (
      ROWID: string
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/UpdStatusSentHQ",
        {
          ROWID: ROWID,
        }
      );
    },

    SerROWarrantyReportNPP_ConfirmHQ: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/ConfirmHQ",
        {
          ...params,
        }
      );
    },

    SerROWarrantyReportNPP_AcceptHQ: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/AcceptHQ",
        {
          ...params,
        }
      );
    },

    SerROWarrantyReportNPP_RevertHQ: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/RevertHQ",
        {
          ...params,
        }
      );
    },

    SerROWarrantyReportNPP_RejectHQ: async (
      params: any
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/RejectHQ",
        {
          ...params,
        }
      );
    },

    SerROWarrantyReportNPP_SendHMCHQ: async (
      ROWID: string
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/SendHMCHQ",
        {
          ROWID: ROWID,
        }
      );
    },

    SerROWarrantyReportNPP_PrintHQ: async (
      ROWID: string
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/PrintHQ",
        {
          ROWID: ROWID,
        }
      );
    },

    SerROWarrantyReportNPP_UpdateROAttachmentFlagHMCHQ: async (
      params: any,
      ROID: string
    ): Promise<ApiResponse<SerROWarrantyReportNPP>> => {
      return await apiBase.post<any, ApiResponse<SerROWarrantyReportNPP>>(
        "/SerROWarrantyReportNPP/UpdateROAttachmentFlagHMCHQ",
        {
          strJson: JSON.stringify(params),
          ROID: ROID,
        }
      );
    },
  };
};
