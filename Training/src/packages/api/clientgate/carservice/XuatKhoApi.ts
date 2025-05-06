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

export const asyncData = (data: any) => {
  const promise = new Promise((r, j) => {
    try {
      setTimeout(() => {
        r(data);
      }, 1000);
    } catch (ex) {
      j(ex);
    }
  });
  return promise;
};

export const listKhachHang = Array.from({ length: 10 }, (x, y) => {
  return [
    {
      Idx: faker.random.numeric(),
      Code: faker.random.alphaNumeric(6).toUpperCase(),
      Name: faker.name.fullName(),
    },
  ];
});

export const listKhoXuat = Array.from({ length: 10 }, (x, y) => {
  return [
    {
      Idx: faker.random.numeric(),
      Code: faker.random.alphaNumeric(6).toUpperCase(),
      Name: faker.name.fullName(),
    },
  ];
});

export const listRefType = [
  {
    Code: "DHBanNgoai",
    Name: "DHBanNgoai",
  },
  {
    Code: "VTSuaChua",
    Name: "VTSuaChua",
  },
  {
    Code: "VTNgoaiBaoGia",
    Name: "VTNgoaiBaoGia",
  },
];

export const useXuat_Kho = (apiBase: AxiosInstance) => {
  return {
    Xuat_Kho_SeqSoPhieuXuat: async (): Promise<any> => {
      const promise = new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            resolve({
              code: faker.random.alphaNumeric(6).toUpperCase(),
            });
          }, 2000);
        } catch (ex) {
          reject({
            isSuccess: false,
          });
        }
      });
      return await promise;
    },

    Xuat_Kho_CheckLicense: async (): Promise<any> => {
      const promise = new Promise((resolve, reject) => {
        try {
          resolve({
            isSuccess: true,
          });
        } catch (ex) {
          reject({
            isSuccess: false,
          });
        }
      });
      return await promise;
    },

    Xuat_Kho_GenSeqSoPhieuNhap: async (): Promise<any> => {
      const promise = new Promise((resolve, reject) => {
        try {
          resolve(
            `${faker.random
              .alphaNumeric(6)
              .toUpperCase()}_${faker.random.numeric()}`
          );
        } catch (ex) {
          reject(ex);
        }
      });
      return await promise;
    },

    Xuat_Kho_Create: async (param: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<string>>(
        "/RptCpnCampaignResultCall/Export",
        {
          ...param,
        }
      );
    },

    Xuat_Kho_SearchLoaiXuatKho: async (
      param: any
    ): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 50 }, (x, y) => {
            return {
              MaLoaiXuatKho: faker.random.alpha(10),
              TenLoaiXuatKho: faker.database.engine(),
            };
          });

          Array.from({ length: 10 }, (x, idx) => {
            data.push({
              MaLoaiXuatKho: `MaLoaiXuatKho${idx}`, //
              TenLoaiXuatKho: `TenLoaiXuatKho${idx}`,
            });
          });

          if (param.key) {
            const result = data.filter((item: any) => {
              return item.TenLoaiXuatKho.trim()
                .toLowerCase()
                .includes(param.key.trim().toLowerCase());
            });

            return r(result);
          } else {
            return r(data);
          }
          return data;
        } catch (e) {
          j(e);
          console.error(e);
        }
      });
    },

    Xuat_Kho_SearchKhoXuat: async (param: any): Promise<ApiResponse<any>> => {
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

    Xuat_Kho_SearchKhachHang: async (param: any): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          let data: any = Array.from({ length: 50 }, (x, y) => {
            return {
              MaKhachHang: faker.random.alpha(10),
              TenKhachHang: faker.database.engine(),
            };
          });

          Array.from({ length: 10 }, (x, idx) => {
            data.push({
              MaKhachHang: `MaKhachHang${idx}`, //
              TenKhachHang: `TenKhachHang${idx}`,
            });
          });

          if (param.key) {
            const result = data.filter((item: any) => {
              return item.TenKhachHang.trim()
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

    Xuat_Kho_SoRefNoSearch: async (param: any): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const resp: any = {
            isSuccess: true,
            DataList: Array.from({ length: 10 }, (x, idx) => {
              return {
                SoDonHang: `SoDonHang${idx}`, //
                MaKhachHang: `MaKhachHang${idx}`, //
                KhachHang: `KhachHang${idx}`, //
                SoHopDong: `SoHopDong${idx}`, //
                SoVIN: `SoVIN${idx}`, //
                NguoiTao: `NguoiTao${idx}`, //
                NgayDuyet: faker.date, //
              };
            }),
            ItemCount: 10,
            PageCount: 1,
            PageIndex: 0,
            PageSize: 10,
          };
          return r(resp);
        } catch (e) {
          j(e);
          console.error(e);
        }
      });
    },

    Xuat_Kho_DonViTinhSearch: async (): Promise<any> => {
      return await new Promise((r, j) => {
        try {
          const resp = [
            {
              value: "cai",
              text: "Cai",
            },
            {
              value: "chiec",
              text: "Chiec",
            },
            {
              value: "VND",
              text: "VNĐ",
            },
          ];
          return r(resp);
        } catch (e) {
          j(e);
          console.error(e);
        }
      });
    },

    Xuat_Kho_SearchViTri: async (): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 100 }, (x, y) => {
            return {
              MaViTri: `MaViTri${y}`,
              TenViTri: `TenViTri${y}`,
            };
          });

          return r(data);
        } catch (e) {
          j(e);
          console.error(e);
        }
      });
    },

    QR_BoxV3_Search: async (param: any): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 100 }, (x, y) => {
            return {
              MaHangHoa: `MaHangHoa${y}`,
              TenHangHoa: `TenHangHoa${y}`,
              TenHangHoaTV: `TenHangHoa${y}`,
              DonViTinh: y % 2 === 0 ? `cai` : y % 3 === 0 ? `chiec` : "VND",
              Desc: `MoTaHangHoa${y}`,
              Img: faker.image.avatar(),
              LoaiHangHoa:
                y % 2 === 0 ? `serial${y}` : y % 3 === 0 ? `lot${y}` : "",
              SoLuong: y,
              ViTriXuat: [],
              ViTriNhap: [],
              TonKho: y,
              GiaVon: y,
              DonGia: y + 1,
              GiamGia: 0,
              ThanhTien: (y + 1) * y - 0,
              GhiChu: `Remark - ${y}`,
              JsonSerial: [],
              JsonLot: [],
            };
          });

          // const result = data.filter((item: any) => {
          //   return item.TenHangHoa.trim()
          //     .toLowerCase()
          //     .includes(param.key.trim().toLowerCase());
          // });
          // return r(result);
          if (param.key) {
            const result = data.filter((item: any) => {
              return item.TenHangHoa.trim()
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

    XuatKho_SearchSerial: async (param: any): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 100 }, (x, y) => {
            return {
              MaSerial: `serial${y}`,
              Serial: `serial${y}`,
              TenSerial: `serial${y}`,
              MaViTri: `MaViTri${y}`,
              TenViTri: `TenViTri${y}`,
            };
          });

          if (param.key) {
            const result = data.filter((item: any) => {
              return item.TenSerial.trim()
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

    XuatKho_SearchLot: async (param: any): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 100 }, (x, y) => {
            return {
              MaLot: `lot${y}`,
              Lot: `lot${y}`,
              TenLot: `lot${y}`,
              MaViTri: `MaViTri${y}`,
              TenViTri: `TenViTri${y}`,
              NgaySanXuat: `20${y < 10 ? `0${y}` : y}-07-09`,
              NgayHetHan: `20${y < 10 ? `0${y}` : y}-07-09`,
              SoLuongTon: y,
              SoLuongXuat: y,
            };
          });

          if (param.key) {
            const result = data.filter((item: any) => {
              return item.TenLot.trim()
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
    Xuat_Kho_SearchProductWithRefNo: async (
      param: any
    ): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 100 }, (x, y) => {
            return {
              MaHangHoa: `MaHangHoa${y}`,
              TenHangHoa: `TenHangHoa${y}`,
              DonViTinh: y % 2 === 0 ? `cai` : y % 3 === 0 ? `chiec` : "VND",
              SoRefNo: `SoRefNo${y}`,
              SoLuongYeuCau: y,
              SoLuongConLai: y + 2,
            };
          });

          if (param.key) {
            const result = data.filter((item: any) => {
              return item.TenHangHoa.trim()
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
