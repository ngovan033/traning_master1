import { formatDate } from "@/packages/common/date_utils";
import { ApiResponse } from "@/packages/types";
import {
  Search_RO,
  Search_RO_Search,
} from "@/packages/types/carservice/Search_RO";
import { AxiosInstance } from "axios";
import { format } from "date-fns";

export const useSearch_ROApi = (apiBase: AxiosInstance) => {
  return {
    Search_RO_SearchDL: async (
      param: Partial<Search_RO_Search>
    ): Promise<ApiResponse<Search_RO>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
        FlagChoSua: param.FlagChoSua ? "1" : "0",
        FlagDangSua: param.FlagDangSua ? "1" : "0",
        FlagRepaired: param.FlagRepaired ? "1" : "0",
        FlagCheckEnd: param.FlagCheckEnd ? "1" : "0",
        FlagPaid: param.FlagPaid ? "1" : "0",
        FlagFinished: param.FlagFinished ? "1" : "0",
        FlagReject: param.FlagReject ? "1" : "0",
        FlagKhongDung: param.FlagKhongDung ? "1" : "0",
      };
      if (param.CheckInDateFromTo) {
        searchParam.CheckInDateFrom = param.CheckInDateFromTo[0]
          ? format(new Date(param.CheckInDateFromTo[0]), "yyyy-MM-dd")
          : "";
        searchParam.CheckInDateTo = param.CheckInDateFromTo[1]
          ? format(new Date(param.CheckInDateFromTo[1]), "yyyy-MM-dd")
          : "";
      }
      delete searchParam.CheckInDateFromTo;
      //   CheckInDateFrom:2024-07-12
      //     CheckInDateTo:2024-07-12
      //     PlateNo:
      //     FrameNo:
      //     CusName:
      //     FlagChoSua:1
      //     FlagDangSua:1
      //     FlagRepaired:1
      //     FlagCheckEnd:1
      //     FlagPaid:1
      //     FlagFinished:1
      //     FlagReject:1
      //     FlagKhongDung:1
      //     Ft_PageIndex:0
      //     Ft_PageSize:10
      return await apiBase.post<
        Partial<Search_RO_Search>,
        ApiResponse<Search_RO>
      >(
        param.FlagDataWH ? "/SearchRO/SearchWHDL" : "/SearchRO/SearchDL",
        {
          ...searchParam,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
  };
};
