export interface List_Req_PartPrice {
  ReqPartPriceNo: string; // 	Số đề nghị
  TSTReqPartPriceID: string; // 	Số đề nghị NCC
  CreateDTime: string; // 	Ngày tạo
  CreateBy: string; // 	Người tạo
  DMSReqPartPriceStatusName: string; // 	Trạng thái đề nghị DMS
  TSTReqPartPriceStatusName: string; // 	Trạng thái đề nghị NCC
  DMSReqPartPriceStatus: string; // 	Mã Trạng thái đề nghị DMS
  TSTReqPartPriceStatus: string; // 	Mã Trạng thái đề nghị NCC
  Description: string; // 	Nội dung
  TSTSentDate: string; // 	Ngày câp nhật NCC
}
export interface Req_PartPrice {
  List_Req_PartPrice: List_Req_PartPrice[];
}

export interface Req_PartPrice_Search {
  ReqPartPriceNo: string; //	Số đề nghị
  CreateDTimeFromTo: string[] | Date[];
  CreateDTimeFrom: string; //	Ngày tạo từ		ClientGate thêm 00:00:00
  CreateDTimeTo: string; //	Ngày tạo đến		ClientGate thêm 23:59:59
  DMSReqPartPriceStatus: string; //	Trạng thái đề nghị DMS
  TSTReqPartPriceStatus: string; //	Trạng thái đề nghị NCC
  DMSPartCode: string; //	Mã vật tư yêu cầu
  Ft_PageIndex: number; //
  Ft_PageSize: number; //
  FlagDataWH: boolean; //		Lấy dữ liệu lịch sử 		Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH
}

// --------------------------------------------------
// Response Data

export interface Req_PartPriceResponse {
  Lst_Req_PartPrice: Req_PartPrice_Mst[];
  Lst_Req_PartPriceDtl: Req_PartPrice_Dtl[];
}
// Mst - màn chi tiết
export interface Req_PartPrice_Mst {
  ReqPartPriceNo: string; // 	Số đề nghị
  TSTReqPartPriceID: string; // 	Số đề nghị NCC
  CreateDTime: string; // 	Ngày tạo
  CreateBy: string; // 	Người tạo
  DMSReqPartPriceStatusName: string; // 	Trạng thái đề nghị DMS
  TSTReqPartPriceStatusName: string; // 	Trạng thái đề nghị NCC
  DMSReqPartPriceStatus: string; // 	Mã Trạng thái đề nghị DMS
  TSTReqPartPriceStatus: string; // 	Mã Trạng thái đề nghị NCC
  Description: string; // 	Nội dung
  TSTSentDate: string; // 	Ngày câp nhật NCC
}

// Detail - màn chi tiết
export interface Req_PartPrice_Dtl {
  ReqPartPriceNo: string; //	Mã vật tư yêu cầu
  DMSPartCode: string; //	Tên vật tư
  VieName: string; //	Tên vật tư
  VINCode: string; //	Số VIN
  DeliveryFormName: string; //	Hình thức đặt hàng
  Remark: string; //	Ghi chú
  TSTPrice: string; //	Đơn giá
  DateEffect: string; //	Ngày áp dụng
  TSTPartCode: string; //	Mã vật tư giao dịch
}
