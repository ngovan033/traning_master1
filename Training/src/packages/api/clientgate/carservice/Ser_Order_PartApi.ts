import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import { Mst_DeliveryForm } from "@/packages/types/master/Mst_DeliveryForm";
import { formatDate } from "@/packages/common/date_utils";
import {
  Ser_Order_Part,
  Ser_Order_Part_Search,
  Ser_Order_PartResponse,
} from "@/packages/types/carservice/Ser_Order_Part";
import { Ser_Mst_Supplier } from "@/packages/types/master/Ser_Mst_Supplier";
import {
  Mst_DeliveryLocation,
  SearchMst_DeliveryLocationParam,
} from "@/packages/types/master/Mst_DeliveryLocation";
import { Ser_MST_PartGroup } from "@/packages/types/master/Ser_MST_PartGroup";

export interface IApproveTSTDL {
  OrderPartNo: string;
  Remark: string;
}

export interface IApproveDL_Ser_Order_PartMst {
  OrderPartNo: string;
  EstimatedDeliverDate: string;
  RequestSuppierDate: string;
  ResponseSuppierDate: string;
  OrderSuppierNo: string;
  Remark: string;
}

export interface ISer_Order_PartMst {
  OrderPartNo: string;
  CreatedDate: string;
  SupplierID: string;
  DeliveryFormCode: string;
  DeliveryLocationCode: string;
  PartGroupID: string;
  EstimatedDeliverDate: string;
  VIN: string;
  Remark: string;
  FlagTST: string;
}
export interface ISer_Order_PartDtl {
  OrderPartNo: string;
  PartID: string;
  QtyOrd: string;
  Price: string;
  Remark: string;
  UPBeforeDc: string;
  TPBeforeDc: string;
  DiscountRate: string;
  UPAfterDc: string;
  TPAfterDc: string;
  VAT: string;
  ValVAT: string;
  TPAfterVAT: string;
}

export interface ISearchForSerOrderPartDL {
  PartTypeID: string;
  VieName?: string;
  PartCode?: string;
  Keyword?: string;
  FlagTST: string | boolean;
}

export const listOrderPartStatus = [
  {
    value: "",
    text: "Tất cả",
  },
  {
    value: "P",
    text: "Mới tạo",
  },
  {
    value: "A",
    text: "Đã gửi NCC",
  },
  {
    value: "F",
    text: "Hoàn thành",
  },
];
export const listSupplierStatus = [
  {
    value: "",
    text: "Tất cả",
  },
  {
    value: "1",
    text: "Chờ duyệt",
  },
  {
    value: "2",
    text: "Đã duyệt, chờ hoàn thiện",
  },
  {
    value: "4",
    text: "Đã hoàn thiện",
  },
  {
    value: "7",
    text: "Đơn lỗi, chờ kinh doanh điều chỉnh",
  },
];

export interface ICreateStockInDL {
  OrderPartNo: string;
  lstPartID: string[];
}

