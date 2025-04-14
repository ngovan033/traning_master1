export interface DealerHistoryShareMng_HQ {
  DealerName: string; //	Tên đại lý
  PlateNo: string; //	Biển số xe
  FrameNo: string; //	Số VIN
  NormalizedRONo: string; //	Số RO		view giao diện
  ROID: string; //	ID số BG
  NormalizedCreator: string; //	CVDV
  TradeMarkName: string; //	Hiệu xe
  ModelName: string; //	Model
  ColorCode: string; //	Màu
  CheckInDate: string; //	Ngày vào xưởng
  ActualDeliveryDate: string; //	Ngày giao xe
  CusRequest: string; //	Nội dung công việc
  FlagClaim: string; //	Khiếu nại		Client lưu ý: Chỉ view giao diện nếu tầm nhìn là NPP
}
export interface DealerHistoryShareMng_DL {
  DealerName: string; //	Tên đại lý
  PlateNo: string; //	Biển số xe
  FrameNo: string; //	Số VIN
  NormalizedRONo: string; //	Số RO		view giao diện
  ROID: string; //	ID số BG
  NormalizedCreator: string; //	CVDV
  TradeMarkName: string; //	Hiệu xe
  ModelName: string; //	Model
  ColorCode: string; //	Màu
  CheckInDate: string; //	Ngày vào xưởng
  ActualDeliveryDate: string; //	Ngày giao xe
  CusRequest: string; //	Nội dung công việc
  FlagClaim: string; //	Khiếu nại		Client lưu ý: Chỉ view giao diện nếu tầm nhìn là NPP
}
export interface DealerHistoryShareMng_Search {
  PlateNo: string; //	Biển số
  FrameNo: string; //	Số VIN
  Ft_PageIndex: number; //
  Ft_PageSize: number; //
  FlagDataWH: boolean; //		Lấy dữ liệu lịch sử 		Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH
}

// Popup search tìm khiếu nại
export interface Claim_ByPlateNo {
  ClaimNo: string; //	Số KN
  CreatDate: string; //	Ngày tạo
  ReceiveDate: string; //	Ngày xử lý
  DealerCode: string; //	Đại lý
  CusRequest: string; //	Chi tiết
  ProcessDetail: string; //	Mô tả xử lý
}
// --------------------------------------------------
// // Response Data
// export interface DealerHistoryShareMngResponse {
//   lst_DealerHistoryShareMng: DealerHistoryShareMng[];
//   lst_DealerHistoryShareMngDtl: DealerHistoryShareMngDtl[];
// }
// // Mst - màn chi tiết
// export interface DealerHistoryShareMng {
//   DealerCode: string; // 	Mã đại lý
//   DlrPDIReqNo: string; // 	Số YC PDI
//   CreatedDate: string; // 	Ngày tạo
//   ApprovedDate: string; // 	Ngày duyệt
//   Remark: string; // 	Nội dung
//   DlrPDIReqStatus: string; // 	Trạng thái
//   CreatedBy: string; // 	Người tạo
//   FlagAccessory: string; // 	Phụ kiện
//   VinTotal: string; // 	Số lượng xe
//   VinFTotal: string; // 	Số xe hoàn thành
// }

// // Detail - màn chi tiết
// export interface DealerHistoryShareMngDtl {
//   DlrPDIReqNo: string; //	Số YC PDI
//   VIN: string; //	VIN
//   CVModelCode: string; //	Mã model
//   MCMModelName: string; //	Tên model
//   CVSpecCode: string; //	Mã Spec
//   MCSSpecDescription: string; //	Tên Spec
//   MCCColorNameVn: string; //	Tên màu TV
//   DCDDlvExpectedDate: string; //	Ngày giao xe dự kiến
//   DlrContractNo: string; //	Số hợp đồng
//   DDCFullName: string; //	Tên khách hàng
//   RONo: string; //	Số báo giá PDI
//   ROCreatedDate: string; //	Ngày tạo BG PDI
//   ROStatus: string; //	TT báo giá
// }
