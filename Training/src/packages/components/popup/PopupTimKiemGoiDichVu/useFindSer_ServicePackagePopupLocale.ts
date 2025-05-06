import { useI18n } from "@/i18n/useI18n";

export const useFindSer_ServicePackagePopupLocale = () => {
  const { t } = useI18n("FindSer_RO_Ser_ServicePackagePopup");

  const locale = {
    STT: t("STT"),
    ServicePackageID: t("ServicePackageID"),
    ServicePackageNo: t("ServicePackageNo"),
    ServicePackageName: t("ServicePackageName"),
    Creator: t("Creator"),
    CreatedDate: t("CreatedDate"),
    Description: t("Description"),
    IsUserBasePrice: t("IsUserBasePrice"),
    IsUserBasePriceCaption: t("IsUserBasePriceCaption"),
    Input: t("Input"),
    Ser_ServicePackage_Search: t("Ser_ServicePackage_Search"), // Tìm kiếm gói dịch vụ
    PriceCommon: t("PriceCommon"), // 1: Giá chung
    PriceByServicePackage: t("PriceByServicePackage"), // 0: Giá theo gói dịch vụ
  };

  return {
    locale,
  };
};
