import { useI18n } from "@/i18n/useI18n";

export const useFindCustomerPopupLocale = () => {
  const { t } = useI18n("FindCustomerPopup");

  const locale = {
    STT: t("STT"),
    CusName: t("CusName"),
    FrameNo: t("FrameNo"),
    Input: t("Input"),
    Mobile: t("Mobile"),
    Address: t("Address"),
    PlateNo: t("PlateNo"),
    ModelName: t("ModelName"),
    ColorCode: t("ColorCode"),
    WarrantyRegistrationDate: t("WarrantyRegistrationDate"),
    CusTel: t("CusTel"),
  };

  return {
    locale,
  };
};
