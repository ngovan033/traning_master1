import { SearchParam } from "../clientgate";

export interface SerCustomerCareBth {
  CareBthId: string;
  CusName: string;
  DateBth: string;
  Tel: string;
  Mobile: string;
  Email: string;
  PlateNo: string;
  TradeMarkCode: string;
  ModelName: string;
  Status: string;
  StatusText: string;
  ContactDate: string;
  Remark: string;
}

export interface Search_SerCustomerCareBth_Param extends SearchParam {
  CusName: string;
  DOBFrom: any;
  DOBTo: any;
  FlagPending: string;
  FlagContacted: string;
  FlagNotContacted: string;
  DOBFromTo: [any, any];
  FlagWH: any;
}
