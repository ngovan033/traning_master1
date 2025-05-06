import { ApiResponse } from "@/packages/types";
import StatusServiceAdminPage from "@/pages/carservice/StatusServiceAdmin/StatusServiceAdmin-list";
import { AxiosInstance } from "axios";
export interface IStatusServiceAdmin_SearchDL {
  Ft_PageIndex: number;
  Ft_PageSize: number;
}

export interface StatusServiceAdmin {
  TrademarkNameModel: string;
  PlateNo: string;
  StatusNew: string;
  PlanedDeliveryDate: string;
}
export const useStatusServiceAdminApi = (apiBase: AxiosInstance) => {
  return {
    StatusServiceAdmin_SearchDL: async (
      params: IStatusServiceAdmin_SearchDL
    ): Promise<any> => {
      return await apiBase.post<any, ApiResponse<StatusServiceAdmin>>(
        "/StatusServiceAdmin/SearchDL",
        {
          ...params,
        }
      );
    },
  };
};
