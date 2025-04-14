import { SearchParam } from "../clientgate";

export interface BtlBulletinHTV {
  BulletinID: any;
  BulletinNo: any;
  BulletinNoHMC: any;
  CreatedDate: any;
  FileNameAttachment: any;
  Remark: any;
  DateExpired: any;
  IsActive: any;
  UserCreate: any;
  CreateDate: any;
  FileAttachment: any;

  Lst_Btl_Bulletin: any[];
  Lst_Btl_Bulletin_VIN: any[];
  Lst_Btl_BulletinDtl: any[];
}

export interface Search_BtlBulletinHTV_Param extends SearchParam {
  CreateDateTo: any;
  CreateDateFrom: any;
  BulletinNo: string;
  VinNo: string;
  CreateDateFromTo: [any, any];
  FlagWH: any;
}