// 78. Quản lý đơn đặt hàng NCC
export const useSer_Order_PartApi = (apiBase: AxiosInstance) => {
  return {
    // get all list supplier cho màn quản lý
    Ser_Order_Part_Ser_Mst_Supplier_GetAllActive: async (): Promise<
      ApiResponse<Ser_Mst_Supplier>
    > => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_Mst_Supplier>>(
        "/SerMstSupplier/GetAllActive",
        {}
      );
    },

    //  gen code create new  Trường Số đơn hàng:
    Ser_Order_Part_GetSeqForSerOrderPart: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerOrderPart/GetSeqForSerOrderPart",
        {}
      );
    },

    // Trường ncc màn tạo tst
    Ser_Order_Part_GetAllActiveSupplier: async (
      FlagTST: "0" | "1"
    ): Promise<ApiResponse<Ser_Mst_Supplier>> => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_Mst_Supplier>>(
        "/SerMstSupplier/GetForSerOrderPartDL",
        { FlagTST }
      );
    },

    // Get all hình thức đặt hàng
    Ser_Order_Part_DeliveryForm_GetAllActive: async (): Promise<
      ApiResponse<Mst_DeliveryForm>
    > => {
      return await apiBase.post<
        Partial<Mst_DeliveryForm>,
        ApiResponse<Mst_DeliveryForm>
      >("/MstDeliveryForm/GetAllActive", {});
    },

    // Get all địa điểm nhận hàng theo DL // MstDeliveryLocation/GetAllActive
    Ser_Order_Part_DeliveryLocation_GetAllActive: async (): Promise<
      ApiResponse<Mst_DeliveryLocation>
    > => {
      return await apiBase.post<
        Partial<SearchMst_DeliveryLocationParam>,
        ApiResponse<Mst_DeliveryLocation>
      >("/MstDeliveryLocation/GetAllActive", {});
    },

    // Get all phân nhóm vật tư
    Ser_Order_Part_GetForSerOrderPartDL: async (
      FlagTST: "0" | "1"
    ): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<
        Partial<string>,
        ApiResponse<Ser_MST_PartGroup>
      >("/SerMSTPartGroup/GetForSerOrderPartDL", { FlagTST });
    },

    //  Lấy seq để tạo mới TST
    Ser_Order_Part_GetSeqForSerOrderParto: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerOrderPart/GetSeqForSerOrderPart",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    //  Tìm kiếm
    Ser_Order_Part_SearchDL: async (
      param: Partial<Ser_Order_Part_Search>
    ): Promise<ApiResponse<Ser_Order_Part_Search>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreateDTimeFromTo) {
        searchParam.CreateDTimeFrom = param.CreateDTimeFromTo[0]
          ? `${formatDate(new Date(param.CreateDTimeFromTo[0]))} 00:00:00`
          : "";
        searchParam.CreateDTimeTo = param.CreateDTimeFromTo[1]
          ? `${formatDate(new Date(param.CreateDTimeFromTo[1]))} 23:59:59`
          : "";
      }
      delete searchParam.CreateDTimeFromTo;
      return await apiBase.post<
        Partial<Ser_Order_Part_Search>,
        ApiResponse<Ser_Order_Part_Search>
      >(
        param.FlagDataWH
          ? "/SerOrderPart/SearchWHDL"
          : "/SerOrderPart/SearchDL",
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

    // Tìm kiếm HQ
    Ser_Order_Part_SearchHQ: async (
      param: Partial<Ser_Order_Part_Search>
    ): Promise<ApiResponse<Ser_Order_Part_Search>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreateDTimeFromTo) {
        searchParam.CreateDTimeFrom = param.CreateDTimeFromTo[0]
          ? `${formatDate(new Date(param.CreateDTimeFromTo[0]))} 00:00:00`
          : "";
        searchParam.CreateDTimeTo = param.CreateDTimeFromTo[1]
          ? `${formatDate(new Date(param.CreateDTimeFromTo[1]))} 23:59:59`
          : "";
      }
      delete searchParam.CreateDTimeFromTo;
      return await apiBase.post<
        Partial<Ser_Order_Part_Search>,
        ApiResponse<Ser_Order_Part_Search>
      >(
        param.FlagDataWH
          ? "/SerOrderPart/SearchWHHQ"
          : "/SerOrderPart/SearchHQ",
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
    Ser_Order_Part_ExportDL: async (param: Partial<Ser_Order_Part_Search>) => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreateDTimeFromTo) {
        searchParam.CreateDTimeFrom = param.CreateDTimeFromTo[0]
          ? `${formatDate(new Date(param.CreateDTimeFromTo[0]))} 00:00:00`
          : "";
        searchParam.CreateDTimeTo = param.CreateDTimeFromTo[1]
          ? `${formatDate(new Date(param.CreateDTimeFromTo[1]))} 23:59:59`
          : "";
      }
      delete searchParam.CreateDTimeFromTo;
      return await apiBase.post<
        Partial<Ser_Order_Part_Search>,
        ApiResponse<string>
      >(
        "/SerOrderPart/ExportDL",
        {
          ...searchParam,
          // OrderPartNo: param.OrderPartNo, // Số đơn hàng
          // OrderSuppierNo: param.OrderSuppierNo, // Số đơn hàng NCC
          // CreateDTimeFrom: param.CreateDTimeFrom, // Ngày tạo từ
          // CreateDTimeTo: param.CreateDTimeTo, // Ngày tạo đến
          // SupplierID: param.SupplierID, // Nhà cung cấp
          // OrderPartStatus: param.OrderPartStatus, // Trạng thái đơn hàng DMS
          // SupplierStatus: param.SupplierStatus, // Trạng thái đơn hàng NCC
          // PartCode: param.PartCode, // DS phụ tùng
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_Order_Part_ExportHQ: async (param: Partial<Ser_Order_Part_Search>) => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };
      if (param.CreateDTimeFromTo) {
        searchParam.CreateDTimeFrom = param.CreateDTimeFromTo[0]
          ? `${formatDate(new Date(param.CreateDTimeFromTo[0]))} 00:00:00`
          : "";
        searchParam.CreateDTimeTo = param.CreateDTimeFromTo[1]
          ? `${formatDate(new Date(param.CreateDTimeFromTo[1]))} 23:59:59`
          : "";
      }
      delete searchParam.CreateDTimeFromTo;
      return await apiBase.post<
        Partial<Ser_Order_Part_Search>,
        ApiResponse<string>
      >(
        "/SerOrderPart/ExportHQ",
        {
          ...searchParam,
          // OrderPartNo: param.OrderPartNo, // Số đơn hàng
          // OrderSuppierNo: param.OrderSuppierNo, // Số đơn hàng NCC
          // CreateDTimeFrom: param.CreateDTimeFrom, // Ngày tạo từ
          // CreateDTimeTo: param.CreateDTimeTo, // Ngày tạo đến
          // SupplierID: param.SupplierID, // Nhà cung cấp
          // OrderPartStatus: param.OrderPartStatus, // Trạng thái đơn hàng DMS
          // SupplierStatus: param.SupplierStatus, // Trạng thái đơn hàng NCC
          // PartCode: param.PartCode, // DS phụ tùng
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // tìm kiếm màn hình tạo
    Ser_MST_Part_SearchForSerOrderPartDL: async (
      param: ISearchForSerOrderPartDL
    ): Promise<ApiResponse<any>> => {
      console.log("----------param", param);
      return await apiBase.post<ISearchForSerOrderPartDL, ApiResponse<any>>(
        "/SerMSTPart/SearchForSerOrderPartDL",
        {
          ...param,
          FlagTST: param.FlagTST ? "1" : "0",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Import excel (import danh sách xe màn hình tạo)  TST
    Ser_Order_Part_ImportForSerOrderPartTSTDL: async (
      PartGroupID: string,
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      form.append("PartGroupID", PartGroupID);
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTPart/ImportForSerOrderPartTSTDL",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    // Export excel template (mẫu file excel import màn hình tạo) TST
    Ser_Order_Part_ExportTplForSerOrderPartTSTDL: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<Ser_Order_Part>, ApiResponse<string>>(
        "/SerMSTPart/ExportTplForSerOrderPartTSTDL",
        {}
      );
    },

    // Tạo TST
    Ser_Order_Part_CreateTST: async (
      objSer_Order_PartMst: ISer_Order_PartMst,
      objSer_Order_PartDtl: ISer_Order_PartDtl[]
    ): Promise<ApiResponse<any>> => {
      // {
      //   "Ser_Order_Part": {
      //       "OrderPartNo": "VS058.OPN.E7C.13113",
      //       "CreatedDate": "",
      //       "SupplierID": "39286",
      //       "DeliveryFormCode": "2",
      //       "DeliveryLocationCode": "VS0581",
      //       "PartGroupID": "1834",
      //       "EstimatedDeliverDate": "2024-07-15",
      //       "VIN": "RLUD481HBPN001074",
      //       "Remark": "Nhập từ DMS",
      //       "FlagTST": "1",
      //     },
      //   "Lst_Ser_Order_PartDtl": [
      //     {
      //       "OrderPartNo": "VS058.OPN.E7C.13113",
      //       "PartID": "1543209",
      //       "QtyOrd": "2",
      //       "Price": null,
      //       "Remark": "Sl tối thiểu = 1",
      //       "UPBeforeDc": null,
      //       "TPBeforeDc": null,
      //       "DiscountRate": null,
      //       "UPAfterDc": null,
      //       "TPAfterDc": null,
      //       "VAT": null,
      //       "ValVAT": null,
      //       "TPAfterVAT": null,
      //     },
      //     ]
      // }
      const request = {
        Ser_Order_Part: objSer_Order_PartMst,
        Lst_Ser_Order_PartDtl: objSer_Order_PartDtl,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderPart/CreateDL",
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

    // Import màn hình tạo NCC
    Ser_Order_Part_ImportForSerOrderPartDL: async (
      PartGroupID: string,
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      form.append("PartGroupID", PartGroupID);
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTPart/ImportForSerOrderPartDL",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    // export  màn hình tạo NCC
    Ser_Order_Part_ExportTplForSerOrderPartDL: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<Ser_Order_Part>, ApiResponse<string>>(
        "/SerMSTPart/ExportTplForSerOrderPartDL",
        {}
      );
    },

    // Get chi tiết để cập nhật
    Ser_Order_Part_GetByOrderPartNo: async (
      OrderPartNo: string
    ): Promise<ApiResponse<Ser_Order_PartResponse>> => {
      return await apiBase.post<
        Partial<string>,
        ApiResponse<Ser_Order_PartResponse>
      >(
        "/SerOrderPart/GetByOrderPartNo",
        {
          OrderPartNo,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // lưu cập nhật
    Ser_Order_Part_UpdateDL: async (
      objSer_Order_PartMst: ISer_Order_PartMst,
      objSer_Order_PartDtl: ISer_Order_PartDtl[]
    ): Promise<ApiResponse<any>> => {
      const request = {
        Ser_Order_Part: objSer_Order_PartMst,
        Lst_Ser_Order_PartDtl: objSer_Order_PartDtl,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderPart/UpdateDL",
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
    Ser_Order_Part_DeleteDL: async (
      objSer_Order_PartMst: ISer_Order_PartMst,
      objSer_Order_PartDtl: ISer_Order_PartDtl[]
    ): Promise<ApiResponse<any>> => {
      const request = {
        Ser_Order_Part: objSer_Order_PartMst,
        Lst_Ser_Order_PartDtl: objSer_Order_PartDtl,
      };

      // {
      //   "Ser_Order_Part": {
      //       "OrderPartNo": "VS058.OPN.E7F.13117",
      //       "CreatedDate": "",
      //       "SupplierID": "2951",
      //       "DeliveryFormCode": "1",
      //       "DeliveryLocationCode": "VS0581",
      //       "PartGroupID": "214",
      //       "EstimatedDeliverDate": "2024-07-16",
      //       "VIN": null,
      //       "Remark": null,
      //       "FlagTST": "0",
      //     },
      //   "Lst_Ser_Order_PartDtl": [
      //     {
      //       "OrderPartNo": "VS058.OPN.E7F.13117",
      //       "PartID": "126469",
      //       "QtyOrd": "2",
      //       "Price": null,
      //       "Remark": "",
      //       "UPBeforeDc": 250000,
      //       "TPBeforeDc": 500000,
      //       "DiscountRate": 10,
      //       "UPAfterDc": 225000,
      //       "TPAfterDc": 450000,
      //       "VAT": 10,
      //       "ValVAT": 45000,
      //       "TPAfterVAT": 495000,
      //     },
      //     ]
      // }

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderPart/DeleteDL",
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

    // Duyệt (duyệt ở màn cập nhật)
    Ser_Order_Part_ApproveTSTDL: async (
      param: IApproveTSTDL
    ): Promise<ApiResponse<any>> => {
      // OrderPartNo:VS058.OPN.E7F.13118
      // Remark:QuyenTest

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderPart/ApproveTSTDL",
        {
          OrderPartNo: param.OrderPartNo,
          Remark: param.Remark,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Nút duyệt màn hình duyệt riêng (cho phép sửa thông tin)
    Ser_Order_Part_ApproveDL: async (
      objSer_Order_PartMst: IApproveDL_Ser_Order_PartMst,
      objSer_Order_PartDtl: ISer_Order_PartDtl[]
    ): Promise<ApiResponse<any>> => {
      // {
      //   "Ser_Order_Part": {
      //       "OrderPartNo": "VS058.OPN.E7F.13119",
      //       "EstimatedDeliverDate": "2024-07-20",
      //       "RequestSuppierDate": "2024-07-15",
      //       "ResponseSuppierDate": "2024-07-15",
      //       "OrderSuppierNo": "20240715",
      //       "Remark": null,
      //     },
      //   "Lst_Ser_Order_PartDtl": [
      //     {
      //       "OrderPartNo": "VS058.OPN.E7F.13119",
      //       "PartID": "480730",
      //       "QtyOrd": "2",
      //       "QtyAppr": "2",
      //       "Price": null,
      //       "Remark": "",
      //       "UPBeforeDc": 3100000,
      //       "TPBeforeDc": 6200000,
      //       "DiscountRate": 10,
      //       "UPAfterDc": 2790000,
      //       "TPAfterDc": 5580000,
      //       "VAT": 10,
      //       "ValVAT": 558000,
      //       "TPAfterVAT": 6138000,
      //     }
      //     ]
      // }

      const request = {
        Ser_Order_Part: objSer_Order_PartMst,
        Lst_Ser_Order_PartDtl: objSer_Order_PartDtl,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderPart/ApproveDL",
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

    // nút tạo phiếu nhập // SerOrderPart/CreateStockInDL

    Ser_Order_Part_CreateStockInDL: async (
      param: ICreateStockInDL
    ): Promise<ApiResponse<any>> => {
      // {
      //   "Ser_Order_Part": {
      //     "OrderPartNo": "VS058.OPN.E7K.13401"
      //   },
      //   "Lst_Ser_Order_PartDtl": [
      //     {
      //       "OrderPartNo": "VS058.OPN.E7K.13401",
      //       "PartID": 1560709
      //     }
      //   ]
      // }
      const request = {
        Ser_Order_Part: {
          OrderPartNo: param.OrderPartNo,
        },
        Lst_Ser_Order_PartDtl: param.lstPartID.map((item) => {
          return {
            OrderPartNo: param.OrderPartNo,
            PartID: item,
          };
        }),
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerOrderPart/CreateStockInDL",
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
  };
};
