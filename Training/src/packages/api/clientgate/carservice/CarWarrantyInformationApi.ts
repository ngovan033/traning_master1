import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface CarWarrantyInformation_Search {
  PlateNo: string;
  VIN: string;
  FlagDataWH: boolean | string;
}

export interface Car_Warranty_Information {
  FullName: string; // Khách hàng sở hữu
  PhoneNo: string; // Điện thoại
  IDCardNo: string; // Giấy tờ tùy thân
  ProvinceName: string; // Tỉnh/TP
  DistrictName: string; // Quận/Huyện
  Address: string; // Địa chỉ
  PlateNo: string; // Biển số
  VIN: string; // Số khung
  EngineNo: string; // Số máy
  TradeMarkCode: string; // Hiệu xe
  ModelName: string; // Model
  ColorName: string; // Màu xe
  BatteryNo: string; // Mã bình Acquy
  SerialNo: string; // Mã AVN
  DeliveryDate: string | Date; // Ngày bảo hành
  WarrantyExpiresDate: string; // Ngày hết hạn bảo hành
  CusConfirmedWarrantyDate: string | Date; // Ngày KH XN bảo hành
  WarrantyKM: string; // KM giới hạn BH
}

export interface Car_Warranty_InformationDtl {
  WrtReneCateName: string; // Nội dung gia hạn bảo hành
  WrtReneDate: string; // Ngày gia hạn bảo hành
  Remark: string; // Ghi chú
  LogLUDateTime: string; // Ngày cập nhật cuối cùng
}

export interface CarWarrantyInformationRecord {
  lst_Car_Warranty_Information: Car_Warranty_Information[];
  lst_Car_Warranty_InformationDtl: Car_Warranty_InformationDtl[];
}

export const useCarWarrantyInformationApi = (apiBase: AxiosInstance) => {
  return {
    CarWarrantyInformation_GetByPlateNoVIN: async (
      params: CarWarrantyInformation_Search
    ): Promise<ApiResponse<CarWarrantyInformationRecord>> => {
      return await apiBase.post<
        CarWarrantyInformationRecord,
        ApiResponse<CarWarrantyInformationRecord>
      >(
        params.FlagDataWH === "1"
          ? "/CarWarrantyInformation/GetWHByPlateNoVIN"
          : "/CarWarrantyInformation/GetByPlateNoVIN",
        {
          ...params,
        }
      );
    },
  };
};
