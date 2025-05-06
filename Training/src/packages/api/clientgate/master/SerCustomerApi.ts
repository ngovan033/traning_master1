import { ApiResponse } from "@/packages/types";
import {
  Search_SerCustomer_Param,
  SerCustomer,
} from "@/packages/types/master/SerCustomer";
import { AxiosInstance } from "axios";

export const useSerCustomerApi = (apiBase: AxiosInstance) => {
  return {
    SerCustomer_SearchForCusInforDL: async (
      params: Partial<Search_SerCustomer_Param>
    ): Promise<ApiResponse<SerCustomer>> => {
      return await apiBase.post<any, ApiResponse<SerCustomer>>(
        "/SerCustomer/SearchForCusInforDL",
        {
          ...params,
        }
      );
    },
    SerCustomer_SaveForCusNormal: async (
      params: Partial<SerCustomer>
    ): Promise<ApiResponse<SerCustomer>> => {
      return await apiBase.post<any, ApiResponse<SerCustomer>>(
        "/SerCustomer/SaveForCusNormal",
        {
          strJson: JSON.stringify(params),
        }
      );
    },
    SerCustomer_GetByCusIDDL: async (
      CusID: string
    ): Promise<ApiResponse<SerCustomer>> => {
      return await apiBase.post<any, ApiResponse<SerCustomer>>(
        "/SerCustomer/GetByCusIDDL",
        {
          CusID: CusID,
        }
      );
    },
    SerCustomerCar_GetByCusIDDL: async (
      CusID: string
    ): Promise<ApiResponse<SerCustomer>> => {
      return await apiBase.post<any, ApiResponse<SerCustomer>>(
        "/SerCustomerCar/GetByCusIDDL",
        {
          CusID: CusID,
        }
      );
    },
    SerCustomerCar_GetDL: async (
      params: any
    ): Promise<ApiResponse<SerCustomer>> => {
      return await apiBase.post<any, ApiResponse<SerCustomer>>(
        "SerCustomerCar/GetDL",
        {
          ...params,
        }
      );
    },

    SerCustomerCar_SaveDL: async (
      params: any
    ): Promise<ApiResponse<SerCustomer>> => {
      return await apiBase.post<any, ApiResponse<SerCustomer>>(
        "SerCustomerCar/SaveDL",
        {
          ...params,
        }
      );
    },

    MstPlateColor_GetAllActive: async (): Promise<ApiResponse<SerCustomer>> => {
      return await apiBase.post<any, ApiResponse<SerCustomer>>(
        "MstPlateColor/GetAllActive",
        {}
      );
    },
  };
};
