import { ApiResponse } from "@/packages/types";
import {
  TST_Part,
  TST_Part_Search,
} from "@/packages/types/carservice/TST_Part";
import { AxiosInstance } from "axios";

export const useTST_PartApi = (apiBase: AxiosInstance) => {
  return {
    // Tìm kiếm
    TST_Part_Search: async (
      param: Partial<TST_Part_Search>
    ): Promise<ApiResponse<TST_Part>> => {
      return await apiBase.post<
        Partial<TST_Part_Search>,
        ApiResponse<TST_Part>
      >(
        "/TSTPart/Search",
        {
          ...param,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Export excel
    TST_Part_Export: async (listPartCode: string) => {
      return await apiBase.post<Partial<TST_Part_Search>, ApiResponse<string>>(
        "/TSTPart/Export",
        {
          ParCode: listPartCode,
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
