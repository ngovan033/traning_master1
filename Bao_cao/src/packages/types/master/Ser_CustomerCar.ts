import { SearchParam } from "../clientgate";

export interface Ser_CustomerCar {
  CusID: string;
  CusName: string;
  Sex: boolean;
  Address: string;
  Tel: string; // Di động
  Mobile: string; // Điện thoại
  Fax: string;
  Email: string;
  Website: string;
  Bank: string;
  BankAccountNo: string;
  TaxCode: string;
  IsContact: boolean;
  Note: string;
  ContName: string;
  ContSex: boolean;
  ContAddress: string;
  ContTel: string;
  ContMobile: string;
  ContFax: string;
  ContEmail: string;
  CusTypeID: string;
  OrgTypeID: string;
  DOB: string;
  IDCardNo: string;
  ProvinceCode: string;
  DistrictCode: string;
  IsActive: boolean;

  // Báo giá
  // Thông tin Khách hàng ( ToanNH - 20240729)
  CusTel: string; // SĐT KH
  CusMobile: string; // Di động KH
  CusAddress: string; // Địa chỉ KH
  ProvinceName: string; // Thành phố
  DistrictName: string; // Quận huyện
  CusSex: string; // Giới tính
  SexText: string; // Tên giới tính
  // Thông tin Xe
  CarID: string; // ID xe
  ModelID: string; // ID model
  ModelName: string; // Tên model
  PlateNo: string; // Biển số
  FrameNo: string; // Số khung
  EngineNo: string; // Số máy
  ProductYear: string; // Đời xe
  ColorCode: string; // Màu
  TradeMarkCode: string; // Hiệu xe
  MemberCarID: string; // Mã hội viên
  //
  CardNo: string; // Số thẻ hội viên
  MemberNo: string; // Mã hội viên
}

export interface SearchSer_CustomerCarParam extends SearchParam {
  CarID?: string;
  SalesCarID?: string;
  InsNo?: string;
  IsActive?: string;
  //
  CusId: string;
  CusID: string;
  CusName: string;
  DealerCode: string;
  Address: string;
  Phone: string;
  PlateNo: string;
  FrameNo: string;
  EngineNo: string;
  TradeMarkCode: string;
  ModelId: string;
}
