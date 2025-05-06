import { useI18n } from "@/i18n/useI18n";

export const useFindPhanCongLaoDongPopupLocale = () => {
  const { t } = useI18n("FindPhanCongLaoDongPopupLocale");

  const locale = {
    STT: t("STT"),
    SerID: t("SerID"),
    SerCode: t("SerCode"),
    SerName: t("SerName"),
    Model: t("Model"),
    Price: t("Price"),
    VAT: t("VAT"),
    Remark: t("Remark"),
    Cost: t("Cost"),
    StdManHour: t("StdManHour"),
    FlagWarranty: t("FlagWarranty"),
    Note: t("Note"),
    KeyWord: t("KeyWord"),
    Amount: t("Amount"),
    ROWSerType: t("ROWSerType"),
    BulletinID: t("BulletinID"),
    BulletinNoHMC: t("BulletinNoHMC"),
    AmountBeforeVAT: t("AmountBeforeVAT"),
  };

  return {
    locale,
  };
};
