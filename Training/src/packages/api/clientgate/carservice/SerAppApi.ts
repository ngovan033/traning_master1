import { ApiResponse } from "@/packages/types";
import {
  Search_SerApp_Param,
  SerApp,
} from "@/packages/types/carservice/SerApp";
import { AxiosInstance } from "axios";

export const useSerAppApi = (apiBase: AxiosInstance) => {
  return {
    SerApp_SearchDL: async (
      params: Partial<Search_SerApp_Param>
    ): Promise<ApiResponse<SerApp>> => {
      const linkApi =
        params.FlagWH == "1" ? "/SerApp/SearchWHDL" : "/SerApp/SearchDL";

      return await apiBase.post<any, ApiResponse<SerApp>>(linkApi, {
        ...params,
      });
    },
    SerApp_GetByAppIdDL: async ({
      AppID,
      FlagWH,
    }: {
      AppID: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerApp>> => {
      const linkApi =
        FlagWH == "1" ? "/SerApp/GetByAppIdWHDL" : "/SerApp/GetByAppIdDL";

      return await apiBase.post<any, ApiResponse<SerApp>>(linkApi, {
        AppID: AppID,
      });
    },
    SerApp_GetByAppIdHQ: async ({
      AppID,
      FlagWH,
    }: {
      AppID: string;
      FlagWH: string;
    }): Promise<ApiResponse<SerApp>> => {
      const linkApi =
        FlagWH == "1" ? "/SerApp/GetByAppIdWHHQ" : "/SerApp/GetByAppIdHQ";

      return await apiBase.post<any, ApiResponse<SerApp>>(linkApi, {
        AppID: AppID,
      });
    },
    SerApp_SearchHQ: async (
      params: Partial<Search_SerApp_Param>
    ): Promise<ApiResponse<SerApp>> => {
      const linkApi =
        params.FlagWH == "1" ? "/SerApp/SearchWHHQ" : "/SerApp/SearchHQ";

      return await apiBase.post<any, ApiResponse<SerApp>>(linkApi, {
        ...params,
      });
    },
    SerApp_ExportDL: async (
      params: Partial<Search_SerApp_Param>
    ): Promise<ApiResponse<SerApp>> => {
      const linkApi =
        params.FlagWH == "1" ? "/SerApp/ExportWHDL" : "/SerApp/ExportDL";

      return await apiBase.post<any, ApiResponse<SerApp>>(linkApi, {
        ...params,
      });
    },
    SerApp_ExportHQ: async (
      params: Partial<Search_SerApp_Param>
    ): Promise<ApiResponse<SerApp>> => {
      const linkApi =
        params.FlagWH == "1" ? "/SerApp/ExportWHHQ" : "/SerApp/ExportHQ";

      return await apiBase.post<any, ApiResponse<SerApp>>(linkApi, {
        ...params,
      });
    },
    SerApp_CreateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerApp>>("/SerApp/CreateDL", {
        ...params,
      });
    },
    SerApp_UpdateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<SerApp>>("/SerApp/UpdateDL", {
        ...params,
      });
    },
    SerApp_ConfirmDL: async (AppId: string) => {
      return await apiBase.post<any, ApiResponse<SerApp>>("/SerApp/ConfirmDL", {
        AppId: AppId,
      });
    },
    SerApp_CancelDL: async (AppId: string) => {
      return await apiBase.post<any, ApiResponse<SerApp>>("/SerApp/CancelDL", {
        AppId: AppId,
      });
    },
    SerApp_GetForCavityDL: async (param: any) => {
      return await apiBase.post<any, ApiResponse<SerApp>>(
        "/SerApp/GetForCavityDL",
        {
          ...param,
        }
      );
    },
    SerApp_GetForSerCustomerCare72hDL: async (CusCareID: any) => {
      return await apiBase.post<any, ApiResponse<SerApp>>(
        "/SerApp/GetForSerCustomerCare72hDL",
        {
          CusCareID: CusCareID,
        }
      );
    },

    SerRO_GetForSerAppDL: async (ROID: any) => {
      return await apiBase.post<any, ApiResponse<SerApp>>(
        "/SerRO/GetForSerAppDL",
        {
          ROID: ROID,
        }
      );
    },
  };
};
