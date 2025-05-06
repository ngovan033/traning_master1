import { ApiResponse } from "@/packages/types";
import { Ser_Cavity } from "@/packages/types/master/Ser_Cavity";
import { listPrint } from "@/pages/carservice/Repair_Order/utils/common";
import {
  IParamPrintLst_Ser_ROServiceItems,
  ISer_AssignmentWork,
  ISer_AssignmentWorkEngineer,
  Repair_OrderResponse,
  Ser_AssignmentWorkResponse,
  SerROHistory,
  SerROHistoryResponse,
} from "@/pages/carservice/Repair_Order/utils/interface";
import { AxiosInstance } from "axios";

export const useRepair_OrderApi = (apiBase: AxiosInstance) => {
  return {
    // Lấy toàn bộ khoang sửa chữa
    Repair_Order_Ser_Cavity_GetAllActive: async (
      isFNS: boolean
    ): Promise<ApiResponse<Ser_Cavity>> => {
      // Nếu báo giá kết thúc(FNS) thì call API  /SerCavity/GetAllActive
      // còn không thì sẽ call api /SerCavity/GetForSerAssignmentWorkDL
      // vì để phục vụ cho trường hợp view chi tiết với báo giá đã kết thúc

      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        isFNS
          ? "/SerCavity/GetAllActive"
          : "/SerCavity/GetForSerAssignmentWorkDL",
        {}
      );
    },

    // Lấy toàn bộ kĩ thuật viên
    Repair_Order_SerEngineer_GetForSerAssignmentWorkDL: async (): Promise<
      ApiResponse<Ser_Cavity>
    > => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerEngineer/GetForSerAssignmentWorkDL",
        {}
      );
    },

    // Chi tiết lệnh sửa chữa
    Repair_Order_GetByROIDDL: async (
      ROID: string
    ): Promise<ApiResponse<Repair_OrderResponse>> => {
      return await apiBase.post<any, ApiResponse<Repair_OrderResponse>>(
        "/SerRO/GetByROIDDL",
        {
          ROID,
        }
      );
    },

    // Chi tiết lệnh sửa chữa theo typesearch và keyno
    Repair_Order_GetByKeyNoDL: async (
      SearchType: string,
      KeyNo: string
    ): Promise<ApiResponse<Repair_OrderResponse>> => {
      return await apiBase.post<any, ApiResponse<Repair_OrderResponse>>(
        "SerRO/GetByKeyNoDL",
        {
          SearchType,
          KeyNo,
        }
      );
    },

    // Phân công công việc
    Repair_Order_SerAssignmentWork_GetByROIDDL: async (
      ROID: string
    ): Promise<ApiResponse<Ser_AssignmentWorkResponse>> => {
      return await apiBase.post<any, ApiResponse<Ser_AssignmentWorkResponse>>(
        "/SerAssignmentWork/GetByROIDDL",
        {
          ROID,
        }
      );
    },

    // Tạo mới lệnh sửa chữa
    //   if (_statusStage == Constants.Ser_RO_Stage.HasRO
    //     || _statusStage == Constants.Ser_RO_Stage.InGarage
    //     || _statusStage == Constants.Ser_RO_Stage.Repaired
    //     || _statusStage == Constants.Ser_RO_Stage.CheckEnd
    //     || _statusStage == Constants.Ser_RO_Stage.Paid
    //     || _statusStage == Constants.Ser_RO_Stage.RejectRO
    //     || _statusStage == Constants.Ser_RO_Stage.Finished)
    // {
    //     btnTaoLenhSuaChua.Text = "Xem lệnh sửa chữa";
    //     btnTaoLenhSuaChua.Enabled = true;
    // }
    // else
    // {
    //     if (_statusStage == Constants.Ser_RO_Stage.Create
    //     || _statusStage == Constants.Ser_RO_Stage.Print
    //     || _statusStage == Constants.Ser_RO_Stage.NotResponding
    //     || _statusStage == Constants.Ser_RO_Stage.Wait4Part
    //     || _statusStage == Constants.Ser_RO_Stage.HasPart)
    //     {
    //         btnTaoLenhSuaChua.Text = "Tạo lệnh sửa chữa";
    //         btnTaoLenhSuaChua.Enabled = true;
    //     }
    // }
    Repair_Order_CreateRODL: async (
      ROID: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/CreateRODL",
        {
          ROID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Kiểm tra cuối cùng
    // Ser_RO.Status:RPRD và tất cả các bản ghi trạng thái = 1
    Repair_Order_UpdateStatusToCheckEndDL: async (
      ROID: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/UpdateStatusToCheckEndDL",
        {
          ROID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Hủy lệnh sửa chữa
    // Ser_RO.Status:RPRD, PAID, FNS các trạng thái này thì không được hủy
    Repair_Order_UpdateStatusToRejectRODL: async (param: {
      ROID: string;
      RejectDate: string;
      RejectNote: string;
    }): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/UpdateStatusToRejectRODL",
        {
          ROID: param.ROID,
          RejectDate: param.RejectDate,
          RejectNote: param.RejectNote,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Cập nhật lệnh sửa chữa
    Repair_Order_UpdateRODL: async (
      ROID: string,
      LevelOfInspection: string
    ): Promise<ApiResponse<any>> => {
      const request = {
        Ser_RO: {
          ROID,
          LevelOfInspection,
        },
        Lst_Ser_ROServiceItems: null,
        Lst_Ser_ROPartItems: null,
      };
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/UpdateRODL",
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

    // Cập nhật tình trạng sửa chữa
    Repair_Order_Update_ServiceItemsStatusRODL: async (
      ROID: string,
      objSer_ROServiceItems: {
        ItemID: string;
        Status: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      //     Update tình trạng OK của DS công việc
      // 1: Ser_RO.Status:RPRD và có bản ghi trạng thái != 1 thì được edit, nếu tất cả các bản ghi đã là 1 thì không được edit nữa
      // 2: Ser_RO.Status:HRO, INGA
      const request = {
        Ser_RO: {
          ROID,
        },
        Lst_Ser_ROServiceItems: objSer_ROServiceItems.map((item) => {
          return {
            ItemID: item.ItemID,
            Status: item.Status,
          };
        }),
      };
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerRO/Update_ServiceItemsStatusRODL",
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

    // Tạo mới phân công công việc
    Repair_Order_SerAssignmentWork_CreateDL: async (
      objSer_AssignmentWork: ISer_AssignmentWork,
      objSer_AssignmentWorkEngineer: ISer_AssignmentWorkEngineer[]
    ): Promise<ApiResponse<any>> => {
      const request = {
        Ser_AssignmentWork: objSer_AssignmentWork,
        Lst_Ser_AssignmentWorkEngineer: objSer_AssignmentWorkEngineer,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerAssignmentWork/CreateDL",
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

    // Cập nhật phân công công việc
    // Nếu có các loại công việc(ROType): BDD, SCC, PDI, SPK ==> có phân công sửa chữa chung
    // Nếu có các loại công việc(ROType): SCS ==> có phân công sửa chữa sơn
    // Nếu có các loại công việc(ROType): SCD ==> có phân công sửa chữa đồng
    // CEND, RPRD, FNS, REJ: chỉ view
    Repair_Order_SerAssignmentWork_UpdateDL: async (
      objSer_AssignmentWork: ISer_AssignmentWork,
      objSer_AssignmentWorkEngineer: ISer_AssignmentWorkEngineer[]
    ): Promise<ApiResponse<any>> => {
      const request = {
        Ser_AssignmentWork: objSer_AssignmentWork,
        Lst_Ser_AssignmentWorkEngineer: objSer_AssignmentWorkEngineer,
      };

      return await apiBase.post<any, ApiResponse<any>>(
        "/SerAssignmentWork/UpdateDL",
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

    // Lấy chi tiết lịch sử sửa chữa
    Repair_Order_GetForROReject: async ({
      ROID,
      Status,
    }: {
      ROID: string;
      Status: string;
    }): Promise<ApiResponse<SerROHistoryResponse>> => {
      return await apiBase.post<any, ApiResponse<SerROHistoryResponse>>(
        "/SerROHistory/GetForROReject",
        {
          ROID,
          Status,
        }
      );
    },

    // Mẫu in Lệnh sửa chữa
    //     47. Lệnh sửa chữa: RepairOrderController.
    // 1. In RO:
    // 	* RepairOrder/PrintSerRODL

    // 2. In Phiếu PDI:
    // 	* RepairOrder/PrintSerROPDIFontDL

    // 3. Phiếu điều tra tiền chuẩn đoán:
    // 	* RepairOrder/PrintSerROPhieuTieuChuanDoanDL

    // 4. CheckSheet Bảo Dưỡng:
    // 	* RepairOrder/PrintSerROPhieuCheckSheetBaoDuongDL

    // 5. Phiếu checksheet bảo dưỡng định kỳ EV:
    // 	* RepairOrder/PrintSerROPhieuCheckSheetBaoDuongEVDL

    // 6. Phiếu KT chất lượng đại tu động cơ:
    // 	* RepairOrder/PrintSerROKTCLDTDongCoDL

    // 7. Kiểm tra chất lượng đại tu hộp số:
    // 	* RepairOrder/PrintSerROKTCLDTHopSoDL

    // 8. Phiếu kiểm tra cuối bảo dưỡng/SCC:
    // 	* RepairOrder/PrintSerROKTCBDSCCDL

    // 9. Phiếu kiểm tra cuối SCC EV:
    // 	* RepairOrder/PrintSerROKTCBDSCCEVDL

    // 10. Phiếu KT chất lượng sửa chữa đồng sơn:
    // 	* RepairOrder/PrintSerROKTCLBODYDL

    // 11. Bảng KTCLXX (BM.01):
    // 	* RepairOrder/PrintSerROBangKTCLXXBM01DL

    // 12. Bảng KTCLXX (BM.02):
    // 	* RepairOrder/PrintSerROBangKTCLXXBM02DL

    // 13. Bảng KTCLXX (BM.03):
    // 	* RepairOrder/PrintSerROBangKTCLXXBM03DL

    // 14. Bảng KTCLXX EV:
    // 	* RepairOrder/PrintSerROBangKTCLXXEVDL
    Repair_Order_Print: async (
      ROID: string,
      type: string,
      Lst_Ser_ROServiceItems: any
    ): Promise<ApiResponse<SerROHistoryResponse>> => {
      const data = Lst_Ser_ROServiceItems.map(
        ({ ItemID, NguyenNhan, KetQua }: IParamPrintLst_Ser_ROServiceItems) => {
          return {
            ItemID,
            NguyenNhan,
            Result: KetQua, // sửa lại theo client gate update
          };
        }
      );
      const request = {
        Ser_RO: {
          ROID: ROID,
        },
        Lst_Ser_ROServiceItems: data,
      };
      return await apiBase.post<any, ApiResponse<SerROHistoryResponse>>(
        `/RepairOrder/${type}`,
        {
          strJson: JSON.stringify(request),
        }
      );
    },
  };
};
