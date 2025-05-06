import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import { Mst_DeliveryForm } from "@/packages/types/master/Mst_DeliveryForm";
import {
  Req_PartPrice_Search,
  Req_PartPriceResponse,
} from "@/packages/types/carservice/ReqPartPrice";
import { formatDate } from "@/packages/common/date_utils";

export interface IReq_PartPrice_CreateDL {
  Req_PartPrice: {
    ReqPartPriceNo: string; //	Số đề nghị
    Description: string; //	Nội dung
    FlagIsCheck: string; //
  };
  Lst_Req_PartPriceDtl: {
    DMSPartCode: string; //	Mã vật tư yêu cầu
    VieName: string; //	Tên vật tư
    VINCode: string; //	Số VIN
    DeliveryFormCode: string; //	Hình thức đặt hàng
    Remark: string; //	Ghi chú
  };
}

export interface IReq_PartPrice_UpdateDL {
  Req_PartPrice: {
    ReqPartPriceNo: string; //	Số đề nghị
    Description: string; //	Nội dung
  };
  Lst_Req_PartPriceDtl: {
    DMSPartCode: string; //	Mã vật tư yêu cầu
    VieName: string; //	Tên vật tư
    VINCode: string; //	Số VIN
    DeliveryFormCode: string; //	Hình thức đặt hàng
    Remark: string; //	Ghi chú
    FlagIsCheck: string; // Client lưu ý: 1: Nếu có thay đổi bản ghi phụ tùng hoặc thêm mới phụ tùng, 0: không thay đổi gì hoặc thay đổi mỗi nội dung
  };
}

// 76. Quản lý đề nghị nhà cung cấp
export const useReq_PartPriceApi = (apiBase: AxiosInstance) => {
  return {
    //  gen code create new
    Req_PartPrice_GetReqPartPriceNo: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/ReqPartPrice/GetReqPartPriceNo",
        {}
      );
    },

    // Get all hình thức đặt hàng
    Req_PartPrice_DeliveryForm_GetAllActive: async (): Promise<
      ApiResponse<Mst_DeliveryForm>
    > => {
      return await apiBase.post<
        Partial<Mst_DeliveryForm>,
        ApiResponse<Mst_DeliveryForm>
      >("/MstDeliveryForm/Search", {
        DeliveryFormCode: "",
        DeliveryFormName: "",
        FlagActive: "1",
        Ft_PageIndex: 0,
        Ft_PageSize: 9999999,
      });
    },

    //  Tìm kiếm
    Req_PartPrice_SearchDL: async (
      param: Partial<Req_PartPrice_Search>
    ): Promise<ApiResponse<Req_PartPrice_Search>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreateDTimeFromTo) {
        searchParam.CreateDTimeFrom = param.CreateDTimeFromTo[0]
          ? formatDate(new Date(param.CreateDTimeFromTo[0]))
          : "";
        searchParam.CreateDTimeTo = param.CreateDTimeFromTo[1]
          ? formatDate(new Date(param.CreateDTimeFromTo[1]))
          : "";
      }
      delete searchParam.CreateDTimeFromTo;
      return await apiBase.post<
        Partial<Req_PartPrice_Search>,
        ApiResponse<Req_PartPrice_Search>
      >(
        param.FlagDataWH
          ? "/ReqPartPrice/SearchWHDL"
          : "/ReqPartPrice/SearchDL",
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
    Req_PartPrice_ExportDL: async (param: Partial<Req_PartPrice_Search>) => {
      if (param.CreateDTimeFromTo) {
        param.CreateDTimeFrom = param.CreateDTimeFromTo[0]
          ? formatDate(new Date(param.CreateDTimeFromTo[0]))
          : "";
        param.CreateDTimeTo = param.CreateDTimeFromTo[1]
          ? formatDate(new Date(param.CreateDTimeFromTo[1]))
          : "";
      }
      delete param.CreateDTimeFromTo;
      return await apiBase.post<
        Partial<Req_PartPrice_Search>,
        ApiResponse<string>
      >(
        param.FlagDataWH
          ? "/ReqPartPrice/ExportWHDL"
          : "/ReqPartPrice/ExportDL",
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

    // Tạo mới
    Req_PartPrice_CreateDL: async (data: IReq_PartPrice_CreateDL) => {
      return await apiBase.post<IReq_PartPrice_CreateDL, ApiResponse<any>>(
        "/ReqPartPrice/CreateDL",
        {
          strJson: JSON.stringify(data),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Tạo mới
    Req_PartPrice_UpdateDL: async (data: IReq_PartPrice_UpdateDL) => {
      return await apiBase.post<IReq_PartPrice_UpdateDL, ApiResponse<any>>(
        "/ReqPartPrice/UpdateDL",
        {
          strJson: JSON.stringify(data),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Chi tiết
    Req_PartPrice_GetByReqPartPriceNo: async (
      params: Partial<Req_PartPrice_Search>
    ): Promise<ApiResponse<Req_PartPriceResponse>> => {
      return await apiBase.post<
        Req_PartPrice_Search,
        ApiResponse<Req_PartPriceResponse>
      >(
        params.FlagDataWH
          ? "/ReqPartPrice/GetByReqPartPriceNoWHDL"
          : "/ReqPartPrice/GetByReqPartPriceNoDL",
        {
          ReqPartPriceNo: params.ReqPartPriceNo,
        }
      );
    },

    // xóa
    Req_PartPrice_DeleteDL: async (
      params: Partial<Req_PartPrice_Search>
    ): Promise<ApiResponse<Req_PartPriceResponse>> => {
      return await apiBase.post<
        Req_PartPrice_Search,
        ApiResponse<Req_PartPriceResponse>
      >("/ReqPartPrice/DeleteDL", {
        ReqPartPriceNo: params.ReqPartPriceNo,
      });
    },

    // nút gửi đề nghị ncc
    Req_PartPrice_SendDL: async (
      params: Partial<Req_PartPrice_Search>
    ): Promise<ApiResponse<Req_PartPriceResponse>> => {
      return await apiBase.post<
        Req_PartPrice_Search,
        ApiResponse<Req_PartPriceResponse>
      >("/ReqPartPrice/SendDL", {
        ReqPartPriceNo: params.ReqPartPriceNo,
      });
    },
  };
};
