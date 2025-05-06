import { ApiResponse } from "@/packages/types";
import {
  SearchSer_CustomerCarParam,
  Ser_CustomerCar,
} from "@/packages/types/master/Ser_CustomerCar";
import { AxiosInstance } from "axios";

export const useSer_CustomerCarApi = (apiBase: AxiosInstance) => {
  return {
    Ser_CustomerCar_GetAllActive: async (): Promise<
      ApiResponse<Ser_CustomerCar>
    > => {
      return await apiBase.post<any, ApiResponse<Ser_CustomerCar>>(
        "/SerCustomerCar/GetAllActive",
        {}
      );
    },
    Ser_Customer_SearchDL: async (
      params: Partial<SearchSer_CustomerCarParam>
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerCarParam>,
        ApiResponse<Ser_CustomerCar>
      >("/SerCustomer/SerCustomerCarSearchDL", {
        ...params,
        // Ft_PageSize: params.Ft_PageSize == 0 ? 100 : params.Ft_PageSize
      });
    },
    Ser_CustomerCar_SearchDL: async (
      params: Partial<SearchSer_CustomerCarParam>
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<any, ApiResponse<Ser_CustomerCar>>(
        "/SerCustomerCar/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_CustomerCar_Create: async (
      data: any
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<any, ApiResponse<Ser_CustomerCar>>(
        "/SerCustomerCar/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_CustomerCar_Update: async (
      data: any
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<any, ApiResponse<Ser_CustomerCar>>(
        "/SerCustomerCar/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_CustomerCar_Delete: async (
      params: any
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<any, ApiResponse<Ser_CustomerCar>>(
        "/SerCustomerCar/Delete",
        {
          ...params,
        }
      );
    },
    //Lấy thông tin xe
    Ser_CustomerCar_SerCarSearchDL: async (
      params?: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCustomer/SerCarSearchDL",
        {
          ...params,
        }
      );
    },
  };
};
