import { AxiosInstance } from "axios";

export const useMstSerAppTypeApi = (apiBase: AxiosInstance) => {
  return {
    MstSerAppType_GetAllActive: async (): Promise<any> => {
      return await apiBase.post<any, any>("/MstSerAppType/GetAllActive", {});
    },
  };
};
