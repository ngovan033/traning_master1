// ================== 160. Quản lý kỳ khảo sát ==============

// * Search Admin
export interface JDP_Mst_JDPowerTerm_Search {
  JDPTermCode: string;
  FlagActive: string;
  Ft_PageIndex: number;
  Ft_PageSize: number;
  FlagDataWH: boolean; // Lấy dữ liệu lịch sử
}
// * Admin
// JDPTermCode // Mã kỳ khảo sát
// JDPTermName // Nội dung
// JDPStartDate // Thời gian bắt đầu
// JPDEndDate // Thời gian kết thúc
// FlagActive // Trạng thái
// CreatedDate // Ngày tạo
// CreatedBy // Người tạo
// LogLUDateTime
// LogLUBy

export interface JDP_Mst_JDPowerTerm {
  JDPTermCode: string;
  JDPTermName: string;
  JDPStartDate: string;
  JPDEndDate: string;
  FlagActive: boolean;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}
// * Get Detail
export interface JDP_Mst_JDPowerTermResponse {
  lst_JDP_Mst_JDPowerTerm?: JDP_Mst_JDPowerTermMst[];
  lst_JDP_Mst_JDPowerTermDtl?: JDP_Mst_JDPowerTermDtl[];
}
// Master
export interface JDP_Mst_JDPowerTermMst {
  JDPTermCode: string;
  JDPTermName: string;
  JDPStartDate: string;
  JPDEndDate: string;
  FlagActive: string;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}
// Detail
export interface JDP_Mst_JDPowerTermDtl {
  JDPTermCode: string;
  VIN: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

//
export interface IJDP_Mst_JDPowerTermModify {
  JDPTermCode: string;
  JDPTermName: string;
  JDPStartDate: string;
  JPDEndDate: string;
}
