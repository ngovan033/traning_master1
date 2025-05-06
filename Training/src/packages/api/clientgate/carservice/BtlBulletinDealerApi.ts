import { ApiResponse } from "@/packages/types";
import {
  BtlBulletinDealer,
  Search_BtlBulletinDealer_Param,
} from "@/packages/types/carservice/BtlBulletinDealer";
import { AxiosInstance } from "axios";

export const useBtlBulletinDealerApi = (apiBase: AxiosInstance) => {
  return {
    BtlBulletinDealer_Search: async (
      params: Partial<Search_BtlBulletinDealer_Param>
    ): Promise<ApiResponse<BtlBulletinDealer>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinDealer>>(
        "/BtlBulletinDealer/SearchDL",
        {
          ...params,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    BtlBulletinDealer_GetAllActiveByVIN: async (
      FrameNo: string
    ): Promise<ApiResponse<BtlBulletinDealer>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinDealer>>(
        "/BtlBulletinDealer/GetAllActiveByVIN",
        {
          VIN: FrameNo,
        }
      );
    },

    BtlBulletinDealer_GetAllActiveByVINMapStatusP: async (
      FrameNo: string
    ): Promise<ApiResponse<BtlBulletinDealer>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinDealer>>(
        "/BtlBulletinDealer/GetAllActiveByVINMapStatusP",
        {
          VIN: FrameNo,
        }
      );
    },

    BtlBulletinDealer_GetFileAttachmentDL: async (
      BulletinID: string
    ): Promise<ApiResponse<BtlBulletinDealer>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinDealer>>(
        "/BtlBulletinDealer/GetFileAttachmentDL",
        {
          BulletinID: BulletinID,
        }
      );
    },
    BtlBulletinDealer_GetForRO: async (
      FrameNo: string
    ): Promise<ApiResponse<BtlBulletinDealer>> => {
      return await apiBase.post<any, ApiResponse<BtlBulletinDealer>>(
        "/BtlBulletinDealer/GetForRO",
        {
          VIN: FrameNo,
        }
      );
    },
  };
};
