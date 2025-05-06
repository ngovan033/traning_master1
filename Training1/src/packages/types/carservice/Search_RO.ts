export interface Search_RO_Search {
  CheckInDateFromTo: Date[];
  CheckInDateFrom: string | Date; //	Ngày vào từ
  CheckInDateTo: string | Date; //	Ngày vào đến
  PlateNo: string; //	Biển số
  FrameNo: string; //	Số VIN
  CusName: string; //	Tên khách hàng
  FlagChoSua: string | boolean; //	Chờ sửa			PRT, HRO
  FlagDangSua: string | boolean; //	Đang sửa			INGA
  FlagRepaired: string | boolean; //	Sửa xong			RPRD
  FlagCheckEnd: string | boolean; //	K.Tra C.Cùng			CEND
  FlagPaid: string | boolean; //	Thanh toán xong			PAID
  FlagFinished: string | boolean; //	Đã giao xe			FNS
  FlagReject: string | boolean; //	Lệnh hủy			REJ
  FlagKhongDung: string | boolean; //	Không dùng			W4P, HPA, NORE
  Ft_PageIndex: number;
  Ft_PageSize: number;
  FlagDataWH: boolean; // Lấy dữ liệu lịch sử
}

export interface Search_RO {
  RORONo: string; //	Số báo giá
  RONo: string; //	Số báo giá hệ thống
  ROID: string; //	ID báo giá
  PlateNo: string; //	Biển số xe
  FrameNo: string; //	Số khung
  CusName: string; //	Tên khách hàng
  ColorCode: string; //	Màu xe
  TrademarkNameModel: string; //	Hãng - Model
  Creator: string; //	CVDV
  CheckInDate: string; //	Ngày vào
  PlanedDeliveryDate: string; //	Hẹn giờ giao xe
  ActualDeliveryDate: string; //	Ngày giao xe
  PaidCreatedDate: string; //	Ngày thanh toán
  StatusName: string; //	Trạng thái
  CusRequest: string; //	Nội dung công việc
}
