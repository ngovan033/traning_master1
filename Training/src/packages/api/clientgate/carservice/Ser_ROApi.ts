import { ApiResponse } from "@/packages/types";
import { IRT_Crd_Card } from "@/packages/types/carservice/Crd_Card";
import { IRT_Crd_DealUsePromotion_Save } from "@/packages/types/carservice/Crd_DealUsePromotion";
import { ISer_CusDebit } from "@/packages/types/carservice/Ser_CusDebit";
import {
  ISer_RO_Crd_Card,
  RT_Ser_RO,
  RT_Ser_ROMore,
  Search_Ser_RO_Param,
  Ser_RO,
  Ser_ROMore,
} from "@/packages/types/carservice/Ser_RO";
import { AxiosInstance } from "axios";

export const useSer_ROApi = (apiBase: AxiosInstance) => {
  return {
    // Get thông tin Khách hàng (Trường hợp không phải xe chia sẻ)
    Ser_RO_CheckAndGetMoreInfor: async (
      params: Partial<Search_Ser_RO_Param>
    ) => {
      return await apiBase.post<any, ApiResponse<RT_Ser_ROMore>>(
        "/SerRO/CheckAndGetMoreInfor",
        {
          ...params,
        }
      );
    },
    // Tìm kiếm báo giá theo KeyNo
    // SearchType: Biển số: PLATE_NO;Số VIN: VIN;# Báo giá: QUATATION_NO;# RO: RONO
    // KeyNo
    Ser_RO_GetByKeyNoDL: async (params: Partial<Search_Ser_RO_Param>) => {
      return await apiBase.post<any, ApiResponse<RT_Ser_RO>>(
        "/SerRO/GetByKeyNoDL",
        {
          ...params,
        }
      );
    },
    // Kiểm tra xe có thẻ không
    Ser_RO_CheckCarExistCard: async (
      PlateNo: string,
      FrameNo: string
    ): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "/SerRO/CheckCarExistCard",
        {
          PlateNo: PlateNo,
          FrameNo: FrameNo,
        }
      );
    },

    // Kiểm tra có được sửa báo giá không
    Ser_RO_CheckUserEditROID: async (
      ROID: string
    ): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "/SerRO/CheckUserEditROID",
        {
          ROID: ROID,
        }
      );
    },
    // Truy vấn hội viên
    Ser_RO_MapQueryDealerMemberCreate: async (
      MemberNo: string,
      PhoneNo: string
    ): Promise<ApiResponse<Ser_ROMore>> => {
      return await apiBase.post<any, ApiResponse<Ser_ROMore>>(
        "/SerRO/MapQueryDealerMemberCreate",
        {
          MemberNo: MemberNo,
          PhoneNo: PhoneNo,
        }
      );
    },
    // Thông tin thẻ
    Ser_RO_Crd_CardGetForPromotion: async (
      MemberNo: string
    ): Promise<ApiResponse<IRT_Crd_Card>> => {
      return await apiBase.post<any, ApiResponse<IRT_Crd_Card>>(
        "/SerRO/Crd_CardGetForPromotion",
        {
          MemberNo: MemberNo,
        }
      );
    },
    // Lấy thông tin báo giá theo ROID
    Ser_RO_GetByROIDDL: async (
      ROID: string
    ): Promise<ApiResponse<RT_Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<RT_Ser_RO>>(
        "/SerRO/GetByROIDDL",
        {
          ROID,
        }
      );
    },
    // Lấy thông tin báo giá copy theo ROID
    Ser_RO_CopyByROIDDL: async (
      ROID: string
    ): Promise<ApiResponse<RT_Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<RT_Ser_RO>>(
        "/SerRO/CopyByROIDDL",
        {
          ROID,
        }
      );
    },
    // Lấy thông tin Quyết toán
    Ser_RO_GetInvoiceByROIDDL: async (
      ROID: string
    ): Promise<ApiResponse<RT_Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<RT_Ser_RO>>(
        "/SerRO/GetInvoiceByROIDDL",
        {
          ROID,
        }
      );
    },
    // Lấy thông tin thẻ khi báo giá ở trạng thái CEND
    Ser_RO_GetCardForInvoiceDL: async (
      ROID: string
    ): Promise<ApiResponse<ISer_RO_Crd_Card>> => {
      return await apiBase.post<any, ApiResponse<ISer_RO_Crd_Card>>(
        "/SerRO/GetCardForInvoiceDL",
        {
          ROID,
        }
      );
    },
    // Thông tin thẻ - Ghi nhận ưu đãi
    Ser_RO_DealUsePromotionSave: async (params: any) => {
      return await apiBase.post<
        any,
        ApiResponse<IRT_Crd_DealUsePromotion_Save>
      >("/SerRO/DealUsePromotionSave", {
        ...params,
      });
    },
    // Lưu báo giá
    Ser_RO_CreateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<RT_Ser_RO[]>>(
        "/SerRO/CreateDL",
        {
          ...params,
        }
      );
    },
    // Update báo giá
    Ser_RO_UpdateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>("/SerRO/UpdateDL", {
        ...params,
      });
    },
    // Update báo giá
    Ser_RO_UpdateMaintanceDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "/SerRO/UpdateMaintanceDL",
        {
          ...params,
        }
      );
    },
    // Lưu dự kiến giao xe
    Ser_RO_UpdatePlanedDeliveryDateDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "/SerRO/UpdatePlanedDeliveryDateDL",
        {
          ...params,
        }
      );
    },

    // Không sử dụng
    Ser_RO_UpdateStatusToRespondingDL: async (
      ROID: string
    ): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "SerRO/UpdateStatusToRespondingDL",
        {
          ROID,
        }
      );
    },
    // Chờ phụ tùng
    Ser_RO_UpdateStatusToWait4PartDL: async (
      ROID: string
    ): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "SerRO/UpdateStatusToWait4PartDL",
        {
          ROID,
        }
      );
    },

    // Kết thúc
    Ser_RO_UpdateStatusToFinishedDL: async (
      ROID: string
    ): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "SerRO/UpdateStatusToFinishedDL",
        {
          ROID,
        }
      );
    },
    // Xóa báo giá
    Ser_RO_DeleteDL: async (ROID: string): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>("SerRO/DeleteDL", {
        ROID,
      });
    },
    Ser_RO_DeleteDL_BK: async (params: any) => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>("/SerRO/DeleteDL", {
        ...params,
      });
    },
    // Tạo lệnh sửa chữa: CreateRODL
    Ser_RO_CreateRODL: async (ROID: string): Promise<ApiResponse<Ser_RO>> => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>("SerRO/CreateRODL", {
        ROID,
      });
    },
    // Quyết toán
    // Lấy thông tin quyết toán
    Ser_RO_GetInvoiceByKeyNoDL: async (
      params: Partial<Search_Ser_RO_Param>
    ) => {
      return await apiBase.post<any, ApiResponse<RT_Ser_RO>>(
        "/SerRO/GetInvoiceByKeyNoDL",
        {
          ...params,
        }
      );
    },
    // Thanh toán xong
    Ser_RO_UpdateStatusToPaidDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<Ser_RO>>(
        "/SerRO/UpdateStatusToPaidDL",
        {
          ...params,
        }
      );
    },
    // In báo giá tổng
    Ser_RO_PrintROGeneralDL: async (params): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/PrintROGeneralDL",
        {
          ...params,
        }
      );
    },
    // In Báo giá sửa chữa
    Ser_RO_PrintRORepairDL: async (ROID: string): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/PrintRORepairDL",
        {
          ROID,
        }
      );
    },
    // In Báo giá bảo hiểm
    Ser_RO_PrintROInsuranceDL: async (
      ROID: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/PrintROInsuranceDL",
        {
          ROID,
        }
      );
    },
    // In Báo giá nội bộ
    Ser_RO_PrintROLocalDL: async (ROID: string): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/PrintROLocalDL",
        {
          ROID,
        }
      );
    },
    // In BBNTXX
    Ser_RO_PrintROBBNTDL: async (ROID: string): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>("/SerRO/PrintROBBNTDL", {
        ROID,
      });
    },

    // Xuất excel - Báo giá
    Ser_RO_ExportDL: async (
      ROID: string,
      FlagDataWH: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>("/SerRO/ExportDL", {
        ROID,
        FlagDataWH,
      });
    },

    // Lấy thông ghi nợ quyết toán
    Ser_RO_GetInvoiceDebitByROIDDL: async (
      ROID: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/GetInvoiceDebitByROIDDL",
        {
          ROID,
        }
      );
    },
    // Tạo công nợ
    Ser_RO_CreateInvoiceDebitDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<ISer_CusDebit>>(
        "/SerRO/CreateInvoiceDebitDL",
        {
          ...params,
        }
      );
    },
    // Cập nhật công nợ
    Ser_RO_UpdateInvoiceDebitDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<ISer_CusDebit>>(
        "/SerRO/UpdateInvoiceDebitDL",
        {
          ...params,
        }
      );
    },
    // Xóa công nợ
    Ser_RO_DeleteInvoiceDebitDL: async (
      CusDebitID: string
    ): Promise<ApiResponse<ISer_CusDebit>> => {
      return await apiBase.post<any, ApiResponse<ISer_CusDebit>>(
        "SerRO/DeleteInvoiceDebitDL",
        {
          CusDebitID,
        }
      );
    },
    // Xuất excel - Quyết toán
    Ser_RO_ExportInvoiceDL: async (
      ROID: string,
      PrintType: string,
      FlagOrderByVAT: string,
      FlagDataWH: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/ExportInvoiceDL",
        {
          ROID,
          PrintType,
          FlagOrderByVAT,
          FlagDataWH,
        }
      );
    },
    // In Quyết toán
    Ser_RO_PrintInvoiceDL: async (
      PrintType: string,
      FlagOrderByVAT: string,
      strJson: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/PrintInvoiceDL",
        {
          PrintType,
          FlagOrderByVAT,
          strJson,
        }
      );
    },
    // In phiếu thu
    Ser_RO_PrintInvoiceReceiptDL: async (
      ROID: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/PrintInvoiceReceiptDL",
        {
          ROID,
        }
      );
    },
    // In phiếu giao xe
    Ser_RO_PrintInvoiceExitTicketDL: async (
      ROID: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/PrintInvoiceExitTicketDL",
        {
          ROID,
        }
      );
    },

    // End Quyết toán
    // upload ảnh
    Ser_RO_UploadFileRO: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      return await apiBase.post<any, ApiResponse<any>>(
        "/File/UploadFileRO",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_RO_FileRemoveDLRO: async (FileID: any) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/SerROAttachmentRemoveDL",
        {
          FileID: FileID,
        },

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_RO_AttachmentUploadDL: async (data: any) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/AttachmentUploadDL",
        {
          strJson: JSON.stringify(data),
        },

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    GetAttachmentByROIDDL: async (ROID: string, FlagDataWH: string) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/GetAttachmentByROIDDL",
        {
          ROID: ROID,
          FlagDataWH: FlagDataWH,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_RO_GetInsuranceAttachmentByROIDDL: async (code: any) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/GetInsuranceAttachmentByROIDDL",
        {
          ROID: code,
        }
      );
    },
    Ser_RO_InsuranceAttachmentCreateDL: async (data: any) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/InsuranceAttachmentCreateDL",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    SerCustomerCar_CheckTruyVanDL: async (params: any) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCustomerCar/CheckTruyVanDL",
        {
          ...params,
        }
      );
    },
  };
};
