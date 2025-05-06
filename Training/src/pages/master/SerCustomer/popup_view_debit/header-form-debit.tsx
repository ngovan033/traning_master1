import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@/packages/components/text-field";
import { Button, Form, NumberBox } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import React, { forwardRef } from "react";

const HeaderFormDebit = forwardRef(
  ({ formDebit, handleClickViewDetail }, ref: any) => {
    const { t } = useI18n("Ser_CustomerCar");
    const { t: common } = useI18n("Common");
    return (
      <Form
        colCount={3}
        ref={ref}
        id="Ser_CustomerCar_CreateNew_CustomerInfo_PopupViewDebit"
        formData={formDebit.lst_Ser_Customer}
        labelLocation={"left"}
        validationGroup="Ser_CustomerCar_CreateNew_CustomerInfo_PopupViewDebit"
        elementAttr={{
          id: "config_md_form_v2",
          class: "Ser_CustomerCar_CreateNew_CustomerInfo_PopupViewDebit_Form",
        }}
      >
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("CusID"),
              visible: false,
            }}
            dataField={"CusID"}
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
                    <div className=" w-full flex item-center gap-1 justify-between">
                      <div className="flex-1">
                        <TextField
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          readOnly={true}
                          width={"100%"}
                          placeholder={"Input"}
                        />
                      </div>
                      <div className=" container_search_cusname_btn w-[100px] mr-[4px]">
                        <Button
                          text={t("View")}
                          className="btn_supper_sm_size_v2"
                          type="default"
                          onClick={() => handleClickViewDetail(value)}
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("TotalDebitAmount"),
              visible: false,
            }}
            dataField={"TotalDebitAmount"}
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
                    <div className="ml-2">
                      <NumberBox
                        width={"100%"}
                        readOnly={true}
                        className="font-bold number-text-right"
                        placeholder="nhập dữ liệu"
                        defaultValue={value ?? 0}
                        format="#,##0"
                      ></NumberBox>
                    </div>
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
        </GroupItem>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("CusName"),
              visible: false,
            }}
            dataField={"CusName"}
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
                      readOnly
                    />
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("TotalPaymentAmount"),
              visible: false,
            }}
            dataField={"TotalPaymentAmount"}
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
                    <div className="ml-2">
                      <NumberBox
                        width={"100%"}
                        readOnly={true}
                        className="font-bold number-text-right"
                        placeholder="nhập dữ liệu"
                        defaultValue={value ?? 0}
                        format="#,##0"
                      ></NumberBox>
                    </div>
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
        </GroupItem>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("Address"),
              visible: false,
            }}
            dataField={"Address"}
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
                      readOnly
                    />
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("TotalDebt"),
              visible: false,
            }}
            dataField={"TotalDebt"}
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
                    <div className="ml-2">
                      <NumberBox
                        width={"100%"}
                        readOnly={true}
                        className="font-bold number-text-right"
                        placeholder="nhập dữ liệu"
                        defaultValue={value ?? 0}
                        format="#,##0"
                      ></NumberBox>
                    </div>
                  </div>
                </div>
              );
            }}
          ></SimpleItem>
        </GroupItem>
      </Form>
    );
  }
);

export default HeaderFormDebit;
