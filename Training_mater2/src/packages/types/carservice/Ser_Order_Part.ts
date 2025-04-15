export interface List_Ser_Order_Part {
  DealerCode: string; // Mã đại lý
  OrderPartNo: string; // Số đơn hàng
  OrderSuppierNo: string; // Số đơn hàng NCC
  DeliveryFormCode: string; // Hình thức đặt hàng(Mã)
  DeliveryFormName: string; // Hình thức đặt hàng(Tên)
  SupplierID: string; // Nhà cung cấp ID
  msp_SupplierCode: string; // Nhà cung cấp (Mã)
  msp_SupplierName: string; // Nhà cung cấp (Tên)
  CreateDTime: string; // Ngày tạo
  RequestSuppierDate: string; // Ngày gửi ĐH
  ResponseSuppierDate: string; // Ngày xác nhận
  CreateBy: string; // Người tạo
  OrderPartStatus: string; // Trạng thái đơn hàng DMS(Mã)
  OrderPartStatusName: string; // Trạng thái đơn hàng DMS(Tiếng việt)
  SupplierStatus: string; // Trạng thái đơn hàng NCC(Mã)
  SupplierStatusName: string; // Trạng thái đơn hàng NCC(Tiếng việt)
  TotalValOrderAfterVAT: string; // Tổng giá trị
  EstimatedDeliverDate: string; // Ngày giao hàng dự kiến
}
export interface Ser_Order_Part {
  List_Ser_Order_Part: List_Ser_Order_Part[];
}

export interface Ser_Order_Part_Search {
  OrderPartNo: string; // Số đơn hàng
  OrderSuppierNo: string; // Số đơn hàng NCC
  CreateDTimeFromTo: string[] | Date[];
  CreateDTimeFrom: string; // Ngày tạo từ
  CreateDTimeTo: string; // Ngày tạo đến
  SupplierID: string; // Nhà cung cấp
  OrderPartStatus: string; // Trạng thái đơn hàng DMS
  SupplierStatus: string; // Trạng thái đơn hàng NCC
  PartCode: string; // DS phụ tùng
  DealerCode?: string;
  Ft_PageIndex?: number; //
  Ft_PageSize?: number; //
  FlagDataWH?: boolean | string; //		Lấy dữ liệu lịch sử 		Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH
}

// --------------------------------------------------
// Response Data

export interface Ser_Order_PartResponse {
  Lst_Ser_Order_Part: Ser_Order_Part_Mst[];
  Lst_Ser_Order_PartDtl: Ser_Order_Part_Dtl[];
}
// Mst - màn chi tiết
export interface Ser_Order_Part_Mst {
  OrderPartNo: string;
  CreatedDate: string;
  SupplierID: string;
  DeliveryFormCode: string;
  DeliveryLocationCode: string; // Địa điểm nhận hàng
  PartGroupID: string;
  EstimatedDeliverDate: string;
  VIN: string;
  Remark: string;
  FlagTST: string;
  DealerCode: string;
  OrderSuppierNo: string;
  DeliveryFormName: string;
  msp_SupplierCode: string;
  msp_SupplierName: string;
  CreateDTime: string;
  RequestSuppierDate: string;
  smpt_TypeName: string;
  DeliveryLocationName: string;
  ResponseSuppierDate: string;
  CreateBy: string;
  OrderPartStatus: string;
  OrderPartStatusName: string;
  SupplierStatus: string;
  SupplierStatusName: string;
  TotalValOrderAfterVAT: string;
  MDF_DeliveryFormName: string;
}

// Detail - màn chi tiết
export interface Ser_Order_Part_Dtl {
  PartCode: string; // Mã vật tư
  VieName: string; // Tên vật tư
  Unit: string; // Đơn vị tính
  MinQuantity: string; // SL đặt tối thiểu
  PartID: string; // ID vật tư
  QtyOrd: string; // Số lương đặt
  QtyAppr: string; // Số lượng duyệt
  Remark: string; // Ghi chú
  Price: string; //
  UPBeforeDc: string; // Đơn giá trước CK
  TPBeforeDc: string; // Thành tiền trước CK
  DiscountRate: string; // % chiết khấu (CK)
  UPAfterDc: string; // Đơn giá sau CK
  TPAfterDc: string; // Thành tiền sau CK
  VAT: string; // VAT (%)
  ValVAT: string; // Tiền VAT
  TPAfterVAT: string; // Tổng tiền sau VAT
  TotalQuantityInExchangeRate: string;
  TotalQuantityRemain: string;
  TotalQuantityIn: string;
  TotalQuantityRemainExchangeRate: string;
  StockInDateLastest: string;
  //

  //// type dành riêng cho chi tiết để cập nhật
  OrderPartNo: string;
  Part_PartCode: string;
  Part_VieName: string;
  Part_Unit: string;
  Part_MinQuantity: string;
}
