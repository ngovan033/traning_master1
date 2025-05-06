import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useSerMSTROWarrantyTypeApi = (apiBase: AxiosInstance) => {
  return {
    SerMSTROWarrantyType_GetAllActive: async (): Promise<
      ApiResponse<{
        WarrantyStaffInCharge: string;
      }>
    > => {
      return await apiBase.post<
        {
          WarrantyStaffInCharge: string;
        },
        Promise<
          ApiResponse<{
            WarrantyStaffInCharge: string;
          }>
        >
      >("/SerMSTROWarrantyType/GetAllActive", {});
    },

    // ThangPV nâng cấp theo anh Toàn (2025-03-27 11:43)
    SerMSTROWarrantyType_GetAllWarrantyStaffInChargeHQ: async () => {
      return await apiBase.post("/MstDealer/GetAllWarrantyStaffInChargeHQ", {});
    },
    SerMSTROWarrantyType_GetDtlByROWTypeCode: async (ROWTypeCode: string) => {
      return await apiBase.post("/SerMSTROWarrantyType/GetDtlByROWTypeCode", {
        ROWTypeCode: ROWTypeCode,
      });
    },
  };
};
