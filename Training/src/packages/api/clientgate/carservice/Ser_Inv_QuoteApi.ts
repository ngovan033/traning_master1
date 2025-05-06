import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import { formatDate } from "@/packages/common/date_utils";
import {
  Ser_Inv_Quote_Search,
  Ser_Inv_QuoteResponse,
} from "@/packages/types/carservice/Ser_Inv_Quote";
import {
  SearchSer_CustomerCarParam,
  Ser_CustomerCar,
} from "@/packages/types/master/Ser_CustomerCar";
import {
  Mst_Param_Optional,
  Search_Mst_Param_Optional,
} from "@/packages/types/master/Mst_Param_Optional";

export interface ISer_Inv_QuoteMst {
  DealerCode: string;
  Creator: string;
  CreatedDate: string;
  Remark: string;
  Status: string;
  IsActive: string;
  Note: string;
  CusID: string;
  ReceiveName: string;
  PaymentMethod: string;
}
export interface ILst_Ser_Inv_QuotePartItems {
  PartID: string;
  Price: string;
  PartPriceId: string;
  Quantity: string;
  VAT: string;
  Factor: string;
  Note: string;
}

export interface IGetByQuoteID {
  FlagDataWH: boolean;
  QuoteID: string;
  StockOutStatus: string | null;
}

export interface IPrintDL extends IGetByQuoteID {}

// StatusCreatedValue = "1"; //Mới tạo
// StatusRejectedValue = "2"; //Báo giá Hủy
// StatusSOOValue = "3"; //Đã tạo phiếu xuất
// StatusSOValue = "4"; //Đã xuất
// StatusSOAdjustedValue = "5"; //Đã điều chỉnh phiếu xuất
// StatusSORejectedValue = "6"; //Đã hủy phiếu xuất

export interface IVisibleBtnWithStatus {
  visibleBtnDelete: boolean;
  visibleBtnUpdate: boolean;
  visibleBtnPrint: boolean;
  visibleBtnCreateStockOut: boolean;
  visibleBtnViewStockOut: boolean;
  visibleBtnSearchPart: boolean;
  visibleBtnIconDelete: boolean;
  visibleHiddenCheckBoxGrid: boolean;
  visibleSearchCustomer: boolean;
  //
  readOnlyQuantity: boolean;
  readOnlyFactor: boolean;
  readOnlyPrice: boolean;
  readOnlyVAT: boolean;
  readOnlyRemark: boolean;
}

export const listStatusSerInvQuote = [
  {
    text: "Mới tạo",
    value: "1",
  },
  {
    text: "Báo giá Hủy",
    value: "2",
  },
  {
    text: "Đã tạo phiếu xuất",
    value: "3",
  },
  {
    text: "Đã xuất",
    value: "4",
  },
  {
    text: "Đã điều chỉnh phiếu xuất",
    value: "5",
  },
  {
    text: "Đã hủy phiếu xuất",
    value: "6",
  },
];

