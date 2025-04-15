export interface IObjectVisible {
  visibleImportExcel: boolean;
  visibleFormSearch: boolean;
  visibleExportTemplate: boolean;
  visibleDeleteMulti: boolean;
  isHiddenCheckBox: boolean;
  allowInlineEdit: boolean;
  allowDeleting: boolean;
  readOnlyRemark: boolean;
  readOnlyQuantityGrid: boolean;
  readOnlyInStockLocationIdGrid: boolean;
  visibleBtnCreate: boolean;
  visibleBtnUpdate: boolean;
  visibleBtnFinish: boolean;
  visibleBtnDelete: boolean;
}
export interface Ser_Inv_StockAdj_Search {
  StockAdjNo: string; //	Số phiếu điều chuyển
  StockAdjDateFromTo: Date[] | string[];
  StockAdjDateFrom?: string; //	Ngày điều chuyển từ		yyyy-MM-dd
  StockAdjDateTo?: string; //	Ngày điều chuyển đến		yyyy-MM-dd
  FlagPending: boolean; //	Mới tạo
  FlagFinished: boolean; //	Kết thúc
  Ft_PageIndex?: number; //
  Ft_PageSize?: number; //
  FlagDataWH?: boolean; //		Lấy dữ liệu lịch sử 		Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH
}

export interface Ser_Inv_StockAdj {
  StockAdjId: string; //	ID phiếu điều chuyển
  DealerCode: string; //	Mã đại lý
  StockAdjNo: string; //	Số phiếu điều chuyển
  StockAdjDate: string; //	Ngày điều chuyển
  Status: string; //	Mã trạng thái
  UserCreate: string; //	Mã Người điều chuyển
  Remark: string; //	Mô tả/Ghi chú
  LogLUBy: string; //
  LogLUDateTime: string; //
  CreatedDate: string; //	 Ngày tạo
  CreatedBy: string; //	Mã Người tạo
  StatusText: string; //	Tên trạng thái
  UserName: string; //	Tên Người điều chuyển
}

// --------------------------------------------------
// Response Data

export interface Ser_Inv_StockAdjResponse {
  Lst_Ser_Inv_StockAdj: Ser_Inv_StockAdj_Mst[];
  Lst_Ser_Inv_StockAdjDetail: Ser_Inv_StockAdj_Dtl[];
}
// Mst - màn chi tiết
export interface Ser_Inv_StockAdj_Mst {
  StockAdjId: string; //	ID phiếu điều chuyển
  DealerCode: string; //	Mã đại lý
  StockAdjNo: string; //	Số phiếu điều chuyển
  StockAdjDate: string; //	Ngày điều chuyển
  Status: string; //	Mã trạng thái
  UserCreate: string; //	Mã Người điều chuyển
  Remark: string; //	Mô tả/Ghi chú
  LogLUBy: string; //
  LogLUDateTime: string; //
  CreatedDate: string; //	 Ngày tạo
  CreatedBy: string; //	Mã Người tạo
  StatusText: string; //	Tên trạng thái
  UserName: string; //	Tên Người điều chuyển
}

// Detail - màn chi tiết
export interface Ser_Inv_StockAdj_Dtl {
  StockAdjDetailId: string; //	ID phiếu điều chuyển chi tiết
  StockAdjId: string; //	ID phiếu điều chuyển
  Quantity: string; //	Số lượng
  BalanceLocationID: string; //	ID Vị trí tồn
  PartID: string; //	Mã phụ tùng
  InStockLocationId: string; //	ID Vị trí chuyển tới
  LogLUBy: string; //
  LogLUDateTime: string; //
  PartCode: string; //	Mã phụ tùng
  VieName: string; //	Tên phụ tùng
  Unit: string; //	Đơn vị
  BalanceQuantity: string; //	Số lượng tồn
}
