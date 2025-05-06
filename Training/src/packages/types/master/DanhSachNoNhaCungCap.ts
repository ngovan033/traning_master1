import { SearchParam } from "../clientgate";

export interface SerSupplierDebitPayment {
  SupplierID: string;
  SupplierCode: string;
  SupplierName: string;
  Address: string;
  Deb: string;
  lst_Ser_Mst_Supplier: any;
  lst_Ser_SupplierDebit: any;
  lst_Ser_Payment: any;
  PaymentAmount: string;
  PayPersonName: string;
  PayPersonIDCardNo: string;
  PayDate: string;
  Note: string;
}

export interface Search_SerSupplierDebitPayment extends SearchParam {
  Deb: any;
  IsDebit: any;
  FlagDataWH: any;
}
