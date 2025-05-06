type CustomerTypeListDataSource = {
  CusTypeID: number;
  CusTypeName: string;
};

type ProvinceListDataSource = {
  ProvinceCode: string;
  ProvinceName: string;
};

type DistrictListDataSource = {
  DistrictCode: string;
  DistrictName: string;
};

type TradeMarkCodeListDataSource = {
  TradeMarkCode: string;
  TradeMarkName: string;
};

type ModelCodeListDataSource = {
  ModelID: number;
  ModelName: string;
};

/**
 * Thông tin khách hàng và xe
 */
export type CustomerCar = {
  /**
   * Loại tổ chức (Vd: Tư nhân, cơ quan nhà nước, ...)
   */
  CustomerTypeListDataSource: CustomerTypeListDataSource[];
  /**
   * Tỉnh/TP
   */
  ProvinceListDataSource: ProvinceListDataSource[];
  /**
   * Quận/Huyện
   */
  DistrictListDataSource: DistrictListDataSource[];
  /**
   * Hãng xe (Vd: Honda, Toyota, Hyundai...)
   */
  TradeMarkCodeListDataSource: TradeMarkCodeListDataSource[];
  /**
   * Model xe (Vd: Civic, CRV, City...)
   */
  ModelCodeListDataSource: ModelCodeListDataSource[];
  /**
   * List hãng bảo hiểm
   */
  InsuranceDataSource: any[];
  /**
   * List màu biển số
   */
  PlateColorDataSource: any[];
  /**
   * Loại khách hàng
   * 1: Cá nhân
   * 2: Tổ chức
   */
  CusPersonType: "1" | "2";
  /**
   * Mã loại tổ chức
   */
  CusTypeID: string | null;
  /**
   * Giới tính
   * 1 - true : Nam.
   * 0 - false : Nữ.
   */
  Sex: boolean | "1" | "0" | null;
  /**
   * Ngày sinh
   */
  DOB: string | null;
  /**
   * Di động
   */
  Mobile: string | null;
  /**
   * Email
   */
  Email: string | null;
  /**
   *
   * Tên khách hàng
   */
  CusName: string;
  /**
   * Điện thoại
   */
  Tel: string | null;
  /**
   * Website
   */
  Website: string | null;
  /**
   * Mã tỉnh/TP
   */
  ProvinceCode: string;
  /**
   * Mã quận/huyện
   */
  DistrictCode: string;
  /**
   * Fax
   */
  Fax: string | null;
  /**
   * Mã số thuế
   */
  TaxCode: string | null;
  /**
   * Số CMND / Hộ chiếu / Thẻ căn cước
   */
  IDCardNo: string | null;
  /**
   * Địa chỉ
   */
  Address: string;
  /**
   * Tên người liên lạc
   */
  ContName: string;
  /**
   * Số điện thoại người liên lạc
   */
  ContTel: string | null;
  /**
   * Địa chỉ người liên lạc
   */
  ContAddress: string | null;
  /**
   * Di động người liên hệ
   */
  ContMobile: string;
  /**
   * Giới tính người liên hệ
   */
  ContSex: boolean | "1" | "0" | null;
  /**
   * Email người liên hệ
   */
  ContEmail: any;
  /**
   * Cờ khách hàng cũng là người liên lạc
   */
  IsContact: boolean;
  /**
   * Biển số xe
   */
  PlateNo: string | null;
  /**
   * Số khung
   */
  FrameNo: string;
  /**
   * Số km hiện tại
   */
  CurrentKm: number | null;
  /**
   * Ngày hết hạn bảo hành
   */
  WarrantyExpiresDate: string | Date | null;
  /**
   * Mã màu biển số
   */
  PlateColorCode: string | null;
  /**
   * Mã hãng xe
   */
  TradeMarkCode: string | null;
  /**
   * Mã AVN
   */
  SerialNo: string | null;
  /**
   * Ngày mua xe
   */
  DateBuyCar: string | Date | null;
  /**
   * Ngày đăng ký bảo hành
   */
  WarrantyRegistrationDate: string | Date | null;
  /**
   *  Ngày xác nhận bảo hành
   */
  CusConfirmedWarrantyDate: string | Date | null;
  /**
   *  Mã model
   */
  ModelID: string;
  /**
   *  Mã màu
   */
  ColorCode: string | null;
  /**
   *  Năm sản xuất
   */
  ProductYear: string | null;
  /**
   * Số seri ắc quy
   */
  BatteryNo: string | null;
  /**
   * Mã hãng bảo hiểm
   */
  InsNo: string | null;
  /**
   * Số hợp đồng
   */
  InsContractNo: string | null;
  /**
   * Ngày bắt đầu bảo hiểm
   */
  InsStartDate: string | Date | null;
  /**
   * Ngày kết thúc bảo hiểm
   */
  InsFinishedDate: string | Date | null;
  /**
   * Số KM bảo hành
   */
  WarrantyKM: number | null;
  /**
   * Cờ không biển số
   */
  FlagPlateNo: boolean;
  /**
   * Số máy
   */
  EngineNo: string | null;

  CurrentTab: 0 | 1;

  CarID: string | null;

  CusID: string | null;

  DealerCode: string | null;

  OldFlagPlateNo: boolean;
};
