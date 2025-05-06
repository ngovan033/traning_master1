import { SearchParam } from "../clientgate";

export interface SerApp {
  AppID: string;
  AppNo: string;
  ReceptionFNo: string;
  PlateNo: string;
  CusName: string;
  CusTel: string;
  TrademarkNameModel: string;
  UserName: string;
  Creator: string;
  Source: string;
  EngineerName: string;
  CVDVCode: string;
  CavityName: string;
  CavityID: string;
  AppDateTimeFrom: string;
  AppTimeFrom: string;
  NewAppStatus: string;
  AppStatus: string;

  AppTypeCode: string;
  ModelName: string;
  CusRequest: string;
  Customer: any;

  ///

  lst_Ser_App: SerApp[];
  lst_Ser_AppServiceItems: any[];
  lst_Ser_AppPartItems: any[];
}

export interface Search_SerApp_Param extends SearchParam {
  DealerCode: any;
  AppDateTimeFrom: any;
  AppDateTimeTo: any;
  PlateNo: any;
  CusName: any;
  Creator: any;
  FlagMoiTao: any;
  FlagXacNhan: any;
  FlagDaLienHe: any;
  FlagTiepNhan: any;
  FlagHuy: any;
  FlagWH?: any;
  AppDateTimeFromTo: [any, any];
}
