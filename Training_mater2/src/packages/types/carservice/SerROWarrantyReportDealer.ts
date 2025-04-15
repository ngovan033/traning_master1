import { SearchParam } from "../clientgate";

export interface SerROWarrantyReportDealer {
  StockOutOrderID: string;
  StockOutOrderNo: string;
  StockOutOrderTime: string;
  RequestDeliveryTime: string;
  Priority: string;
  Description: string;
  BackOrderIndex: string;
  Status: string;
  StatusText: string;
  LogLUDateTime: string;
  LogLUBy: string;
  UserCode: string;
  CusID: string;
  ROID: string;
  DealerCode: string;
  StockOutType: string;
  QuoteID: string;
  CreatedDate: string;
  CreatedBy: string;
  CusName: string;
  Address: string;
  Phone: string;
  cusTel: string;
  cusMobile: string;
  PlateNo: string;
  StockNo: string;
  StockName: string;
  RONo: string;
  StockOutID: string;
  WarrantyStatus?: string; // Mã Trạng thái

  lst_Ser_ROWarrantyReport: any[];
  lst_Ser_ROWarrantyReportServiceItems: any[];
  lst_Ser_ROWarrantyReportPartItems: any[];
  lst_Ser_ROWarrantyReportTransaction: any[];
}

export interface Search_SerROWarrantyReportDealer_Param extends SearchParam {
  CusName: string;
  CreatedDateFrom: any;
  CreatedDateTo: any;
  IsPending: any;
  IsSent: any;
  IsConfirmed: any;
  WarrantyStaffInCharge: string;
  IsHTCRevert: any;
  IsAccept: any;
  IsReject: any;
  CreatedDateFromTo: [any, any];
  FrameNo: any;
  PlateNo: any;
  ROWTypeCode: any;
  ROWTypeDtlCode: any;
  FlagWH: any;
  HMCApiStatus: any;
  DealerCode: any;
}

// extend SerROWarrantyReportDealer

export interface Search_SerROWarrantyReportNPP_Param
  extends Search_SerROWarrantyReportDealer_Param {}

export interface SerROWarrantyReportNPP extends SerROWarrantyReportDealer {}

export interface ISer_ROWarrantyReport {
  Lst_Ser_ROWarrantyReport: any[];
  Lst_Ser_ROWarrantyReportPartItems: [];
  Lst_Ser_ROWarrantyReportServiceItems: [];
  Lst_Ser_ROWarrantyReportTransaction: [];
}
