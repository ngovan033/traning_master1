import { useI18n } from "@/i18n/useI18n";

export const useSerAppLocale = () => {
  const { t } = useI18n("SerApp");

  const locale = {
    AppNo: t("AppNo"),
    AppTypeCode: t("AppTypeCode"),
    AppDateTimeFrom: t("AppDateTimeFrom"),
    CVDVCode: t("CVDVCode"),
    AppTimeFrom: t("AppTimeFrom"),
    CavityID: t("CavityID"),
    CusName: t("CusName"),
    PlateNo: t("PlateNo"),
    CusTel: t("CusTel"),
    TrademarkNameModel: t("TrademarkNameModel"),
    YCKH: t("YCKH"),
    ModelName: t("ModelName"),
    CusRequest: t("CusRequest"),
    STT: t("STT"),
    ReceptionFNo: t("ReceptionFNo"), // Số phiếu kiểm tra
    UserName: t("UserName"), // Tên người tạo
    Source: t("Source"), // Nguồn
    CavityName: t("CavityName"), // Tên khoang sửa chữa
    NewAppStatus: t("NewAppStatus"), // Trạng thái
    DealerCode: t("DealerCode"), // Mã đại lý
    Creator: t("Creator"), // Tên người tạo
    FlagMoiTao: t("FlagMoiTao"), // Mới tạo
    FlagXacNhan: t("FlagXacNhan"), // Đã xác nhận
    FlagDaLienHe: t("FlagDaLienHe"), // Đã liên hệ
    FlagTiepNhan: t("FlagTiepNhan"), // Đã tiếp nhận
    FlagHuy: t("FlagHuy"), // Đã hủy
  };

  return {
    locale,
  };
};
