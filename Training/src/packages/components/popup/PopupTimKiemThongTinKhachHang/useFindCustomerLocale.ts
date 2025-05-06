import { useI18n } from "@/i18n/useI18n";

export const useFindCustomerLocale = () => {
  const { t } = useI18n("FindCustomerNormal");

  const locale = {
    STT: t("STT"),
    CusName: t("CusName"),
    Address: t("Address"),
    Tel: t("Tel"),
    Email: t("Email"),
    Sex: t("Sex"),
    Mobile: t("Mobile"),
    Fax: t("Fax"),
    TaxCode: t("TaxCode"),
  };

  return {
    locale,
  };
};
