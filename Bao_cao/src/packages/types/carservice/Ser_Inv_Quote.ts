export interface Ser_Inv_Quote_Search {
  QuoteNo: string; //	Số báo giá
  CusName: string; //	Tên khách hàng
  CreatedDateFromTo: Date[] | string[];
  CreatedDateFrom?: string; //	Từ ngày
  CreatedDateTo?: string; //	Đến ngày
  FlagCreated: boolean; //	Mới tạo
  FlagSOO: boolean; //	Đã có phiếu xuất
  FlagSO: boolean; //	Đã xuất
  FlagSOAdjusted: boolean; //	Đã điều chỉnh phiếu xuất		Thiết kế thiếu
  FlagSORejected: boolean; //	Đã hủy phiếu xuất
  Ft_PageIndex?: number; //
  Ft_PageSize?: number; //
  FlagDataWH?: boolean; //		Lấy dữ liệu lịch sử 		Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH
}

export interface Ser_Inv_Quote {
  QuoteID: string; //	ID Báo giá
  DealerCode: string; //	Mã đại lý
  QuoteNo: string; //	Số bảo giá
  Creator: string; //	Người tạo
  CreatedDate: string; //	Ngày tạo
  Remark: string; //
  Status: string; //	Trạng thái
  LogLUDateTime: string; //
  Note: string; //
  LogLUBy: string; //
  IsActive: string; //
  ReceiveName: string; //	Người nhận
  CusID: string; //	ID khách hàng
  PaymentMethod: string; //	Hình thức thanh toán
  CreatedBy: string; //
  CusName: string; //	Tên KH
  Address: string; //	Địa chỉ
  Phone: string; //	Sđt		Dùng view trên màn hình quản lý
  Tel: string; //
  Mobile: string; //
  Fax: string; //
  SumAmount: string; // 	Giá trị báo giá
  StockOutOrderID: string; //	ID lệnh xuất kho
  StockOutOrderNo: string; //	Số lệnh xuất kho
  StockOutID: string; //	ID phiếu xuất
  SOStatus: string; //
  StatusValue: string; //	Trạng thái mã
  StatusText: string; //	Trạng thái tiếng việt
}

// --------------------------------------------------
// Response Data

export interface Ser_Inv_QuoteResponse {
  Lst_Ser_Inv_Quote: Ser_Inv_Quote_Mst[];
  Lst_Ser_Inv_QuotePartItems: Ser_Inv_Quote_Dtl[];
}
// Mst - màn chi tiết
export interface Ser_Inv_Quote_Mst {
  QuoteID: string; //	ID Báo giá
  DealerCode: string; //	Mã đại lý
  QuoteNo: string; //	Số bảo giá
  Creator: string; //	Người tạo
  CreatedDate: string; //	Ngày tạo
  Remark: string; //
  Status: string; //	Trạng thái
  LogLUDateTime: string; //
  Note: string; //
  LogLUBy: string; //
  IsActive: string; //
  ReceiveName: string; //	Người nhận
  CusID: string; //	ID khách hàng
  PaymentMethod: string; //	Hình thức thanh toán
  CreatedBy: string; //
  CusName: string; //	Tên KH
  Address: string; //	Địa chỉ
  Phone: string; //
  Tel: string; //	Điện  thoại
  Mobile: string; //	Di động
  Fax: string; //	Fax
  SumAmount: string; // 	Giá trị báo giá
  StockOutOrderID: string; //	ID lệnh xuất kho
  StockOutOrderNo: string; //	Số lệnh xuất kho
  StockOutID: string; //	ID phiếu xuất
  SOStatus: string; //
  StatusValue: string; //	Trạng thái mã
  StatusText: string; //	Trạng thái tiếng việt
  RecieveName: string; // Người nhận
}

// Detail - màn chi tiết
export interface Ser_Inv_Quote_Dtl {
  ItemID: string; //	ID bản ghi
  PartID: string; //	ID phụ tùng
  PartCode: string; //	Mã phụ tùng
  VieName: string; //	Tên phụ tùng
  Quantity: string; //	Số lượng
  Price: string; //	Giá
  PartPriceID: string; //	ID giá
  Unit: string; //	ĐƠn vị
  VAT: string; //	VAT
  Note: string; //
  Factor: string; //	Hệ số
  QuoteID: string; //	ID báo giá
  Amount: string; //	Thành tiền
  FlagInTST: string; //	Cờ phụ tùng TST
  FlagIsTST: string; //	Cờ phụ tùng TST
}
