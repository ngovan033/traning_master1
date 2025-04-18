import { SearchParam } from "../clientgate";

export interface Ser_MST_Part {
  PartID: string;
  PartGroupID: number;
  PartTypeID: string;
  DealerCode: string;
  PartCode: string;
  EngName: string;
  VieName: string;
  Note: string;
  Unit: string;
  Location: string;
  VAT: string;
  Quantity: string;
  MinQuantity: string;
  Cost: string;
  Price: string;
  Model: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FreqUsed: string;
  CusDebt: string;
  CreatedDate: string;
  CreatedBy: string;
  FlagInTST: string;
  Remark: string;
  // phục vụ cho api này SerMSTPart/SearchForInvDL
  LocationId?: string;
  InStockQuantity?: string;
  InStockLocationID?: string;
  // phục vụ cho màn Tạo phiếu nhập kho
  BalanceLocationId: string;
  // phục vụ cho báo giá phụ tùng
  PriceEffect: string;
  // Phục vụ cho Điều chuyển kho
  BalanceLocationID: string;
}
export interface Search_Ser_MST_Part extends SearchParam {
  PartID: string;
  DealerCode: string;
  PartCode: string;
  EngName: string;
  VieName: string;
  CusTypeID: string;
  FreqUsed: string;
  IsActive: string;
  PartGroupID: string;
}
