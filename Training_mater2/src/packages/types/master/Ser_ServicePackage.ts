import { SearchParam } from "../clientgate";

export interface Ser_ServicePackage {
  ServicePackageID: string; // ServicePackageID
  DealerCode: string; // Mã đại lý
  ServicePackageNo: string; // Mã gói dịch vụ
  ServicePackageName: string; // Tên gói dịch vụ
  TakingTime: string; // Thời gian sửa chữa dự kiến
  Description: string; // Mô tả
  Creator: string; //
  CreatedDate: string; // Ngày tạo
  IsPublicFlag: string; // Cờ phạm vi
  LogLUDateTime: string; //
  LogLUBy: string; //
  IsUserBasePrice: string; // Lựa chọn lấy giá ( 1 : Giá chung, 2 : Giá theo gói dịch vụ)
  IsUserBasePriceCaption?: string; // Lựa chọn lấy giá ( 1 : Giá chung, 2 : Giá theo gói dịch vụ)
  CreatedBy: string; //
  strUserBasePrice: string; // Lấy chọn cách lấy giá

  Ser_ServicePackage: any;
  Lst_Ser_ServicePackageServiceItems: any;
  Lst_Ser_ServicePackagePartItems: any;


}

export interface RT_Ser_ServicePackage {
  Ser_ServicePackage: any;
  Lst_Ser_ServicePackageServiceItems: any;
  Lst_Ser_ServicePackagePartItems: any;
  Lst_Ser_ROServiceItems: any;
  Lst_Ser_ROPartItems: any;
}

export interface SearchSer_ServicePackageParam extends SearchParam {
  ServicePackageID: string;
  ServicePackageNo: string;
  ServicePackageName: string;
  IsPublicFlag: string;
  CreatedDateFrom: string;
  CreatedDateTo: string;
  TakingTimeFrom: string;
  TakingTimeTo: string;
  Creator: string;
  DealerCode?: string;
}
