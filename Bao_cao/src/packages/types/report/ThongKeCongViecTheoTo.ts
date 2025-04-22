export interface ThongKeCongViecTheoTo {
  ROID: number;
  SerID: number;
  RONO: string;
  Factor: number;
  PLATENO: string; // biển số xe
  SERCODE: string;
  SERNAME: string; // tên công việc
  CHECKINDATE: string; // ngày vào xưởng
  AMOUNT: string;
  STATUSNAME: string;
  lst_Ser_RO_Statistic_Service_ByGroup : any;
}

export interface Search_ThongKeCongViecTheoTo_Params {
  FromDate: string;
  ToDate: string;
  IsChoSua: any;
  IsDangSua: any;
  IsSuaXong: any;
  IsEnd: any;
  IsThanhToanXong: any;
  IsDaGiaoXe: any;
  IsROReject: any;
  IsKhongDung: any;
  FlagDataWH: any;
  FromDateFromTo: any;
}
