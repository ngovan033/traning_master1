export interface TST_Part_Search {
  PartCode: string;
  Ft_PageIndex: number;
  Ft_PageSize: number;
}

export interface TST_Part {
  TSTPartCode: string; //	Mã PT/Vật tư
  VieName: string; //	Tên vật tư
  Unit: string; //	Đơn vị tính
  MinOrderQuantity: string; //	Số lượng đặt tối thiểu
  TSTPriceList: string; //	Giá niêm yết
  TSTPriceNormal: string; //	Giá thường
  TSTPriceUrgent: string; //	Giá khẩn
  TSTPriceWarranty: string; //	Giá bảo hành
  TaxRate: string; //	VAT (%)
  DongAnhStockStatus: string; //	Tồn kho Đông Anh
  CaiMepStockStatus: string; //	Tồn kho Cái Mép
  HoChiMinhStockStatus: string; //	Tồn kho HCM
  TSTPartCodeNew: string; //	Mã mới
  TSTPartCodeOld: string; //	Mã cũ
  Remark: string; //	Ghi chú
  ModelList: string; //	Loại xe
  Length: string; //
  Width: string; //
  Height: string; //
}
