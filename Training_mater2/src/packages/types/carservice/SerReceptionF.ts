import { SearchParam } from "../clientgate";

export interface SerReceptionF {
  ReceptionFNo: string;
  CreatedDateTime: string;
  CreatedBy: string;
  Remark: string;
  ReceptionFStatus: string;
  CusID: string;
  CarID: string;
  Km: string;
  FuelLevel: string;
  CusRequest: string;
  DealerCode: string;
  DeliveryDateTime: string;
  DeliveryBy: string;
  AppStatus: string;
  BackRepairStatus: string;
  WarrantlyStatus: string;
  InsuaranceStatus: string;
  BodyPaintFilePath: string;
  AppId: string;
  CardNo: string;
  MemberNo: string;
  CardType: string;
  RemarkErrOrther: string;
  LevelOfInspection: string;
  PlateNo: string;
  TradeMarkCode: string;
  TradeMarkName: string;
  ModelID: string;
  ModelName: string;
  ColorCode: string;
  Frameno: string;
  EngineNo: string;
  ProductYear: string;
  OwnerName: string;
  CusName: string;
  CusAddress: string;
  CusTel: string;
  CusMobile: string;
  RONo: string;
  md_DistrictCode: string;
  md_DistrictName: string;
  mp_ProvinceCode: string;
  mp_ProvinceName: string;
  mstd_DealerCode: string;
  mstd_DealerName: string;
}

export interface Search_SerReceptionF_Param extends SearchParam {
  CreatedDateTimeFrom: any;
  CreatedDateTimeTo: any;
  PlateNo: string;
  CusName: string;
  ReceptionFStatus: string;
  DealerCode: string;
  CreatedDateTimeFromTo: [any, any];
  FlagWH: any;
}
