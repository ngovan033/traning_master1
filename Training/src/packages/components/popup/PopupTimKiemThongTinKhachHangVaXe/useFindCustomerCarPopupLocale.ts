import { useI18n } from "@/i18n/useI18n";

export const useFindCustomerCarPopupLocale = () => {
    const { t } = useI18n("FindSer_RO_Customer_Car_Popup");

    const locale = {
        STT: t("STT"),
        CusName: t("CusName"),
        FrameNo: t("FrameNo"),
        Input: t("Input"),
        Mobile: t("Mobile"),
        CusTel: t("CusTel"),
        Address: t("Address"),
        PlateNo: t("PlateNo"),
        ModelName: t("ModelName"),
        ColorCode: t("ColorCode"),
        WarrantyRegistrationDate: t("WarrantyRegistrationDate"),

        // Xe chia sẻ
        TradeMarkCode: t('TradeMarkCode'), //
        WarrantyExpiresDate: t('WarrantyExpiresDate'), //
        CusConfirmedWarrantyDate: t('CusConfirmedWarrantyDate'), //
        WarrantyKM: t('WarrantyKM'), //
        //TradeMarkCode: t('TradeMarkCode'), //
    };

    return {
        locale,
    };
};
