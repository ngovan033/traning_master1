import { SearchParam } from "../clientgate";

export interface BtlBulletinDealer {
  BulletinNo: string; // Số bản tin
  FileNameAttachment: string; // File đính kèm
  FileAttachment: string; // File đính kèm
  VinNo: string; // Số VIN
  Status: string; // Trạng thái
  Remark: string; // Ghi chú
}

export interface Search_BtlBulletinDealer_Param extends SearchParam {
  VIN: any;
  DealerCode: any;
}
