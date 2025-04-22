export interface ServiceStatus_Search {
  FlagChoSua: boolean | string; //	Chờ sửa
  FlagDangSua: boolean | string; //	Đang sửa
  FlagRepaired: boolean | string; //	Sửa xong
  FlagCheckEnd: boolean | string; //	K.Tra C.Cùng
  FlagPaid: boolean | string; //	Thanh toán xong
  FlagFinished: boolean | string; //	Đã giao xe
  FlagReject: boolean | string; //	Lệnh hủy
  FlagKhongDung: boolean | string; //	Không dùng
  Ft_PageIndex: number; //
  Ft_PageSize: number; //
  FlagDataWH: boolean; //		Lấy dữ liệu lịch sử 		Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH
}
// RORONo	Số báo giá
// RONo	Số báo giá hệ thống
// ROID	ID báo giá
// PlateNo	Biển số
// CusName	Khách hàng
// ColorCode	Màu xe
// TrademarkNameModel	Hãng - Model
// Creator	CVDV
// CheckInDate	Xe đến
// PlanedDeliveryDate	Hẹn giờ giao xe
// PaidCreatedDate	Ngày thanh toán
// CheckEndDate	Ngày kiểm tra cuối cùng
// StatusName	Tình trạng
// CusRequest	Nội dung công việc
export interface ServiceStatus {
  RORONo: string;
  RONo: string;
  ROID: string;
  PlateNo: string;
  CusName: string;
  ColorCode: string;
  TrademarkNameModel: string;
  Creator: string;
  CheckInDate: string;
  PlanedDeliveryDate: string;
  PaidCreatedDate: string;
  CheckEndDate: string;
  StatusName: string;
  CusRequest: string;
}
