import { SearchParam } from "../clientgate";

export interface SerInvStockOutOrder {
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

  lst_Ser_Inv_StockOutOrderDetail: any[];
  lst_Ser_Inv_StockOutOrder: SerInvStockOutOrder[];
}

export interface Search_SerInvStockOutOrder_Param extends SearchParam {
  StockOutOrderNo: string;
  CusName: string;
  StockOutOrderTimeFrom: string;
  StockOutOrderTimeTo: string;
  FlagPending: any;
  FlagAccept: any;
  FlagRejected: any;
  FlagFinish: any;
  StockOutOrderTimeFromTo: [any, any];
  FlagWH: any;
}
