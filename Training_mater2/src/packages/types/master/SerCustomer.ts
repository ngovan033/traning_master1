import { SearchParam } from "../clientgate";

export interface SerCustomer {
  CusName: string;
  Tel: string;
  Mobile: string;
  Address: string;
  CusID: string;
  Sex: string;
  Fax: string;
  Email: string;
  TaxCode: string;
  DealerCode: string;
}

export interface Search_SerCustomer_Param extends SearchParam {
  CusName: string;
}
