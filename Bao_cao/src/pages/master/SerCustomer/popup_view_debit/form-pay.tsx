import { useI18n } from "@/i18n/useI18n";
import {
  RequiredField,
  requiredOnlyNumber,
} from "@/packages/common/Validation_Rules";
import { DateField } from "@/packages/components/date-field";
import { TextField } from "@/packages/components/text-field";
import { Form, TextArea } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface iFormPayProps {
  formData: any;
}

export const FormPay = forwardRef(({ formData }: iFormPayProps, ref: any) => {
  const { t } = useI18n("Ser_CustomerCar");
  const [action, setAction] = useState("0");

  const [dataForm1, setDataForm1] = useState({
    RONo: "",
    DebitAmount: "",
    DebitDate: "",
    Note: "",
  });
  const [dataForm2, setDataForm2] = useState({
    PayDate: "",
    PayPersonName: "",
    PaymentAmount: "",
    PayPersonIDCardNo: "",
    Note: "",
  });

  useImperativeHandle(ref, () => ({
    selectForm(typeForm: any, data: any) {
      setAction(typeForm);
      if (typeForm === "1") {
        setDataForm1({
          RONo: data?.RONo ?? "",
          DebitAmount: data?.DebitAmount ?? "",
          DebitDate: data?.DebitDate ?? "",
          Note: data?.Note ?? "",
        });
      } else {
        setDataForm2({
          PayDate: data?.PayDate ?? "",
          PayPersonName: data?.PayPersonName ?? "",
          PaymentAmount: data?.PaymentAmount ?? "",
          PayPersonIDCardNo: data?.PayPersonIDCardNo ?? "",
          Note: data?.Note ?? "",
        });
      }
    },
  }));

  return (
    <div className="mt-1 mx-1">
      {action === "1" && (
        <Form
          ref={ref}
          id="Ser_CustomerCar_FormDebit"
          formData={dataForm1}
          labelLocation={"top"}
          validationGroup="Ser_CustomerCar_FormDebit"
        >
          <GroupItem colCount={1}>
            <GroupItem colCount={2}>
              <SimpleItem
                label={{
                  text: t("RONo"),
                }}
                dataField={"RONo"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
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
                  );
                }}
              ></SimpleItem>
            </GroupItem>
            <GroupItem colCount={2}>
              <SimpleItem
                label={{
                  text: t("DebitAmount"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("DebitAmount")),
                ]}
                dataField={"DebitAmount"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      width={"100%"}
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      placeholder={t("Input")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      validationRules={[
                        RequiredField(t("NoiDungKhaoSatIsRequired")),
                        requiredOnlyNumber,
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("DebitDate"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                ]}
                dataField={"DebitDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      defaultValue={value}
                      dataField={dataField}
                      width={"100%"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      displayFormat="yyyy-MM-dd HH:mm"
                      placeholder={t("yyyy-MM-dd HH:mm")}
                      useMaskBehavior

                      // disabled={KhachHang === "2" ?? true}
                      // calendarOptions={{
                      //   maxZoomLevel: "month",
                      // }}
                    ></DateField>
                  );
                }}
              ></SimpleItem>
            </GroupItem>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("Note"),
                }}
                dataField={"Note"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextArea
                      className="ml-2"
                      width={"100%"}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={async (e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
          </GroupItem>
        </Form>
      )}

      {action === "2" && (
        <Form
          ref={ref}
          id="Ser_CustomerCar_FormPay"
          formData={dataForm2}
          labelLocation={"top"}
          validationGroup="Ser_CustomerCar_FormPay"
        >
          <GroupItem colCount={1}>
            <GroupItem colCount={2}>
              <SimpleItem
                label={{
                  text: t("PayDate"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                ]}
                dataField={"PayDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      defaultValue={value}
                      dataField={dataField}
                      width={"100%"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      displayFormat="yyyy-MM-dd HH:mm"
                      placeholder={t("yyyy-MM-dd HH:mm")}
                      useMaskBehavior

                      // disabled={KhachHang === "2" ?? true}
                      // calendarOptions={{
                      //   maxZoomLevel: "month",
                      // }}
                    ></DateField>
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("PaymentAmount"),
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
                    <TextField
                      width={"100%"}
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      placeholder={t("Input")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      validationRules={[
                        RequiredField(t("NoiDungKhaoSatIsRequired")),
                        requiredOnlyNumber,
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
            <GroupItem colCount={2}>
              <SimpleItem
                label={{
                  text: t("PayPersonName"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("PayPersonName")),
                ]}
                dataField={"PayPersonName"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      width={"100%"}
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      placeholder={t("Input")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      validationRules={[
                        RequiredField(t("NoiDungKhaoSatIsRequired")),
                        requiredOnlyNumber,
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("PayPersonIDCardNo"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("PayPersonIDCardNo")),
                ]}
                dataField={"PayPersonIDCardNo"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      width={"100%"}
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      placeholder={t("Input")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      validationRules={[
                        RequiredField(t("NoiDungKhaoSatIsRequired")),
                        requiredOnlyNumber,
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("Note"),
                }}
                dataField={"Note"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextArea
                      className="ml-2"
                      width={"100%"}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={async (e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
          </GroupItem>
        </Form>
      )}
    </div>
  );
});
