import { SearchParam } from "../clientgate";

export interface Ser_Insurance {
  InsNo: string;
  InsVieName: string;
  InsEngName: string;
  Address: string;
  TelePhone: string;
  Fax: string;
  Email: string;
  Website: string;
  TaxCode: string;
  Description: string;
  DeaLerCode: string;
  FinishDate: string;
  PaymentLimit: number;
}

export interface ISer_Insurance_Search {
  CusID: string | null;
  CarID: string | null;
  InsuranceAmount: number | null;
}

export interface Search_Ser_Insurance_Param extends SearchParam {
  InsNo: string;
  InsVieName: string;
  Address: string;
  StartDate: any
  FinishDate: any
  StartDateFromTo: any
}
