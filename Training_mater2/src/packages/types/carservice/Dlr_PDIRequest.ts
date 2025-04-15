export interface Dlr_PDIRequest_HQ {
  DealerCode: string; // 	Mã đại lý
  DlrPDIReqNo: string; // 	Số YC PDI
  CreatedDate: string; // 	Ngày tạo
  ApprovedDate: string; // 	Ngày duyệt
  Remark: string; // 	Nội dung
  DlrPDIReqStatus: string; // 	Trạng thái
  CreatedBy: string; // 	Người tạo
  FlagAccessory: string; // 	Phụ kiện
  VinTotal: string; // 	Số lượng xe
  VinFTotal: string; // 	Số xe hoàn thành
}
export interface Dlr_PDIRequest_DL {
  DealerCode: string; // 	Mã đại lý
  DlrPDIReqNo: string; // 	Số YC PDI
  CreatedDate: string; // 	Ngày tạo
  ApprovedDate: string; // 	Ngày duyệt
  Remark: string; // 	Nội dung
  DlrPDIReqStatus: string; // 	Trạng thái
  CreatedBy: string; // 	Người tạo
  FlagAccessory: string; // 	Phụ kiện
  VinTotal: string; // 	Số lượng xe
  VinFTotal: string; // 	Số xe hoàn thành
}
export interface Dlr_PDIRequest_Search {
  DlrPDIReqNo: string; //	Số YC PDI
  CreatedDateFromTo: string[] | Date[]; //		Ngày tạo từ
  CreatedDateFrom: string | Date; //		Ngày tạo từ
  CreatedDateTo: string | Date; //		Ngày tạo đến
  VIN: string; //		VIN
  DlrContractNo: string; //		Số hợp đồng
  DealerCode: string; //		Đại lý
  DlrPDIReqStatus: string; //		Trạng thái
  Ft_PageIndex: number; //
  Ft_PageSize: number; //
  FlagDataWH: boolean; //		Lấy dữ liệu lịch sử 		Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH
}

// --------------------------------------------------
// Response Data
export interface Dlr_PDIRequestResponse {
  lst_Dlr_PDIRequest: Dlr_PDIRequest[];
  lst_Dlr_PDIRequestDtl: Dlr_PDIRequestDtl[];
}
// Mst - màn chi tiết
export interface Dlr_PDIRequest {
  DealerCode: string; // 	Mã đại lý
  DlrPDIReqNo: string; // 	Số YC PDI
  CreatedDate: string; // 	Ngày tạo
  ApprovedDate: string; // 	Ngày duyệt
  Remark: string; // 	Nội dung
  DlrPDIReqStatus: string; // 	Trạng thái
  CreatedBy: string; // 	Người tạo
  FlagAccessory: string; // 	Phụ kiện
  VinTotal: string; // 	Số lượng xe
  VinFTotal: string; // 	Số xe hoàn thành
}

// Detail - màn chi tiết
export interface Dlr_PDIRequestDtl {
  DlrPDIReqNo: string; //	Số YC PDI
  VIN: string; //	VIN
  CVModelCode: string; //	Mã model
  MCMModelName: string; //	Tên model
  CVSpecCode: string; //	Mã Spec
  MCSSpecDescription: string; //	Tên Spec
  MCCColorNameVn: string; //	Tên màu TV
  DCDDlvExpectedDate: string; //	Ngày giao xe dự kiến
  DlrContractNo: string; //	Số hợp đồng
  DDCFullName: string; //	Tên khách hàng
  RONo: string; //	Số báo giá PDI
  ROCreatedDate: string; //	Ngày tạo BG PDI
  ROStatus: string; //	TT báo giá
}
