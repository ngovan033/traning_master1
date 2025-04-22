export interface ThongKeCongViec {
  RONO: string;
  PLATENO: string;
  SERCODE: string;
  SERNAME: string;
  CHECKINDATE: string;
  AMOUNT: string;
  STATUSNAME: string;
  lst_Ser_RO_Statistic_Service : any;
}

export interface Search_ThongKeCongViec_Params {
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
