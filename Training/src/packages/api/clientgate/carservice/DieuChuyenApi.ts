import { faker } from "@faker-js/faker";
import { ApiResponse } from "@packages/types";
import { AxiosInstance } from "axios";

export interface ISoRefNo {
  SoDonHang: string;
  MaKhachHang: string;
  KhachHang: string;
  SoHopDong: string;
  SoVIN: string;
  NguoiTao: string;
  NgayDuyet: string;
}

export interface ISoRefNoSearchCondition {
  NgayTu?: string | any;
  NgayDen?: string | any;
  NgayTuDen: string | any;
  TenKhachHang: string;
  SoDonHang: string;
  VIN: string;
  Ft_PageIndex: number;
  Ft_PageSize: number;
}

export const useDieu_Chuyen = (apiBase: AxiosInstance) => {
  return {
    Dieu_Chuyen_SearchKhoXuat: async (
      param: any
    ): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 50 }, (x, y) => {
            return {
              MaKhoXuat: faker.random.alpha(10),
              TenKhoXuat: faker.database.engine(),
            };
          });

          Array.from({ length: 10 }, (x, idx) => {
            data.push({
              MaKhoXuat: `MaKhoXuat${idx}`, //
              TenKhoXuat: `TenKhoXuat${idx}`,
            });
          });

          if (param.key) {
            const result = data.filter((item: any) => {
              return item.TenKhoXuat.trim()
                .toLowerCase()
                .includes(param.key.trim().toLowerCase());
            });
            return r(result);
          } else {
            return r(data);
          }
        } catch (e) {
          j(e);
          console.error(e);
        }
      });
    },
    Dieu_Chuyen_SearchKhoNhap: async (
      param: any
    ): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 50 }, (x, y) => {
            return {
              MaKhoNhap: faker.random.alpha(10),
              TenKhoNhap: faker.database.engine(),
            };
          });

          Array.from({ length: 10 }, (x, idx) => {
            data.push({
              MaKhoNhap: `MaKhoNhap${idx}`, //
              TenKhoNhap: `TenKhoNhap${idx}`,
            });
          });

          if (param.key) {
            const result = data.filter((item: any) => {
              return item.TenKhoNhap.trim()
                .toLowerCase()
                .includes(param.key.trim().toLowerCase());
            });
            return r(result);
          } else {
            return r(data);
          }
        } catch (e) {
          j(e);
          console.error(e);
        }
      });
    },
  };
};
