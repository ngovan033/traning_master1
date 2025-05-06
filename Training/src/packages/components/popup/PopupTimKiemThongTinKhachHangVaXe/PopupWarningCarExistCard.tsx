import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { RadioGroup } from "devextreme-react";
import { showPoppup } from "@/packages/ui/base-gridview/store/normal-grid-store";
import { IRQ_Ser_RO } from "@/packages/types/carservice/Ser_RO";
import {
  useCommonConfig,
  useCommonUtils,
} from "@/packages/common/CommonUltils";
import { useSer_RO_Locale } from "@/pages/carservice/Ser_RO/views/locale/Ser_RO_Locale";
import { useDataSource_Ser_RO } from "@/pages/carservice/Ser_RO/components/datasource/useDataSource_Ser_RO";
interface PopupWarningCarExistCardProps {
  onSelectedCustomerAndCar: (customer: any) => void;
}
export const PopupWarningCarExistCard = forwardRef(
  ({ onSelectedCustomerAndCar }: PopupWarningCarExistCardProps, ref: any) => {
    const commonUtils = useCommonUtils();
    const commonConfig = useCommonConfig();
    const [open, setOpen] = useState(false);
    const [customerAndCar, setCustomerAndCar] = useState<any>({
      PlateNo: "",
      Frame: "",
    });
    const radioGroupRef = useRef<any>(null);
    const { Ser_RO_Locale, Ser_ROPartItems_Locale, Ser_ROServiceItems_Locale } =
      useSer_RO_Locale();
    const { t } = useI18n("PopupWarningCarExistCard");
    const setLoad = useSetAtom(loadPanelAtom);
    const dataSourceSer_RO = useDataSource_Ser_RO();
    const onHidding = () => {
      customerAndCar.ActionSearch = "SEARCH";
      onSelectedCustomerAndCar(customerAndCar);
      setOpen(false);
    };
    useImperativeHandle(ref, () => ({
      showPoppup(data: any) {
        setCustomerAndCar(data);
        setOpen(true);
      },
    }));
    const handleConfirm = async () => {
      // Chuyển gọi hàm onSelectedCustomerAndCar vào trong event onHidding();
      //onSelectedCustomerAndCar(customerAndCar);
      onHidding();
    };

    return (
      <Popup
        visible={open}
        title={t("Confirm")}
        showCloseButton={false}
        // onHidden={onHidding}
        width={350}
        height={200}
        // wrapperAttr={{
        //   class: "search-car-popup",
        // }}
      >
        <div className="h-auto">
          <div>
            {`Bạn vui lòng kiểm tra thông tin xe '${customerAndCar.PlateNo}' và VIN '${customerAndCar.FrameNo}' chưa đúng thông tin trên hệ thống thẻ!`}
          </div>
        </div>
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("OK"),
            type: "default",
            stylingMode: "contained",
            onClick: handleConfirm,
          }}
        />
        {/* <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location={"after"}
                    options={{
                        text: t("Cancel"),
                        onClick: onHidding,
                        elementAttr: {
                            class: "search-car-popup ml-2 cancel-button",
                        },
                    }}
                /> */}
      </Popup>
    );
  }
);
