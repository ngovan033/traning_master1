import { useI18n } from "@/i18n/useI18n";

export const useFindPhuTungLocale = () => {
  const { t } = useI18n("FindSerMSTPart");

  const locale = {
    STT: t("STT"),
    PartCode: t("PartCode"),
    VieName: t("VieName"),
    EngName: t("EngName"),
    Unit: t("Unit"),
    Price: t("Price"),
    VAT: t("VAT"),
    Model: t("Model"),
    InStockQuantity: t("InStockQuantity"),
    PartTypeID: t("PartTypeID"),
    PartGroupID: t("PartGroupID"),
    Cost: t("Cost"),
    Location: t("Location"),
    MinQuantity: t("MinQuantity"),
    Note: t("Note"),
    FreqUsed: t("FreqUsed"),
    Quantity: t("Quantity"),
    Remark: t("Remark"),
    KeyWord: t("KeyWord"),
    Description: t("Note"),
    Need: t("Need"),
    Amount: t("Amount"),
    ROWPartType: t("ROWPartType"),
    PartOrderType: t("PartOrderType"),
    PartOrderNo: t("PartOrderNo"),
    AmountBeforeVAT: t("AmountBeforeVAT"),
  };

  return {
    locale,
  };
};
