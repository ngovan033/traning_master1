import { SearchParam } from "../clientgate";

export interface SerCustomerCareMace {
  MaceId: string;
  CusName: string;
  Tel: string;
  Mobile: string;
  Email: string;
  CheckInDate: string;
  PlateNo: string;
  ContName: string;
  ContAddress: string;
  ContEmail: string;
  ContMobile: string;
  ContTel: string;
  TradeMarkCode: string;
  ModelName: string;
  MaceTypeText: string;
  ContactDate: string;
  StatusText: string;
  Km: string;
  MaceRecomentDate: string;
  ApointDate: string;
  Remark: string;
  MaceType: string;
  Status: string;
}

export interface Search_SerCustomerCareMace_Param extends SearchParam {
  CusName: string;
  PlateNo: string;
  FrameNo: string;
  MaceRecomentDateFrom: any;
  MaceRecomentDateTo: any;
  FlagPending: string;
  FlagContacted: string;
  FlagNotContacted: string;
  MaceRecomentDateFromTo: [any, any];
  FlagWH: any;
}
