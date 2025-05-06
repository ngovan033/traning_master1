import { ApiResponse, FlagActiveEnum } from "@/packages/types";
import {
  SearchSer_Inv_StockParam,
  Ser_Inv_Stock,
} from "@/packages/types/master/Ser_Inv_Stock";
import { AxiosInstance } from "axios";

export const useSer_Inv_PartPriceApi = (apiBase: AxiosInstance) => {
  return {
    //SearchHQ
    Ser_Inv_PartPrice_SearchHQ: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerInvPartPrice/SearchHQ",
        {
          ...params,
        }
      );
    },
    Ser_Inv_PartPrice_SearchDL: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerInvPartPrice/SearchDL",
        {
          ...params,
        }
      );
    },

    //Create
    Ser_Inv_PartPrice_Create: async (
      params: any
    ): Promise<ApiResponse<Ser_Inv_Stock>> => {
      return await apiBase.post<
        Partial<SearchSer_Inv_StockParam>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvPartPrice/Create", {
        strJson: JSON.stringify(params),
      });
    },
    //Update
    Ser_Inv_PartPrice_Update: async (
      params: any
    ): Promise<ApiResponse<Ser_Inv_Stock>> => {
      return await apiBase.post<
        Partial<SearchSer_Inv_StockParam>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvPartPrice/Update", {
        strJson: JSON.stringify(params),
      });
    },

    //Delete
    Ser_Inv_PartPrice_Delete: async (
      code: any
    ): Promise<ApiResponse<Ser_Inv_Stock>> => {
      return await apiBase.post<
        Partial<SearchSer_Inv_StockParam>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvPartPrice/Delete", {
        PartPriceID: code,
      });
    },

    //Export template
    Ser_Inv_PartPrice_ExportTemplate: async (): Promise<
      ApiResponse<string>
    > => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvPartPrice/ExportTemplate",
        {}
      );
    },

    //Import excel
    Ser_Inv_PartPrice_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerInvPartPrice/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    //ExportHQ
    Ser_Inv_PartPrice_ExportHQ: async (
      params?: Partial<SearchSer_Inv_StockParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerInvPartPrice/ExportHQ",
        {
          ...params,
        }
      );
    },

    //ExportDL
    Ser_Inv_PartPrice_ExportDL: async (
      params?: Partial<SearchSer_Inv_StockParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerInvPartPrice/ExportDL",
        {
          ...params,
        }
      );
    },
  };
};
