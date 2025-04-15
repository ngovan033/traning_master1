export interface SearchRONPP_Search {
  DealerCode: string;
  CheckInDateFromTo: Date[];
  CheckInDateFrom: string;
  CheckInDateTo: string;
  ActualDeliveryDateFromTo: Date[] | null[];
  ActualDeliveryDateFrom: string;
  ActualDeliveryDateTo: string;
  PlateNo: string;
  FrameNo: string;
  FlagChoSua: boolean;
  FlagDangSua: boolean;
  FlagRepaired: boolean;
  FlagCheckEnd: boolean;
  FlagPaid: boolean;
  FlagFinished: boolean;
  FlagReject: boolean;
  FlagKhongDung: boolean;
  Ft_PageIndex: number;
  Ft_PageSize: number;
  FlagDataWH: boolean; // Lấy dữ liệu lịch sử
}

export interface SearchRONPP {
  CarID: string;
  RORONo: string;
  RONo: string;
  ROID: string;
  PlateNo: string;
  FrameNo: string;
  CusName: string;
  ColorCode: string;
  TrademarkNameModel: string;
  Creator: string;
  CheckInDate: string;
  PlanedDeliveryDate: string;
  ActualDeliveryDate: string;
  PaidCreatedDate: string;
  StatusName: string;
  CusRequest: string;
}
