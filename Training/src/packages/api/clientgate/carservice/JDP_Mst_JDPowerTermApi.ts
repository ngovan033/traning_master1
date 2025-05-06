import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import {
  IJDP_Mst_JDPowerTermModify,
  JDP_Mst_JDPowerTerm,
  JDP_Mst_JDPowerTermResponse,
  JDP_Mst_JDPowerTerm_Search,
} from "@/packages/types/carservice/JDP_Mst_JDPowerTerm";

export const useJDP_Mst_JDPowerTerm = (apiBase: AxiosInstance) => {
  return {
    // Tìm kiếm
    JDP_Mst_JDPowerTerm_SearchHQ: async (
      param: Partial<JDP_Mst_JDPowerTerm_Search>
    ): Promise<ApiResponse<JDP_Mst_JDPowerTerm>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
      };

      return await apiBase.post<
        Partial<JDP_Mst_JDPowerTerm_Search>,
        ApiResponse<JDP_Mst_JDPowerTerm>
      >(
        param.FlagDataWH
          ? "/JDPMstJDPowerTerm/SearchWHHQ"
          : "/JDPMstJDPowerTerm/SearchHQ",
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

    // Xóa
    JDP_Mst_JDPowerTerm_Delete: async (JDPTermCode: string) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/JDPMstJDPowerTerm/DeleteHQ",
        {
          JDPTermCode,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Export excel
    JDP_Mst_JDPowerTerm_ExportHQ: async ({
      JDPTermCode,
      FlagDataWH,
    }: {
      JDPTermCode: string;
      FlagDataWH: boolean;
    }) => {
      return await apiBase.post<
        Partial<{
          JDPTermCode: string;
          FlagDataWH: boolean;
        }>,
        ApiResponse<string>
      >(
        FlagDataWH
          ? "/JDPMstJDPowerTerm/ExportWHHQ"
          : "/JDPMstJDPowerTerm/ExportHQ",
        {
          JDPTermCode,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    //  Chi tiết
    JDP_Mst_JDPowerTerm_GetByJDPTermCode: async ({
      JDPTermCode,
      FlagDataWH,
    }: {
      JDPTermCode: string;
      FlagDataWH: boolean;
    }): Promise<ApiResponse<JDP_Mst_JDPowerTermResponse>> => {
      return await apiBase.post<
        Partial<{
          JDPTermCode: string;
          FlagDataWH: boolean;
        }>,
        ApiResponse<JDP_Mst_JDPowerTermResponse>
      >(
        FlagDataWH
          ? "/JDPMstJDPowerTerm/GetByJDPTermCodeWHHQ"
          : "/JDPMstJDPowerTerm/GetByJDPTermCodeHQ",
        {
          JDPTermCode,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Import excel (import danh sách xe màn hình tạo)
    JDP_Mst_JDPowerTerm_Import: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/JDPMstJDPowerTerm/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    // Export excel template (mẫu file excel import màn hình tạo)
    JDP_Mst_JDPowerTerm_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<JDP_Mst_JDPowerTerm>,
        ApiResponse<string>
      >("/JDPMstJDPowerTerm/ExportTemplate", {});
    },

    // Tạo mới
    JDP_Mst_JDPowerTerm_Create: async (
      objJDP_Mst_JDPowerTermMst: IJDP_Mst_JDPowerTermModify,
      objLst_JDP_Mst_JDPowerTermDtl: { VIN: string }[]
    ): Promise<ApiResponse<any>> => {
      // {
      //     "JDP_Mst_JDPowerTerm": {
      //         "JDPTermCode": "HUNGLD.TEST.CG.002",
      //         "JDPTermName": "HUNGLD.TEST.CG.002",
      //         "JDPStartDate": "2024-08-01",
      //         "JPDEndDate": "2024-08-31"
      //     }
      // }
      const request = {
        JDP_Mst_JDPowerTerm: objJDP_Mst_JDPowerTermMst,
        Lst_JDP_Mst_JDPowerTermDtl: objLst_JDP_Mst_JDPowerTermDtl,
      };

      return await apiBase.post<any, ApiResponse<JDP_Mst_JDPowerTermResponse>>(
        "/JDPMstJDPowerTerm/CreateHQ",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Cập nhật
    JDP_Mst_JDPowerTerm_Update: async ({
      JDPTermCode,
      JDPTermName,
      FlagActive,
    }: {
      JDPTermCode: string;
      JDPTermName: string;
      FlagActive: string;
    }): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<JDP_Mst_JDPowerTermResponse>>(
        "/JDPMstJDPowerTerm/UpdateHQ",
        {
          JDPTermCode,
          JDPTermName,
          FlagActive,
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
