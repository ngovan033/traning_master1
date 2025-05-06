import { formatDate } from "@/packages/common/date_utils";
import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_Insurance_Param,
  Ser_Insurance,
} from "@/packages/types/master/Ser_Insurance";
import { AxiosInstance } from "axios";

export const useSer_InsuranceContractApi = (apiBase: AxiosInstance) => {
  return {
    Ser_InsuranceContract_SearchHQ: async (
      params: Partial<Search_Ser_Insurance_Param>
    ): Promise<ApiResponse<Ser_Insurance>> => {
      return await apiBase.post<any, ApiResponse<Ser_Insurance>>(
        "/SerInsuranceContract/SearchHQ",
        {
          ...params,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_InsuranceContract_SearchDL: async (
      params: Partial<Search_Ser_Insurance_Param>
    ): Promise<ApiResponse<Ser_Insurance>> => {
      params.StartDate = params.StartDateFromTo
        ? formatDate(params.StartDateFromTo[0])
        : "";
      params.FinishDate = params.StartDateFromTo
        ? formatDate(params.StartDateFromTo[1])
        : "";
      delete params.StartDateFromTo;
      return await apiBase.post<any, ApiResponse<Ser_Insurance>>(
        "/SerInsuranceContract/SearchDL",
        {
          ...params,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_InsuranceContract_ExportExcel: async (
      params: Partial<Search_Ser_Insurance_Param>
    ): Promise<ApiResponse<any>> => {
      params.StartDate = params.StartDateFromTo
        ? formatDate(params.StartDateFromTo[0])
        : "";
      params.FinishDate = params.StartDateFromTo
        ? formatDate(params.StartDateFromTo[1])
        : "";
      delete params.StartDateFromTo;
      return await apiBase.post<any, ApiResponse<Ser_Insurance>>(
        "/SerInsuranceContract/Export",
        {
          ...params,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_InsuranceContract_Create: async (param: Partial<any>) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInsuranceContract/CreateDL",
        {
          strJson: JSON.stringify({
            ...param,
          }),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Ser_InsuranceContract_Update: async (param: any) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInsuranceContract/UpdateDL",
        {
          strJson: JSON.stringify({
            ...param,
          }),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Ser_InsuranceContract_Delete: async (params: any) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInsuranceContract/DeleteDL",
        {
          strJson: JSON.stringify({
            ...params,
            InActive: 0,
          }),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    // Lấy thông tin bảo hiểm của Khách hàng (Nghiệp vụ báo giá)
    Ser_Insurance_GetByInsNoForRODL: async (
      CusID: string,
      CarID: string,
      InsuranceAmount: number,
    ): Promise<ApiResponse<Ser_Insurance>> => {
      return await apiBase.post<any, ApiResponse<Ser_Insurance>>(
        "/SerInsuranceContract/GetByInsNoForRODL",
        {
          CusID,
          CarID,
          InsuranceAmount,
        }
      );
    },
  };
};
