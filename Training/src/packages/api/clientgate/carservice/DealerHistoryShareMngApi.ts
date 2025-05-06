import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import {
  Claim_ByPlateNo,
  DealerHistoryShareMng_DL,
  DealerHistoryShareMng_HQ,
  DealerHistoryShareMng_Search,
} from "@/packages/types/carservice/DealerHistoryShareMngDL";

export const lstStatusExpenseType: any = {
  ROREPAIR: "Khách hàng",
  ROINSURANCE: "Bảo hiểm",
  ROWARRANTY: "Bảo hành",
  LOCAL: "Nội bộ",
};

export const useDealerHistoryShareMngApi = (apiBase: AxiosInstance) => {
  return {
    // Tìm kiếm
     DealerHistoryShareMng_SearchDL: async (
      param: Partial<DealerHistoryShareMng_Search>
    ): Promise<ApiResponse<DealerHistoryShareMng_DL>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };

      return await apiBase.post<
        Partial<DealerHistoryShareMng_Search>,
        ApiResponse<DealerHistoryShareMng_DL>
      >(
        param.FlagDataWH
          ? "/DealerHistoryShareMng/SearchWHDL"
          : "/DealerHistoryShareMng/SearchDL",
        {
          ...searchParam,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    DealerHistoryShareMng_SearchHQ: async (
      param: Partial<DealerHistoryShareMng_Search>
    ): Promise<ApiResponse<DealerHistoryShareMng_HQ>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };

      return await apiBase.post<
        Partial<DealerHistoryShareMng_Search>,
        ApiResponse<DealerHistoryShareMng_HQ>
      >(
        param.FlagDataWH
          ? "/DealerHistoryShareMng/SearchWHHQ"
          : "/DealerHistoryShareMng/SearchHQ",
        {
          ...searchParam,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    DealerHistoryShareMng_GetListClaimByPlateNoHQ: async (
      PlateNo: string
    ): Promise<ApiResponse<Claim_ByPlateNo>> => {
      return await apiBase.post<Partial<string>, ApiResponse<Claim_ByPlateNo>>(
        "/DealerHistoryShareMng/GetListClaimByPlateNoHQ",
        {
          PlateNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Export excel
    DealerHistoryShareMng_ExportDL: async (
      param: Partial<DealerHistoryShareMng_Search>
    ) => {
      return await apiBase.post<
        Partial<DealerHistoryShareMng_Search>,
        ApiResponse<string>
      >(
        param.FlagDataWH
          ? "/DlrPDIRequest/ExportWHDL"
          : "/DlrPDIRequest/ExportDL",
        {
          ...param,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    DealerHistoryShareMng_Export: async (PlateNo: string) => {
      return await apiBase.post<
        Partial<DealerHistoryShareMng_Search>,
        ApiResponse<string>
      >(
        "/DealerHistoryShareMng/ExporExcelListClaimByPlateNoHQ",
        {
          PlateNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    DealerHistoryShareMng_ExportSearchDL: async (param: {
      PlateNo: string;
      FrameNo: string;
      FlagDataWH: string;
    }) => {
      // "clientgate đã bổ sung 2 hàm:
      //   DealerHistoryShareMng/ExporExcelDL
      //   DealerHistoryShareMng/ExporExcelHQ
      //   input:
      //     PlateNo
      //     FrameNo
      //     FlagDataWH"
      return await apiBase.post<
        Partial<DealerHistoryShareMng_Search>,
        ApiResponse<string>
      >(
        "/DealerHistoryShareMng/ExporExcelDL",
        {
          PlateNo: param.PlateNo,
          FrameNo: param.FrameNo,
          FlagDataWH: param.FlagDataWH,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    DealerHistoryShareMng_ExportSearchHQ: async (param: {
      PlateNo: string;
      FrameNo: string;
      FlagDataWH: string;
    }) => {
      // "clientgate đã bổ sung 2 hàm:
      //   DealerHistoryShareMng/ExporExcelDL
      //   DealerHistoryShareMng/ExporExcelHQ
      //   input:
      //     PlateNo
      //     FrameNo
      //     FlagDataWH"
      return await apiBase.post<
        Partial<DealerHistoryShareMng_Search>,
        ApiResponse<string>
      >(
        "/DealerHistoryShareMng/ExporExcelHQ",
        {
          PlateNo: param.PlateNo,
          FrameNo: param.FrameNo,
          FlagDataWH: param.FlagDataWH,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Export excel khiếu nại
    DealerHistoryShareMng_ExporExcelListClaimByPlateNoHQ: async (
      PlateNo: string
    ) => {
      return await apiBase.post<
        Partial<DealerHistoryShareMng_Search>,
        ApiResponse<string>
      >(
        "DealerHistoryShareMng/ExporExcelListClaimByPlateNoHQ",
        {
          PlateNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    //  Chi tiết => done
    HQ_DealerHistoryShareMng_GetByROIDDL: async (
      ROID: string,
      FlagDataWH: boolean
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<string, ApiResponse<any>>(
        FlagDataWH ? "/SerRO/GetByROIDWHDL" : "/SerRO/GetByROIDDL",
        {
          ROID,
        }
      );
    },

    //  Chi tiết => done (Mặc định dùng hàm này cho cả DL và HQ)
    HQ_DealerHistoryShareMng_GetByROIDHQ: async (
      ROID: string,
      FlagDataWH: boolean
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<string, ApiResponse<any>>(
        FlagDataWH ? "/SerRO/GetByROIDWHHQ" : "/SerRO/GetByROIDHQ",
        {
          ROID,
        }
      );
    },
    HQ_DealerHistoryShareMng_GetDTime: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<string, ApiResponse<any>>(
        "/Common/GetDTime",
        {}
      );
    },
  };
};
