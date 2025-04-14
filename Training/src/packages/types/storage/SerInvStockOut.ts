import { SearchParam } from "../clientgate";

export interface SerInvStockOut {
  StockOutID: string;
  StockOutNo: string;
  StockOutTime: string;
  RequestDeliveryTime: string;
  Priority: string;
  Description: string;
  BackIndex: string;
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

  Lst_Ser_Inv_StockOut: any[];
  Lst_Ser_Inv_StockOutDetail: any[];
  Lst_Ser_Inv_StockOutOrder: any[];
  Lst_Ser_Inv_StockOutOrderStockOut: [];
}

export interface Search_SerInvStockOut_Param extends SearchParam {
  StockOutDateFrom: any;
  StockOutDateTo: any;
  StockOutType: any;
  StockOutOrderNo: any;
  StockOutNo: any;
  FlagPending: any;
  FlagExcuting: any;
  FlagFinished: any;
  FlagAdjustment: any;
  FlagReject: any;
  StockOutDateFromTo: [any, any];
  FlagWH: any;
}
