import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Form, NumberBox, Popup, TextArea } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  FORMAT_NUMBER,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { DateField } from "@/packages/components/date-field";
import { ValidationCallbackData } from "devextreme/common";
import { isValidDateTime } from "@/packages/common/date_utils";
import { useGetTime } from "@/packages/hooks/useGetTime";
import { onKeyDownNumberBox } from "@/packages/common";

interface IPopupPaymentProps {
  visible: boolean;
  container: string;
  handleSave: () => void;
}

export const PopupPayment = forwardRef(
  ({ visible, container, handleSave }: IPopupPaymentProps, popupRef: any) => {
    const { t } = useI18n("Ser_CustomerCar");
    const api = useClientgateApi();
    const { convertTimeISOtoDate } = useGetTime();
    const showPopup = useVisibilityControl({ defaultVisible: visible });
    const formDetailRef = useRef<any>(null);
    const [dataForm, setDataForm] = useState<any>({});

    useImperativeHandle(popupRef, () => ({
      show() {
        showPopup.open();
      },
      setData(data: any) {
        setDataForm({
          ...data,
          action: data?.action ?? "",
          PayDate: data?.PayDate ?? "",
          PayPersonName: data?.PayPersonName ?? "",
          PaymentAmount: data?.PaymentAmount ?? "",
          PayPersonIDCardNo: data?.PayPersonIDCardNo ?? "",
          Note: data?.Note ?? "",
        });
      },
      getFormRef() {
        return formDetailRef.current;
      },
      closePopup() {
        handleClose();
      },
    }));

    //===========================callAPI=====================================

    //===========================callAPI-end=====================================

    //===========================handle=====================================
    const handleClose = () => {
      showPopup.close();
    };

    //===========================handle-end=====================================
    return (
      <Popup
        visible={showPopup.visible}
        title={t("PopupPayment")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "config_md_popup",
        }}
        onHiding={handleClose}
        height={"auto"}
        width={600}
      >
        <Form
          ref={formDetailRef}
          id="Ser_CustomerCar_CreateNew_CustomerInfo_PopupViewDebit_PopupPayment"
          formData={dataForm}
          labelLocation={"left"}
          validationGroup="Ser_CustomerCar_CreateNew_CustomerInfo_PopupViewDebit_PopupPayment"
          elementAttr={{
            id: "config_md_form_v2",
          }}
        >
          <SimpleItem
            label={{
              text: t("PayDate"),
              visible: false,
            }}
            isRequired={true}
            validationRules={[
              {
                type: "required",
                message: "Thời gian không được để trống",
              },
              RequiredField("Thời gian không được để trống"),
            ]}
            dataField={"PayDate"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="container__field">
                  <div className="container__field_label_group">
                    <div className="container__field_label">
                      <p>
                        {t(dataField)}
                        <span className="required_form_field">*</span>
                      </p>
                    </div>
                  </div>
                  <div className="container__field_field">
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      defaultValue={value}
                      dataField={dataField}
                      width={"100%"}
                      // onValueChanged={(e: any) => {
                      //   formInstance.updateData(dataField, e.value);
                      // }}
                      type="datetime"
                      displayFormat="yyyy-MM-dd HH:mm"
                      // placeholder={t("yyyy-MM-dd HH:mm")}
                      validationGroup={formInstance.option("validationGroup")}
                      validationRules={[
                        RequiredField(
                          t(`${dataField}`) + " " + "không được để trống"
                        ),
                        {
                          type: "custom",
                          message: t("Ngày trả không đúng định dạng"),
                          validationCallback: (e: ValidationCallbackData) => {
                            let check = false;
                            if (
                              isValidDateTime(convertTimeISOtoDate(e.value))
                            ) {
                              check = true;
                            } else {
                              check = false;
                            }
                            const isValid = check;
                            e.rule.isValid = isValid;
                            return isValid;
                          },
                        },
                      ]}
                    ></DateField>
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("PayPersonName"),
              visible: false,
            }}
            dataField={"PayPersonName"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="container__field">
                  <div className="container__field_label_group">
                    <div className="container__field_label">
                      <p>{t(dataField)}</p>
                    </div>
                  </div>
                  <div className="container__field_field">
                    <TextField
                      width={"100%"}
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      placeholder={t("Input")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("PayPersonIDCardNo"),
              visible: false,
            }}
            dataField={"PayPersonIDCardNo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="container__field">
                  <div className="container__field_label_group">
                    <div className="container__field_label">
                      <p>{t(dataField)}</p>
                    </div>
                  </div>
                  <div className="container__field_field">
                    <TextField
                      width={"100%"}
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      placeholder={t("Input")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: "Số tiền trả",
              visible: false,
            }}
            isRequired={true}
            validationRules={[
              {
                type: "required",
              },
              RequiredField(t("PaymentAmount")),
            ]}
            dataField={"PaymentAmount"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="container__field">
                  <div className="container__field_label_group">
                    <div className="container__field_label">
                      <p>
                        {t(dataField)}
                        <span className="required_form_field">*</span>
                      </p>
                    </div>
                  </div>
                  <div className="container__field_field">
                    <NumberBox
                      elementAttr={{
                        class:
                          "customize-value-right-in-numberbox customize-box-numberbox-border-none padding-number-right",
                      }}
                      width={"97.2%"}
                      defaultValue={value}
                      className="ml-2"
                      format={FORMAT_NUMBER.INT_NUMBER}
                      onKeyDown={(ev) => {
                        onKeyDownNumberBox(ev);
                      }}
                      min={0}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    ></NumberBox>
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("Note"),
              visible: false,
            }}
            dataField={"Note"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="container__field">
                  <div className="container__field_label_group">
                    <div className="container__field_label">
                      <p>{t(dataField)}</p>
                    </div>
                  </div>
                  <div className="container__field_field">
                    <TextArea
                      elementAttr={{
                        id: "customize_textarea",
                        class: "ml-2",
                      }}
                      width={"97.2%"}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={async (e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
        </Form>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Save"),
            type: "default",
            stylingMode: "contained",
            onClick: handleSave,
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: handleClose,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
