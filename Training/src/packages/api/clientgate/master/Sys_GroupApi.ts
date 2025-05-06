import {
  ApiResponse,
  Sys_UserControl,
  SearchParam,
  SearchSys_UserControl,
} from "@packages/types";
import { AxiosInstance } from "axios";

interface Sys_UserControlData {
  DataList: Sys_UserControl[];
}

export const useSys_GroupApi = (apiBase: AxiosInstance) => {
  return {
    Sys_Group_Search: async (
      param: SearchSys_UserControl
    ): Promise<ApiResponse<Sys_UserControlData>> => {
      return await apiBase.post<
        SearchSys_UserControl,
        ApiResponse<Sys_UserControlData>
      >("/SysGroup/SearchByKeywordDL", {
        ...param,
      });
    },

    Sys_Group_Delete: async (
      code: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post<string, ApiResponse<Sys_UserControl>>(
        "/SysGroup/Delete",
        {
          GroupCode: code,
        }
      );
    },

    Sys_Group_Create: async (
      data: Partial<Sys_UserControl>
    ): Promise<ApiResponse<Partial<Sys_UserControl>>> => {
      return apiBase.post<
        Partial<Sys_UserControl>,
        ApiResponse<Sys_UserControl>
      >("/SysGroup/Create", {
        ...data,
      });
    },

    Sys_Group_Update: async (
      data: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/SysGroup/Update", {
        ...data,
      });
    },
    Sys_Group_GetByGroupMapSGSU: async (
      key: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/MapSGSU/GetByGroupCodeDL", {
        GroupCode: key,
      });
    },
    Sys_Group_GetByGroupMapSGSO: async (
      key: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/MapSGSO/GetByGroupCodeDL", {
        GroupCode: key,
      });
    },
    MapSGSU_Control_SaveDL: async (
      data: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/MapSGSU/SaveDL", {
        strJson: JSON.stringify(data),
      });
    },
    MapSGSO_Control_SaveDL: async (
      data: any
    ): Promise<ApiResponse<Sys_UserControl>> => {
      return await apiBase.post("/MapSGSO/SaveDL", {
        strJson: JSON.stringify(data),
      });
    },
  };
};
