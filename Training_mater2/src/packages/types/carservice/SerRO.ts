import { SearchParam } from "../clientgate";

export interface SerRO {}

export interface Search_SerRO_Param extends SearchParam {
  CheckInDateFrom: string;
  CheckInDateTo: string;
  PlateNo: string;
  RONo: string;
  CusName: string;
}