// 51. 52. Quản lý Báo giá phụ tùng
export const useSer_Inv_QuoteApi = (apiBase: AxiosInstance) => {
  return {
    // Điều khoản báo giá
    Ser_Inv_Quote_MstParamSearchDL: async (
      param: Partial<Search_Mst_Param_Optional>
    ): Promise<ApiResponse<Mst_Param_Optional>> => {
      return await apiBase.post<
        Partial<Search_Mst_Param_Optional>,
        ApiResponse<Mst_Param_Optional>
      >("/MstParam/SearchDL", {
        ...param,
      });
    },

    //  Tìm kiếm
    Ser_Inv_Quote_SearchDL: async (
      param: Partial<Ser_Inv_Quote_Search>
    ): Promise<ApiResponse<Ser_Inv_Quote_Search>> => {
      const searchParam = {
        ...param,
        FlagCreated: param.FlagCreated ? "1" : "0", //	Mới tạo
        FlagSOO: param.FlagSOO ? "1" : "0", //	Đã có phiếu xuất
        FlagSO: param.FlagSO ? "1" : "0", //	Đã xuất
        FlagSOAdjusted: param.FlagSOAdjusted ? "1" : "0", //	Đã điều chỉnh phiếu xuất		Thiết kế thiếu
        FlagSORejected: param.FlagSORejected ? "1" : "0", //	Đã hủy phiếu xuất
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreatedDateFromTo) {
        searchParam.CreatedDateFrom = param.CreatedDateFromTo[0]
          ? `${formatDate(new Date(param.CreatedDateFromTo[0]))}`
          : "";
        searchParam.CreatedDateTo = param.CreatedDateFromTo[1]
          ? `${formatDate(new Date(param.CreatedDateFromTo[1]))}`
          : "";
      }
      delete searchParam.CreatedDateFromTo;
      return await apiBase.post<
        Partial<Ser_Inv_Quote_Search>,
        ApiResponse<Ser_Inv_Quote_Search>
      >(
        param.FlagDataWH ? "/SerInvQuote/SearchWHDL" : "/SerInvQuote/SearchDL",
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

    // Tìm kiếm thông tin khách hàng
    Ser_Inv_Quote_SerCustomerCarSearchDL: async (
      params: Partial<SearchSer_CustomerCarParam>
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerCarParam>,
        ApiResponse<Ser_CustomerCar>
      >("/SerCustomer/SerCustomerCarSearchDL", {
        ...params,
      });
    },

    Ser_Inv_Quote_CreateDL: async (
      objSer_Inv_QuoteMst: ISer_Inv_QuoteMst,
      objLst_Ser_Inv_QuotePartItems: ILst_Ser_Inv_QuotePartItems[]
    ): Promise<ApiResponse<any>> => {
      // {
      //   "Ser_Inv_Quote": {
      //     "DealerCode": "VS058",
      //     "Creator": "0317844394@inos.vn",
      //     "CreatedDate": null,
      //     "Remark": "- Báo giá này chỉ có giá trị trong 7 ngày.
      // - Bảo hành phụ tùng,sửa chữa 10,000 km hoặc 6 tháng
      // - Báo giá này chỉ có giá trị trong 7 ngày.
      // - Bảo hành phụ tùng,sửa chữa 10,000 km hoặc 6 tháng",
      //     "Status": "1",
      //     "IsActive": "1",
      //     "Note": "",
      //     "CusID": "455978",
      //     "ReceiveName": "Em Quyền",
      //     "PaymentMethod": "Tiền mặt",
      //     },
      //   "Lst_Ser_Inv_QuotePartItems": [
      //     {
      //       "PartID": "414576",
      //       "Price": 180000,
      //       "PartPriceId": null,
      //       "Quantity": 3,
      //       "VAT": 10,
      //       "Factor": 0.9,
      //       "Note": "test"
      //     }
      //     ]
      // }

      const request = {
        Ser_Inv_Quote: objSer_Inv_QuoteMst,
        Lst_Ser_Inv_QuotePartItems: objLst_Ser_Inv_QuotePartItems,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvQuote/CreateDL",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Ser_Inv_Quote_UpdateDL: async (
      objSer_Inv_QuoteMst: ISer_Inv_QuoteMst,
      objLst_Ser_Inv_QuotePartItems: ILst_Ser_Inv_QuotePartItems[]
    ): Promise<ApiResponse<any>> => {
      // {
      //   "Ser_Inv_Quote": {
      //     "QuoteID": "111284",
      //     "DealerCode": "VS058",
      //     "Creator": "0317844394@inos.vn",
      //     "CreatedDate": null,
      //     "Remark": "- Báo giá này chỉ có giá trị trong 7 ngày",
      //     "Status": "1",
      //     "IsActive": "1",
      //     "Note": "",
      //     "CusID": "455978",
      //     "RecieveName": "Em Quyền",
      //     "PaymentMethod": "Tiền mặt",
      //     },
      //   "Lst_Ser_Inv_QuotePartItems": [
      //     {
      //       "PartID": "414576",
      //       "Price": 180000,
      //       "PartPriceId": null,
      //       "Quantity": 3,
      //       "VAT": 10,
      //       "Factor": 0.9,
      //       "Note": "test"
      //     }
      //     ]
      // }

      const request = {
        Ser_Inv_Quote: objSer_Inv_QuoteMst,
        Lst_Ser_Inv_QuotePartItems: objLst_Ser_Inv_QuotePartItems,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvQuote/UpdateDL",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Get chi tiết để cập nhật
    Ser_Inv_Quote_GetByQuoteID: async (
      param: IGetByQuoteID
    ): Promise<ApiResponse<Ser_Inv_QuoteResponse>> => {
      return await apiBase.post<
        Partial<IGetByQuoteID>,
        ApiResponse<Ser_Inv_QuoteResponse>
      >(
        param.FlagDataWH
          ? "/SerInvQuote/GetByQuoteIDWHDL"
          : "/SerInvQuote/GetByQuoteIDDL",
        {
          QuoteID: param.QuoteID,
          StockOutStatus: param.StockOutStatus,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Xóa báo giá phụ tùng
    Ser_Inv_Quote_DeleteDL: async (
      QuoteID: string
    ): Promise<ApiResponse<Ser_Inv_QuoteResponse>> => {
      return await apiBase.post<
        Partial<IGetByQuoteID>,
        ApiResponse<Ser_Inv_QuoteResponse>
      >(
        "/SerInvQuote/DeleteDL",
        {
          QuoteID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Print Báo giá
    Ser_Inv_Quote_PrintDL: async (
      param: IPrintDL
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<IGetByQuoteID>, ApiResponse<any>>(
        param.FlagDataWH ? "/SerInvQuote/PrintWHDL" : "/SerInvQuote/PrintDL",
        {
          QuoteID: param.QuoteID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Print phiếu bán
    Ser_Inv_Quote_PrintPhieuBanDL: async (
      param: IPrintDL
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<IGetByQuoteID>, ApiResponse<any>>(
        param.FlagDataWH
          ? "/SerInvQuote/PrintPhieuBanWHDL"
          : "/SerInvQuote/PrintPhieuBanDL",
        {
          QuoteID: param.QuoteID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Print phiếu ra cổng
    Ser_Inv_Quote_PrintPhieuRaCongDL: async (
      param: IPrintDL
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<IGetByQuoteID>, ApiResponse<any>>(
        param.FlagDataWH
          ? "/SerInvQuote/PrintPhieuRaCongWHDL"
          : "/SerInvQuote/PrintPhieuRaCongDL",
        {
          QuoteID: param.QuoteID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
  };
};
