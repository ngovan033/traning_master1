import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import { formatDate } from "@/packages/common/date_utils";
import {
  Dlr_PDIRequest,
  Dlr_PDIRequest_Search,
  Dlr_PDIRequestResponse,
} from "@/packages/types/carservice/Dlr_PDIRequest";
import { Ser_RO } from "@/packages/types/carservice/Ser_RO";

export const listDlrPDIReqStatus = [
  {
    text: "Đã duyệt",
    value: "A",
  },
  {
    text: "Mới tạo",
    value: "P",
  },
];

// 60. Quản lý Yêu cầu PDI

export const useDlr_PDIRequestApi = (apiBase: AxiosInstance) => {
  return {
    // DS DealerCode
    Dlr_PDIRequest_SearchFromSales: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/MstDealer/SearchFromSales",
        {}
      );
    },
    // Tìm kiếm
    Dlr_PDIRequest_SearchDL: async (
      param: Partial<Dlr_PDIRequest_Search>
    ): Promise<ApiResponse<Dlr_PDIRequest>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreatedDateFromTo) {
        searchParam.CreatedDateFrom = param.CreatedDateFromTo[0]
          ? formatDate(new Date(param.CreatedDateFromTo[0]))
          : "";
        searchParam.CreatedDateTo = param.CreatedDateFromTo[1]
          ? formatDate(new Date(param.CreatedDateFromTo[1]))
          : "";
      }
      delete searchParam.CreatedDateFromTo;
      return await apiBase.post<
        Partial<Dlr_PDIRequest_Search>,
        ApiResponse<Dlr_PDIRequest>
      >(
        param.FlagDataWH
          ? "/DlrPDIRequest/SearchWHDL"
          : "/DlrPDIRequest/SearchDL",
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

    Dlr_PDIRequest_SearchHQ: async (
      param: Partial<Dlr_PDIRequest_Search>
    ): Promise<ApiResponse<Dlr_PDIRequest>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreatedDateFromTo) {
        searchParam.CreatedDateFrom = param.CreatedDateFromTo[0]
          ? formatDate(new Date(param.CreatedDateFromTo[0]))
          : "";
        searchParam.CreatedDateTo = param.CreatedDateFromTo[1]
          ? formatDate(new Date(param.CreatedDateFromTo[1]))
          : "";
      }
      delete searchParam.CreatedDateFromTo;
      return await apiBase.post<
        Partial<Dlr_PDIRequest_Search>,
        ApiResponse<Dlr_PDIRequest>
      >(
        param.FlagDataWH
          ? "/DlrPDIRequest/SearchWHHQ"
          : "/DlrPDIRequest/SearchHQ",
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

    // Export excel
    DL_Dlr_PDIRequest_ExportDL: async (
      param: Partial<Dlr_PDIRequest_Search>
    ) => {
      if (param.CreatedDateFromTo) {
        param.CreatedDateFrom = param.CreatedDateFromTo[0]
          ? formatDate(new Date(param.CreatedDateFromTo[0]))
          : "";
        param.CreatedDateTo = param.CreatedDateFromTo[1]
          ? formatDate(new Date(param.CreatedDateFromTo[1]))
          : "";
      }
      delete param.CreatedDateFromTo;
      return await apiBase.post<
        Partial<Dlr_PDIRequest_Search>,
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

    HQ_Dlr_PDIRequest_ExportHQ: async (
      param: Partial<Dlr_PDIRequest_Search>
    ) => {
      if (param.CreatedDateFromTo) {
        param.CreatedDateFrom = param.CreatedDateFromTo[0]
          ? formatDate(new Date(param.CreatedDateFromTo[0]))
          : "";
        param.CreatedDateTo = param.CreatedDateFromTo[1]
          ? formatDate(new Date(param.CreatedDateFromTo[1]))
          : "";
      }
      delete param.CreatedDateFromTo;
      return await apiBase.post<
        Partial<Dlr_PDIRequest_Search>,
        ApiResponse<string>
      >(
        param.FlagDataWH
          ? "/DlrPDIRequest/ExportWHHQ"
          : "/DlrPDIRequest/ExportHQ",
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

    //  Chi tiết => done
    HQ_Dlr_PDIRequest_GetByDlrPDIReqNo: async (
      params: Partial<Dlr_PDIRequest_Search>
    ): Promise<ApiResponse<Dlr_PDIRequestResponse>> => {
      return await apiBase.post<string, ApiResponse<Dlr_PDIRequestResponse>>(
        params.FlagDataWH
          ? "/DlrPDIRequest/GetByDlrPDIReqNoWHHQ"
          : "/DlrPDIRequest/GetByDlrPDIReqNoHQ",
        {
          DlrPDIReqNo: params.DlrPDIReqNo,
        }
      );
    },

    DL_Dlr_PDIRequest_GetByDlrPDIReqNo: async (
      params: Partial<Dlr_PDIRequest_Search>
    ): Promise<ApiResponse<Dlr_PDIRequestResponse>> => {
      return await apiBase.post<string, ApiResponse<Dlr_PDIRequestResponse>>(
        params.FlagDataWH
          ? "/DlrPDIRequest/GetByDlrPDIReqNoWHDL"
          : "/DlrPDIRequest/GetByDlrPDIReqNoDL",
        {
          DlrPDIReqNo: params.DlrPDIReqNo,
        }
      );
    },

    // Lấy thông tin PDI cho báo giá
    DL_Dlr_PDIRequest_GetROForCreateDL: async (
      DlrPDIReqNo: string,
      VIN: string
    ): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "/DlrPDIRequest/GetROForCreateDL",
        {
          DlrPDIReqNo: DlrPDIReqNo,
          VIN: VIN,
        }
      );
    },
  };
};
