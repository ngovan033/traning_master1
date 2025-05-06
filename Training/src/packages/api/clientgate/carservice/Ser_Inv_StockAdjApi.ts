import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import { formatDate } from "@/packages/common/date_utils";
import {
  Ser_Inv_StockAdj_Search,
  Ser_Inv_StockAdjResponse,
} from "@/packages/types/storage/Ser_Inv_StockAdj";
import { Ser_Mst_Location } from "@/packages/types/master/Ser_Mst_Location";

export interface ISer_Inv_StockOutOrderMst {
  // phần dành cho tạo mới
  Remark: string;
  // phần dành cho cập nhật
  StockAdjId: string;
  StockAdjNo: string;
  DealerCode: string;
  StockAdjDate: string;
  UserCreate: string;
  Status: string;
}
export interface ISer_Inv_StockOutOrderDetail {
  PartID: string;
  Quantity: string;
  BalanceLocationID: string;
  InStockLocationID: string;
}

// 71. Quản lý điều chuyển kho
export const useSer_Inv_StockAdjApi = (apiBase: AxiosInstance) => {
  return {
    // Get all active vị trí
    Ser_Inv_StockAdj_SerMstLocation_GetAllActive: async (): Promise<
      ApiResponse<Ser_Mst_Location>
    > => {
      return await apiBase.post<
        Partial<Ser_Mst_Location>,
        ApiResponse<Ser_Mst_Location>
      >("/SerMstLocation/GetAllActive", {});
    },

    //  Tìm kiếm
    Ser_Inv_StockAdj_SearchDL: async (
      param: Partial<Ser_Inv_StockAdj_Search>
    ): Promise<ApiResponse<Ser_Inv_StockAdj_Search>> => {
      const searchParam = {
        ...param,
        FlagPending: param.FlagPending ? "1" : "0",
        FlagFinished: param.FlagFinished ? "1" : "0",
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.StockAdjDateFromTo) {
        searchParam.StockAdjDateFrom = param.StockAdjDateFromTo[0]
          ? `${formatDate(new Date(param.StockAdjDateFromTo[0]))}`
          : "";
        searchParam.StockAdjDateTo = param.StockAdjDateFromTo[1]
          ? `${formatDate(new Date(param.StockAdjDateFromTo[1]))}`
          : "";
      }
      delete searchParam.StockAdjDateFromTo;
      return await apiBase.post<
        Partial<Ser_Inv_StockAdj_Search>,
        ApiResponse<Ser_Inv_StockAdj_Search>
      >(
        param.FlagDataWH
          ? "/SerInvStockAdj/SearchWHDL"
          : "/SerInvStockAdj/SearchDL",
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

    // Tạo mới
    Ser_Inv_StockAdj_CreateDL: async (
      objSer_Inv_StockOutOrderMst: ISer_Inv_StockOutOrderMst,
      objSer_Inv_StockOutOrderDtl: ISer_Inv_StockOutOrderDetail[]
    ): Promise<ApiResponse<any>> => {
      // {
      //   "Ser_Inv_StockOutOrder": {
      //     "Remark": "Điều chuyển kho test"
      //     },
      //   "Lst_Ser_Inv_StockOutOrderDetail": [
      //     {
      //       "PartID": "1532713",
      //       "Quantity": "2",
      //       "BalanceLocationID": 11502,
      //       "InStockLocationID": 197968
      //     },
      //     ]
      // }
      const request = {
        Ser_Inv_StockOutOrder: objSer_Inv_StockOutOrderMst,
        Lst_Ser_Inv_StockOutOrderDetail: objSer_Inv_StockOutOrderDtl,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockAdj/CreateDL",
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

    // Cập nhật
    Ser_Inv_StockAdj_UpdateDL: async (
      objSer_Inv_StockOutOrderMst: ISer_Inv_StockOutOrderMst,
      objSer_Inv_StockOutOrderDtl: ISer_Inv_StockOutOrderDetail[]
    ): Promise<ApiResponse<any>> => {
      // {
      //   "Ser_Inv_StockOutOrder": {
      //     "StockAdjId": "118595",
      //     "StockAdjNo": "VS058-240724-003",
      //     "DealerCode": "HTC",
      //     "StockAdjDate": "2024-07-30",
      //     "UserCreate": "Quyen",
      //     "Status": "1",
      //     "Remark": "Test_Update"
      //     },
      //   "Lst_Ser_Inv_StockOutOrderDetail": [
      //     {
      //       "PartID": "1543206",
      //       "Quantity": "10",
      //       "BalanceLocationID": "14282",
      //       "InStockLocationID": "195786"
      //     }
      //     ]
      // }
      const request = {
        Ser_Inv_StockOutOrder: objSer_Inv_StockOutOrderMst,
        Lst_Ser_Inv_StockOutOrderDetail: objSer_Inv_StockOutOrderDtl,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockAdj/UpdateDL",
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

    // Hoàn thành
    Ser_Inv_StockAdj_FinishDL: async (
      objSer_Inv_StockOutOrderMst: ISer_Inv_StockOutOrderMst,
      objSer_Inv_StockOutOrderDtl: ISer_Inv_StockOutOrderDetail[]
    ): Promise<ApiResponse<any>> => {
      // {
      //   "Ser_Inv_StockOutOrder": {
      //     "StockAdjId": "118595",
      //     "StockAdjNo": "VS058-240724-003",
      //     "DealerCode": "HTC",
      //     "StockAdjDate": "2024-07-30",
      //     "UserCreate": "Quyen",
      //     "Status": "0",
      //     "Remark": "Test_Update"
      //     },
      //   "Lst_Ser_Inv_StockOutOrderDetail": [
      //     {
      //       "PartID": "1543206",
      //       "Quantity": "10",
      //       "BalanceLocationID": "14282",
      //       "InStockLocationID": "195786"
      //     }
      //     ]
      // }

      const request = {
        Ser_Inv_StockOutOrder: objSer_Inv_StockOutOrderMst,
        Lst_Ser_Inv_StockOutOrderDetail: objSer_Inv_StockOutOrderDtl,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockAdj/FinishDL",
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

    // Xóa
    Ser_Inv_StockAdj_DeleteDL: async (
      StockAdjId: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockAdj/DeleteDL",
        {
          StockAdjId,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Import excel (import danh sách xe màn hình tạo)
    Ser_Inv_StockAdj_ImportForSerInvStockAdjDL: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTPart/ImportForSerInvStockAdjDL",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    // Export excel template (mẫu file excel import màn hình tạo)
    Ser_Inv_StockAdj_ExportTplForSerInvStockAdjDL: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<any>, ApiResponse<string>>(
        "/SerMSTPart/ExportTplForSerInvStockAdjDL",
        {}
      );
    },

    // Get chi tiết để cập nhật
    Ser_Inv_StockAdj_GetByStockAdjId: async (
      StockAdjId: string,
      FlagDataWH: boolean
    ): Promise<ApiResponse<Ser_Inv_StockAdjResponse>> => {
      return await apiBase.post<
        Partial<string>,
        ApiResponse<Ser_Inv_StockAdjResponse>
      >(
        FlagDataWH
          ? "/SerInvStockAdj/GetByStockAdjIdWHDL"
          : "SerInvStockAdj/GetByStockAdjIdDL",
        {
          StockAdjId,
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
