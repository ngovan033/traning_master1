import { formatDate } from "@/packages/common/date_utils";
import { ApiResponse } from "@/packages/types";
import {
  SearchRONPP,
  SearchRONPP_Search,
} from "@/packages/types/carservice/SearchRONPP";
import { AxiosInstance } from "axios";
import { format } from "date-fns";

export const useSearchRONPPApi = (apiBase: AxiosInstance) => {
  return {
    // Tìm kiếm
    SearchRONPP_SearchHQ: async (
      param: Partial<SearchRONPP_Search>
    ): Promise<ApiResponse<SearchRONPP>> => {
      const searchParam = {
        ...param,
        // ActualDeliveryDateFrom: param.ActualDeliveryDateFrom
        //   ? format(new Date(param.ActualDeliveryDateFrom), "yyyy-MM-dd")
        //   : "",
        // ActualDeliveryDateTo: param.ActualDeliveryDateTo
        //   ? format(new Date(param.ActualDeliveryDateTo), "yyyy-MM-dd")
        //   : "",
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
      if (param.ActualDeliveryDateFromTo) {
        searchParam.ActualDeliveryDateFrom = param.ActualDeliveryDateFromTo[0]
          ? format(new Date(param.ActualDeliveryDateFromTo[0]), "yyyy-MM-dd")
          : "";
        searchParam.ActualDeliveryDateTo = param.ActualDeliveryDateFromTo[1]
          ? format(new Date(param.ActualDeliveryDateFromTo[1]), "yyyy-MM-dd")
          : "";
      }
      delete searchParam.CheckInDateFromTo;
      delete searchParam.ActualDeliveryDateFromTo;

      return await apiBase.post<
        Partial<SearchRONPP_Search>,
        ApiResponse<SearchRONPP>
      >(
        param.FlagDataWH ? "/SearchRONPP/SearchWHHQ" : "/SearchRONPP/SearchHQ",
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

    // Export excel
    SearchRONPP_ExportDL: async (param: Partial<SearchRONPP_Search>) => {
      console.log("🚀 ~ Ser_Order_Part_ExportDL: ~ param:", param);
      const searchParam = {
        ...param,
        // ActualDeliveryDateFrom: param.ActualDeliveryDateFrom
        //   ? format(new Date(param.ActualDeliveryDateFrom), "yyyy-MM-dd")
        //   : "",
        // ActualDeliveryDateTo: param.ActualDeliveryDateTo
        //   ? format(new Date(param.ActualDeliveryDateTo), "yyyy-MM-dd")
        //   : "",
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
      if (param.ActualDeliveryDateFromTo) {
        searchParam.ActualDeliveryDateFrom = param.ActualDeliveryDateFromTo[0]
          ? format(new Date(param.ActualDeliveryDateFromTo[0]), "yyyy-MM-dd")
          : "";
        searchParam.ActualDeliveryDateTo = param.ActualDeliveryDateFromTo[1]
          ? format(new Date(param.ActualDeliveryDateFromTo[1]), "yyyy-MM-dd")
          : "";
      }
      delete searchParam.CheckInDateFromTo;
      delete searchParam.ActualDeliveryDateFromTo;

      return await apiBase.post<Partial<SearchRONPP_Search>, ApiResponse<any>>(
        param.FlagDataWH ? "/SearchRONPP/ExportWHHQ" : "/SearchRONPP/ExportHQ",
        {
          ...searchParam,
        }
      );
    },
  };
};
