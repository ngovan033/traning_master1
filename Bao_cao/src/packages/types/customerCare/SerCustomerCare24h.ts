import { SearchParam } from "../clientgate";

export interface SerCustomerCare24h {
  CusName: string;
  CusSex: string;
  Address: string;
  Tel: string;
  Mobile: string;
  Email: string;
  ContName: string;
  ContAddress: string;
  ContTel: string;
  ContMobile: string;
  ContEmail: string;
  RONo: string;
  CheckInDate: string;
  ActualDeliveryDate: string;
  PlateNo: string;
  FrameNo: string;
  TradeMarkCode: string;
  ModelName: string;
  ContactDate: string;
  StatusText: string;
  Sex: string;
  Status: string;
  ROID: string;
  CusCareID: string;
  FinishedDate: string;
  YourCarProblem24: any;
  YourSatisfyQSv24: any;
  FyourCSSH24: any;
  YourRIWN24: any;
  WFBasicNeeds24: any;
  C24Note: any;
  YourHopeOfOur24: any;
  lst_Ser_CustomerCareMace: SerCustomerCare24h[];
  lst_Ser_CustomerCare24h: any[];
}

export interface Search_SerCustomerCare24h_Param extends SearchParam {
  CusName: string;
  Address: string;
  PlateNo: string;
  FrameNo: string;
  CheckInDateFrom: string;
  CheckInDateTo: string;
  ActualDeliveryDateFrom: string;
  ActualDeliveryDateTo: string;
  Sex: string;
  TradeMarkCode: string;
  ModelName: string;
  FlagPending: any;
  FlagContactedINeedFB: any;
  FlagContactedIFNoB: any;
  FlagReject: any;
  CheckInDateFromTo: [any, any];
  ActualDeliveryDateFromTo: [any, any];
  FlagWH: any;
}
